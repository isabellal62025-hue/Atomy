'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ExperienciasSection from '@/components/ExperienciasSection';
import { 
  Users, UserCheck, Briefcase, ShoppingBag, 
  TrendingUp, Search, Eye,
  ChevronLeft, ChevronRight, Download, ExternalLink,
  MapPin, Phone, Mail, Calendar, User,
  Trash2, Edit, AlertTriangle, Star, Sparkles, Shield
} from 'lucide-react';

interface UserInfo {
  nombre: string;
  rol: string;
  dpi: string;
}

interface DashboardProps {
  user: UserInfo | null;
}

interface Record {
  id: string;
  fecha: string;
  patrocinadorNombre: string;
  patrocinadorCodigo: string;
  nombres: string;
  apellidos: string;
  dpi: string;
  nacimiento: string;
  telefono: string;
  email: string;
  direccion: string;
  pais: string;
  departamento: string;
  municipio: string;
  estadoCivil: string;
  tipoMembresia: string;
  nombreConyuge: string | null;
  dpiConyuge: string | null;
  beneficiario: boolean;
  usuario: string;
  linkDPIFrente: string | null;
  linkDPIReverso: string | null;
  tipo: string;
  estado: string;
  referidos: number;
}

interface Usuario {
  id: string;
  nombre: string;
  usuario: string;
  rol: string;
  dpi: string;
  createdAt: string;
}

