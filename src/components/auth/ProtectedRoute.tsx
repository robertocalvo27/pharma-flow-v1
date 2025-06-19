import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'manager' | 'analyst' | 'viewer'
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, userProfile, loading } = useAuthContext()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirigir al login con la ubicación actual
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Verificar rol si es requerido
  if (requiredRole && userProfile) {
    const roleHierarchy = {
      'viewer': 1,
      'analyst': 2,
      'manager': 3,
      'admin': 4
    }

    const userRoleLevel = roleHierarchy[userProfile.role]
    const requiredRoleLevel = roleHierarchy[requiredRole]

    if (userRoleLevel < requiredRoleLevel) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Acceso Denegado
            </h1>
            <p className="text-gray-600 mb-4">
              No tienes permisos suficientes para acceder a esta página.
            </p>
            <p className="text-sm text-gray-500">
              Rol requerido: {requiredRole} | Tu rol: {userProfile.role}
            </p>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
} 