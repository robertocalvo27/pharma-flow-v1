import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-lg">
          <Input
            placeholder="Buscar productos, registros, workflows..."
            icon={Search}
            fullWidth={false}
            className="w-full"
          />
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="primary" icon={Plus} size="sm">
            Nuevo Producto
          </Button>
          
          <div className="relative">
            <Button variant="ghost" size="sm" icon={Bell} />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium cursor-pointer hover:shadow-md transition-shadow duration-200">
            MG
          </div>
        </div>
      </div>
    </header>
  );
};