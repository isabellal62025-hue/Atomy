import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// DELETE - Eliminar registro
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

    await db.registro.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: 'Registro eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar registro:', error);
    return NextResponse.json(
      { success: false, message: 'Error al eliminar registro' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar registro
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID requerido' },
        { status: 400 }
      );
    }

    // Campos actualizables
    const allowedFields = [
      'nombres', 'apellidos', 'telefono', 'email', 'direccion',
      'pais', 'departamento', 'municipio', 'estadoCivil',
      'tipoMembresia', 'nombreConyuge', 'dpiConyuge', 'beneficiario',
      'estado', 'patrocinadorNombre', 'patrocinadorCodigo'
    ];

    const filteredData: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (updateData[key] !== undefined) {
        filteredData[key] = updateData[key];
      }
    }

    const updatedRegistro = await db.registro.update({
      where: { id },
      data: filteredData
    });

    return NextResponse.json({
      success: true,
      message: 'Registro actualizado correctamente',
      registro: updatedRegistro
    });
  } catch (error) {
    console.error('Error al actualizar registro:', error);
    return NextResponse.json(
      { success: false, message: 'Error al actualizar registro' },
      { status: 500 }
    );
  }
}
