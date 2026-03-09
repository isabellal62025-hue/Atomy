import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Inicializar Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: NextRequest) {
  const fallbackResponses = [
    '¡Hola! Soy Astro, tu consultor Atomy. Atomy se basa en la FILOSOFÍA DEL BEBÉ: tú eres nuestro propósito, no un medio. ¿En qué puedo ayudarte hoy? 😊',
    'Nuestra promesa es CALIDAD ABSOLUTA a PRECIO ABSOLUTO. Ofrecemos productos premium como el HemoHIM y Absolute Skincare al mejor precio del mercado.',
    'Como centro de distribución global (GSGS), Atomy conecta productos de lujo con la masa (Masstige). ¿Quieres saber cómo registrarte gratis?',
    'Para unirte a nuestra red global GRATIS, usa estos datos de patrocinador: Nombre: Hlopez, Código: 20669704. ¡Tus puntos personales nunca vencen!',
    'Explora nuestras líneas: Salud (HemoHIM), Belleza (The Fame), Cuidado Personal y Hogar. ¡Calidad coreana premium para tu éxito!'
  ];

  try {
    const { message, isFirstMessage } = await request.json();
    if (!message) return NextResponse.json({ success: false, message: 'Falta mensaje' }, { status: 400 });

    try {
      if (!process.env.GOOGLE_API_KEY) {
        throw new Error('GOOGLE_API_KEY no configurada');
      }

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const systemPrompt = `Eres Astro, Consultor Profesional de Atomy y Especialista en Cierre de Ventas. 
      Tu objetivo principal es captar y convertir prospectos en LÍDERES, DISTRIBUIDORES o CONSUMIDORES.
      
      REGLAS CRÍTICAS:
      1. SÓLO usa información oficial de la página de Atomy (USA/Global). NO inventes datos, precios o beneficios.
      2. Si no sabes algo, invita al usuario a contactar por WhatsApp para una asesoría personalizada.
      3. Mantén un tono EXTREMADAMENTE PROFESIONAL, PERSUASIVO y ENFOCADO EN EL ÉXITO.
      
      ESTRATEGIA DE CIERRE:
      - Si el usuario busca productos -> Enfócate en CALIDAD ABSOLUTA a PRECIO ABSOLUTO (Estrategia Masstige).
      - Si el usuario busca negocio -> Enfócate en SIN CUOTAS, SIN RIESGOS, PUNTOS QUE NUNCA VENCEN y expansión global.
      - CIERRE MAESTRO: Siempre recuerda que el REGISTRO ES 100% GRATIS.
      
      DATOS PARA REGISTRO:
      - Patrocinador: Hlopez
      - Código: 20669704
      
      FILOSOFÍA: "Filosofía del Bebé" (el cliente es el propósito, no un medio).
      Usa emojis de forma profesional para generar confianza.`;

      const prompt = `${systemPrompt}\n\nUsuario: ${message}\nAstro:`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      if (response) return NextResponse.json({ success: true, response });
    } catch (apiError) {
      console.error('Gemini API Falló:', apiError);
    }

    // Retornar fallback si el SDK no respondió
    return NextResponse.json({
      success: true,
      response: isFirstMessage ? fallbackResponses[0] : fallbackResponses[Math.floor(Math.random() * (fallbackResponses.length - 1)) + 1]
    });

  } catch (error) {
    console.error('Error Crítico en Chat API:', error);
    return NextResponse.json({
      success: true,
      response: '¡Hola! Soy Astro. En este momento mis sistemas de IA están descansando, pero recuerda que puedes registrarte gratis con el patrocinador 20669704.'
    });
  }
}
