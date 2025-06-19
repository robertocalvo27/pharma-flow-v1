import React, { useEffect } from 'react';
import { Pill, FileText, GitBranch, AlertTriangle } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { Charts } from '../components/dashboard/Charts';
import { useStore } from '../store';
import { mockProducts, mockWorkflows, mockDashboardStats } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const { dashboardStats, setDashboardStats, setProducts, setWorkflows } = useStore();
  
  useEffect(() => {
    // Simulate loading data
    setDashboardStats(mockDashboardStats);
    setProducts(mockProducts);
    setWorkflows(mockWorkflows);
  }, [setDashboardStats, setProducts, setWorkflows]);
  
  if (!dashboardStats) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Resumen general de productos farmacéuticos y workflows regulatorios
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Productos"
          value={dashboardStats.totalProducts}
          subtitle="Productos registrados"
          icon={Pill}
          color="blue"
          trend="up"
          trendValue="+12% este mes"
        />
        <StatsCard
          title="Registros Activos"
          value={dashboardStats.activeRegistrations}
          subtitle="Registros vigentes"
          icon={FileText}
          color="green"
          trend="up"
          trendValue="+8% este mes"
        />
        <StatsCard
          title="Workflows Pendientes"
          value={dashboardStats.pendingWorkflows}
          subtitle="En proceso"
          icon={GitBranch}
          color="yellow"
          trend="down"
          trendValue="-5% esta semana"
        />
        <StatsCard
          title="Próximos a Vencer"
          value={dashboardStats.expiringRegistrations}
          subtitle="Próximos 60 días"
          icon={AlertTriangle}
          color="red"
          trend="neutral"
          trendValue="Requieren atención"
        />
      </div>
      
      {/* Charts */}
      <Charts stats={dashboardStats} />
      
      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
};