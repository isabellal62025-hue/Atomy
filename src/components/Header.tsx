'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Menu, X, User, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  user: { nombre: string; rol: string; dpi: string } | null;
  setUser: (user: { nombre: string; rol: string; dpi: string } | null) => void;
}

export default function Header({ currentView, setCurrentView, user, setUser }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        setLoginOpen(false);
        setLoginData({ username: '', password: '' });
        setCurrentView('dashboard');
      } else {
        setError(data.message);
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const navItems = [
    { id: 'landing', label: 'Inicio' },
    { id: 'experiencias', label: 'Experiencias' },
    { id: 'registro', label: 'Registro' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                ATOMY
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {user ? (
                <>
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      currentView === 'dashboard'
                        ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </button>
                  <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">{user.nombre}</p>
                        <p className="text-xs text-slate-400 capitalize">{user.rol}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleLogout}
                      className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <Button 
                  onClick={() => setLoginOpen(true)} 
                  className="ml-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
                >
                  <User className="w-4 h-4 mr-2" />
                  Iniciar Sesión
                </Button>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700/50 bg-slate-900/98 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentView(item.id); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              {user ? (
                <>
                  <button
                    onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }}
                    className="block w-full text-left px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="block w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Button 
                  onClick={() => { setLoginOpen(true); setMobileMenuOpen(false); }} 
                  className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-teal-500"
                >
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Iniciar Sesión
              </span>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-300">Usuario o DPI</Label>
              <Input
                id="username"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                placeholder="Ingresa tu usuario o DPI"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="••••••••"
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-400 text-center bg-red-500/10 py-2 rounded-lg">{error}</p>
            )}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600" 
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </Button>
            <p className="text-xs text-center text-slate-500">
              ¿No tienes cuenta?{' '}
              <button 
                type="button" 
                onClick={() => { setLoginOpen(false); setCurrentView('registro'); }} 
                className="text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                Regístrate aquí
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
