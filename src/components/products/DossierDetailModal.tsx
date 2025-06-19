import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight, FileText, Upload, Download, MessageCircle, Clock, CheckCircle, AlertCircle, FolderOpen, Activity } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Dossier, DossierSection } from '../../types';
import { DOSSIER_SECTIONS } from '../../utils/constants';
import { DossierTimeline } from './DossierTimeline';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DossierDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossier: Dossier;
}

type TabType = 'content' | 'timeline';

export const DossierDetailModal: React.FC<DossierDetailModalProps> = ({
  isOpen,
  onClose,
  dossier
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<TabType>('content');

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const getStatusIcon = (status: DossierSection['status']) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'pending':
        return <FileText className="w-4 h-4 text-gray-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: DossierSection['status']) => {
    let variant: 'success' | 'warning' | 'error' | 'info' | 'neutral' = 'neutral';
    let label = '';
    
    switch (status) {
      case 'completed':
      case 'approved':
        variant = 'success';
        label = 'Completado';
        break;
      case 'in_progress':
        variant = 'info';
        label = 'En Progreso';
        break;
      case 'pending':
        variant = 'neutral';
        label = 'Pendiente';
        break;
      case 'rejected':
        variant = 'error';
        label = 'Rechazado';
        break;
      default:
        variant = 'warning';
        label = status;
    }
    
    return <Badge variant={variant}>{label}</Badge>;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Crear secciones completas combinando las estándar con las del dossier
  const completeSections = DOSSIER_SECTIONS.map(standardSection => {
    const existingSection = dossier.sections.find(s => s.sectionNumber === standardSection.number);
    return existingSection || {
      id: `temp-${standardSection.number}`,
      dossierId: dossier.id,
      sectionNumber: standardSection.number,
      sectionName: standardSection.name,
      description: standardSection.description,
      status: 'pending' as const,
      documents: []
    };
  });

  const renderTabButton = (tab: TabType, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`
        flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
        ${activeTab === tab 
          ? 'bg-blue-100 text-blue-700 border border-blue-200' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }
      `}
    >
      {icon}
      {label}
    </button>
  );

  const renderDossierContent = () => (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {completeSections.map((section) => (
        <Card key={section.id} className="p-0">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection(section.id)}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2">
                {expandedSections.has(section.id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
                <span className="text-sm font-medium text-gray-500 min-w-[2rem]">
                  {section.sectionNumber}.
                </span>
              </div>
              {getStatusIcon(section.status)}
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{section.sectionName}</h4>
                <p className="text-sm text-gray-600">{section.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {section.documents.length} documento{section.documents.length !== 1 ? 's' : ''}
              </span>
              {getStatusBadge(section.status)}
            </div>
          </div>

          {/* Contenido expandido de la sección */}
          {expandedSections.has(section.id) && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              {section.documents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No hay documentos en esta sección</p>
                  <Button variant="primary" size="sm" className="mt-3">
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Documento
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {section.documents.map((document) => (
                    <div key={document.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-900">{document.fileName}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>v{document.version}</span>
                            <span>{formatFileSize(document.fileSize)}</span>
                            <span>Por {document.uploadedByName}</span>
                            <span>{format(new Date(document.uploadedAt), 'PPp', { locale: es })}</span>
                          </div>
                          {document.notes && (
                            <p className="text-sm text-gray-600 mt-1">{document.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(document.status as any)}
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="secondary" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Nueva Versión
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" title={`Dossier - ${dossier.countryName}`} showCloseButton={false}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-600">{dossier.productName}</p>
          <p className="text-sm text-gray-500">{dossier.manufacturerName}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-500">Progreso</div>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${dossier.completionPercentage}%` }}
                />
              </div>
              <span className="text-sm font-medium">{dossier.completionPercentage}%</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Información del Dossier */}
      <Card className="mb-6 p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">País:</span>
            <span className="ml-2">{dossier.countryName}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Estado:</span>
            <span className="ml-2">{getStatusBadge(dossier.status as any)}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Creado:</span>
            <span className="ml-2">{format(new Date(dossier.createdAt), 'PPp', { locale: es })}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Actualizado:</span>
            <span className="ml-2">{format(new Date(dossier.updatedAt), 'PPp', { locale: es })}</span>
          </div>
        </div>
      </Card>

      {/* Sistema de Tabs */}
      <div className="mb-6">
        <div className="flex gap-2 border-b border-gray-200 pb-4">
          {renderTabButton('content', <FolderOpen className="w-4 h-4" />, 'Contenido del Dossier')}
          {renderTabButton('timeline', <Activity className="w-4 h-4" />, 'Timeline de Aprobación')}
        </div>
      </div>

      {/* Contenido de los Tabs */}
      <div className={activeTab === 'timeline' ? 'h-96' : 'min-h-[400px]'}>
        {activeTab === 'content' && renderDossierContent()}
        {activeTab === 'timeline' && (
          <DossierTimeline 
            dossierId={dossier.id} 
            countryName={dossier.countryName}
          />
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          {activeTab === 'content' && (
            <>
              {completeSections.filter(s => s.status === 'completed').length} de {completeSections.length} secciones completadas
            </>
          )}
          {activeTab === 'timeline' && (
            <>
              Proceso de aprobación en curso - Paso 4 de 9 completados
            </>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="primary">
            {activeTab === 'content' ? 'Exportar Dossier' : 'Exportar Timeline'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}; 