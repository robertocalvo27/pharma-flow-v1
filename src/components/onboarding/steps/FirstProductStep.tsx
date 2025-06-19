import React from 'react';
import { Pill, Plus, FileText } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';

export const FirstProductStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Crea tu Primer Producto</h2>
        <p className="text-gray-600">
          Opcional: Agrega un producto farmacéutico para explorar las funcionalidades
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Product Option */}
        <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-400">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Crear Nuevo Producto</h3>
          <p className="text-gray-600 mb-4">
            Agrega un producto farmacéutico desde cero con toda la información regulatoria
          </p>
          <Button variant="primary" className="w-full">
            Crear Producto
          </Button>
        </Card>

        {/* Use Sample Data Option */}
        <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Usar Datos de Ejemplo</h3>
          <p className="text-gray-600 mb-4">
            Explora con productos de ejemplo ya configurados para ver todas las funcionalidades
          </p>
          <Button variant="secondary" className="w-full">
            Cargar Ejemplos
          </Button>
        </Card>
      </div>

      {/* Sample Products Preview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos de Ejemplo Disponibles</h3>
        <div className="space-y-3">
          {[
            {
              name: 'Paracetamol Plus 500mg',
              ingredient: 'Paracetamol + Cafeína',
              form: 'Comprimidos',
              status: 'Aprobado'
            },
            {
              name: 'Amoxicilina 875mg',
              ingredient: 'Amoxicilina',
              form: 'Comprimidos recubiertos',
              status: 'En proceso'
            },
            {
              name: 'Ibuprofeno 400mg',
              ingredient: 'Ibuprofeno',
              form: 'Cápsulas blandas',
              status: 'Renovación requerida'
            }
          ].map((product, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Pill className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.ingredient} • {product.form}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                product.status === 'Aprobado' ? 'bg-green-100 text-green-800' :
                product.status === 'En proceso' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {product.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 bg-yellow-50 border border-yellow-200">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">!</span>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-900 mb-1">Paso Opcional</h4>
            <p className="text-yellow-800 text-sm">
              Puedes saltar este paso y agregar productos más tarde. Los datos de ejemplo 
              te permitirán explorar todas las funcionalidades inmediatamente.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}; 