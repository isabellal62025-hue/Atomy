import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const videos = await db.video.findMany({
      where: { activo: true },
      orderBy: { orden: 'asc' }
    });

    return NextResponse.json({
      success: true,
      videos
    });
  } catch (error) {
    console.error('Error al obtener videos:', error);
    return NextResponse.json(
      { success: false, message: 'Error al obtener videos' },
      { status: 500 }
    );
  }
}
