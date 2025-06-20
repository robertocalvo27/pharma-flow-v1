import React, { useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Calendar, 
  FileText, 
  TrendingUp,
  Globe,
  Bell,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useComplianceStore } from '../../store/complianceStore';
import { ComplianceAlerts } from './ComplianceAlerts';
import { RegulatoryUpdates } from './RegulatoryUpdates';
import { UpcomingDeadlines } from './UpcomingDeadlines';

export const ComplianceCenter: React.FC = () => {
  const {
    dashboardStats,
    isLoading,
    fetchDashboardStats,
    fetchComplianceAlerts,
    fetchRegulatoryUpdates,
    fetchUpcomingDeadlines,
    subscribedCountries
  } = useComplianceStore();

  useEffect(() => {
    fetchDashboardStats();
    fetchComplianceAlerts();
    fetchRegulatoryUpdates();
    fetchUpcomingDeadlines();
  }, [fetchDashboardStats, fetchComplianceAlerts, fetchRegulatoryUpdates, fetchUpcomingDeadlines]);

  if (isLoading || !dashboardStats) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  const getComplianceScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplianceScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            Centro de Cumplimiento
          </h1>
          <p className="text-gray-600 mt-1">
            Inteligencia regulatoria para Latinoamérica
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="info" className="text-sm">
            {subscribedCountries.length} países suscritos
          </Badge>
          <Button variant="secondary" size="sm">
            <Globe className="w-4 h-4 mr-2" />
            Configurar Países
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Compliance Score */}
        <Card className={`p-6 ${getComplianceScoreBg(dashboardStats.complianceScore)}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Score de Cumplimiento</p>
              <p className={`text-3xl font-bold ${getComplianceScoreColor(dashboardStats.complianceScore)}`}>
                {dashboardStats.complianceScore}%
              </p>
            </div>
            <TrendingUp className={`w-8 h-8 ${getComplianceScoreColor(dashboardStats.complianceScore)}`} />
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  dashboardStats.complianceScore >= 80 ? 'bg-green-500' :
                  dashboardStats.complianceScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${dashboardStats.complianceScore}%` }}
              ></div>
            </div>
          </div>
        </Card>

        {/* Critical Alerts */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alertas Críticas</p>
              <p className="text-3xl font-bold text-red-600">
                {dashboardStats.criticalAlerts}
              </p>
              <p className="text-sm text-gray-500">
                de {dashboardStats.totalAlerts} total
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Próximos Vencimientos</p>
              <p className="text-3xl font-bold text-orange-600">
                {dashboardStats.upcomingDeadlines}
              </p>
              {dashboardStats.overdueDeadlines > 0 && (
                <p className="text-sm text-red-500">
                  {dashboardStats.overdueDeadlines} vencidos
                </p>
              )}
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </Card>

        {/* Recent Updates */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Actualizaciones</p>
              <p className="text-3xl font-bold text-blue-600">
                {dashboardStats.recentUpdates}
              </p>
              <p className="text-sm text-gray-500">últimos 30 días</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
      </div>

      {/* Alerts by Country */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Alertas por País</h3>
            <Button variant="secondary" size="sm">
              Ver Todas
            </Button>
          </div>
          <div className="space-y-3">
            {dashboardStats.alertsByCountry.map((country) => (
              <div key={country.countryCode} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {country.countryCode}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">{country.countryName}</span>
                </div>
                <Badge variant={country.count > 3 ? 'error' : country.count > 1 ? 'warning' : 'neutral'}>
                  {country.count} alertas
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts by Severity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas por Severidad</h3>
          <div className="space-y-3">
            {dashboardStats.alertsBySeverity.map((severity) => (
              <div key={severity.severity} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: severity.color }}
                  ></div>
                  <span className="text-sm font-medium capitalize">
                    {severity.severity === 'critical' ? 'Crítica' :
                     severity.severity === 'high' ? 'Alta' :
                     severity.severity === 'medium' ? 'Media' : 'Baja'}
                  </span>
                </div>
                <span className="text-sm font-semibold">{severity.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Alerts */}
        <ComplianceAlerts />
        
        {/* Regulatory Updates */}
        <RegulatoryUpdates />
      </div>

      {/* Upcoming Deadlines */}
      <UpcomingDeadlines />
    </div>
  );
}; 