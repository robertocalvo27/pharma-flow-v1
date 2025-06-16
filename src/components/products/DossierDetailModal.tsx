import React, { useState } from 'react';
import { X, ArrowLeft, Clock, CheckCircle, AlertCircle, FileText, MessageSquare, Upload } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Dossier, DossierSection } from '../../types';
import { DOSSIER_STATUS_LABELS, DOSSIER_STATUS_COLORS } from '../../utils/constants';

interface DossierDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossier: Dossier;
  onBack: () => void;
  onSectionUpdate: (sectionId: string, updates: Partial<DossierSection>) => void;
  onDocumentUpload: (sectionId: string, files: FileList) => void;
}

export const DossierDetailModal: React.FC<DossierDetailModalProps> = ({
  isOpen,
  onClose,
  dossier,
  onBack,
  onSectionUpdate,
  onDocumentUpload
}) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showComments, setShowComments] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
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

  const getSectionStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'border-green-200 bg-green-50';
      case 'in_progress':
        return 'border-blue-200 bg-blue-50';
      case 'rejected':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const handleSectionClick = (sectionId: string) => {
    setSelectedSection(selectedSection === sectionId ? null : sectionId);
  };

  const handleStatusChange = (sectionId: string, newStatus: string) => {
    onSectionUpdate(sectionId, { 
      status: newStatus as any,
      completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
    });
  };

  const mockFileUpload = (sectionId: string) => {
    // Simular upload de archivo
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.tiff';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        onDocumentUpload(sectionId, files);
      }
    };
    input.click();
  };

  return (
        <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="2xl"
    >
                <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              icon={ArrowLeft}
              onClick={onBack}
            >
              Volver a Dossiers
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={X}
              onClick={onClose}
            >
            </Button>
          </div>
          
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {dossier.productName}
              </h2>
              <div className="space-y-1">
                <p className="text-lg text-blue-600 font-semibold">
                  📍 {dossier.countryName}
                </p>
                <p className="text-gray-600">
                  🏭 {dossier.manufacturerName}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              {getStatusBadge(dossier.status)}
              <div className="mt-2">
                <div className="text-sm text-gray-600">Progreso General</div>
                <div className="text-2xl font-bold text-blue-600">
                  {dossier.completionPercentage}%
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${dossier.completionPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Secciones completadas: {dossier.sections.filter(s => s.status === 'completed').length}/12</span>
              <span>Actualizado: {new Date(dossier.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Sections List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {dossier.sections.map((section) => (
            <Card 
              key={section.id}
              className={`transition-all duration-200 ${getSectionStatusColor(section.status)} ${
                selectedSection === section.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="p-5">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleSectionClick(section.id)}
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(section.status)}
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {section.sectionNumber}. {section.sectionName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      📄 {section.documents.length} docs
                    </span>
                    {getStatusBadge(section.status)}
                  </div>
                </div>

                {/* Expanded Section Details */}
                {selectedSection === section.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                    
                    {/* Documents List */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Documentos ({section.documents.length})</h4>
                      {section.documents.length > 0 ? (
                        <div className="space-y-2">
                          {section.documents.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-2 bg-white rounded border">
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4 text-gray-400" />
                                <span className="text-sm">{doc.fileName}</span>
                                <Badge variant="neutral" size="sm">v{doc.version}</Badge>
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(doc.uploadedAt).toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                          <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">No hay documentos subidos</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="space-x-2">
                        <Button
                          size="sm"
                          icon={Upload}
                          onClick={() => mockFileUpload(section.id)}
                        >
                          Subir Documento
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={MessageSquare}
                          onClick={() => setShowComments(showComments === section.id ? null : section.id)}
                        >
                          Comentarios
                        </Button>
                      </div>
                      
                      <div className="space-x-2">
                        {section.status !== 'completed' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleStatusChange(section.id, 'completed')}
                          >
                            Marcar Completa
                          </Button>
                        )}
                        {section.status === 'completed' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(section.id, 'in_progress')}
                          >
                            Marcar Pendiente
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Comments Section */}
                    {showComments === section.id && (
                      <div className="border-t border-gray-200 pt-4">
                        <h5 className="font-medium text-gray-900 mb-2">Comentarios y Notas</h5>
                        <div className="bg-white rounded border p-3">
                          <textarea
                            className="w-full border-0 resize-none focus:ring-0 text-sm"
                            placeholder="Agregar comentario o nota sobre esta sección..."
                            rows={3}
                            defaultValue={section.notes || ''}
                          />
                          <div className="flex justify-end mt-2">
                            <Button size="sm">
                              Guardar Comentario
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Última actualización: {new Date(dossier.updatedAt).toLocaleString()}
            </div>
            <div className="space-x-2">
              <Button variant="secondary" onClick={onBack}>
                Cerrar
              </Button>
              <Button>
                Enviar para Revisión
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}; 