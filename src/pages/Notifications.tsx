import React from 'react';
import { Bell, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const Notifications: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Notificaciones</h1>
        <p className="text-gray-600 mt-1">
          Centro de notificaciones y alertas del sistema
        </p>
      </div>
      
      <Card>
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Centro de Notificaciones
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Próximamente: notificaciones push, alertas de vencimiento,
            recordatorios de workflow y configuración de preferencias de notificación.
          </p>
        </div>
      </Card>
    </div>
  );
};