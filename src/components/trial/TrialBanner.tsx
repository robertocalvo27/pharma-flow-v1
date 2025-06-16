import React from 'react';
import { Clock, Star, ArrowRight } from 'lucide-react';
import { useStore } from '../../store';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const TrialBanner: React.FC = () => {
  const { user } = useStore();

  if (!user?.subscription || user.subscription.status !== 'trial') {
    return null;
  }

  const getDaysRemaining = () => {
    if (!user.subscription?.trialEndsAt) return 0;
    const now = new Date();
    const trialEnd = new Date(user.subscription.trialEndsAt);
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const daysRemaining = getDaysRemaining();
  const isExpiringSoon = daysRemaining <= 3;

  return (
    <div className={`px-4 py-2 ${isExpiringSoon ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'} border-b`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Star className={`w-4 h-4 ${isExpiringSoon ? 'text-red-600' : 'text-blue-600'}`} />
            <span className={`text-sm font-medium ${isExpiringSoon ? 'text-red-800' : 'text-blue-800'}`}>
              Trial Enterprise
            </span>
          </div>
          
          <Badge variant={isExpiringSoon ? 'error' : 'warning'} className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {daysRemaining} días restantes
          </Badge>
          
          <span className={`text-sm ${isExpiringSoon ? 'text-red-700' : 'text-blue-700'}`}>
            {isExpiringSoon 
              ? '¡Tu trial expira pronto! Elige un plan para continuar.'
              : 'Explora todas las funcionalidades Enterprise sin límites.'
            }
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs ${isExpiringSoon ? 'text-red-700 hover:text-red-800' : 'text-blue-700 hover:text-blue-800'}`}
          >
            Ver Planes
          </Button>
          
          {isExpiringSoon && (
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              className="text-xs bg-red-600 hover:bg-red-700"
            >
              Actualizar Ahora
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}; 