import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Workflows } from './pages/Workflows';
import { Registrations } from './pages/Registrations';
import { Reports } from './pages/Reports';
import { Users } from './pages/Users';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { TrialBanner } from './components/trial/TrialBanner';

function App() {
  // For demo purposes, we'll show the login page
  // In a real app, you'd have authentication state management
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }
  
  return (
    <Router>
      <div className="relative">
        <TrialBanner />
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/registrations" element={<Registrations />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/users" element={<Users />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <OnboardingWizard />
      </div>
    </Router>
  );
}

export default App;