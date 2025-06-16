import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronDown, 
  Clock, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Search,
  Filter,
  Globe,
  Users,
  Calendar,
  Download,
  Star,
  Bookmark
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useComplianceStore } from '../../store/complianceStore';
import { CountryGuide } from '../../types/compliance';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  cost?: string;
  requiredDocuments: string[];
  tips: string[];
  isCompleted?: boolean;
}

export const CountryGuides: React.FC = () => {
  const { 
    countryGuides, 
    isLoading,
    fetchCountryGuides 
  } = useComplianceStore();

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedGuide, setSelectedGuide] = useState<CountryGuide | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchCountryGuides();
  }, [fetchCountryGuides]);

  useEffect(() => {
    if (countryGuides.length > 0 && !selectedCountry) {
      setSelectedCountry(countryGuides[0].countryCode);
      setSelectedGuide(countryGuides[0]);
    }
  }, [countryGuides, selectedCountry]);

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    const guide = countryGuides.find(g => g.countryCode === countryCode);
    setSelectedGuide(guide || null);
    setExpandedSteps(new Set());
  };

  const toggleStep = (stepId: string) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedSteps(newExpanded);
  };

  const getCountryFlag = (countryCode: string) => {
    const flags: { [key: string]: string } = {
      'CO': '🇨🇴',
      'MX': '🇲🇽',
      'BR': '🇧🇷',
      'AR': '🇦🇷',
      'PE': '🇵🇪',
      'CL': '🇨🇱'
    };
    return flags[countryCode] || '🌎';
  };

  const getCountryName = (countryCode: string) => {
    const countryNames: { [key: string]: string } = {
      'CO': 'Colombia',
      'MX': 'México',
      'BR': 'Brasil',
      'AR': 'Argentina',
      'PE': 'Perú',
      'CL': 'Chile'
    };
    return countryNames[countryCode] || countryCode;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'registration': return '📋';
      case 'clinical_trial': return '🧪';
      case 'import_export': return '📦';
      case 'manufacturing': return '🏭';
      case 'pharmacovigilance': return '⚠️';
      case 'labeling': return '🏷️';
      default: return '📄';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'registration': return 'Registro de Productos';
      case 'clinical_trial': return 'Ensayos Clínicos';
      case 'import_export': return 'Importación/Exportación';
      case 'manufacturing': return 'Manufactura';
      case 'pharmacovigilance': return 'Farmacovigilancia';
      case 'labeling': return 'Etiquetado';
      default: return category;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'neutral';
    }
  };

  const getDifficultyName = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return difficulty;
    }
  };

  // Mock process steps for demonstration
  const getProcessSteps = (guide: CountryGuide): ProcessStep[] => {
    if (guide.category === 'registration') {
      return [
        {
          id: '1',
          title: 'Preparación de Documentación Técnica',
          description: 'Recopilación y preparación de toda la documentación técnica requerida para el registro sanitario.',
          estimatedTime: '2-4 semanas',
          cost: '$2,000 - $5,000',
          requiredDocuments: [
            'Certificado de Libre Venta',
            'Información técnica del producto',
            'Estudios de estabilidad',
            'Especificaciones de calidad',
            'Información del fabricante'
          ],
          tips: [
            'Asegúrate de que todos los documentos estén apostillados',
            'Traduce los documentos al idioma local si es requerido',
            'Verifica que los estudios de estabilidad cumplan con las condiciones climáticas locales'
          ]
        },
        {
          id: '2',
          title: 'Presentación de Solicitud',
          description: 'Envío formal de la solicitud de registro sanitario ante la autoridad regulatoria.',
          estimatedTime: '1-2 semanas',
          cost: '$500 - $1,500',
          requiredDocuments: [
            'Formulario de solicitud completo',
            'Comprobante de pago de tasas',
            'Documentación técnica',
            'Poder legal (si aplica)'
          ],
          tips: [
            'Revisa que el formulario esté completamente diligenciado',
            'Conserva el comprobante de radicación',
            'Mantén copias de todos los documentos enviados'
          ]
        },
        {
          id: '3',
          title: 'Evaluación Técnica',
          description: 'Período de evaluación por parte de la autoridad regulatoria.',
          estimatedTime: '3-6 meses',
          requiredDocuments: [],
          tips: [
            'Mantente disponible para responder consultas',
            'Prepara respuestas a posibles observaciones',
            'Monitorea el estado de la solicitud regularmente'
          ]
        },
        {
          id: '4',
          title: 'Respuesta a Observaciones',
          description: 'Atención y respuesta a las observaciones realizadas por la autoridad.',
          estimatedTime: '2-4 semanas',
          requiredDocuments: [
            'Respuestas técnicas detalladas',
            'Documentación adicional solicitada',
            'Estudios complementarios (si aplica)'
          ],
          tips: [
            'Responde dentro del plazo establecido',
            'Proporciona información clara y completa',
            'Incluye referencias científicas cuando sea necesario'
          ]
        },
        {
          id: '5',
          title: 'Aprobación y Emisión',
          description: 'Emisión del registro sanitario una vez aprobada la solicitud.',
          estimatedTime: '2-4 semanas',
          cost: '$200 - $800',
          requiredDocuments: [
            'Pago de tasas de emisión',
            'Actualización de información (si aplica)'
          ],
          tips: [
            'Verifica que todos los datos en el registro sean correctos',
            'Solicita copias adicionales si las necesitas',
            'Programa las renovaciones futuras'
          ]
        }
      ];
    }
    return [];
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            Guías por País
          </h3>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Descargar Guía
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Country Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {countryGuides.map((guide) => (
            <button
              key={guide.countryCode}
              onClick={() => handleCountryChange(guide.countryCode)}
              className={`p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                selectedCountry === guide.countryCode
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{getCountryFlag(guide.countryCode)}</div>
              <div className="text-sm font-medium text-gray-900">
                {getCountryName(guide.countryCode)}
              </div>
              <div className="text-xs text-gray-500">
                {guide.processes?.length || 0} procesos
              </div>
            </button>
          ))}
        </div>

        {selectedGuide && (
          <>
            {/* Guide Overview */}
            <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getCountryFlag(selectedGuide.countryCode)}</span>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {getCountryName(selectedGuide.countryCode)}
                    </h4>
                    <p className="text-gray-600">
                      Autoridad Regulatoria: {selectedGuide.regulatoryAuthority}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant={getDifficultyColor(selectedGuide.difficulty) as any}>
                    {getDifficultyName(selectedGuide.difficulty)}
                  </Badge>
                  <Badge variant="neutral">
                    {getCategoryName(selectedGuide.category)}
                  </Badge>
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                {selectedGuide.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Tiempo estimado: {selectedGuide.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>Costo aproximado: {selectedGuide.estimatedCost}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{selectedGuide.requiredDocuments?.length || 0} documentos requeridos</span>
                </div>
              </div>

              {selectedGuide.officialUrl && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <a
                    href={selectedGuide.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visitar sitio oficial de {selectedGuide.regulatoryAuthority}
                  </a>
                </div>
              )}
            </Card>

            {/* Process Steps */}
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Proceso Paso a Paso
              </h4>

              <div className="space-y-4">
                {getProcessSteps(selectedGuide).map((step, index) => (
                  <div key={step.id} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            step.isCompleted 
                              ? 'bg-green-500 text-white' 
                              : 'bg-blue-500 text-white'
                          }`}>
                            {step.isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">{step.title}</h5>
                            <p className="text-sm text-gray-600">{step.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="text-right text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {step.estimatedTime}
                            </div>
                            {step.cost && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                {step.cost}
                              </div>
                            )}
                          </div>
                          {expandedSteps.has(step.id) ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {expandedSteps.has(step.id) && (
                      <div className="px-4 pb-4 border-t bg-gray-50">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                          {/* Required Documents */}
                          {step.requiredDocuments.length > 0 && (
                            <div>
                              <h6 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Documentos Requeridos
                              </h6>
                              <ul className="space-y-1">
                                {step.requiredDocuments.map((doc, docIndex) => (
                                  <li key={docIndex} className="text-sm text-gray-600 flex items-start gap-2">
                                    <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                    {doc}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tips */}
                          {step.tips.length > 0 && (
                            <div>
                              <h6 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                Consejos Importantes
                              </h6>
                              <ul className="space-y-1">
                                {step.tips.map((tip, tipIndex) => (
                                  <li key={tipIndex} className="text-sm text-gray-600 flex items-start gap-2">
                                    <Star className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2">
                            <Button variant="primary" size="sm">
                              Marcar como Completado
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Descargar Checklist
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Additional Resources */}
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                Recursos Adicionales
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <h5 className="font-medium text-gray-900 mb-2">Contacto Regulatorio</h5>
                  <p className="text-sm text-gray-600 mb-2">
                    Información de contacto directo con la autoridad regulatoria
                  </p>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Ver Contactos
                  </Button>
                </div>

                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <h5 className="font-medium text-gray-900 mb-2">Formularios Oficiales</h5>
                  <p className="text-sm text-gray-600 mb-2">
                    Descarga los formularios oficiales más actualizados
                  </p>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Descargar
                  </Button>
                </div>

                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <h5 className="font-medium text-gray-900 mb-2">Calculadora de Costos</h5>
                  <p className="text-sm text-gray-600 mb-2">
                    Estima los costos totales de tu proceso regulatorio
                  </p>
                  <Button variant="ghost" size="sm">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Calcular
                  </Button>
                </div>

                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <h5 className="font-medium text-gray-900 mb-2">Consultor Especializado</h5>
                  <p className="text-sm text-gray-600 mb-2">
                    Conecta con expertos locales en regulación farmacéutica
                  </p>
                  <Button variant="ghost" size="sm">
                    <Users className="w-4 h-4 mr-1" />
                    Contactar
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}
      </Card>
    </div>
  );
}; 