export default function Dashboard({ user }: DashboardProps) {
  const [records, setRecords] = useState<Record[]>([]);
  const [allRecords, setAllRecords] = useState<Record[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    distributors: 0,
    entrepreneurs: 0,
    consumers: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchUserTerm, setSearchUserTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [detailDialog, setDetailDialog] = useState<Record | null>(null);
  const [editDialog, setEditDialog] = useState<Record | null>(null);
  const [editUserDialog, setEditUserDialog] = useState<Usuario | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'record' | 'user'; id: string; name: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const dashRes = await fetch(`/api/dashboard?role=${user?.rol}&dpi=${user?.dpi}`);
      const dashData = await dashRes.json();
      
      const exportRes = await fetch('/api/export?format=json');
      const exportData = await exportRes.json();
      
      const usuariosRes = await fetch('/api/usuarios');
      const usuariosData = await usuariosRes.json();
      
      if (dashData.success) {
        setRecords(dashData.records);
        setStats(dashData.stats);
      }
      
      if (exportData.success) {
        setAllRecords(exportData.registros);
      }

      if (usuariosData.success) {
        setUsuarios(usuariosData.usuarios);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const mergedRecords = records.map(r => {
    const fullRecord = allRecords.find(ar => ar.id === r.id);
    return fullRecord ? { ...r, ...fullRecord } : r;
  });

  const filteredRecords = mergedRecords.filter(r =>
    r.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.dpi.includes(searchTerm) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.patrocinadorNombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsuarios = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(searchUserTerm.toLowerCase()) ||
    u.usuario.toLowerCase().includes(searchUserTerm.toLowerCase()) ||
    u.dpi.includes(searchUserTerm)
  );

  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  const getTipoBadge = (tipo: string) => {
    const badges: Record<string, { bg: string; text: string; border: string }> = {
      'Distribuidor': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      'Emprendedor': { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
      'Consumidor': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' }
    };
    return badges[tipo] || { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30' };
  };

  const getEstadoBadge = (estado: string) => {
    const badges: Record<string, { bg: string; text: string; border: string }> = {
      'activo': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
      'pendiente': { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
      'inactivo': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' }
    };
    return badges[estado] || { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30' };
  };

  const getRolBadge = (rol: string) => {
    const badges: Record<string, { bg: string; text: string; border: string }> = {
      'admin': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
      'usuario': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' }
    };
    return badges[rol] || { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30' };
  };

  const exportToCSV = () => {
    window.open('/api/export?format=csv', '_blank');
  };

  const handleDeleteRecord = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/registros?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setRecords(prev => prev.filter(r => r.id !== id));
        setAllRecords(prev => prev.filter(r => r.id !== id));
        setDeleteConfirm(null);
        setDetailDialog(null);
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/usuarios?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setUsuarios(prev => prev.filter(u => u.id !== id));
        setDeleteConfirm(null);
        setEditUserDialog(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateRecord = async (formData: FormData) => {
    if (!editDialog) return;
    setSaving(true);
    try {
      const data = {
        id: editDialog.id,
        nombres: formData.get('nombres'),
        apellidos: formData.get('apellidos'),
        telefono: formData.get('telefono'),
        email: formData.get('email'),
        direccion: formData.get('direccion'),
        estado: formData.get('estado'),
      };
      
      const res = await fetch('/api/registros', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await res.json();
      if (result.success) {
        await fetchData();
        setEditDialog(null);
      }
    } catch (error) {
      console.error('Error updating record:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateUser = async (formData: FormData) => {
    if (!editUserDialog) return;
    setSaving(true);
    try {
      const data = {
        id: editUserDialog.id,
        nombre: formData.get('nombre'),
        usuario: formData.get('usuario'),
        rol: formData.get('rol'),
        password: formData.get('password') || undefined,
      };
      
      const res = await fetch('/api/usuarios', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await res.json();
      if (result.success) {
        await fetchData();
        setEditUserDialog(null);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 mb-4">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">Panel de Control</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Bienvenido,{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  {user?.nombre}
                </span>
              </h1>
              <p className="text-slate-400 mt-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                {user?.rol === 'admin' ? 'Administrador' : 'Miembro'} - Dashboard
              </p>
            </div>
            {user?.rol === 'admin' && (
              <Button 
                onClick={exportToCSV} 
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Miembros */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
              <Card className="relative bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500 group-hover:-translate-y-1 rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Total Miembros</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                        {stats.total}
                      </p>
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-500/20 to-teal-500/20 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform">
                      <Users className="w-7 h-7 text-cyan-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Distribuidores */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
              <Card className="relative bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/30 transition-all duration-500 group-hover:-translate-y-1 rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Distribuidores</p>
                      <p className="text-3xl font-bold text-blue-400">{stats.distributors}</p>
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                      <Briefcase className="w-7 h-7 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emprendedores */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
              <Card className="relative bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/30 transition-all duration-500 group-hover:-translate-y-1 rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Emprendedores</p>
                      <p className="text-3xl font-bold text-purple-400">{stats.entrepreneurs}</p>
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-7 h-7 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Consumidores */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
              <Card className="relative bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-green-500/30 transition-all duration-500 group-hover:-translate-y-1 rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Consumidores</p>
                      <p className="text-3xl font-bold text-green-400">{stats.consumers}</p>
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/20 group-hover:scale-110 transition-transform">
                      <ShoppingBag className="w-7 h-7 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tabs for Records and Users */}
          <Tabs defaultValue="registros" className="space-y-6">
            <TabsList className="bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
              <TabsTrigger 
                value="registros" 
                className="rounded-lg px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-teal-500/20 data-[state=active]:text-cyan-300 text-slate-400"
              >
                Registros
              </TabsTrigger>
              {user?.rol === 'admin' && (
                <TabsTrigger 
                  value="usuarios" 
                  className="rounded-lg px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-teal-500/20 data-[state=active]:text-cyan-300 text-slate-400"
                >
                  Usuarios
                </TabsTrigger>
              )}
              <TabsTrigger 
                value="experiencias" 
                className="rounded-lg px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-teal-500/20 data-[state=active]:text-cyan-300 text-slate-400"
              >
                Mis Experiencias
              </TabsTrigger>
            </TabsList>

            {/* Records Tab */}
            <TabsContent value="registros">
              {/* Search */}
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    placeholder="Buscar por nombre, DPI, email o patrocinador..."
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                  />
                </div>
                <p className="text-sm text-slate-400 self-center">
                  {filteredRecords.length} registros encontrados
                </p>
              </div>

              {/* Records Table */}
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 rounded-2xl overflow-hidden">
                <CardHeader className="bg-slate-800/80 border-b border-slate-700/50">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    Miembros Registrados
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-800/50 border-b border-slate-700/50">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Nombre</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">DPI</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400 hidden md:table-cell">Patrocinador</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Tipo</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Estado</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedRecords.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-center py-12 text-slate-500">
                              No se encontraron registros
                            </td>
                          </tr>
                        ) : (
                          paginatedRecords.map((record, index) => {
                            const tipoBadge = getTipoBadge(record.tipo || record.tipoMembresia);
                            const estadoBadge = getEstadoBadge(record.estado);
                            return (
                              <tr 
                                key={record.id} 
                                className={`border-b border-slate-700/30 transition-colors hover:bg-slate-700/20 ${
                                  index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-800/40'
                                }`}
                              >
                                <td className="py-3 px-4">
                                  <div>
                                    <p className="font-medium text-white">{record.nombres} {record.apellidos}</p>
                                    <p className="text-xs text-slate-500">{record.email}</p>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-slate-400 font-mono text-sm">{record.dpi}</td>
                                <td className="py-3 px-4 hidden md:table-cell">
                                  <div>
                                    <p className="text-sm text-slate-300">{record.patrocinadorNombre}</p>
                                    <p className="text-xs text-slate-500">{record.patrocinadorCodigo}</p>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <Badge className={`${tipoBadge.bg} ${tipoBadge.text} border ${tipoBadge.border}`}>
                                    {record.tipo || record.tipoMembresia}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4">
                                  <Badge className={`${estadoBadge.bg} ${estadoBadge.text} border ${estadoBadge.border}`}>
                                    {record.estado}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setDetailDialog(record)}
                                      className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                                      title="Ver detalles"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    {user?.rol === 'admin' && (
                                      <>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setEditDialog(record)}
                                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                                          title="Editar"
                                        >
                                          <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setDeleteConfirm({ type: 'record', id: record.id, name: `${record.nombres} ${record.apellidos}` })}
                                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                          title="Eliminar"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700/50">
                      <p className="text-sm text-slate-400">
                        Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredRecords.length)} de {filteredRecords.length}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="text-sm text-slate-400">
                          {currentPage} / {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="usuarios">
              {user?.rol === 'admin' && (
                <>
                  {/* Search Users */}
                  <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <Input
                        value={searchUserTerm}
                        onChange={(e) => setSearchUserTerm(e.target.value)}
                        placeholder="Buscar usuarios..."
                        className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                      />
                    </div>
                    <p className="text-sm text-slate-400 self-center">
                      {filteredUsuarios.length} usuarios
                    </p>
                  </div>

                  {/* Users Table */}
                  <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 rounded-2xl overflow-hidden">
                    <CardHeader className="bg-slate-800/80 border-b border-slate-700/50">
                      <CardTitle className="text-lg text-white flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-cyan-400" />
                        Usuarios del Sistema
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-slate-800/50 border-b border-slate-700/50">
                            <tr>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Nombre</th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Usuario</th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">DPI</th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Rol</th>
                              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredUsuarios.map((u, index) => {
                              const rolBadge = getRolBadge(u.rol);
                              return (
                                <tr 
                                  key={u.id} 
                                  className={`border-b border-slate-700/30 transition-colors hover:bg-slate-700/20 ${
                                    index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-800/40'
                                  }`}
                                >
                                  <td className="py-3 px-4 font-medium text-white">{u.nombre}</td>
                                  <td className="py-3 px-4 text-slate-400">{u.usuario}</td>
                                  <td className="py-3 px-4 text-slate-400 font-mono text-sm">{u.dpi}</td>
                                  <td className="py-3 px-4">
                                    <Badge className={`${rolBadge.bg} ${rolBadge.text} border ${rolBadge.border}`}>
                                      {u.rol === 'admin' ? 'Administrador' : 'Usuario'}
                                    </Badge>
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center gap-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setEditUserDialog(u)}
                                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                                        title="Editar"
                                      >
                                        <Edit className="w-4 h-4" />
                                      </Button>
                                      {u.usuario !== 'admin' && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setDeleteConfirm({ type: 'user', id: u.id, name: u.nombre })}
                                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                          title="Eliminar"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            {/* Experiencias Tab */}
            <TabsContent value="experiencias">
              <ExperienciasSection 
                userDpi={user?.dpi || ''} 
                isAdmin={user?.rol === 'admin'} 
              />
            </TabsContent>
          </Tabs>

          {/* Detail Dialog */}
          <Dialog open={!!detailDialog} onOpenChange={() => setDetailDialog(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] bg-slate-900 border-slate-700 text-white">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <User className="w-5 h-5 text-cyan-400" />
                  Detalles del Miembro
                </DialogTitle>
              </DialogHeader>
              {detailDialog && (
                <ScrollArea className="max-h-[70vh] pr-4">
                  <div className="space-y-6">
                    {/* Header Info */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-xl border border-cyan-500/20">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-cyan-500/20">
                        {detailDialog.nombres.charAt(0)}{detailDialog.apellidos.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {detailDialog.nombres} {detailDialog.apellidos}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`${getTipoBadge(detailDialog.tipo || detailDialog.tipoMembresia).bg} ${getTipoBadge(detailDialog.tipo || detailDialog.tipoMembresia).text} border ${getTipoBadge(detailDialog.tipo || detailDialog.tipoMembresia).border}`}>
                            {detailDialog.tipo || detailDialog.tipoMembresia}
                          </Badge>
                          <Badge className={`${getEstadoBadge(detailDialog.estado).bg} ${getEstadoBadge(detailDialog.estado).text} border ${getEstadoBadge(detailDialog.estado).border}`}>
                            {detailDialog.estado}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Patrocinador */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyan-400" />
                        Patrocinador
                      </h4>
                      <div className="grid grid-cols-2 gap-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <div>
                          <p className="text-xs text-slate-500">Nombre</p>
                          <p className="font-medium text-slate-300">{detailDialog.patrocinadorNombre}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Código</p>
                          <p className="font-medium text-slate-300">{detailDialog.patrocinadorCodigo}</p>
                        </div>
                      </div>
                    </div>

                    {/* Datos Personales */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <User className="w-4 h-4 text-cyan-400" />
                        Datos Personales
                      </h4>
                      <div className="grid grid-cols-2 gap-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <div>
                          <p className="text-xs text-slate-500">DPI</p>
                          <p className="font-medium font-mono text-slate-300">{detailDialog.dpi}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Fecha de Nacimiento</p>
                          <p className="font-medium text-slate-300">{detailDialog.nacimiento}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 flex items-center gap-1"><Phone className="w-3 h-3" /> Teléfono</p>
                          <p className="font-medium text-slate-300">{detailDialog.telefono}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 flex items-center gap-1"><Mail className="w-3 h-3" /> Email</p>
                          <p className="font-medium text-sm text-slate-300">{detailDialog.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Estado Civil</p>
                          <p className="font-medium text-slate-300">{detailDialog.estadoCivil}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Usuario</p>
                          <p className="font-medium text-slate-300">{detailDialog.usuario}</p>
                        </div>
                      </div>
                    </div>

                    {/* Ubicación */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        Ubicación
                      </h4>
                      <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 space-y-2">
                        <div>
                          <p className="text-xs text-slate-500">Dirección</p>
                          <p className="font-medium text-slate-300">{detailDialog.direccion}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <p className="text-xs text-slate-500">País</p>
                            <p className="font-medium text-slate-300">{detailDialog.pais}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Departamento</p>
                            <p className="font-medium text-slate-300">{detailDialog.departamento}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Municipio</p>
                            <p className="font-medium text-slate-300">{detailDialog.municipio}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Documentos */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-cyan-400" />
                        Documentos DPI
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {detailDialog.linkDPIFrente ? (
                          <a
                            href={detailDialog.linkDPIFrente}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-3 bg-cyan-500/10 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-colors border border-cyan-500/20"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm font-medium">DPI Frontal</span>
                          </a>
                        ) : (
                          <div className="p-3 bg-slate-800/50 rounded-lg text-slate-500 text-sm border border-slate-700/50">
                            DPI Frontal no disponible
                          </div>
                        )}
                        {detailDialog.linkDPIReverso ? (
                          <a
                            href={detailDialog.linkDPIReverso}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-3 bg-cyan-500/10 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-colors border border-cyan-500/20"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm font-medium">DPI Reverso</span>
                          </a>
                        ) : (
                          <div className="p-3 bg-slate-800/50 rounded-lg text-slate-500 text-sm border border-slate-700/50">
                            DPI Reverso no disponible
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions for admin */}
                    {user?.rol === 'admin' && (
                      <div className="flex gap-2 pt-4 border-t border-slate-700/50">
                        <Button
                          variant="outline"
                          className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                          onClick={() => { setDetailDialog(null); setEditDialog(detailDialog); }}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                          onClick={() => setDeleteConfirm({ type: 'record', id: detailDialog.id, name: `${detailDialog.nombres} ${detailDialog.apellidos}` })}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    )}

                    {/* Fecha de registro */}
                    <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-700/50">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Registrado el: {new Date(detailDialog.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </ScrollArea>
              )}
            </DialogContent>
          </Dialog>

          {/* Edit Record Dialog */}
          <Dialog open={!!editDialog} onOpenChange={() => setEditDialog(null)}>
            <DialogContent className="max-w-lg bg-slate-900 border-slate-700 text-white">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Edit className="w-5 h-5 text-cyan-400" />
                  Editar Registro
                </DialogTitle>
              </DialogHeader>
              {editDialog && (
                <form action={handleUpdateRecord} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Nombres</Label>
                      <Input 
                        id="nombres" 
                        name="nombres" 
                        defaultValue={editDialog.nombres} 
                        className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Apellidos</Label>
                      <Input 
                        id="apellidos" 
                        name="apellidos" 
                        defaultValue={editDialog.apellidos} 
                        className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Teléfono</Label>
                    <Input 
                      id="telefono" 
                      name="telefono" 
                      defaultValue={editDialog.telefono} 
                      className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      defaultValue={editDialog.email} 
                      className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Dirección</Label>
                    <Input 
                      id="direccion" 
                      name="direccion" 
                      defaultValue={editDialog.direccion} 
                      className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Estado</Label>
                    <select 
                      id="estado" 
                      name="estado" 
                      defaultValue={editDialog.estado} 
                      className="w-full border border-slate-700 rounded-md px-3 py-2 bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="activo">Activo</option>
                      <option value="pendiente">Pendiente</option>
                      <option value="inactivo">Inactivo</option>
                    </select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white" 
                      onClick={() => setEditDialog(null)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600" 
                      disabled={saving}
                    >
                      {saving ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>

          {/* Edit User Dialog */}
          <Dialog open={!!editUserDialog} onOpenChange={() => setEditUserDialog(null)}>
            <DialogContent className="max-w-lg bg-slate-900 border-slate-700 text-white">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Edit className="w-5 h-5 text-cyan-400" />
                  Editar Usuario
                </DialogTitle>
              </DialogHeader>
              {editUserDialog && (
                <form action={handleUpdateUser} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Nombre</Label>
                    <Input 
                      id="nombre" 
                      name="nombre" 
                      defaultValue={editUserDialog.nombre} 
                      className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Usuario</Label>
                    <Input 
                      id="usuario" 
                      name="usuario" 
                      defaultValue={editUserDialog.usuario} 
                      className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Rol</Label>
                    <select 
                      id="rol" 
                      name="rol" 
                      defaultValue={editUserDialog.rol} 
                      className="w-full border border-slate-700 rounded-md px-3 py-2 bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="admin">Administrador</option>
                      <option value="usuario">Usuario</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Nueva Contraseña (dejar vacío para no cambiar)</Label>
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white" 
                      onClick={() => setEditUserDialog(null)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600" 
                      disabled={saving}
                    >
                      {saving ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
            <DialogContent className="max-w-md bg-slate-900 border-slate-700 text-white">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  Confirmar Eliminación
                </DialogTitle>
              </DialogHeader>
              {deleteConfirm && (
                <div className="space-y-4">
                  <p className="text-slate-400">
                    ¿Estás seguro de que deseas eliminar a <span className="text-white font-medium">{deleteConfirm.name}</span>? 
                    Esta acción no se puede deshacer.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white" 
                      onClick={() => setDeleteConfirm(null)}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30" 
                      onClick={() => {
                        if (deleteConfirm.type === 'record') {
                          handleDeleteRecord(deleteConfirm.id);
                        } else {
                          handleDeleteUser(deleteConfirm.id);
                        }
                      }}
                      disabled={saving}
                    >
                      {saving ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
