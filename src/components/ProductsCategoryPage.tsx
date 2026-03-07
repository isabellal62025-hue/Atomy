'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Sparkles, Heart, HeartPulse, Home, ExternalLink,
  Check, Star, SparkleIcon, ArrowRight, Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface Producto {
  id: string;
  categoria: string;
  badge: string;
  imagen: string;
  enlace: string | null;
  orden: number;
}

interface ProductsCategoryPageProps {
  categoryId: string;
  setCurrentView: (view: string) => void;
}

// Configuración de categorías
const categoriasConfig: Record<string, {
  nombre: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  descripcion: string;
}> = {
  'belleza': {
    nombre: 'Belleza',
    icon: SparkleIcon,
    color: 'from-pink-500 to-rose-500',
    bgGradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    descripcion: 'Descubre nuestra línea de belleza premium con tecnología coreana'
  },
  'cuidado-personal': {
    nombre: 'Cuidado Personal',
    icon: Heart,
    color: 'from-cyan-500 to-teal-500',
    bgGradient: 'from-cyan-500/20 via-teal-500/10 to-transparent',
    descripcion: 'Productos de higiene personal de la más alta calidad'
  },
  'salud': {
    nombre: 'Salud',
    icon: HeartPulse,
    color: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
    descripcion: 'Suplementos nutricionales para tu bienestar diario'
  },
  'hogar': {
    nombre: 'Hogar',
    icon: Home,
    color: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    descripcion: 'Productos para el hogar y bienestar familiar'
  }
};

// Función para obtener imagen placeholder
function getProductoImagen(index: number, categoria: string): string {
  const colores: Record<string, string[]> = {
    'belleza': ['FFB6C1', 'FFC0CB', 'FF69B4', 'DB7093', 'FF1493', 'C71585'],
    'cuidado-personal': ['00CED1', '20B2AA', '48D1CC', '40E0D0', '00FFFF', '7FFFD4'],
    'salud': ['32CD32', '90EE90', '98FB98', '00FA9A', '00FF7F', '7CFC00'],
    'hogar': ['FFA500', 'FFD700', 'FF8C00', 'FF7F50', 'FF6347', 'FF4500']
  };
  
  const colorSet = colores[categoria] || colores['belleza'];
  const color = colorSet[index % colorSet.length];
  
  return `https://via.placeholder.com/400x300/${color}/FFFFFF?text=Producto+${index + 1}`;
}

export default function ProductsCategoryPage({ categoryId, setCurrentView }: ProductsCategoryPageProps) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const categoria = categoriasConfig[categoryId] || categoriasConfig['belleza'];

  useEffect(() => {
    async function fetchProductos() {
      setLoading(true);
      try {
        const response = await fetch(`/api/productos?categoria=${categoryId}`);
        const data = await response.json();
        if (data.success) {
          setProductos(data.productos);
        }
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProductos();
  }, [categoryId]);

  const IconComponent = categoria.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 right-0 h-96 bg-gradient-to-b ${categoria.bgGradient}`}></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setCurrentView('landing')}
          className="mb-6 text-slate-400 hover:text-white hover:bg-slate-800/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${categoria.color} mb-6 shadow-lg`}>
            <IconComponent className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Productos de{' '}
            <span className={`bg-gradient-to-r ${categoria.color} bg-clip-text text-transparent`}>
              {categoria.nombre}
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {categoria.descripcion}
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50">
              <Check className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-slate-300">100% Original</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-sm text-slate-300">Calidad Premium</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-300">Tecnología Coreana</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
            <span className="ml-2 text-slate-400">Cargando productos...</span>
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {productos.map((producto, index) => (
              <a
                key={producto.id}
                href={producto.enlace || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${categoria.color} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500`}></div>
                
                {/* Card */}
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all duration-500 group-hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-700">
                    <img
                      src={producto.imagen || getProductoImagen(index, categoryId)}
                      alt={producto.badge}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getProductoImagen(index, categoryId);
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className={`bg-gradient-to-r ${categoria.color} text-white border-0 px-3 py-1 text-xs font-medium`}>
                        {producto.badge}
                      </Badge>
                    </div>

                    {/* External link indicator */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-slate-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {producto.badge}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium bg-gradient-to-r ${categoria.color} bg-clip-text text-transparent`}>
                        Ver producto
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${categoria.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && productos.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-800 flex items-center justify-center">
              <IconComponent className="w-10 h-10 text-slate-600" />
            </div>
            <p className="text-slate-400">No hay productos disponibles en esta categoría.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-slate-800/80 to-slate-800/50 border border-slate-700/50">
            <h3 className="text-lg font-bold text-white mb-2">
              ¿Quieres precios especiales?
            </h3>
            <p className="text-slate-400 mb-4 text-sm">
              Regístrate gratis y accede a descuentos exclusivos para miembros.
            </p>
            <Button
              onClick={() => setCurrentView('registro')}
              size="sm"
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Registrarme Gratis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
