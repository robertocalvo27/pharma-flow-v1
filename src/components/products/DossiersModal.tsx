import React, { useState } from 'react';
import { X, Search, Filter, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Dossier, Product } from '../../types';
import { mockDossiers } from '../../data/mockData';
import { DOSSIER_STATUS_LABELS, DOSSIER_STATUS_COLORS } from '../../utils/constants';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DossiersModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onViewDossier: (dossier: Dossier) => void;
}

export const DossiersModal: React.FC<DossiersModalProps> = ({
  isOpen,
  onClose,
  product,
  onViewDossier
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filtrar dossiers por producto
  const productDossiers = mockDossiers.filter(dossier => dossier.productId === product.id);

  // Aplicar filtros
  const filteredDossiers = productDossiers.filter(dossier => {
    const matchesSearch = dossier.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dossier.manufacturerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || dossier.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calcular métricas
  const totalDossiers = productDossiers.length;
  const completedDossiers = productDossiers.filter(d => d.status === 'completed').length;
  const inProgressDossiers = productDossiers.filter(d => d.status === 'in_progress').length;
  const draftDossiers = productDossiers.filter(d => d.status === 'draft').length;

  const getStatusIcon = (status: Dossier['status']) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'draft':
        return <FileText className="w-4 h-4 text-gray-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: Dossier['status']) => {
    const label = DOSSIER_STATUS_LABELS[status] || status;
    
    let variant: 'success' | 'warning' | 'error' | 'info' | 'neutral' = 'neutral';
    
    switch (status) {
      case 'completed':
      case 'approved':
        variant = 'success';
        break;
      case 'in_progress':
      case 'submitted':
        variant = 'info';
        break;
      case 'rejected':
        variant = 'error';
        break;
      case 'draft':
        variant = 'neutral';
        break;
      default:
        variant = 'warning';
    }
    
    return (
      <Badge variant={variant}>
        {label}
      </Badge>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" title="Dossiers Regulatorios" showCloseButton={false}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-600 mt-1">{product.name}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{totalDossiers}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedDossiers}</div>
            <div className="text-sm text-gray-600">Completados</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{inProgressDossiers}</div>
            <div className="text-sm text-gray-600">En Progreso</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{draftDossiers}</div>
            <div className="text-sm text-gray-600">Borradores</div>
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Buscar por país o fabricante..."
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Todos los estados</option>
          <option value="draft">Borrador</option>
          <option value="in_progress">En Progreso</option>
          <option value="completed">Completado</option>
          <option value="submitted">Enviado</option>
          <option value="approved">Aprobado</option>
          <option value="rejected">Rechazado</option>
        </select>
      </div>

      {/* Lista de Dossiers */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredDossiers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No se encontraron dossiers</p>
          </div>
        ) : (
                     filteredDossiers.map((dossier) => (
             <Card key={dossier.id} hover className="cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(dossier.status)}
                    <h3 className="font-semibold text-gray-900">{dossier.countryName}</h3>
                    {getStatusBadge(dossier.status)}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <p><strong>Fabricante:</strong> {dossier.manufacturerName}</p>
                    <p><strong>Actualizado:</strong> {format(new Date(dossier.updatedAt), 'PPp', { locale: es })}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${dossier.completionPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {dossier.completionPercentage}%
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onViewDossier(dossier)}
                  >
                    Ver Detalle
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary">
          Nuevo Dossier
        </Button>
      </div>
    </Modal>
  );
}; 