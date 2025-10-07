import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/projects - Récupérer tous les projets
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Transformer les données pour correspondre au format attendu par le frontend
    const formattedProjects = projects.map(project => ({
      id: project.id,
      title: project.title as { fr: string; en: string },
      description: project.description as { fr: string; en: string },
      image: project.image,
      technologies: project.technologies as string[],
      categories: project.categories as string[],
      link: project.link,
    }));

    return NextResponse.json({ member: formattedProjects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'An error occurred while loading projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Créer un nouveau projet
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validation des champs requis
    if (!data.title || !data.description || !data.technologies || !data.image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        technologies: data.technologies,
        categories: data.categories || [],
        link: data.link || null,
      }
    });

    return NextResponse.json({
      id: project.id,
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies,
      categories: project.categories,
      link: project.link,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Error saving project' },
      { status: 500 }
    );
  }
}
