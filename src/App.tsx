import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { TrialBanner } from './components/trial/TrialBanner';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Workflows } from './pages/Workflows';
import Compliance from './pages/Compliance';
import { Registrations } from './pages/Registrations';
import { Reports } from './pages/Reports';
import { Users } from './pages/Users';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <TrialBanner />
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/products" element={
            <ProtectedRoute>
              <Layout>
                <TrialBanner />
                <Products />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/workflows" element={
            <ProtectedRoute>
              <Layout>
                <TrialBanner />
                <Workflows />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/compliance" element={
            <ProtectedRoute>
              <Layout>
                <TrialBanner />
                <Compliance />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/registrations" element={
            <ProtectedRoute>
              <Layout>
                <TrialBanner />
                <Registrations />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute>
              <Layout>
                <TrialBanner />
                <Reports />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/users" element={
            <ProtectedRoute requiredRole="manager">
              <Layout>
                <TrialBanner />
                <Users />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Layout>
                <TrialBanner />
                <Notifications />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout>
                <TrialBanner />
                <Settings />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Global Components */}
        <OnboardingWizard />
      </Router>
    </AuthProvider>
  );
}

export default App;