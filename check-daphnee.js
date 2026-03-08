const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const registro = await prisma.registro.findFirst({
            where: { nombres: { contains: 'Daphnee' } }
        });
        console.log('Registro encontrado:', JSON.stringify(registro, null, 2));
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

check();
