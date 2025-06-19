import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle, Pill, Shield, Users, BarChart3, ArrowRight } from 'lucide-react'
import { useAuthContext } from '../contexts/AuthContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card } from '../components/ui/Card'

interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
  full_name: string
  company: string
  role: 'admin' | 'manager' | 'analyst' | 'viewer'
}

export const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const { signUp, isAuthenticated } = useAuthContext()

  const features = [
    {
      icon: Shield,
      title: 'Seguridad Regulatoria',
      description: 'Cumplimiento total con normativas farmacéuticas internacionales'
    },
    {
      icon: Users,
      title: 'Colaboración Eficiente',
      description: 'Workflows colaborativos para equipos multidisciplinarios'
    },
    {
      icon: BarChart3,
      title: 'Analytics Avanzados',
      description: 'Reportes inteligentes y métricas en tiempo real'
    }
  ]

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterForm>()

  const password = watch('password')

  // Si ya está autenticado, redirigir
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await signUp(data.email, data.password, {
        full_name: data.full_name,
        company: data.company,
        role: data.role
      })
      
      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError('Error inesperado. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
        {/* Left Panel - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"></div>
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/5 rounded-full blur-md"></div>
          
          <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                <Pill className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">PharmaFlow</h1>
                <p className="text-blue-100 text-sm">Sistema de Gestión Farmacéutica</p>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold leading-tight mb-4">
                  Moderniza la gestión de tus
                  <span className="block text-blue-200">productos farmacéuticos</span>
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Abandona Excel y centraliza todos tus registros regulatorios en una plataforma 
                  diseñada específicamente para la industria farmacéutica.
                </p>
              </div>
              
              {/* Features */}
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-blue-100 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer */}
            <div className="text-blue-200 text-sm">
              © 2024 PharmaFlow. Transformando la industria farmacéutica.
            </div>
          </div>
        </div>
        
        {/* Right Panel - Success Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PharmaFlow</h1>
                <p className="text-gray-600 text-xs">Sistema de Gestión Farmacéutica</p>
              </div>
            </div>
            
            <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100 mb-6">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  ¡Registro Exitoso!
                </h2>
                <p className="text-gray-600 mb-4">
                  Hemos enviado un correo de confirmación a tu email.
                </p>
                <p className="text-gray-600 mb-6">
                  Por favor revisa tu bandeja de entrada y confirma tu cuenta.
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Volver al inicio de sesión
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Left Panel - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/5 rounded-full blur-md"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <Pill className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">PharmaFlow</h1>
              <p className="text-blue-100 text-sm">Sistema de Gestión Farmacéutica</p>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold leading-tight mb-4">
                Moderniza la gestión de tus
                <span className="block text-blue-200">productos farmacéuticos</span>
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Abandona Excel y centraliza todos tus registros regulatorios en una plataforma 
                diseñada específicamente para la industria farmacéutica.
              </p>
            </div>
            
            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-blue-200 text-sm">
            © 2024 PharmaFlow. Transformando la industria farmacéutica.
          </div>
        </div>
      </div>
      
      {/* Right Panel - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PharmaFlow</h1>
              <p className="text-gray-600 text-xs">Sistema de Gestión Farmacéutica</p>
            </div>
          </div>
          
          <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Crear Cuenta</h2>
              <p className="text-gray-600">Únete a PharmaFlow y moderniza tu gestión farmacéutica</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                  <div className="text-sm text-red-700">
                    {error}
                  </div>
                </div>
              )}

              <div>
                <Input
                  label="Nombre completo"
                  type="text"
                  placeholder="Tu nombre completo"
                  required
                  {...register('full_name', {
                    required: 'El nombre completo es requerido',
                    minLength: {
                      value: 2,
                      message: 'El nombre debe tener al menos 2 caracteres'
                    }
                  })}
                  error={errors.full_name?.message}
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>

              <div>
                <Input
                  label="Correo Electrónico"
                  type="email"
                  placeholder="tu@empresa.com"
                  required
                  {...register('email', {
                    required: 'El correo electrónico es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Correo electrónico inválido'
                    }
                  })}
                  error={errors.email?.message}
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>

              <div>
                <Input
                  label="Empresa"
                  type="text"
                  placeholder="Nombre de tu empresa"
                  required
                  {...register('company', {
                    required: 'El nombre de la empresa es requerido',
                    minLength: {
                      value: 2,
                      message: 'El nombre de la empresa debe tener al menos 2 caracteres'
                    }
                  })}
                  error={errors.company?.message}
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  {...register('role', {
                    required: 'El rol es requerido'
                  })}
                  className={`block w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300 focus:scale-[1.02] ${
                    errors.role ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecciona un rol</option>
                  <option value="viewer">Visualizador - Solo lectura</option>
                  <option value="analyst">Analista - Crear y editar</option>
                  <option value="manager">Manager - Gestión completa</option>
                  <option value="admin">Administrador - Control total</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Input
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    {...register('password', {
                      required: 'La contraseña es requerida',
                      minLength: {
                        value: 8,
                        message: 'La contraseña debe tener al menos 8 caracteres'
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
                      }
                    })}
                    error={errors.password?.message}
                    className="transition-all duration-300 focus:scale-[1.02] pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <div className="relative">
                  <Input
                    label="Confirmar Contraseña"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    {...register('confirmPassword', {
                      required: 'Confirma tu contraseña',
                      validate: value =>
                        value === password || 'Las contraseñas no coinciden'
                    })}
                    error={errors.confirmPassword?.message}
                    className="transition-all duration-300 focus:scale-[1.02] pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                loading={loading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                iconPosition="right"
                icon={ArrowRight}
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </Card>
          
          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 mb-4">Confiado por empresas farmacéuticas líderes</p>
            <div className="flex items-center justify-center space-x-6 opacity-60">
              <div className="w-16 h-8 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">PHARMA</span>
              </div>
              <div className="w-16 h-8 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">BIOTECH</span>
              </div>
              <div className="w-16 h-8 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">MEDICA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 