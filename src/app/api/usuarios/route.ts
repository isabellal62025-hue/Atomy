import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

// GET - Obtener todos los usuarios
export async function GET() {
  try {
    const usuarios = await db.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        usuario: true,
        rol: true,
        dpi: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      usuarios
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      { success: false, message: 'Error al obtener usuarios' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar usuario
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

    // No permitir eliminar el admin principal
    const usuario = await db.usuario.findUnique({ where: { id } });
    if (usuario?.usuario === 'admin') {
      return NextResponse.json(
        { success: false, message: 'No se puede eliminar el administrador principal' },
        { status: 403 }
      );
    }

    await db.usuario.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return NextResponse.json(
      { success: false, message: 'Error al eliminar usuario' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar usuario
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, nombre, usuario: nuevoUsuario, rol, dpi, password } = data;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID requerido' },
        { status: 400 }
      );
    }

    const updateData: {
      nombre?: string;
      usuario?: string;
      rol?: string;
      dpi?: string;
      password?: string;
    } = {};
    
    if (nombre) updateData.nombre = nombre;
    if (nuevoUsuario) updateData.usuario = nuevoUsuario;
    if (rol) updateData.rol = rol;
    if (dpi) updateData.dpi = dpi;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUsuario = await db.usuario.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        nombre: true,
        usuario: true,
        rol: true,
        dpi: true,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Usuario actualizado correctamente',
      usuario: updatedUsuario
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return NextResponse.json(
      { success: false, message: 'Error al actualizar usuario' },
      { status: 500 }
    );
  }
}
