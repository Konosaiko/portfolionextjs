import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Rechercher l'admin
    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Générer le token JWT
    const token = jwt.sign(
      { 
        userId: admin.id, 
        username: admin.username 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Créer la réponse avec le cookie httpOnly
    const response = NextResponse.json({ 
      success: true,
      message: 'Connexion réussie' 
    });

    // Définir le cookie sécurisé
    response.cookies.set('admin_token', token, {
      httpOnly: true, // Empêche l'accès JavaScript côté client
      secure: process.env.NODE_ENV === 'production', // HTTPS uniquement en prod
      sameSite: 'strict', // Protection CSRF
      maxAge: 60 * 60 * 24, // 24 heures
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Error during authentication:', error);
    return NextResponse.json(
      { message: 'An error occurred during authentication' },
      { status: 500 }
    );
  }
}
