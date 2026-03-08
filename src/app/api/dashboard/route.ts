import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const userRole = searchParams.get('role');
    const userDpi = searchParams.get('dpi');
    let userCodigo = searchParams.get('codigo');

    // Si falta el código de usuario (sesiones viejas o llega como 'undefined'), buscarlo por DPI
    if ((!userCodigo || userCodigo === 'undefined' || userCodigo === 'null') && userDpi) {
      const dbUser = await db.usuario.findFirst({
        where: { dpi: userDpi }
      });
      if (dbUser) userCodigo = dbUser.usuario;
    }

    // Obtener todos los registros
    const registros = await db.registro.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Calcular estadísticas generales
    const total = registros.length;
    const distribuidores = registros.filter(r => r.tipoMembresia.toLowerCase() === 'distribuidor').length;
    const emprendedores = registros.filter(r => r.tipoMembresia.toLowerCase() === 'emprendedor').length;
    const consumidores = registros.filter(r => r.tipoMembresia.toLowerCase() === 'consumidor').length;

    // Filtrar según rol
    let filteredRegistros = registros;
    if (userRole !== 'admin') {
      // Si no es admin, mostrar solo los que patrocinó (por DPI o por Código de Usuario)
      filteredRegistros = registros.filter(r =>
        r.patrocinadorCodigo === userDpi ||
        r.patrocinadorCodigo === userCodigo ||
        r.patrocinadorNombre.toLowerCase().includes(userDpi?.toLowerCase() || '') ||
        (userCodigo && r.patrocinadorNombre.toLowerCase().includes(userCodigo.toLowerCase()))
      );
    }

    // Calcular referidos para cada registro
    const registrosConReferidos = filteredRegistros.map(r => {
      const referidos = registros.filter(reg =>
        reg.patrocinadorCodigo === r.dpi ||
        reg.patrocinadorNombre.toLowerCase() === `${r.nombres.toLowerCase()} ${r.apellidos.toLowerCase()}`
      ).length;

      return {
        id: r.id,
        fecha: r.fecha.toISOString(),
        patrocinadorNombre: r.patrocinadorNombre,
        patrocinadorCodigo: r.patrocinadorCodigo,
        nombres: r.nombres,
        apellidos: r.apellidos,
        dpi: r.dpi,
        nacimiento: r.nacimiento,
        telefono: r.telefono,
        email: r.email,
        direccion: r.direccion,
        pais: r.pais,
        departamento: r.departamento,
        municipio: r.municipio,
        estadoCivil: r.estadoCivil,
        tipoMembresia: r.tipoMembresia,
        nombreConyuge: r.nombreConyuge,
        dpiConyuge: r.dpiConyuge,
        beneficiario: r.beneficiario,
        usuario: r.usuario,
        password: r.password,
        linkDPIFrente: r.linkDPIFrente,
        linkDPIReverso: r.linkDPIReverso,
        estado: r.estado,
        referidos
      };
    });

    return NextResponse.json({
      success: true,
      records: registrosConReferidos,
      stats: {
        total: userRole === 'admin' ? total : filteredRegistros.length,
        distributors: userRole === 'admin' ? distribuidores : filteredRegistros.filter(r => r.tipoMembresia.toLowerCase() === 'distribuidor').length,
        entrepreneurs: userRole === 'admin' ? emprendedores : filteredRegistros.filter(r => r.tipoMembresia.toLowerCase() === 'emprendedor').length,
        consumers: userRole === 'admin' ? consumidores : filteredRegistros.filter(r => r.tipoMembresia.toLowerCase() === 'consumidor').length,
      }
    });
  } catch (error) {
    console.error('Error en dashboard:', error);
    return NextResponse.json(
      { success: false, message: 'Error al obtener datos del dashboard' },
      { status: 500 }
    );
  }
}
