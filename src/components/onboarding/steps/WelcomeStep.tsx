import React from 'react';
import { Pill, Shield, Users, BarChart3, Clock, Star } from 'lucide-react';
import { useStore } from '../../../store';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';

export const WelcomeStep: React.FC = () => {
  const { user } = useStore();
  
  const getDaysRemaining = () => {
    if (!user?.subscription?.trialEndsAt) return 15;
    const now = new Date();
    const trialEnd = new Date(user.subscription.trialEndsAt);
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const features = [
    {
      icon: Shield,
      title: 'Seguridad Regulatoria',
      description: 'Cumplimiento total con normativas farmacéuticas internacionales',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Colaboración Avanzada',
      description: 'Workflows colaborativos para equipos multidisciplinarios',
      color: 'text-green-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics Enterprise',
      description: 'Reportes inteligentes y métricas en tiempo real',
      color: 'text-purple-600'
    }
  ];

  const enterpriseFeatures = [
    'Hasta 100 productos farmacéuticos',
    '25 usuarios incluidos',
    '500 GB de almacenamiento',
    'Workflows personalizables ilimitados',
    'Integraciones avanzadas (ERP, CRM)',
    'SSO (Single Sign-On)',
    'Soporte prioritario 24/7',
    'Reportes regulatorios automatizados'
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
            <Pill className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">¡Bienvenido a PharmaFlow!</h1>
            <p className="text-gray-600">La plataforma líder en gestión farmacéutica</p>
          </div>
        </div>

        {/* Trial Badge */}
        <div className="flex items-center justify-center space-x-2">
          <Badge variant="success" className="px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Plan Enterprise - Trial Gratuito
          </Badge>
          <Badge variant="warning" className="px-3 py-2">
            <Clock className="w-4 h-4 mr-1" />
            {getDaysRemaining()} días restantes
          </Badge>
        </div>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Tienes acceso completo a todas las funcionalidades Enterprise por <strong>15 días</strong>. 
          Explora sin límites y descubre cómo PharmaFlow puede transformar tu gestión regulatoria.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gray-50 flex items-center justify-center ${feature.color}`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </Card>
        ))}
      </div>

      {/* Enterprise Features */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Star className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Funcionalidades Enterprise Incluidas</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {enterpriseFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Valor del Plan Enterprise</h4>
              <p className="text-blue-800 text-sm">
                Estás probando un plan valorado en <strong>$899 USD/mes</strong>. 
                Al final del trial, podrás elegir el plan que mejor se adapte a tu empresa.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">¿Qué sigue?</h3>
        <p className="text-gray-700 mb-4">
          Te guiaremos paso a paso para configurar tu cuenta y aprovechar al máximo PharmaFlow:
        </p>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <span>Seleccionar tu plan ideal (puedes cambiar después)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <span>Configurar información de tu empresa</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <span>Crear tu primer producto (opcional)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <span>Tour por las funcionalidades principales</span>
          </div>
        </div>
      </Card>
    </div>
  );
}; 