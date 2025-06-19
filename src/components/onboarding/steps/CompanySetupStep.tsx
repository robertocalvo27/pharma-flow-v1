import React from 'react';
import { Building, MapPin, Users } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';

export const CompanySetupStep: React.FC = () => {
  const countries = [
    { value: 'CR', label: 'Costa Rica' },
    { value: 'GT', label: 'Guatemala' },
    { value: 'PA', label: 'Panamá' },
    { value: 'SV', label: 'El Salvador' },
    { value: 'NI', label: 'Nicaragua' },
    { value: 'HN', label: 'Honduras' }
  ];

  const companySizes = [
    { value: 'small', label: '1-50 empleados' },
    { value: 'medium', label: '51-500 empleados' },
    { value: 'large', label: '500+ empleados' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Configuración de Empresa</h2>
        <p className="text-gray-600">
          Ayúdanos a personalizar PharmaFlow para tu empresa
        </p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Nombre de la Empresa"
              placeholder="Ej: Laboratorios Farmex S.A."
              icon={Building}
              required
            />
          </div>
          
          <div>
            <Select
              label="País Principal"
              options={countries}
              placeholder="Selecciona tu país"
              icon={MapPin}
              required
            />
          </div>
          
          <div>
            <Select
              label="Tamaño de la Empresa"
              options={companySizes}
              placeholder="Selecciona el tamaño"
              icon={Users}
              required
            />
          </div>
          
          <div>
            <Input
              label="Sitio Web (Opcional)"
              placeholder="https://www.tuempresa.com"
              type="url"
            />
          </div>
        </div>

        <div className="mt-6">
          <Input
            label="Descripción de la Empresa (Opcional)"
            placeholder="Breve descripción de tu empresa farmacéutica..."
            multiline
            rows={3}
          />
        </div>
      </Card>

      <Card className="p-4 bg-blue-50 border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">¿Por qué necesitamos esta información?</h4>
            <p className="text-blue-800 text-sm">
              Esta información nos ayuda a personalizar la experiencia, mostrar regulaciones relevantes 
              para tu país y configurar las funcionalidades más útiles para tu empresa.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}; 