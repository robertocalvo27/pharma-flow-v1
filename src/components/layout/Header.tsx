import React, { useState } from 'react';
import { Search, Bell, Plus, LogOut, User, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../hooks/useAuth';
import { useStore } from '../../store';

export const Header: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { signOut, userProfile } = useAuth();
  const { user, setUser } = useStore();

  const handleLogout = async () => {
    try {
      setShowDropdown(false);
      
      // Limpiar el store primero
      setUser(null);
      
      // Luego hacer logout en Supabase
      const { error } = await signOut();
      
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      
      // Forzar navegación a login
      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing out:', error);
      // Intentar redirección de emergencia
      window.location.href = '/login';
    }
  };

  const getUserInitials = () => {
    if (user?.fullName) {
      const names = user.fullName.split(' ');
      return names.map(name => name.charAt(0)).join('').toUpperCase().slice(0, 2);
    }
    return 'U';
  };

  return (
    <>
      {/* Overlay para cerrar dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowDropdown(false)}
        />
      )}
      
      <header className="bg-white border-b border-gray-200 px-6 py-4 relative z-40">
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
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Bell className="w-4 h-4 text-gray-600" />
              </button>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            
            {/* User Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium cursor-pointer hover:shadow-md transition-shadow duration-200"
              >
                {getUserInitials()}
              </button>
              
              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.fullName || 'Usuario'}</p>
                    <p className="text-xs text-gray-500">{user?.email || userProfile?.email}</p>
                  </div>
                  
                  <button
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Perfil
                  </button>
                  
                  <button
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Configuración
                  </button>
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};