import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Eye,
  Copy,
  Edit,
  Trash2,
  Plus,
  Tag,
  Globe,
  CheckCircle
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useComplianceStore } from '../../store/complianceStore';
import { DocumentTemplate } from '../../types/compliance';

export const DocumentTemplates: React.FC = () => {
  const { 
    documentTemplates, 
    isLoading,
    fetchCountryGuides 
  } = useComplianceStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchCountryGuides();
  }, [fetchCountryGuides]);

  // Filter and sort templates
  const filteredTemplates = documentTemplates
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesCountry = selectedCountry === 'all' || template.countryCode === selectedCountry;
      
      return matchesSearch && matchesCategory && matchesCountry;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'lastUpdated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'downloads':
          return b.downloadCount - a.downloadCount;
        default:
          return 0;
      }
    });

  // Get unique categories and countries for filters
  const categories = [...new Set(documentTemplates.map(t => t.category))];
  const countries = [...new Set(documentTemplates.map(t => t.countryCode))];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'registration': return '📋';
      case 'clinical_trial': return '🧪';
      case 'quality_control': return '✅';
      case 'pharmacovigilance': return '⚠️';
      case 'labeling': return '🏷️';
      case 'import_export': return '📦';
      case 'manufacturing': return '🏭';
      case 'inspection': return '🔍';
      default: return '📄';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'registration': return 'Registro';
      case 'clinical_trial': return 'Ensayos Clínicos';
      case 'quality_control': return 'Control de Calidad';
      case 'pharmacovigilance': return 'Farmacovigilancia';
      case 'labeling': return 'Etiquetado';
      case 'import_export': return 'Importación/Exportación';
      case 'manufacturing': return 'Manufactura';
      case 'inspection': return 'Inspección';
      default: return category;
    }
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
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
            <FileText className="w-5 h-5 text-blue-500" />
            Biblioteca de Plantillas
          </h3>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Plantilla
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar plantillas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {getCategoryName(category)}
                </option>
              ))}
            </select>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los países</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {getCountryName(country)}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Nombre</option>
              <option value="category">Categoría</option>
              <option value="lastUpdated">Última actualización</option>
              <option value="downloads">Descargas</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            {filteredTemplates.length} plantilla{filteredTemplates.length !== 1 ? 's' : ''} encontrada{filteredTemplates.length !== 1 ? 's' : ''}
          </p>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              Lista
            </Button>
          </div>
        </div>

        {/* Templates Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                    <Badge variant="neutral" size="sm">
                      {getCountryName(template.countryCode)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {template.isFavorite && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    {template.isVerified && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {template.name}
                </h4>

                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {template.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {template.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="secondary" size="sm">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(template.lastUpdated)}
                  </span>
                  <span>{formatFileSize(template.fileSize)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="primary" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    Descargar
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mt-2 text-xs text-gray-500 text-center">
                  {template.downloadCount} descargas
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {template.name}
                        </h4>
                        {template.isFavorite && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        {template.isVerified && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 truncate mb-2">
                        {template.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <Badge variant="neutral" size="sm">
                          {getCountryName(template.countryCode)}
                        </Badge>
                        <span>{getCategoryName(template.category)}</span>
                        <span>{formatDate(template.lastUpdated)}</span>
                        <span>{formatFileSize(template.fileSize)}</span>
                        <span>{template.downloadCount} descargas</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="primary" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Descargar
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron plantillas
            </h4>
            <p className="text-gray-600 mb-4">
              Intenta ajustar tus filtros de búsqueda o crear una nueva plantilla.
            </p>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Crear Nueva Plantilla
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}; 