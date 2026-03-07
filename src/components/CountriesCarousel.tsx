'use client';

import { Globe, MapPin, Zap } from 'lucide-react';

// Países ya aperturados por Atomy (actualizado marzo 2026)
const paisesAperturados = [
  // Asia
  { nombre: 'Corea del Sur', codigo: 'kr' },
  { nombre: 'Japón', codigo: 'jp' },
  { nombre: 'Taiwán', codigo: 'tw' },
  { nombre: 'Singapur', codigo: 'sg' },
  { nombre: 'Camboya', codigo: 'kh' },
  { nombre: 'Filipinas', codigo: 'ph' },
  { nombre: 'Malasia', codigo: 'my' },
  { nombre: 'Tailandia', codigo: 'th' },
  { nombre: 'Vietnam', codigo: 'vn' },
  { nombre: 'Indonesia', codigo: 'id' },
  { nombre: 'China', codigo: 'cn' },
  { nombre: 'India', codigo: 'in' },
  { nombre: 'Hong Kong', codigo: 'hk' },
  { nombre: 'Kazajistán', codigo: 'kz' },
  { nombre: 'Kirguistán', codigo: 'kg' },
  { nombre: 'Mongolia', codigo: 'mn' },
  { nombre: 'Uzbekistán', codigo: 'uz' },
  // América
  { nombre: 'Estados Unidos', codigo: 'us' },
  { nombre: 'Canadá', codigo: 'ca' },
  { nombre: 'México', codigo: 'mx' },
  { nombre: 'Colombia', codigo: 'co' },
  { nombre: 'Brasil', codigo: 'br' },
  // Oceanía
  { nombre: 'Australia', codigo: 'au' },
  { nombre: 'Nueva Zelanda', codigo: 'nz' },
  // Europa
  { nombre: 'Reino Unido', codigo: 'gb' },
  { nombre: 'Turquía', codigo: 'tr' },
  { nombre: 'Alemania', codigo: 'de' },
];

// Países en pre-apertura 2026
const paisesPreApertura = [
  { nombre: 'Perú', codigo: 'pe' },
  { nombre: 'Chile', codigo: 'cl' },
  { nombre: 'Panamá', codigo: 'pa' },
  { nombre: 'Guatemala', codigo: 'gt' },
  { nombre: 'Rep. Dominicana', codigo: 'do' },
  { nombre: 'Azerbaiyán', codigo: 'az' },
  { nombre: 'Tayikistán', codigo: 'tj' },
  { nombre: 'EAU', codigo: 'ae' },
  { nombre: 'Marruecos', codigo: 'ma' },
  { nombre: 'Brunéi', codigo: 'bn' },
];

// Países en registro global
const paisesRegistroGlobal = [
  { nombre: 'Argentina', codigo: 'ar' },
  { nombre: 'Honduras', codigo: 'hn' },
];

// Componente de bandera
function Bandera({ codigo, nombre }: { codigo: string; nombre: string }) {
  return (
    <img
      src={`https://flagcdn.com/w80/${codigo}.png`}
      alt={`Bandera de ${nombre}`}
      className="w-10 h-7 object-cover rounded shadow-sm"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}

export default function CountriesCarousel() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 mb-6">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">Expansión Mundial</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Presencia{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Global
            </span>
          </h2>
          
          <div className="flex items-start justify-center gap-2 max-w-2xl mx-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse flex-shrink-0 mt-2"></span>
            <span className="text-slate-300 text-lg">
              A marzo 2026, Atomy ha consolidado su presencia en más de 52 países y 27 sedes a nivel mundial
            </span>
          </div>
        </div>

        {/* Carrusel de países aperturados */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <h3 className="text-lg font-semibold text-white">
              Países Aperturados
            </h3>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
            
            <div className="flex animate-scroll">
              {[...paisesAperturados, ...paisesAperturados].map((pais, index) => (
                <div
                  key={`${pais.codigo}-${index}`}
                  className="flex-shrink-0 mx-2 flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <Bandera codigo={pais.codigo} nombre={pais.nombre} />
                  <span className="text-xs font-medium text-slate-300 whitespace-nowrap">{pais.nombre}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carrusel de países en pre-apertura */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Próximas Aperturas 2026</h3>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
            
            <div className="flex animate-scroll-reverse">
              {[...paisesPreApertura, ...paisesPreApertura].map((pais, index) => (
                <div
                  key={`${pais.codigo}-${index}`}
                  className="flex-shrink-0 mx-2 flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-800/50 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="opacity-80">
                    <Bandera codigo={pais.codigo} nombre={pais.nombre} />
                  </div>
                  <span className="text-xs font-medium text-slate-300 whitespace-nowrap">{pais.nombre}</span>
                  <span className="text-[9px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full">2026</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Países en registro global */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-4 h-4 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Registro Global Disponible</h3>
          </div>
          
          <div className="flex justify-center gap-4">
            {paisesRegistroGlobal.map((pais) => (
              <div
                key={pais.codigo}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-800/50 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
              >
                <Bandera codigo={pais.codigo} nombre={pais.nombre} />
                <span className="text-sm font-medium text-slate-300">{pais.nombre}</span>
                <span className="text-[9px] text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded-full">Registro Global</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
