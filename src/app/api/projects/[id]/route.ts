import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT /api/projects/[id] - Mettre à jour un projet
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();

    const project = await prisma.project.findUnique({
      where: { id }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title: data.title || project.title,
        description: data.description || project.description,
        technologies: data.technologies || project.technologies,
        image: data.image || project.image,
        categories: data.categories || project.categories,
        link: data.link !== undefined ? data.link : project.link,
      }
    });

    return NextResponse.json({
      id: updatedProject.id,
      title: updatedProject.title,
      description: updatedProject.description,
      image: updatedProject.image,
      technologies: updatedProject.technologies,
      categories: updatedProject.categories,
      link: updatedProject.link,
    });

  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Error saving project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Supprimer un projet
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const project = await prisma.project.findUnique({
      where: { id }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    await prisma.project.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });

  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Error deleting project' },
      { status: 500 }
    );
  }
}
