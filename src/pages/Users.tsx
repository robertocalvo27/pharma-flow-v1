import React from 'react';
import { Users as UsersIcon, UserPlus, Shield } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const Users: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
        <p className="text-gray-600 mt-1">
          Administra usuarios, roles y permisos del sistema
        </p>
      </div>
      
      <Card>
        <div className="text-center py-12">
          <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Gestión de Usuarios
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Funcionalidad en desarrollo para gestionar usuarios, asignar roles,
            configurar permisos y controlar acceso a módulos específicos.
          </p>
        </div>
      </Card>
    </div>
  );
};