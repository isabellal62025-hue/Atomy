const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clean() {
    try {
        const dpi = '2336408271501';
        console.log(`Buscando registros con DPI: ${dpi}...`);

        // Eliminar registros
        const res = await prisma.registro.deleteMany({
            where: { dpi: dpi }
        });
        console.log('Registros eliminados:', res.count);

        // Eliminar usuarios asociados (si los hay)
        const resUsr = await prisma.usuario.deleteMany({
            where: { dpi: dpi }
        });
        console.log('Usuarios eliminados:', resUsr.count);

    } catch (err) {
        console.error('Error al limpiar:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

clean();
