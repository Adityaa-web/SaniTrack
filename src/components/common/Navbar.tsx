import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  Moon,
  Sparkles,
  AlertOctagon,
  HeartHandshake,
  PhoneCall,
  LayoutDashboard,
  ShieldCheck,
  Share2,
  X,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRole, currentUser } = useAuth();
  const location = useLocation();
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  const getDashboardPath = () => {
    switch (currentRole) {
      case 'operator':
      case 'worker':
        return '/dashboard/operator';
      case 'municipal_officer':
        return '/dashboard/municipal';
      case 'funding_partner':
        return '/dashboard/rotary';
      case 'admin':
        return '/dashboard/admin';
      case 'citizen':
      default:
        return '/dashboard/citizen';
    }
  };

  const navLinks = [
    { to: '/', label: 'Toilets Map', icon: Compass },
    { to: '/night-mode', label: 'Night Safe', icon: Moon },
    { to: '/hygiene', label: 'Pads & Hygiene', icon: Sparkles },
    { to: '/campaigns', label: 'Rotary Projects', icon: HeartHandshake },
    { to: '/report', label: 'Report Grievance', icon: AlertOctagon },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Logo & Civic Tag */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-lg tracking-tighter">ST</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  SaniTrack
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded uppercase">
                  Pune
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium -mt-0.5 hidden sm:block">
                Smart Public Sanitation Network
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items (Hidden on Mobile, handled by BottomNav) */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                    active
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {/* SOS Help Button */}
            <button
              onClick={() => setEmergencyModalOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 flex items-center gap-1.5 transition-colors shrink-0"
              title="Emergency SOS"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
              <span>SOS Help</span>
            </button>

            {/* Active Persona Badge & Link */}
            <Link
              to={getDashboardPath()}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all shrink-0"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="capitalize">{currentRole.replace('_', ' ')}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Emergency Modal */}
      {emergencyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-base">
                <PhoneCall className="w-5 h-5" />
                <span>Emergency Helplines (Pune)</span>
              </div>
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <a
                href="tel:112"
                className="flex items-center justify-between p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
              >
                <div>
                  <div className="font-bold text-rose-900 text-sm">112 - National Emergency</div>
                  <div className="text-rose-700 text-[11px]">Police, Fire & Ambulance Dispatch</div>
                </div>
                <span className="font-bold px-3 py-1 bg-rose-600 text-white rounded-lg">Call</span>
              </a>

              <a
                href="tel:1091"
                className="flex items-center justify-between p-3 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
              >
                <div>
                  <div className="font-bold text-purple-900 text-sm">1091 - Women Safety Helpline</div>
                  <div className="text-purple-700 text-[11px]">Maharashtra Women Safety Cell 24/7</div>
                </div>
                <span className="font-bold px-3 py-1 bg-purple-600 text-white rounded-lg">Call</span>
              </a>

              <a
                href="tel:18001030222"
                className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                <div>
                  <div className="font-bold text-emerald-900 text-sm">1800 103 0222 - PMC Helpline</div>
                  <div className="text-emerald-700 text-[11px]">Municipal Sanitation & Caretaker Desk</div>
                </div>
                <span className="font-bold px-3 py-1 bg-emerald-600 text-white rounded-lg">Call</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'My Location via SaniTrack Pune',
                      text: 'I am at a public facility in Pune. Check my location on SaniTrack:',
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Location link copied to clipboard!');
                  }
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-4 h-4 text-slate-600" />
                <span>Share Location with Trusted Contact</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
