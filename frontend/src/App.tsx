import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Sidebar } from './components/shared/Sidebar';
import { Navbar } from './components/shared/Navbar';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { Spinner } from './components/shared/Badges';

// Dedicated Full-Featured Pages
import PortalSelection from './pages/PortalSelection';
import CitizenLogin from './pages/auth/CitizenLogin';
import AuthorityLogin from './pages/auth/AuthorityLogin';

import CitizenWelcome from './pages/citizen/CitizenWelcome';
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import CommandCenter from './pages/CommandCenter';
import LiveRiskMap from './pages/LiveRiskMap';
import { Locations } from './pages/Locations';
import LocationDetails from './pages/LocationDetails';
import RainfallMonitoring from './pages/RainfallMonitoring';
import AlertCenter from './pages/AlertCenter';
import TerrainAnalysis from './pages/TerrainAnalysis';
import SoilAnalysis from './pages/SoilAnalysis';
import HistoricalLandslides from './pages/HistoricalLandslides';
import InfrastructureExposure from './pages/InfrastructureExposure';
import RiskAnalytics from './pages/RiskAnalytics';
import NotificationsPage from './pages/NotificationsPage';
import ResponseCenter from './pages/ResponseCenter';
import DataSourcesPage from './pages/DataSourcesPage';
import AdminPanel from './pages/AdminPanel';
import SettingsPage from './pages/SettingsPage';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden w-full md:ml-60">
        <Navbar />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const { initialize, initialized } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-screen bg-surface">
        <div className="flex flex-col items-center gap-3">
          <Spinner size={32} />
          <div className="text-slate-400 text-sm">Initializing Landslide Watch System...</div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthenticated Root */}
        <Route path="/" element={<PortalSelection />} />
        
        {/* Auth Pages */}
        <Route path="/citizen/login" element={<CitizenLogin />} />
        <Route path="/authority/login" element={<AuthorityLogin />} />
        {/* Redirect old login to root */}
        <Route path="/login" element={<Navigate to="/" replace />} />

        {/* Multi-Page Citizen Experience */}
        <Route
          path="/citizen/welcome"
          element={
            <ProtectedRoute minRole="citizen">
              <CitizenWelcome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/citizen/dashboard"
          element={
            <ProtectedRoute minRole="citizen">
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Base /citizen route fallback */}
        <Route
          path="/citizen"
          element={<Navigate to="/citizen/welcome" replace />}
        />

        {/* Authority Protected Pages */}
        <Route
          path="/authority"
          element={
            <ProtectedRoute minRole="authority">
              <AppLayout>
                <CommandCenter />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/map"
          element={
            <ProtectedRoute minRole="authority">
              <AppLayout>
                <LiveRiskMap />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/locations"
          element={
            <ProtectedRoute minRole="authority">
              <AppLayout>
                <Locations />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/locations/:id"
          element={
            <ProtectedRoute minRole="authority">
              <AppLayout>
                <LocationDetails />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/rainfall"
          element={
            <ProtectedRoute minRole="authority">
              <AppLayout>
                <RainfallMonitoring />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/terrain"
          element={
            <ProtectedRoute minRole="authority">
              <AppLayout>
                <TerrainAnalysis />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/soil"
          element={
            <ProtectedRoute minRole="authority">
              <AppLayout>
                <SoilAnalysis />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/landslides"
          element={
            <ProtectedRoute minRole="authority">
              <AppLayout>
                <HistoricalLandslides />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/infrastructure"
          element={
            <ProtectedRoute minRole="authority">
              <AppLayout>
                <InfrastructureExposure />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute minRole="authority">
              <AppLayout>
                <RiskAnalytics />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/alerts"
          element={
            <ProtectedRoute minRole="authority">
              <AppLayout>
                <AlertCenter />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute minRole="authority">
              <AppLayout>
                <NotificationsPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/response"
          element={
            <ProtectedRoute minRole="authority">
              <AppLayout>
                <ResponseCenter />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/datasources"
          element={
            <ProtectedRoute minRole="authority">
              <AppLayout>
                <DataSourcesPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute minRole="admin">
              <AppLayout>
                <AdminPanel />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute minRole="admin">
              <AppLayout>
                <SettingsPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
