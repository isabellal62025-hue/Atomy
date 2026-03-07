'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Star, Plus, MessageSquare, Trash2, Edit, 
  Check, X, Sparkles, ThumbsUp, AlertTriangle
} from 'lucide-react';

interface Experiencia {
  id: string;
  usuarioId: string;
  nombreUsuario: string;
  titulo: string;
  experiencia: string;
  producto: string | null;
  calificacion: number;
  aprobado: boolean;
  destacado: boolean;
  createdAt: string;
}

interface ExperienciasSectionProps {
  userDpi: string;
  isAdmin: boolean;
}

export default function ExperienciasSection({ userDpi, isAdmin }: ExperienciasSectionProps) {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editExperiencia, setEditExperiencia] = useState<Experiencia | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Experiencia | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    experiencia: '',
    producto: '',
    calificacion: 5
  });

  const fetchExperiencias = async () => {
    try {
      // Si es admin, obtener todas las experiencias; si no, solo las del usuario
      const url = isAdmin 
        ? '/api/experiencias' 
        : `/api/experiencias?usuarioId=${userDpi}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setExperiencias(data.experiencias);
      }
    } catch (error) {
      console.error('Error fetching experiencias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDpi) {
      fetchExperiencias();
    }
  }, [userDpi]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo || !formData.experiencia) return;

    setSaving(true);
    try {
      const res = await fetch('/api/experiencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId: userDpi,
          ...formData
        })
      });

      const data = await res.json();
      if (data.success) {
        setFormData({ titulo: '', experiencia: '', producto: '', calificacion: 5 });
        setShowForm(false);
        fetchExperiencias();
      }
    } catch (error) {
      console.error('Error saving experiencia:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editExperiencia) return;

    setSaving(true);
    try {
      const res = await fetch('/api/experiencias', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editExperiencia.id,
          titulo: formData.titulo,
          experiencia: formData.experiencia,
          producto: formData.producto || null,
          calificacion: formData.calificacion
        })
      });

      const data = await res.json();
      if (data.success) {
        setEditExperiencia(null);
        setFormData({ titulo: '', experiencia: '', producto: '', calificacion: 5 });
        fetchExperiencias();
      }
    } catch (error) {
      console.error('Error updating experiencia:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/experiencias?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setExperiencias(prev => prev.filter(e => e.id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting experiencia:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleAprobado = async (id: string, aprobado: boolean) => {
    try {
      await fetch('/api/experiencias', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, aprobado: !aprobado })
      });
      fetchExperiencias();
    } catch (error) {
      console.error('Error toggling aprobado:', error);
    }
  };

  const handleToggleDestacado = async (id: string, destacado: boolean) => {
    try {
      await fetch('/api/experiencias', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, destacado: !destacado })
      });
      fetchExperiencias();
    } catch (error) {
      console.error('Error toggling destacado:', error);
    }
  };

  const openEdit = (exp: Experiencia) => {
    setEditExperiencia(exp);
    setFormData({
      titulo: exp.titulo,
      experiencia: exp.experiencia,
      producto: exp.producto || '',
      calificacion: exp.calificacion
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-500" />
            {isAdmin ? 'Todas las Experiencias' : 'Mis Experiencias'}
          </h3>
          <p className="text-sm text-slate-500">
            {isAdmin 
              ? 'Revisa y aprueba las experiencias de los miembros' 
              : 'Comparte tu experiencia con Atomy'}
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-cyan-500 to-teal-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Experiencia
        </Button>
      </div>

      {/* List of Experiencias */}
      {experiencias.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="py-12 text-center">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">No has compartido ninguna experiencia aún</p>
            <Button onClick={() => setShowForm(true)} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Agregar mi primera experiencia
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {experiencias.map((exp) => (
            <Card key={exp.id} className={`overflow-hidden ${exp.destacado ? 'ring-2 ring-amber-400' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-slate-800">{exp.titulo}</h4>
                      {exp.destacado && (
                        <Badge className="bg-amber-100 text-amber-700 border-0">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Destacado
                        </Badge>
                      )}
                      {exp.aprobado ? (
                        <Badge className="bg-green-100 text-green-700 border-0">
                          <Check className="w-3 h-3 mr-1" />
                          Aprobado
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-700 border-0">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Pendiente
                        </Badge>
                      )}
                    </div>
                    
                    {/* Nombre del usuario (solo visible para admin si no es su experiencia) */}
                    {isAdmin && exp.nombreUsuario && (
                      <p className="text-xs text-slate-500 mb-1">
                        Por: {exp.nombreUsuario}
                      </p>
                    )}
                    
                    {/* Stars */}
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= exp.calificacion ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-slate-600 text-sm leading-relaxed">{exp.experiencia}</p>
                    
                    {exp.producto && (
                      <p className="text-xs text-cyan-600 mt-2">
                        Producto: {exp.producto}
                      </p>
                    )}
                    
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(exp.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(exp)}
                      className="text-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteConfirm(exp)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Admin Actions */}
                {isAdmin && (
                  <div className="flex gap-2 pt-4 mt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleAprobado(exp.id, exp.aprobado)}
                      className={exp.aprobado ? 'text-green-600' : 'text-yellow-600'}
                    >
                      {exp.aprobado ? (
                        <><Check className="w-4 h-4 mr-1" /> Aprobado</>
                      ) : (
                        <><X className="w-4 h-4 mr-1" /> Aprobar</>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleDestacado(exp.id, exp.destacado)}
                      className={exp.destacado ? 'text-amber-600' : ''}
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {exp.destacado ? 'Quitar destacado' : 'Destacar'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={showForm || !!editExperiencia} onOpenChange={() => { setShowForm(false); setEditExperiencia(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-500" />
              {editExperiencia ? 'Editar Experiencia' : 'Nueva Experiencia'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={editExperiencia ? handleUpdate : handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                placeholder="Ej: Mi experiencia con los productos Atomy"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experiencia">Tu Experiencia *</Label>
              <Textarea
                id="experiencia"
                value={formData.experiencia}
                onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                placeholder="Cuéntanos cómo ha sido tu experiencia con Atomy..."
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="producto">Producto (opcional)</Label>
              <Input
                id="producto"
                value={formData.producto}
                onChange={(e) => setFormData({ ...formData, producto: e.target.value })}
                placeholder="Ej: HemoHim, Cuidado Facial, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label>Calificación</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, calificacion: star })}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${star <= formData.calificacion ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => { setShowForm(false); setEditExperiencia(null); }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500"
                disabled={saving || !formData.titulo || !formData.experiencia}
              >
                {saving ? 'Guardando...' : editExperiencia ? 'Actualizar' : 'Publicar'}
              </Button>
            </div>
            
            {!editExperiencia && (
              <p className="text-xs text-slate-500 text-center">
                Tu experiencia será revisada por un administrador antes de ser publicada.
              </p>
            )}
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Eliminar Experiencia
            </DialogTitle>
          </DialogHeader>
          <p className="text-slate-600 py-4">
            ¿Estás seguro de eliminar "{deleteConfirm?.titulo}"?
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              disabled={saving}
              onClick={() => deleteConfirm && handleDelete(deleteConfirm.id)}
            >
              {saving ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
