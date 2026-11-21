import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SanitrackProvider } from './context/SanitrackContext';
import { DemoBanner } from './components/common/DemoBanner';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { FindPage } from './pages/FindPage';
import { ToiletDetailPage } from './pages/ToiletDetailPage';
import { NightModePage } from './pages/NightModePage';
import { HygienePage } from './pages/HygienePage';
import { ReportComplaintPage } from './pages/ReportComplaintPage';
import { TrackComplaintPage } from './pages/TrackComplaintPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { CampaignDetailPage } from './pages/CampaignDetailPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AccessibilityPage } from './pages/AccessibilityPage';

// Dashboards
import { CitizenDashboard } from './pages/dashboards/CitizenDashboard';
import { OperatorDashboard } from './pages/dashboards/OperatorDashboard';
import { MunicipalDashboard } from './pages/dashboards/MunicipalDashboard';
import { RotaryDashboard } from './pages/dashboards/RotaryDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <SanitrackProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white pb-16 md:pb-14">
            <DemoBanner />
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Home directs straight to Map Discovery */}
                <Route path="/" element={<HomePage />} />
                <Route path="/find" element={<HomePage />} />
                <Route path="/toilets/:id" element={<ToiletDetailPage />} />
                <Route path="/night-mode" element={<NightModePage />} />
                <Route path="/hygiene" element={<HygienePage />} />
                <Route path="/report" element={<ReportComplaintPage />} />
                <Route path="/track" element={<TrackComplaintPage />} />
                <Route path="/track/:reference" element={<TrackComplaintPage />} />
                <Route path="/campaigns" element={<CampaignsPage />} />
                <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/accessibility" element={<AccessibilityPage />} />

                {/* Role-Based Portals */}
                <Route path="/dashboard/citizen" element={<CitizenDashboard />} />
                <Route path="/dashboard/operator" element={<OperatorDashboard />} />
                <Route path="/dashboard/worker" element={<OperatorDashboard />} />
                <Route path="/dashboard/municipal" element={<MunicipalDashboard />} />
                <Route path="/dashboard/rotary" element={<RotaryDashboard />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            {/* Mobile-first bottom navigation bar */}
            <BottomNav />
          </div>
        </BrowserRouter>
      </SanitrackProvider>
    </AuthProvider>
  );
};

export default App;
