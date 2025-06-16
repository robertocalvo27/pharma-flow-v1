import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Pill, ArrowRight, Shield, Users, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Login attempt:', data);
    
    // Mock authentication - accept any valid email and password with 6+ characters
    if (data.email && data.password && data.password.length >= 6) {
      onLogin(); // Successfully authenticate
    } else {
      alert('Por favor ingresa un email válido y una contraseña de al menos 6 caracteres');
    }
    
    setIsLoading(false);
  };
  
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
  ];
  
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
      
      {/* Right Panel - Login Form */}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido de vuelta</h2>
              <p className="text-gray-600">Accede a tu panel de control farmacéutico</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                <div className="relative">
                  <Input
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    {...register('password', {
                      required: 'La contraseña es requerida',
                      minLength: {
                        value: 6,
                        message: 'La contraseña debe tener al menos 6 caracteres'
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
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register('rememberMe')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                    Recordarme
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              
              <Button
                type="submit"
                fullWidth
                loading={isLoading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                iconPosition="right"
                icon={ArrowRight}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
                >
                  Solicita una demo
                </a>
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
  );
};