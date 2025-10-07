import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Test de connexion simple
    await prisma.$connect();
    
    // Test de requête simple
    const adminCount = await prisma.admin.count();
    const availabilityCount = await prisma.availability.count();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        adminCount,
        availabilityCount,
        databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
        directUrl: process.env.DIRECT_URL ? 'Set' : 'Not set',
        jwtSecret: process.env.JWT_SECRET ? 'Set' : 'Not set'
      }
    });

  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
      directUrl: process.env.DIRECT_URL ? 'Set' : 'Not set',
      jwtSecret: process.env.JWT_SECRET ? 'Set' : 'Not set'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
