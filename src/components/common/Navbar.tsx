import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  Moon,
  HeartHandshake,
  AlertOctagon,
  FileSearch,
  Sparkles,
  Menu,
  X,
  PhoneCall,
  LayoutDashboard,
  ShieldCheck,
  Share2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRole, currentUser } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { to: '/find', label: 'Find Toilets', icon: Compass },
    { to: '/night-mode', label: 'Night Mode', icon: Moon, highlight: true },
    { to: '/hygiene', label: 'Hygiene & Pads', icon: Sparkles },
    { to: '/report', label: 'Report Grievance', icon: AlertOctagon },
    { to: '/campaigns', label: 'Rotary Projects', icon: HeartHandshake },
    { to: '/track', label: 'Track Ref', icon: FileSearch },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Civic Tag */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-600/30 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl tracking-tighter">ST</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  SaniTrack
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Pilot
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium -mt-0.5 hidden sm:block">
                Naya Bharat 2047 · Sanitation Accountability
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    active
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  } ${item.highlight && !active ? 'text-indigo-600 font-bold hover:text-indigo-700 hover:bg-indigo-50' : ''}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.highlight ? 'text-indigo-500' : ''}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Emergency SOS & Role Portal */}
          <div className="flex items-center gap-2.5">
            {/* Quick Emergency Button */}
            <button
              onClick={() => setEmergencyModalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 flex items-center gap-1.5 transition-colors"
              title="Emergency helpline & quick location share"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden sm:inline">SOS Help</span>
            </button>

            {/* Dashboard Quick Access */}
            <Link
              to={getDashboardPath()}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all hover:shadow"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Dashboard</span>
              <span className="bg-emerald-700/80 px-1.5 py-0.2 text-[10px] rounded font-mono capitalize">
                {currentRole.replace('_', ' ')}
              </span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
            <div className="p-2 mb-2 bg-slate-50 rounded-lg text-xs flex items-center justify-between text-slate-600">
              <span>Active Persona:</span>
              <span className="font-bold text-slate-800 capitalize flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {currentUser.fullName} ({currentRole})
              </span>
            </div>
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2.5 transition-colors ${
                    active
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <Link
              to={getDashboardPath()}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2.5 bg-emerald-600 text-white mt-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Go to {currentRole.replace('_', ' ')} Portal</span>
            </Link>
          </div>
        )}
      </header>

      {/* Emergency Modal */}
      {emergencyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-lg">
                <PhoneCall className="w-5 h-5" />
                <span>Emergency Quick Actions</span>
              </div>
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Verified emergency response contacts for Pune pilot area. Use when immediate assistance is required.
            </p>

            <div className="mt-4 space-y-2.5">
              <a
                href="tel:112"
                className="flex items-center justify-between p-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors group"
              >
                <div>
                  <div className="text-sm font-bold text-rose-900">112 - National Emergency</div>
                  <div className="text-xs text-rose-700">Police, Fire & Ambulance Dispatch</div>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-rose-600 text-white rounded-lg group-hover:bg-rose-700">
                  Call Now
                </span>
              </a>

              <a
                href="tel:1091"
                className="flex items-center justify-between p-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors group"
              >
                <div>
                  <div className="text-sm font-bold text-purple-900">1091 - Women Helpline</div>
                  <div className="text-xs text-purple-700">Maharashtra Women Safety Cell 24/7</div>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-purple-600 text-white rounded-lg group-hover:bg-purple-700">
                  Call 1091
                </span>
              </a>

              <a
                href="tel:18001030222"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors group"
              >
                <div>
                  <div className="text-sm font-bold text-emerald-900">1800 103 0222 - PMC Civic Helpline</div>
                  <div className="text-xs text-emerald-700">Pune Municipal Sanitation & Caretaker Desk</div>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-emerald-600 text-white rounded-lg group-hover:bg-emerald-700">
                  Call PMC
                </span>
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'My Location via SaniTrack Pune',
                      text: 'I am at a public facility in Pune. Check my live status on SaniTrack:',
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Current page link copied to clipboard!');
                  }
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-4 h-4 text-slate-600" />
                <span>Share Current Facility Location with Trusted Contact</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
