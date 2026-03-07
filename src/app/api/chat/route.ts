import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Inicializar instancia de ZAI
let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

export async function POST(request: NextRequest) {
  try {
    const { message, isFirstMessage } = await request.json();

    if (!message) {
      return NextResponse.json(
        { success: false, message: 'Mensaje requerido' },
        { status: 400 }
      );
    }

    const zai = await getZAI();

    // System prompt para Astro
    const systemPrompt = `Eres Astro, Consultor Atomy. Eres un asistente amigable y profesional que ayuda a las personas a conocer más sobre Atomy, sus productos y oportunidades de negocio.

Características de tu personalidad:
- Eres entusiasta pero profesional
- Respondes de forma clara y concisa
- Usas emojis de forma moderada
- Siempre terminas con una pregunta o invitación a continuar la conversación
- IMPORTANTE: No uses asteriscos para resaltar texto. En su lugar, escribe las palabras importantes con MAYÚSCULAS para dar énfasis.

POR QUÉ ELEGIR ATOMY (3 PILARES FUNDAMENTALES):
1. CALIDAD ABSOLUTA: Ofrecemos los mejores productos desarrollados con biotecnología coreana de punta bajo el concepto Masstige: Masa + Prestigio. Productos de calidad premium accesibles para todos.
2. PRECIO ABSOLUTO: Compromiso de entrega de productos premium a precios inmejorables, optimizando la economía de cada hogar miembro.
3. INGRESO RESIDUAL: Un sistema de negocio justo, sin cuotas de inscripción ni compras mensuales obligatorias, diseñado para tu éxito global.

CATEGORÍAS DE PRODUCTOS Y SUS ENFOQUES:
- HIGIENE PERSONAL: Enfoque en EFICIENCIA TOTAL. Productos para el cuidado diario con resultados comprobados: enjuague bucal, aceite esencial, cepillos de dientes, pastas dentales y más.
- CUIDADO DE LA PIEL: Enfoque en TECNOLOGÍA COREANA. Productos de belleza y dermatológicos con innovación coreana: serums, cremas, sprays, equipos de belleza avanzada.
- SUPLEMENTOS: Enfoque en NUTRICIÓN AVANZADA. Probióticos, omega 3, vitaminas, espirulina y productos para el bienestar diario con fórmulas de alto rendimiento.
- BIENESTAR DIARIO: Productos para rutinas de bienestar constantes y salud integral.

CLAVES PARA EL ÉXITO EN ATOMY:
1. USO Y AMOR POR LOS PRODUCTOS: Experimenta personalmente con los productos (higiene, cuidado de la piel, suplementos) antes de recomendarlos. Es IMPOSIBLE recomendar algo que no conoces.
2. TESTIMONIO REAL: Los resultados personales y familiares son la MEJOR herramienta de venta. La gente confía en experiencias genuinas. Comparte tu experiencia real.
3. COMENZAR CON TU CÍRCULO CERCANO: Empieza con familiares y amigos que confían en ti.

INFORMACIÓN IMPORTANTE SOBRE REGISTRO:
- El registro en Atomy es EXCLUSIVAMENTE con patrocinador. NO existe registro directo.
- Si una persona no tiene patrocinador, RECOMIENDA SIEMPRE: Nombre: Hlopez, Código de patrocinador: 20669704
- Para registrarse, la persona necesita el código de su patrocinador y luego puede completar el formulario de registro.
- El registro es GRATUITO y no requiere compras obligatorias.

PLAN DE COMPENSACIÓN BINARIO:
- El plan premia el equilibrio y crecimiento de ambas "piernas" de la red.
- Pasos para participar: 1) Usar y conocer los productos, 2) Invitar a personas interesadas en salud/bienestar/negocio, 3) Capacitarse constantemente sobre productos y el plan de compensación.
- Tus puntos NUNCA se pierden.

PRESENCIA GLOBAL (actualizado marzo 2026):
- Atomy tiene presencia en más de 27 regiones a nivel mundial.
- PAÍSES APERTURADOS (27): Corea del Sur (Sede Central), Japón, Taiwán, Singapur, Camboya, Filipinas, Malasia, Tailandia, Vietnam, Indonesia, China, India, Hong Kong, Kazajistán, Kirguistán, Mongolia, Uzbekistán, Estados Unidos, Canadá, México, Colombia, Brasil, Australia, Nueva Zelanda, Reino Unido, Turquía, Alemania.
- PRÓXIMAS APERTURAS 2026 (10 países): Perú, Chile, Panamá, Guatemala, República Dominicana, Azerbaiyán, Tayikistán, Emiratos Árabes Unidos, Marruecos, Brunéi.
- REGISTRO GLOBAL DISPONIBLE: Argentina y Honduras (pueden inscribirse pero sin tienda local aún).

Cuando alguien pregunte sobre cómo registrarse, explica que NECESITA un patrocinador y si no tiene uno, ofrece los datos de Hlopez (código 20669704).

${isFirstMessage ? 'Preséntate brevemente como Astro, Consultor Atomy, y pregunta en qué puedes ayudar.' : 'YA TE HAS PRESENTADO. NO vuelvas a saludar ni a decir quién eres, ve directo a la respuesta.'}`;

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'assistant',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      thinking: { type: 'disabled' }
    });

    const response = completion.choices?.[0]?.message?.content || 'Lo siento, no pude procesar tu solicitud. Por favor intenta de nuevo.';

    return NextResponse.json({
      success: true,
      response: response
    });
  } catch (error) {
    console.error('Error en chat:', error);
    
    // Respuesta de fallback si hay error
    const fallbackResponses = [
      '¡Hola! Soy Astro, tu consultor Atomy. Estoy aquí para ayudarte a conocer más sobre nuestros productos y oportunidades de negocio. ¿En qué puedo ayudarte hoy? 😊',
      'Atomy ofrece CALIDAD ABSOLUTA con biotecnología coreana, PRECIO ABSOLUTO con productos premium a precios inmejorables, e INGRESO RESIDUAL sin compras obligatorias.',
      'Para registrarte en Atomy NECESITAS un patrocinador. Si no tienes uno, te recomiendo: Nombre: Hlopez, Código: 20669704. El registro es GRATUITO.',
      'Nuestras categorías: HIGIENE PERSONAL (Eficiencia Total), CUIDADO DE LA PIEL (Tecnología Coreana), SUPLEMENTOS (Nutrición Avanzada) y BIENESTAR DIARIO.',
      'La clave del éxito en Atomy: 1) USA los productos personalmente, 2) COMPARTÉ tu testimonio real, 3) COMIENZA con tu círculo cercano. ¡Tus puntos nunca se pierden! 🚀'
    ];
    
    return NextResponse.json({
      success: true,
      response: isFirstMessage 
        ? fallbackResponses[0] 
        : fallbackResponses[Math.floor(Math.random() * (fallbackResponses.length - 1)) + 1]
    });
  }
}
