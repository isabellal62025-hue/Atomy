import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Mapeo de IDs de categoría del frontend a nombres en la base de datos
const categoriaMap: Record<string, string[]> = {
  'belleza': ['Belleza'],
  'cuidado-personal': ['Cuidado Personal'],
  'salud': ['Salud'],
  'hogar': ['Hogar']
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get('categoria');

    let whereClause: any = { activo: true };

    if (categoria && categoriaMap[categoria]) {
      whereClause.categoria = {
        in: categoriaMap[categoria]
      };
    }

    const productos = await db.producto.findMany({
      where: whereClause,
      orderBy: { orden: 'asc' }
    });

    return NextResponse.json({
      success: true,
      productos
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return NextResponse.json(
      { success: false, message: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}
