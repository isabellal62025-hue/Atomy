'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Users, TrendingUp, Shield, Crown, Gift, Star } from 'lucide-react';

interface HeroSectionProps {
  setCurrentView: (view: string) => void;
}

// Particle class for the interactive background
class Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  density: number;
  angle: number;
  speed: number;
  driftX: number;
  driftY: number;
  vx: number;
  vy: number;

  constructor(x: number, y: number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.size = size;
    this.color = color;
    this.density = Math.random() * 30 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 0.5 + 0.2;
    this.driftX = Math.random() * 2 - 1;
    this.driftY = Math.random() * 2 - 1;
    this.vx = 0;
    this.vy = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  update(mouse: { x: number; y: number; radius: number }, time: number) {
    // Mouse attraction - particles follow cursor strongly
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let maxDistance = mouse.radius;
    
    // Strong attraction force
    if (distance < maxDistance && distance > 0) {
      let force = (maxDistance - distance) / maxDistance;
      force = force * force;
      let directionX = dx / distance;
      let directionY = dy / distance;
      
      this.vx += directionX * force * 3;
      this.vy += directionY * force * 3;
    }
    
    // Constant floating movement
    const floatSpeed = 0.02;
    this.vx += Math.sin(time * floatSpeed + this.baseX * 0.01) * 0.05;
    this.vy += Math.cos(time * floatSpeed + this.baseY * 0.01) * 0.05;
    
    this.vx += this.driftX * 0.01;
    this.vy += this.driftY * 0.01;
    
    this.vx *= 0.95;
    this.vy *= 0.95;
    
    this.x += this.vx;
    this.y += this.vy;
    
    this.baseX += this.driftX * 0.1;
    this.baseY += this.driftY * 0.1;
    
    // Wrap around screen
    const margin = 50;
    if (this.x < -margin) { this.x = window.innerWidth + margin; this.baseX = this.x; }
    if (this.x > window.innerWidth + margin) { this.x = -margin; this.baseX = this.x; }
    if (this.y < -margin) { this.y = window.innerHeight + margin; this.baseY = this.y; }
    if (this.y > window.innerHeight + margin) { this.y = -margin; this.baseY = this.y; }
  }
}

