'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  UserPlus, IdCard, Users, Lock, FileUp,
  Facebook, MessageCircle, Check, Eye, EyeOff,
  ChevronRight, ChevronLeft, Loader2, Sparkles, Shield
} from 'lucide-react';
import { paises, getDepartamentos, getMunicipios, getCodigoPais } from '@/data/locations';
import confetti from 'canvas-confetti';

interface RegistrationFormProps {
  setCurrentView: (view: string) => void;
}

export default function RegistrationForm({ setCurrentView }: RegistrationFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    patrocinadorNombre: '',
    patrocinadorCodigo: '',
    nombres: '',
    apellidos: '',
    dpi: '',
    nacimiento: '',
    telefono: '',
    email: '',
    direccion: '',
    pais: 'Guatemala',
    departamento: '',
    municipio: '',
    estadoCivil: '',
    tipoMembresia: '',
    nombreConyuge: '',
    dpiConyuge: '',
    beneficiario: false,
    usuario: '',
    password: '',
    facebookFollow: false,
    whatsappJoin: false,
    linkDPIFrente: '',
    linkDPIReverso: ''
  });

  // Cargar estado desde localStorage al montar
  useEffect(() => {
    const savedStep = localStorage.getItem('registration_step');
    const savedData = localStorage.getItem('registration_data');

    if (savedStep) setStep(parseInt(savedStep));
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error('Error parsing saved registration data', e);
      }
    }
  }, []);

  // Guardar estado en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('registration_step', step.toString());
    localStorage.setItem('registration_data', JSON.stringify(formData));
  }, [step, formData]);

  // Refs para inputs de archivos
  const fileInputFrenteRef = useRef<HTMLInputElement>(null);
  const fileInputReversoRef = useRef<HTMLInputElement>(null);

  // Estados de carga de archivos
  const [uploadingFrente, setUploadingFrente] = useState(false);
  const [uploadingReverso, setUploadingReverso] = useState(false);

  const handleFileUpload = async (file: File, side: 'Frente' | 'Reverso') => {
    const isFrente = side === 'Frente';
    const setUploading = isFrente ? setUploadingFrente : setUploadingReverso;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${formData.dpi || 'temp'}_${side}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        [isFrente ? 'linkDPIFrente' : 'linkDPIReverso']: publicUrl
      }));

    } catch (err: any) {
      console.error('Error uploading:', err);
      setError(`Error al subir ${side}: ${err.message || 'Error desconocido'}`);
    } finally {
      setUploading(false);
    }
  };
  const [departamentos, setDepartamentos] = useState(getDepartamentos(formData.pais));
  const [municipios, setMunicipios] = useState<string[]>([]);

  // Actualizar departamentos cuando cambia el país
  useEffect(() => {
    const deps = getDepartamentos(formData.pais);
    setDepartamentos(deps);
    setFormData(prev => ({ ...prev, departamento: '', municipio: '' }));
    setMunicipios([]);
  }, [formData.pais]);

  // Actualizar municipios cuando cambia el departamento
  useEffect(() => {
    if (formData.departamento) {
      const muns = getMunicipios(formData.pais, formData.departamento);
      setMunicipios(muns);
      setFormData(prev => ({ ...prev, municipio: '' }));
    }
  }, [formData.departamento, formData.pais]);

  // Efecto de confetti cuando el registro es exitoso
  useEffect(() => {
    if (success) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, colors: ['#22d3ee', '#14b8a6', '#ffffff'] };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      // Explosión inicial grande
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22d3ee', '#14b8a6', '#ffffff']
      });
    }
  }, [success]);

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    symbol: false
  });

  const validatePassword = (password: string) => {
    setPasswordValidation({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        // Limpiar persistencia tras éxito
        localStorage.removeItem('registration_step');
        localStorage.removeItem('registration_data');
      } else {
        setError(data.message);
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.patrocinadorNombre && formData.patrocinadorCodigo;
      case 2:
        return formData.nombres && formData.apellidos && formData.dpi &&
          formData.nacimiento && formData.telefono && formData.email &&
          formData.direccion && formData.pais && formData.departamento &&
          formData.municipio && formData.estadoCivil && formData.tipoMembresia;
      case 3:
        if (formData.estadoCivil === 'Casado') {
          return formData.nombreConyuge && formData.dpiConyuge;
        }
        return true;
      case 4:
        return formData.usuario && formData.password &&
          Object.values(passwordValidation).every(Boolean);
      case 5:
        return true;
      case 6:
        return formData.facebookFollow && formData.whatsappJoin;
      default:
        return false;
    }
  };

  const stepLabels = ['Patrocinador', 'Personal', 'Cónyuge', 'Seguridad', 'Documentos', 'Confirmar'];

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>

        <Card className="max-w-lg w-full bg-slate-800/50 backdrop-blur-sm border-slate-700 shadow-2xl rounded-3xl overflow-hidden relative z-10">
          <CardContent className="p-8 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-50"></div>
              <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                <Check className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              ¡Bienvenido a{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Atomy</span>!
            </h2>
            <p className="text-slate-400 mb-6">
              Tu solicitud de membresía ha sido completada exitosamente. Un asesor se pondrá en contacto
              contigo para activar tu membresía gratuita.
            </p>
            <div className="bg-slate-900/50 rounded-2xl p-6 mb-6 text-left border border-slate-700/50">
              <h4 className="font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Próximos pasos:
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  Revisa tu correo electrónico
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  Atento a tu WhatsApp
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  Explora los productos en ch.atomy.com
                </li>
              </ul>
            </div>
            <Button
              onClick={() => setCurrentView('landing')}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-lg shadow-cyan-500/25"
            >
              Volver al Inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-8 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 mb-4">
            <UserPlus className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">Solicitud de Membresía</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Únete a{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Atomy
            </span>
          </h1>
          <p className="text-slate-400">Completa tu solicitud en 6 sencillos pasos</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8 bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 ${s < step
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/20'
                  : s === step
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-700 text-slate-400'
                  }`}>
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 6 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-1 rounded transition-all ${s < step ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-slate-700'
                    }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-sm text-cyan-300 font-medium">
              Paso {step}: {stepLabels[step - 1]}
            </span>
          </div>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            {/* Step 1: Patrocinador */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-700">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Datos del Patrocinador</h3>
                    <p className="text-sm text-slate-400">Persona que te invitó a Atomy</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Nombre del Patrocinador *</Label>
                    <Input
                      value={formData.patrocinadorNombre}
                      onChange={(e) => setFormData({ ...formData, patrocinadorNombre: e.target.value })}
                      placeholder="Nombre completo"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Código del Patrocinador *</Label>
                    <Input
                      value={formData.patrocinadorCodigo}
                      onChange={(e) => setFormData({ ...formData, patrocinadorCodigo: e.target.value })}
                      placeholder="ID de Socio"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Datos Personales */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-700">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <IdCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Datos Personales</h3>
                    <p className="text-sm text-slate-400">Información básica de tu perfil</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Nombres *</Label>
                    <Input
                      value={formData.nombres}
                      onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Apellidos *</Label>
                    <Input
                      value={formData.apellidos}
                      onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">DPI / Documento *</Label>
                    <Input
                      value={formData.dpi}
                      onChange={(e) => setFormData({ ...formData, dpi: e.target.value })}
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Fecha de Nacimiento *</Label>
                    <Input
                      type="date"
                      value={formData.nacimiento}
                      onChange={(e) => setFormData({ ...formData, nacimiento: e.target.value })}
                      className="bg-slate-900/50 border-slate-600 text-white focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Teléfono *</Label>
                    <div className="flex gap-2">
                      <select
                        value={formData.pais}
                        onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                        className="px-2 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                      >
                        {paises.map((pais) => (
                          <option key={pais.nombre} value={pais.nombre}>
                            {pais.bandera} {pais.codigo}
                          </option>
                        ))}
                      </select>
                      <Input
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="Número sin código"
                        className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500 flex-1"
                      />
                    </div>
                    <p className="text-xs text-slate-500">Código: {getCodigoPais(formData.pais)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Email *</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Dirección Completa *</Label>
                  <Input
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    placeholder="Calle, Avenida, Zona, etc."
                    className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">País *</Label>
                    <select
                      value={formData.pais}
                      onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      {paises.map((pais) => (
                        <option key={pais.nombre} value={pais.nombre}>
                          {pais.bandera} {pais.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Departamento *</Label>
                    <select
                      value={formData.departamento}
                      onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      disabled={!formData.pais}
                    >
                      <option value="">Seleccione...</option>
                      {departamentos.map((dep) => (
                        <option key={dep.nombre} value={dep.nombre}>
                          {dep.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Municipio *</Label>
                    <select
                      value={formData.municipio}
                      onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      disabled={!formData.departamento}
                    >
                      <option value="">Seleccione...</option>
                      {municipios.map((mun) => (
                        <option key={mun} value={mun}>
                          {mun}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Estado Civil *</Label>
                    <select
                      value={formData.estadoCivil}
                      onChange={(e) => setFormData({ ...formData, estadoCivil: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="">Seleccione...</option>
                      <option value="Soltero">Soltero/a</option>
                      <option value="Casado">Casado/a</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Tipo de Membresía *</Label>
                    <select
                      value={formData.tipoMembresia}
                      onChange={(e) => setFormData({ ...formData, tipoMembresia: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900/50 border border-cyan-500/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                    >
                      <option value="">Seleccione su perfil...</option>
                      <option value="Consumidor">🍀 Consumidor (Solo compras)</option>
                      <option value="Distribuidor">💼 Distribuidor (Ventas y red)</option>
                      <option value="Emprendedor">🚀 Emprendedor (Ambas opciones)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Cónyuge */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-700">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Datos del Cónyuge</h3>
                    <p className="text-sm text-slate-400">Solo si aplica</p>
                  </div>
                </div>
                {formData.estadoCivil === 'Casado' ? (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-300">Nombre del Cónyuge *</Label>
                        <Input
                          value={formData.nombreConyuge}
                          onChange={(e) => setFormData({ ...formData, nombreConyuge: e.target.value })}
                          className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300">DPI del Cónyuge *</Label>
                        <Input
                          value={formData.dpiConyuge}
                          onChange={(e) => setFormData({ ...formData, dpiConyuge: e.target.value })}
                          className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                      <Checkbox
                        checked={formData.beneficiario}
                        onCheckedChange={(checked) => setFormData({ ...formData, beneficiario: checked as boolean })}
                        className="border-slate-500"
                      />
                      <Label className="text-slate-300 cursor-pointer">Agregar como beneficiario oficial</Label>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-700 flex items-center justify-center">
                      <Users className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-400">No aplica - Estado civil: {formData.estadoCivil || 'No especificado'}</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Seguridad */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-700">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Seguridad de la Cuenta</h3>
                    <p className="text-sm text-slate-400">Credenciales de acceso</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Usuario *</Label>
                    <Input
                      value={formData.usuario}
                      onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                      placeholder="Tu identificador de acceso"
                      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                    />
                    <p className="text-xs text-slate-500">Este será tu identificador de acceso</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Contraseña *</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({ ...formData, password: e.target.value });
                          validatePassword(e.target.value);
                        }}
                        className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="space-y-1 text-xs mt-2">
                      <div className={`flex items-center gap-2 ${passwordValidation.length ? 'text-green-400' : 'text-slate-500'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.length ? 'bg-green-500/20' : 'bg-slate-700'}`}>
                          {passwordValidation.length && <Check className="w-2 h-2" />}
                        </div>
                        8+ caracteres
                      </div>
                      <div className={`flex items-center gap-2 ${passwordValidation.upper ? 'text-green-400' : 'text-slate-500'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.upper ? 'bg-green-500/20' : 'bg-slate-700'}`}>
                          {passwordValidation.upper && <Check className="w-2 h-2" />}
                        </div>
                        Mayúscula
                      </div>
                      <div className={`flex items-center gap-2 ${passwordValidation.lower ? 'text-green-400' : 'text-slate-500'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.lower ? 'bg-green-500/20' : 'bg-slate-700'}`}>
                          {passwordValidation.lower && <Check className="w-2 h-2" />}
                        </div>
                        Minúscula
                      </div>
                      <div className={`flex items-center gap-2 ${passwordValidation.number ? 'text-green-400' : 'text-slate-500'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.number ? 'bg-green-500/20' : 'bg-slate-700'}`}>
                          {passwordValidation.number && <Check className="w-2 h-2" />}
                        </div>
                        Número
                      </div>
                      <div className={`flex items-center gap-2 ${passwordValidation.symbol ? 'text-green-400' : 'text-slate-500'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordValidation.symbol ? 'bg-green-500/20' : 'bg-slate-700'}`}>
                          {passwordValidation.symbol && <Check className="w-2 h-2" />}
                        </div>
                        Símbolo
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Documentos */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-700">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <FileUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Verificación de Identidad</h3>
                    <p className="text-sm text-slate-400">Documentos de respaldo</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 mb-4">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <p className="text-sm text-cyan-300">
                    Sube imágenes legibles de tu DPI para validar tu registro.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Input oculto Frontal */}
                  <input
                    type="file"
                    ref={fileInputFrenteRef}
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'Frente')}
                    className="hidden"
                    accept="image/*"
                  />
                  <div
                    onClick={() => fileInputFrenteRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer overflow-hidden relative group ${formData.linkDPIFrente
                      ? 'border-green-500/50 bg-green-500/5'
                      : 'border-slate-600 hover:border-cyan-500/50 bg-slate-900/30'
                      }`}
                  >
                    {uploadingFrente ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-2" />
                        <p className="text-sm text-cyan-400">Subiendo...</p>
                      </div>
                    ) : formData.linkDPIFrente ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-800">
                        <img
                          src={formData.linkDPIFrente}
                          alt="DPI Frontal"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs font-medium">Cambiar imagen</p>
                        </div>
                        <div className="absolute top-2 right-2 p-1 bg-green-500 rounded-full">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-slate-700 flex items-center justify-center">
                          <FileUp className="w-7 h-7 text-slate-400" />
                        </div>
                        <p className="font-medium text-cyan-400">DPI Frontal</p>
                        <p className="text-xs text-slate-500 mt-1">Hacer clic para subir</p>
                      </>
                    )}
                  </div>

                  {/* Input oculto Reverso */}
                  <input
                    type="file"
                    ref={fileInputReversoRef}
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'Reverso')}
                    className="hidden"
                    accept="image/*"
                  />
                  <div
                    onClick={() => fileInputReversoRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer overflow-hidden relative group ${formData.linkDPIReverso
                      ? 'border-green-500/50 bg-green-500/5'
                      : 'border-slate-600 hover:border-cyan-500/50 bg-slate-900/30'
                      }`}
                  >
                    {uploadingReverso ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-2" />
                        <p className="text-sm text-cyan-400">Subiendo...</p>
                      </div>
                    ) : formData.linkDPIReverso ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-800">
                        <img
                          src={formData.linkDPIReverso}
                          alt="DPI Reverso"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs font-medium">Cambiar imagen</p>
                        </div>
                        <div className="absolute top-2 right-2 p-1 bg-green-500 rounded-full">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-slate-700 flex items-center justify-center">
                          <FileUp className="w-7 h-7 text-slate-400" />
                        </div>
                        <p className="font-medium text-cyan-400">DPI Reverso</p>
                        <p className="text-xs text-slate-500 mt-1">Hacer clic para subir</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Redes Sociales */}
            {step === 6 && (
              <div className="space-y-6">
                <div className="p-6 bg-slate-900/50 rounded-2xl border border-blue-500/20">
                  <h3 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
                    <Facebook className="w-5 h-5" /> Paso 1: Comunidad Facebook
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Descubre capacitaciones y noticias exclusivas en nuestra página oficial.
                  </p>
                  <a
                    href="https://www.facebook.com/profile.php?id=61586482017672"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full mb-4"
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                      <Facebook className="w-4 h-4 mr-2" /> SEGUIR PÁGINA OFICIAL
                    </Button>
                  </a>
                  <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${formData.facebookFollow ? 'bg-green-500/10 border border-green-500/30' : 'bg-slate-800/50 border border-slate-700'
                    }`}>
                    <Checkbox
                      checked={formData.facebookFollow}
                      onCheckedChange={(checked) => setFormData({ ...formData, facebookFollow: checked as boolean })}
                      className="border-slate-500 data-[state=checked]:bg-green-500"
                    />
                    <Label className="text-sm text-slate-300 cursor-pointer">
                      Ya sigo la página oficial en Facebook
                    </Label>
                  </div>
                </div>

                <div className="p-6 bg-slate-900/50 rounded-2xl border border-green-500/20">
                  <h3 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" /> Paso 2: Grupo de Soporte WhatsApp
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Únete a nuestro grupo de apoyo para recibir asistencia personalizada.
                  </p>
                  <a
                    href="https://chat.whatsapp.com/Jr5SNg8WGif1QRPp0SON8Y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full mb-4"
                  >
                    <Button className="w-full bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/20">
                      <MessageCircle className="w-4 h-4 mr-2" /> UNIRME AL GRUPO AHORA
                    </Button>
                  </a>
                  <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${formData.whatsappJoin ? 'bg-green-500/10 border border-green-500/30' : 'bg-slate-800/50 border border-slate-700'
                    }`}>
                    <Checkbox
                      checked={formData.whatsappJoin}
                      onCheckedChange={(checked) => setFormData({ ...formData, whatsappJoin: checked as boolean })}
                      className="border-slate-500 data-[state=checked]:bg-green-500"
                    />
                    <Label className="text-sm text-slate-300 cursor-pointer">
                      Confirmo que me he unido al grupo
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" /> Anterior
              </Button>

              {step < 6 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 gap-2 shadow-lg shadow-cyan-500/20"
                >
                  Siguiente <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid() || loading}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 gap-2 shadow-lg shadow-green-500/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Procesando...
                    </>
                  ) : (
                    <>
                      CONFIRMAR REGISTRO <Check className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
