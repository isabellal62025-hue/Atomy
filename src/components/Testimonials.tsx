'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Experiencia {
  id: string;
  titulo: string;
  experiencia: string;
  producto: string | null;
  calificacion: number;
  usuarioId: string;
  nombreUsuario: string;
  destacado: boolean;
}

// Testimonios por defecto si no hay experiencias en la base de datos
const defaultTestimonials = [
  {
    name: 'María G.',
    location: 'Guatemala',
    rating: 5,
    text: 'Atomy cambió mi vida. Empecé usando los productos y el resultado ha sido increíble. La calidad es excepcional.',
    product: 'Cuidado Facial'
  },
  {
    name: 'Carlos R.',
    location: 'México',
    rating: 5,
    text: 'El plan de compensación es el más justo que he visto. Sin compras obligatorias y mis puntos nunca caducan.',
    product: 'Suplementos'
  },
  {
    name: 'Ana M.',
    location: 'Colombia',
    rating: 5,
    text: 'Los productos de higiene personal son increíbles. Toda mi familia los usa y hemos notado la diferencia.',
    product: 'Higiene Personal'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener experiencias aprobadas y destacadas
    fetch('/api/experiencias?aprobados=true')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.experiencias && data.experiencias.length > 0) {
          // Filtrar solo las destacadas para el carrusel principal
          const destacadas = data.experiencias.filter((exp: Experiencia) => exp.destacado);
          if (destacadas.length > 0) {
            const formatted = destacadas.map((exp: Experiencia) => ({
              name: exp.nombreUsuario || 'Usuario Atomy',
              location: 'Miembro Atomy',
              rating: exp.calificacion,
              text: exp.experiencia,
              product: exp.producto || 'Productos Atomy'
            }));
            setTestimonials(formatted);
          }
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 text-sm font-medium mb-4">
            Experiencias
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Lo que dicen nuestros{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Miembros
            </span>
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-3xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>

          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 relative">
            <Quote className="absolute top-4 left-4 w-8 h-8 text-cyan-100" />

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-4 justify-center">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-lg text-slate-700 text-center mb-6 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Author */}
              <div className="text-center">
                <p className="font-semibold text-slate-900">{testimonials[currentIndex].name}</p>
                <p className="text-slate-500 text-sm">{testimonials[currentIndex].location}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-medium">
                  {testimonials[currentIndex].product}
                </span>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-cyan-500 w-4' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
