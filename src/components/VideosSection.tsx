'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Play, X, Video, User, Clock, Eye, Maximize2 } from 'lucide-react';

interface VideoItem {
  id: string;
  tipo: string;
  titulo: string;
  badge: string;
  url: string;
  descripcion: string | null;
}

// Función para convertir URL de Drive a URL de preview embebible
function getEmbedUrl(url: string): string {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
}

// Función para obtener thumbnail de Drive
function getThumbnailUrl(url: string): string {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
  }
  return url;
}

export default function VideosSection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos');
        const data = await res.json();
        if (data.success) {
          setVideos(data.videos);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const institucionales = videos.filter(v => v.tipo === 'institucional');
  const testimonios = videos.filter(v => v.tipo === 'testimonio');

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800" id="videos">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-slate-700 rounded-lg w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-700 rounded-lg w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden" id="videos">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-6">
            <Video className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">Centro Multimedia</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Conoce{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Atomy
            </span>
          </h2>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Explora nuestros videos institucionales y testimonios reales de éxito
          </p>
        </div>

        {/* Videos Institucionales */}
        {institucionales.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Videos Institucionales</h3>
                <p className="text-slate-400 text-sm">La visión y misión de Atomy</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {institucionales.map((video, index) => (
                <div
                  key={video.id}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                  
                  {/* Card */}
                  <div className="relative bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500 group-hover:-translate-y-2">
                    {/* Video thumbnail */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={getThumbnailUrl(video.url)}
                        alt={video.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      
                      {/* Play button overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex items-center justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                          <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shadow-2xl shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                      </div>

                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-slate-900/80 text-cyan-300 border border-cyan-500/30 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                          {video.badge}
                        </Badge>
                      </div>

                      {/* Duration indicator */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/50">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-300">HD</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {video.titulo}
                      </h4>
                      {video.descripcion && (
                        <p className="text-sm text-slate-400 line-clamp-2">{video.descripcion}</p>
                      )}
                      
                      <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <Maximize2 className="w-4 h-4" />
                        <span>Ver video completo</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonios */}
        {testimonios.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Testimonios de Éxito</h3>
                <p className="text-slate-400 text-sm">Historias reales de transformación</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonios.map((video, index) => (
                <div
                  key={video.id}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                  
                  {/* Card */}
                  <div className="relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-amber-500/30 transition-all duration-500 group-hover:-translate-y-2">
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={getThumbnailUrl(video.url)}
                        alt={video.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
                      
                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-5 h-5 text-amber-600 ml-0.5" />
                        </div>
                      </div>

                      {/* Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-xs font-medium">
                          {video.badge}
                        </Badge>
                      </div>

                      {/* Type icon */}
                      <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-slate-900/80 flex items-center justify-center backdrop-blur-sm border border-slate-700/50">
                        {video.badge === 'Personal' ? (
                          <User className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <Eye className="w-3.5 h-3.5 text-amber-400" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 text-center">
                      <h4 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                        {video.titulo}
                      </h4>
                      <p className="text-xs text-amber-500 mt-1 font-medium">{video.badge}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">{selectedVideo.titulo}</h3>
                  <p className="text-slate-400 text-sm">{selectedVideo.badge}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors border border-slate-700"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {/* Video player */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-700">
              <iframe
                src={getEmbedUrl(selectedVideo.url)}
                title={selectedVideo.titulo}
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Description */}
            {selectedVideo.descripcion && (
              <p className="text-slate-400 mt-4 text-center text-sm max-w-2xl mx-auto">
                {selectedVideo.descripcion}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
