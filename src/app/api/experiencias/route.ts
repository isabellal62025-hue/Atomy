import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Obtener experiencias
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioId = searchParams.get('usuarioId');
    const aprobados = searchParams.get('aprobados');

    const where: { usuarioId?: string; aprobado?: boolean } = {};

    if (usuarioId) {
      where.usuarioId = usuarioId;
    }

    if (aprobados === 'true') {
      where.aprobado = true;
    }

    const experiencias = await db.experiencia.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    // Obtener nombres y ubicaciones de usuarios para cada experiencia
    const experienciasEnriquecidas = await Promise.all(
      experiencias.map(async (exp) => {
        // Buscar el usuario por DPI (usuarioId es el DPI)
        const usuario = await db.usuario.findFirst({
          where: { dpi: exp.usuarioId }
        });

        // También buscar en Registro para obtener ubicación completa
        const registro = await db.registro.findFirst({
          where: { dpi: exp.usuarioId }
        });

        const nombreUsuario = usuario?.nombre ||
          (registro ? `${registro.nombres} ${registro.apellidos}` : null) ||
          'Miembro Atomy';

        const ubicacion = registro
          ? `${registro.pais}, ${registro.departamento}`
          : 'Miembro Atomy';

        return {
          ...exp,
          nombreUsuario,
          ubicacion
        };
      })
    );

    return NextResponse.json({
      success: true,
      experiencias: experienciasEnriquecidas
    });
  } catch (error) {
    console.error('Error al obtener experiencias:', error);
    return NextResponse.json(
      { success: false, message: 'Error al obtener experiencias' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva experiencia
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { usuarioId, titulo, experiencia, producto, calificacion } = data;

    if (!usuarioId || !titulo || !experiencia) {
      return NextResponse.json(
        { success: false, message: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Verificar si el usuario es admin para auto-aprobar
    const usuarioAuth = await db.usuario.findFirst({
      where: { dpi: usuarioId }
    });
    const isAdmin = usuarioAuth?.rol === 'admin';

    const nuevaExperiencia = await db.experiencia.create({
      data: {
        usuarioId,
        titulo,
        experiencia,
        producto: producto || null,
        calificacion: calificacion || 5,
        aprobado: isAdmin, // Auto-aprobar si es admin
        destacado: false
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Experiencia enviada correctamente. Será revisada por un administrador.',
      experiencia: nuevaExperiencia
    });
  } catch (error) {
    console.error('Error al crear experiencia:', error);
    return NextResponse.json(
      { success: false, message: 'Error al crear experiencia' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar experiencia (aprobar/destacar)
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, aprobado, destacado, titulo, experiencia, producto, calificacion } = data;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID requerido' },
        { status: 400 }
      );
    }

    const updateData: {
      aprobado?: boolean;
      destacado?: boolean;
      titulo?: string;
      experiencia?: string;
      producto?: string | null;
      calificacion?: number;
    } = {};

    if (aprobado !== undefined) updateData.aprobado = aprobado;
    if (destacado !== undefined) updateData.destacado = destacado;
    if (titulo) updateData.titulo = titulo;
    if (experiencia) updateData.experiencia = experiencia;
    if (producto !== undefined) updateData.producto = producto || null;
    if (calificacion) updateData.calificacion = calificacion;

    const updatedExperiencia = await db.experiencia.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      message: 'Experiencia actualizada correctamente',
      experiencia: updatedExperiencia
    });
  } catch (error) {
    console.error('Error al actualizar experiencia:', error);
    return NextResponse.json(
      { success: false, message: 'Error al actualizar experiencia' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar experiencia
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID requerido' },
        { status: 400 }
      );
    }

    await db.experiencia.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: 'Experiencia eliminada correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar experiencia:', error);
    return NextResponse.json(
      { success: false, message: 'Error al eliminar experiencia' },
      { status: 500 }
    );
  }
}
