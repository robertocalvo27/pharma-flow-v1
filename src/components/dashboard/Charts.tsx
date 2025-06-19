import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card } from '../ui/Card';
import { DashboardStats } from '../../types';

interface ChartsProps {
  stats: DashboardStats;
}

export const Charts: React.FC<ChartsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Registrations Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Registros y Renovaciones Mensuales
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.monthlyRegistrations}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="registrations" fill="#2563EB" name="Registros" />
            <Bar dataKey="renewals" fill="#059669" name="Renovaciones" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      
      {/* Workflow Distribution */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Distribución de Workflows
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={stats.workflowDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {stats.workflowDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center mt-4 space-x-4">
          {stats.workflowDistribution.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};