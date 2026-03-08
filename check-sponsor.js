const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const code = '20669704';
        console.log(`Buscando registros para patrocinadorCodigo: ${code}`);
        const registros = await prisma.registro.findMany({
            where: { patrocinadorCodigo: code }
        });
        console.log(`Encontrados: ${registros.length}`);
        registros.forEach(r => {
            console.log(`- ${r.nombres} ${r.apellidos} (${r.id})`);
        });

        const user = await prisma.usuario.findFirst({
            where: { usuario: code }
        });
        console.log(`\nDatos del patrocinador como usuario:`, JSON.stringify(user, null, 2));

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

check();