export default function HeroSection({ setCurrentView }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 300 });
  const animationRef = useRef<number>();
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      const colors = ['#c9a962', '#e0c97d', '#ffffff', '#a88b3d', '#d4af37'];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000);
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 4 + 2;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particlesRef.current.push(new Particle(x, y, size, color));
      }
    };

    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      timeRef.current = timestamp;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].draw(ctx);
        particlesRef.current[i].update(mouseRef.current, timestamp);
      }
      
      connectParticles(ctx);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const connectParticles = (ctx: CanvasRenderingContext2D) => {
      for (let a = 0; a < particlesRef.current.length; a++) {
        for (let b = a; b < particlesRef.current.length; b++) {
          let dx = particlesRef.current[a].x - particlesRef.current[b].x;
          let dy = particlesRef.current[a].y - particlesRef.current[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.strokeStyle = `rgba(201, 169, 98, ${0.2 - distance / 600})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[a].x, particlesRef.current[a].y);
            ctx.lineTo(particlesRef.current[b].x, particlesRef.current[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    setCanvasSize();
    animate(0);

    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f1f35] to-[#0a1628]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c9a962]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c9a962]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#c9a962]/3 rounded-full blur-3xl" />
      </div>
      
      {/* Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 min-h-screen flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Heading */}
          <div className="relative">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-tight tracking-tight">
              Transforma tu vida
              <br />
              <span className="bg-gradient-to-r from-[#c9a962] via-[#e0c97d] to-[#c9a962] bg-clip-text text-transparent animate-gradient-x">
                con Atomy
              </span>
            </h1>
            <div className="absolute -inset-4 bg-[#c9a962]/10 blur-3xl -z-10 rounded-full" />
          </div>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Únete a la red de consumidores más grande del mundo. Productos orgánicos de necesidades diarias, 
            con tecnología coreana y un sistema que{' '}
            <span className="text-[#c9a962] font-medium">democratiza el éxito</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button 
              onClick={() => setCurrentView('registro')}
              size="lg"
              className="group relative bg-gradient-to-r from-[#c9a962] to-[#a88b3d] hover:from-[#e0c97d] hover:to-[#c9a962] text-[#0a1628] px-10 py-7 text-lg font-semibold rounded-full shadow-2xl shadow-[#c9a962]/30 hover:shadow-[#c9a962]/50 transition-all duration-500 hover:scale-105"
            >
              <span className="relative z-10">Registrarme Gratis</span>
              <ArrowRight className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="px-10 py-7 text-lg rounded-full border-2 border-[#c9a962] text-[#c9a962] bg-transparent hover:bg-[#c9a962] hover:text-[#0a1628] backdrop-blur-sm transition-all"
              onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Videos
            </Button>
          </div>

          {/* Membresía Gratuita - Animated Banner */}
          <div className="pt-16 w-full max-w-2xl mx-auto">
            <div className="relative group">
              {/* Animated glow background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#c9a962]/40 via-[#e0c97d]/30 to-[#c9a962]/40 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 animate-pulse-slow"></div>
              
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-[#0f1f35] to-[#0a1628] rounded-2xl p-6 border border-[#c9a962]/20 shadow-2xl overflow-hidden">
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-[#c9a962]/10 to-transparent"></div>
                
                {/* Floating stars animation */}
                <div className="absolute top-2 left-4 animate-float-delayed-1">
                  <Star className="w-4 h-4 text-[#c9a962] fill-[#c9a962]" />
                </div>
                <div className="absolute top-4 right-8 animate-float-delayed-2">
                  <Star className="w-3 h-3 text-[#c9a962] fill-[#c9a962]" />
                </div>
                <div className="absolute bottom-4 left-8 animate-float-delayed-3">
                  <Star className="w-3 h-3 text-[#c9a962] fill-[#c9a962]" />
                </div>
                <div className="absolute bottom-2 right-4 animate-float">
                  <Star className="w-4 h-4 text-[#c9a962] fill-[#c9a962]" />
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* Animated icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#c9a962] to-[#e0c97d] rounded-full blur-lg animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-[#c9a962] to-[#a88b3d] p-3 rounded-full animate-bounce-slow">
                      <Gift className="w-8 h-8 text-[#0a1628]" />
                    </div>
                  </div>
                  
                  {/* Text with gradient animation */}
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold">
                      <span className="bg-gradient-to-r from-[#c9a962] via-[#e0c97d] to-[#c9a962] bg-clip-text text-transparent animate-gradient-x">
                        Membresía Gratuita
                      </span>
                    </h3>
                    <p className="text-white/60 mt-1 flex items-center justify-center sm:justify-start gap-2">
                      <Crown className="w-4 h-4 text-[#c9a962]" />
                      Sin costos ocultos • Acceso completo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#c9a962]/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-[#c9a962]/60 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Features strip */}
      <div className="relative z-20 border-t border-[#c9a962]/10 bg-[#0a1628]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-2xl bg-[#c9a962]/10 border border-[#c9a962]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#c9a962]/20 transition-all duration-300">
                <Shield className="w-7 h-7 text-[#c9a962]" />
              </div>
              <span className="text-sm font-medium text-white/80">Registro Gratuito</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-2xl bg-[#c9a962]/10 border border-[#c9a962]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#c9a962]/20 transition-all duration-300">
                <Sparkles className="w-7 h-7 text-[#c9a962]" />
              </div>
              <span className="text-sm font-medium text-white/80">Productos Premium</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-2xl bg-[#c9a962]/10 border border-[#c9a962]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#c9a962]/20 transition-all duration-300">
                <TrendingUp className="w-7 h-7 text-[#c9a962]" />
              </div>
              <span className="text-sm font-medium text-white/80">Ingresos Ilimitados</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-2xl bg-[#c9a962]/10 border border-[#c9a962]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#c9a962]/20 transition-all duration-300">
                <Users className="w-7 h-7 text-[#c9a962]" />
              </div>
              <span className="text-sm font-medium text-white/80">Comunidad Global</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
