import { create } from 'zustand';
import { ComplianceState } from '../types/compliance';
import { complianceMockData } from '../data/complianceData';

export const useComplianceStore = create<ComplianceState>((set, get) => ({
  // Data
  agencies: [],
  regulatoryUpdates: [],
  complianceAlerts: [],
  upcomingDeadlines: [],
  regulatoryCalendar: [],
  documentTemplates: [],
  countryGuides: [],
  
  // UI State
  selectedCountry: null,
  selectedAgency: null,
  alertsFilter: {
    severity: [],
    type: [],
    countries: [],
    isRead: null,
  },
  
  // User Preferences
  subscribedCountries: ['CO', 'MX', 'BR', 'AR', 'PE', 'CL'],
  alertPreferences: {
    enabledCountries: ['CO', 'MX', 'BR'],
    alertTypes: ['regulatory_change', 'deadline_approaching', 'new_requirement'],
    severityLevels: ['high', 'critical'],
    channels: [
      { type: 'email', enabled: true },
      { type: 'push', enabled: true },
      { type: 'sms', enabled: false }
    ],
    frequency: 'daily',
    quietHours: {
      start: '22:00',
      end: '08:00',
      timezone: 'America/Bogota'
    },
    emailDigest: true,
    smsAlerts: false
  },
  
  // Dashboard Stats
  dashboardStats: null,
  
  // Loading States
  isLoading: false,
  isLoadingAlerts: false,
  isLoadingUpdates: false,
  isLoadingDeadlines: false,
  
  // Actions
  fetchDashboardStats: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ 
        dashboardStats: complianceMockData.dashboardStats,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      set({ isLoading: false });
    }
  },

  fetchRegulatoryUpdates: async (countryCode?: string) => {
    set({ isLoadingUpdates: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      let updates = complianceMockData.updates;
      
      if (countryCode) {
        updates = updates.filter(update => update.countryCode === countryCode);
      }
      
      set({ 
        regulatoryUpdates: updates,
        isLoadingUpdates: false 
      });
    } catch (error) {
      console.error('Error fetching regulatory updates:', error);
      set({ isLoadingUpdates: false });
    }
  },

  fetchComplianceAlerts: async () => {
    set({ isLoadingAlerts: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      set({ 
        complianceAlerts: complianceMockData.alerts,
        isLoadingAlerts: false 
      });
    } catch (error) {
      console.error('Error fetching compliance alerts:', error);
      set({ isLoadingAlerts: false });
    }
  },

  fetchUpcomingDeadlines: async () => {
    set({ isLoadingDeadlines: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ 
        upcomingDeadlines: complianceMockData.deadlines,
        isLoadingDeadlines: false 
      });
    } catch (error) {
      console.error('Error fetching deadlines:', error);
      set({ isLoadingDeadlines: false });
    }
  },

  fetchDocumentTemplates: async (countryCode?: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 400));
      let templates = complianceMockData.documentTemplates;
      
      if (countryCode) {
        templates = templates.filter(template => template.countryCode === countryCode);
      }
      
      set({ 
        documentTemplates: templates,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching document templates:', error);
      set({ isLoading: false });
    }
  },

  fetchCountryGuides: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 700));
      set({ 
        countryGuides: complianceMockData.countryGuides,
        agencies: complianceMockData.agencies,
        regulatoryCalendar: complianceMockData.calendarEvents,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching country guides:', error);
      set({ isLoading: false });
    }
  },

  markAlertAsRead: (alertId: string) => {
    set(state => ({
      complianceAlerts: state.complianceAlerts.map(alert =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    }));
  },

  archiveAlert: (alertId: string) => {
    set(state => ({
      complianceAlerts: state.complianceAlerts.map(alert =>
        alert.id === alertId ? { ...alert, isArchived: true } : alert
      )
    }));
  },

  subscribeToCountry: (countryCode: string) => {
    set(state => ({
      subscribedCountries: state.subscribedCountries.includes(countryCode)
        ? state.subscribedCountries
        : [...state.subscribedCountries, countryCode]
    }));
  },

  unsubscribeFromCountry: (countryCode: string) => {
    set(state => ({
      subscribedCountries: state.subscribedCountries.filter(code => code !== countryCode)
    }));
  },

  updateAlertPreferences: (preferences) => {
    set(state => ({
      alertPreferences: { ...state.alertPreferences, ...preferences }
    }));
  },

  setSelectedCountry: (countryCode: string | null) => {
    set({ selectedCountry: countryCode });
  },

  setSelectedAgency: (agencyId: string | null) => {
    set({ selectedAgency: agencyId });
  },

  updateAlertsFilter: (filter) => {
    set(state => ({
      alertsFilter: { ...state.alertsFilter, ...filter }
    }));
  },
})); 