import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Configuration du transporteur email
const transporter = nodemailer.createTransporter({
  service: 'gmail', // ou votre service email
  auth: {
    user: process.env.MAILER_FROM,
    pass: process.env.MAILER_PASSWORD, // Mot de passe d'application Gmail
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const attachment = formData.get('attachment') as File | null;

    // Validation des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sauvegarder le message en base de données
    await prisma.user.create({
      data: {
        name,
        email,
        subject,
        message,
        attachment: attachment ? attachment.name : null,
      }
    });

    // Préparer l'email
    const mailOptions = {
      from: process.env.MAILER_FROM,
      to: process.env.MAILER_TO || 'contact@example.com',
      subject: `Nouveau message de contact: ${subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Ajouter la pièce jointe si présente
    if (attachment && attachment.size > 0) {
      const buffer = Buffer.from(await attachment.arrayBuffer());
      mailOptions.attachments = [{
        filename: attachment.name,
        content: buffer,
      }];
    }

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error sending contact message:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}
