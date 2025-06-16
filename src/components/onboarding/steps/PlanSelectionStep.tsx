import React from 'react';
import { Star, Check, Zap, Building, Crown } from 'lucide-react';
import { useStore } from '../../../store';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';

export const PlanSelectionStep: React.FC = () => {
  const { user } = useStore();

  const getDaysRemaining = () => {
    if (!user?.subscription?.trialEndsAt) return 15;
    const now = new Date();
    const trialEnd = new Date(user.subscription.trialEndsAt);
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Conoce Nuestros Planes</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Actualmente tienes acceso al <strong>Plan Enterprise</strong> en modo trial. 
          Conoce todos nuestros planes y elige el que mejor se adapte a tu empresa.
        </p>
        
        <div className="flex items-center justify-center space-x-2">
          <Badge variant="success" className="px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Plan Enterprise Activo
          </Badge>
          <Badge variant="warning" className="px-3 py-2">
            {getDaysRemaining()} días restantes
          </Badge>
        </div>
      </div>

      {/* Current Plan Highlight */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">Plan Enterprise</h3>
              <Badge variant="success" className="text-xs">
                <Check className="w-3 h-3 mr-1" />
                Activo
              </Badge>
            </div>
            <p className="text-gray-700 mb-3">
              Para grandes farmacéuticas con operaciones globales complejas
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Productos:</span>
                <span className="font-medium ml-1">Hasta 100</span>
              </div>
              <div>
                <span className="text-gray-600">Usuarios:</span>
                <span className="font-medium ml-1">25 incluidos</span>
              </div>
              <div>
                <span className="text-gray-600">Almacenamiento:</span>
                <span className="font-medium ml-1">500 GB</span>
              </div>
              <div>
                <span className="text-gray-600">Países:</span>
                <span className="font-medium ml-1">Ilimitados</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">$899</div>
            <div className="text-sm text-gray-600">USD/mes</div>
          </div>
        </div>
      </Card>

      {/* Other Plans Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Plan Starter</h3>
          <p className="text-2xl font-bold text-gray-900 mb-1">$149</p>
          <p className="text-sm text-gray-600 mb-2">USD/mes</p>
          <p className="text-xs text-gray-500">Hasta 10 productos • 3 usuarios</p>
        </Card>

        <Card className="p-4 text-center border-2 border-green-200">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Building className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Plan Professional</h3>
          <div className="flex items-center justify-center space-x-1 mb-1">
            <p className="text-2xl font-bold text-gray-900">$399</p>
            <Badge variant="warning" className="text-xs">Recomendado</Badge>
          </div>
          <p className="text-sm text-gray-600 mb-2">USD/mes</p>
          <p className="text-xs text-gray-500">Hasta 35 productos • 10 usuarios</p>
        </Card>

        <Card className="p-4 text-center">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Crown className="w-5 h-5 text-yellow-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Plan Pharma Corp</h3>
          <p className="text-2xl font-bold text-gray-900 mb-1">Personalizado</p>
          <p className="text-sm text-gray-600 mb-2">Contactar</p>
          <p className="text-xs text-gray-500">Productos ilimitados • Usuarios ilimitados</p>
        </Card>
      </div>

      {/* Features Comparison */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Funcionalidades Enterprise Incluidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Workflows personalizables ilimitados',
            'Integraciones avanzadas (ERP, CRM)',
            'SSO (Single Sign-On)',
            'Soporte prioritario 24/7',
            'Reportes regulatorios automatizados',
            'White labeling básico',
            'Compliance tools avanzados',
            'API webhooks en tiempo real'
          ].map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Note */}
      <Card className="p-4 bg-blue-50 border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Continúa explorando</h4>
            <p className="text-blue-800 text-sm">
              Al final de tu trial, podrás elegir el plan que mejor se adapte a tu empresa. 
              Por ahora, disfruta de todas las funcionalidades Enterprise sin restricciones.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}; 