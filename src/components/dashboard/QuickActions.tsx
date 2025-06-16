import React from 'react';
import { Plus, FileText, RotateCcw, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Nuevo Producto',
      description: 'Registrar un nuevo producto farmacéutico',
      icon: Plus,
      color: 'bg-blue-50 text-blue-600',
      action: () => console.log('Nuevo producto')
    },
    {
      title: 'Iniciar Workflow',
      description: 'Comenzar proceso de aprobación',
      icon: FileText,
      color: 'bg-green-50 text-green-600',
      action: () => console.log('Nuevo workflow')
    },
    {
      title: 'Renovación',
      description: 'Procesar renovación de registro',
      icon: RotateCcw,
      color: 'bg-yellow-50 text-yellow-600',
      action: () => console.log('Renovación')
    },
    {
      title: 'Revisar Alertas',
      description: 'Ver registros próximos a vencer',
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-600',
      action: () => console.log('Alertas')
    }
  ];
  
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-left"
          >
            <div className={`p-2 rounded-lg ${action.color} mr-3`}>
              <action.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{action.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};