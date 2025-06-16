import React from 'react';
import { Pill, GitBranch, FileText, BarChart3, Users, Settings, CheckCircle } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';

export const ExploreStep: React.FC = () => {
  const features = [
    {
      icon: Pill,
      title: 'Gestión de Productos',
      description: 'Administra tu portafolio completo de productos farmacéuticos',
      color: 'bg-blue-50 text-blue-600',
      link: '/products'
    },
    {
      icon: FileText,
      title: 'Sistema de Dossiers',
      description: 'Organiza documentación regulatoria en 12 secciones estándar',
      color: 'bg-green-50 text-green-600',
      link: '/products'
    },
    {
      icon: GitBranch,
      title: 'Workflows Regulatorios',
      description: 'Automatiza procesos de aprobación y seguimiento',
      color: 'bg-purple-50 text-purple-600',
      link: '/workflows'
    },
    {
      icon: BarChart3,
      title: 'Reportes y Analytics',
      description: 'Métricas en tiempo real y reportes regulatorios',
      color: 'bg-orange-50 text-orange-600',
      link: '/reports'
    },
    {
      icon: Users,
      title: 'Gestión de Usuarios',
      description: 'Administra equipos y permisos granulares',
      color: 'bg-indigo-50 text-indigo-600',
      link: '/users'
    },
    {
      icon: Settings,
      title: 'Configuración',
      description: 'Personaliza la plataforma según tus necesidades',
      color: 'bg-gray-50 text-gray-600',
      link: '/settings'
    }
  ];

  const quickTips = [
    'Usa el botón "Ver Dossiers" en productos para acceder al sistema de documentación',
    'Los workflows se actualizan automáticamente cuando cambias el estado de los pasos',
    'Puedes exportar reportes en PDF y Excel desde la sección de reportes',
    'El dashboard se actualiza en tiempo real con las métricas más importantes'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">¡Todo Listo!</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tu cuenta está configurada y lista para usar. Explora las funcionalidades principales 
          de PharmaFlow y descubre cómo puede transformar tu gestión regulatoria.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${feature.color}`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Tips */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Consejos Rápidos</h3>
        <div className="space-y-3">
          {quickTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-gray-700 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Trial Reminder */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aprovecha tu Trial Enterprise
            </h3>
            <p className="text-gray-700 mb-4">
              Tienes acceso completo a todas las funcionalidades Enterprise por 15 días. 
              Explora sin límites y descubre el valor que PharmaFlow puede aportar a tu empresa.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm">
                Ir al Dashboard
              </Button>
              <Button variant="ghost" size="sm">
                Contactar Soporte
              </Button>
              <Button variant="ghost" size="sm">
                Ver Documentación
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="p-6 bg-green-50 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Próximos Pasos Recomendados</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Explora el dashboard para familiarizarte con las métricas</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Revisa los productos de ejemplo y sus dossiers</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Prueba crear un workflow de registro</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Invita a tu equipo para colaborar</span>
          </div>
        </div>
      </Card>
    </div>
  );
}; 