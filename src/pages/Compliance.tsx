import React, { useState } from 'react';
import { ComplianceCenter } from '../components/compliance/ComplianceCenter';
import { RegulatoryCalendar } from '../components/compliance/RegulatoryCalendar';
import { DocumentTemplates } from '../components/compliance/DocumentTemplates';
import { CountryGuides } from '../components/compliance/CountryGuides';
import { Calendar, FileText, BookOpen, BarChart3 } from 'lucide-react';

type TabType = 'dashboard' | 'calendar' | 'templates' | 'guides';

const Compliance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: BarChart3 },
    { id: 'calendar' as TabType, label: 'Calendario', icon: Calendar },
    { id: 'templates' as TabType, label: 'Plantillas', icon: FileText },
    { id: 'guides' as TabType, label: 'Guías por País', icon: BookOpen },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ComplianceCenter />;
      case 'calendar':
        return <RegulatoryCalendar />;
      case 'templates':
        return <DocumentTemplates />;
      case 'guides':
        return <CountryGuides />;
      default:
        return <ComplianceCenter />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Centro de Cumplimiento</h1>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Compliance; 