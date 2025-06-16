import React, { useState } from 'react';
import { X, Plus, Search, Filter, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Product, Dossier, DossierSection } from '../../types';
import { DOSSIER_STATUS_LABELS, DOSSIER_STATUS_COLORS } from '../../utils/constants';
import { DossierDetailModal } from './DossierDetailModal';

interface DossiersModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  dossiers: Dossier[];
  onCreateDossier: (productId: string, manufacturerId: string, countryCode: string) => void;
  onViewDossier: (dossier: Dossier) => void;
}

export const DossiersModal: React.FC<DossiersModalProps> = ({
  isOpen,
  onClose,
  product,
  dossiers,
  onCreateDossier,
  onViewDossier
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [manufacturerFilter, setManufacturerFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedDossier, setSelectedDossier] = useState<Dossier | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock data para países y fabricantes
  const countries = [
    { value: '', label: 'Todos los países' },
    { value: 'CR', label: 'Costa Rica' },
    { value: 'GT', label: 'Guatemala' },
    { value: 'PA', label: 'Panamá' },
    { value: 'SV', label: 'El Salvador' },
    { value: 'NI', label: 'Nicaragua' },
    { value: 'HN', label: 'Honduras' }
  ];

  const manufacturers = [
    { value: '', label: 'Todos los fabricantes' },
    { value: 'lab1', label: 'Laboratorios Farmex S.A.' },
    { value: 'lab2', label: 'Biotech Pharmaceuticals Ltd.' },
    { value: 'lab3', label: 'Pharma Costa Rica' },
    { value: 'lab4', label: 'Central American Labs' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'draft', label: 'Borrador' },
    { value: 'in_progress', label: 'En Progreso' },
    { value: 'completed', label: 'Completado' },
    { value: 'submitted', label: 'Enviado' },
    { value: 'approved', label: 'Aprobado' },
    { value: 'rejected', label: 'Rechazado' }
  ];

  const filteredDossiers = dossiers.filter((dossier) => {
    const matchesSearch = dossier.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dossier.manufacturerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !countryFilter || dossier.countryCode === countryFilter;
    const matchesManufacturer = !manufacturerFilter || dossier.manufacturerId === manufacturerFilter;
    const matchesStatus = !statusFilter || dossier.status === statusFilter;
    
    return matchesSearch && matchesCountry && matchesManufacturer && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileText className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'completed':
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const color = DOSSIER_STATUS_COLORS[status as keyof typeof DOSSIER_STATUS_COLORS] || 'gray';
    const label = DOSSIER_STATUS_LABELS[status as keyof typeof DOSSIER_STATUS_LABELS] || status;
    
    const variants = {
      gray: 'neutral' as const,
      blue: 'info' as const,
      green: 'success' as const,
      yellow: 'warning' as const,
      red: 'error' as const
    };

    return (
      <Badge variant={variants[color] || 'neutral'}>
        {label}
      </Badge>
    );
  };

  const handleDossierClick = (dossier: Dossier) => {
    setSelectedDossier(dossier);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedDossier(null);
  };

  const handleBackToList = () => {
    setShowDetailModal(false);
    setSelectedDossier(null);
  };

  const handleSectionUpdate = (sectionId: string, updates: Partial<DossierSection>) => {
    console.log('Section update:', sectionId, updates);
    // Aquí actualizarías el estado del dossier/sección
  };

  const handleDocumentUpload = (sectionId: string, files: FileList) => {
    console.log('Document upload:', sectionId, files);
    // Aquí manejarías la subida de documentos
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Dossiers - ${product.name}`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Header Info */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">
                {product.name}
              </h3>
              <p className="text-blue-700">
                {product.activeIngredient} • {product.concentration} • {product.pharmaceuticalForm}
              </p>
            </div>
            <Button
              icon={Plus}
              onClick={() => onCreateDossier(product.id, '', '')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Nuevo Dossier
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            placeholder="Buscar por país o fabricante..."
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            options={countries}
          />
          <Select
            value={manufacturerFilter}
            onChange={(e) => setManufacturerFilter(e.target.value)}
            options={manufacturers}
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
          />
        </div>

        {/* Dossiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {filteredDossiers.length > 0 ? (
            filteredDossiers.map((dossier) => (
              <Card key={dossier.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(dossier.status)}
                      <div>
                        <h4 className="font-semibold text-gray-900">{dossier.countryName}</h4>
                        <p className="text-sm text-gray-600">{dossier.manufacturerName}</p>
                      </div>
                    </div>
                    {getStatusBadge(dossier.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progreso:</span>
                      <span className="font-medium">{dossier.completionPercentage}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${dossier.completionPercentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Secciones: {dossier.sections.filter(s => s.status === 'completed').length}/12</span>
                      <span>Act: {new Date(dossier.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDossierClick(dossier)}
                      className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No se encontraron dossiers
              </h3>
              <p className="text-gray-600 mb-4">
                {dossiers.length === 0 
                  ? 'Este producto aún no tiene dossiers creados.'
                  : 'No hay dossiers que coincidan con los filtros aplicados.'
                }
              </p>
              {dossiers.length === 0 && (
                <Button
                  icon={Plus}
                  onClick={() => onCreateDossier(product.id, '', '')}
                >
                  Crear Primer Dossier
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Summary */}
        {dossiers.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{dossiers.length}</div>
                <div className="text-sm text-gray-600">Total Dossiers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {dossiers.filter(d => d.status === 'approved').length}
                </div>
                <div className="text-sm text-gray-600">Aprobados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {dossiers.filter(d => d.status === 'in_progress').length}
                </div>
                <div className="text-sm text-gray-600">En Progreso</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {dossiers.filter(d => d.status === 'draft').length}
                </div>
                <div className="text-sm text-gray-600">Borradores</div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Dossier Detail Modal */}
      {selectedDossier && (
        <DossierDetailModal
          isOpen={showDetailModal}
          onClose={handleCloseDetailModal}
          dossier={selectedDossier}
          onBack={handleBackToList}
          onSectionUpdate={handleSectionUpdate}
          onDocumentUpload={handleDocumentUpload}
        />
      )}
    </Modal>
  );
}; 