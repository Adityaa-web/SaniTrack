import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SanitrackProvider } from './context/SanitrackContext';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { Footer } from './components/common/Footer';
import { LoadingSplash } from './components/common/LoadingSplash';

// Pages
import { HomePage } from './pages/HomePage';
import { PublicReportsPage } from './pages/PublicReportsPage';
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
import { OfficialActionPage } from './pages/OfficialActionPage';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isMapHome = location.pathname === '/' || location.pathname === '/find';

  return (
    <div
      className={`w-full max-w-md min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white relative flex flex-col shadow-2xl sm:border-x sm:border-slate-300/80 ${
        isMapHome ? 'h-screen overflow-hidden' : 'pb-16'
      }`}
    >
      <LoadingSplash />
      <Navbar />
      <main className={`flex-1 ${isMapHome ? 'overflow-hidden flex flex-col' : ''}`}>
        <Routes>
          {/* Public Service Routes - Zero Login Barrier */}
          <Route path="/" element={<HomePage />} />
          <Route path="/find" element={<HomePage />} />
          <Route path="/reports" element={<PublicReportsPage />} />
          <Route path="/report" element={<ReportComplaintPage />} />
          <Route path="/toilets/:id" element={<ToiletDetailPage />} />
          <Route path="/night-mode" element={<NightModePage />} />
          <Route path="/hygiene" element={<HygienePage />} />
          <Route path="/track" element={<TrackComplaintPage />} />
          <Route path="/track/:reference" element={<TrackComplaintPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
          <Route path="/official-action/:token" element={<OfficialActionPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />

          {/* Direct fallback to Public Reports */}
          <Route path="/dashboard/*" element={<Navigate to="/reports" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isMapHome && <Footer />}
      {/* Mobile-first bottom navigation bar */}
      <BottomNav />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <SanitrackProvider>
        <HashRouter>
          <div className="min-h-screen bg-slate-950 flex justify-center text-slate-900 selection:bg-emerald-500 selection:text-white">
            <AppLayout />
          </div>
        </HashRouter>
      </SanitrackProvider>
    </AuthProvider>
  );
};

export default App;
