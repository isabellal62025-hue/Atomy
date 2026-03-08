import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validar campos requeridos
    const requiredFields = [
      'patrocinadorNombre', 'patrocinadorCodigo', 'nombres', 'apellidos',
      'dpi', 'nacimiento', 'telefono', 'email', 'direccion', 'pais',
      'departamento', 'municipio', 'estadoCivil', 'tipoMembresia',
      'usuario', 'password'
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, message: `El campo ${field} es requerido` },
          { status: 400 }
        );
      }
    }

    // Verificar si el usuario ya existe en Registro o en Usuario
    const [existingReg, existingUserTable] = await Promise.all([
      db.registro.findFirst({
        where: {
          OR: [
            { dpi: data.dpi },
            { usuario: data.usuario },
            { email: data.email }
          ]
        }
      }),
      db.usuario.findFirst({
        where: {
          OR: [
            { dpi: data.dpi },
            { usuario: data.usuario }
          ]
        }
      })
    ]);

    if (existingReg || existingUserTable) {
      return NextResponse.json(
        { success: false, message: 'El DPI, usuario o email ya están registrados en el sistema' },
        { status: 400 }
      );
    }

    // 1. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 2. Determinar el rol según el tipo de membresía
    const rol = data.tipoMembresia.toLowerCase().includes('emprendedor')
      ? 'emprendedor'
      : data.tipoMembresia.toLowerCase().includes('distribuidor')
        ? 'distribuidor'
        : 'consumidor';

    // 3. Crear Usuario y Registro en una Transacción Atómica
    const result = await db.$transaction(async (tx) => {
      // 3.1 Crear el Usuario (Credenciales de acceso)
      const u = await tx.usuario.create({
        data: {
          nombre: `${data.nombres} ${data.apellidos}`,
          usuario: data.usuario,
          password: hashedPassword,
          rol: rol,
          dpi: data.dpi,
        }
      });

      // 3.2 Crear el Registro (Datos de membresía) vinculado al Usuario
      const r = await tx.registro.create({
        data: {
          patrocinadorNombre: data.patrocinadorNombre,
          patrocinadorCodigo: data.patrocinadorCodigo,
          nombres: data.nombres,
          apellidos: data.apellidos,
          dpi: data.dpi,
          nacimiento: data.nacimiento,
          telefono: data.telefono,
          email: data.email,
          direccion: data.direccion,
          pais: data.pais,
          departamento: data.departamento,
          municipio: data.municipio,
          estadoCivil: data.estadoCivil,
          tipoMembresia: data.tipoMembresia,
          nombreConyuge: data.nombreConyuge || null,
          dpiConyuge: data.dpiConyuge || null,
          beneficiario: data.beneficiario || false,
          usuario: data.usuario,
          password: data.password, // Guardar original para administrador
          linkDPIFrente: data.linkDPIFrente || null,
          linkDPIReverso: data.linkDPIReverso || null,
          facebookFollow: data.facebookFollow || false,
          whatsappJoin: data.whatsappJoin || false,
          estado: 'pendiente',
          usuarioId: u.id
        }
      });

      return { r, u };
    });

    return NextResponse.json({
      success: true,
      message: '¡Registro completado exitosamente! Tu acceso al panel será activado.',
      registro: {
        id: result.r.id,
        nombres: result.r.nombres,
        apellidos: result.r.apellidos
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { success: false, message: 'Error al procesar el registro' },
      { status: 500 }
    );
  }
}
