import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/availability - Récupérer le statut de disponibilité
export async function GET() {
  try {
    const availability = await prisma.availability.findFirst({
      orderBy: { createdAt: 'desc' }
    });

    const status = availability?.status || 'available';

    return NextResponse.json({ status });

  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Error fetching availability status' },
      { status: 500 }
    );
  }
}

// PUT /api/availability - Mettre à jour le statut de disponibilité
export async function PUT(request: NextRequest) {
  try {
    const { status } = await request.json();

    if (!['available', 'partially', 'unavailable'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: available, partially, or unavailable' },
        { status: 400 }
      );
    }

    // Créer un nouveau enregistrement de disponibilité
    await prisma.availability.create({
      data: { status }
    });

    return NextResponse.json({ 
      message: 'Availability status updated successfully',
      status 
    });

  } catch (error) {
    console.error('Error updating availability:', error);
    return NextResponse.json(
      { error: 'Error updating availability status' },
      { status: 500 }
    );
  }
}
