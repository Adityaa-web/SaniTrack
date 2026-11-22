import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import logoUrl from '../../assets/flashload1.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs mt-8 pb-20">
      <div className="w-full px-4 py-8 space-y-6">
        {/* Brand */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img
              src={logoUrl}
              alt="SaniTrack Official Logo"
              className="w-8 h-8 rounded-lg object-contain bg-white p-0.5"
            />
            <span className="font-extrabold text-base text-white tracking-tight">SaniTrack Pune</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Find. Verify. Report. Improve. Citizen-driven smart public sanitation network.
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-emerald-400 text-[10px] font-medium">
            <MapPin className="w-3 h-3" />
            <span>Pilot Area: Pune Municipal Corporation</span>
          </div>
        </div>

        {/* Quick links */}
        <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-[11px]">
          <Link to="/reports" className="hover:text-emerald-400 transition-colors">
            Public Reports
          </Link>
          <Link to="/hygiene" className="hover:text-emerald-400 transition-colors">
            Sanitary & Diapers
          </Link>
          <Link to="/night-mode" className="hover:text-emerald-400 transition-colors">
            Night Safe Mode
          </Link>
          <Link to="/campaigns" className="hover:text-emerald-400 transition-colors">
            Community Fund
          </Link>
          <Link to="/about" className="hover:text-emerald-400 transition-colors">
            About Pilot
          </Link>
          <Link to="/accessibility" className="hover:text-emerald-400 transition-colors">
            Accessibility
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-800 text-center text-[10px] text-slate-500">
          © 2024 SaniTrack Pune · Naya Bharat 2047 Hackathon
        </div>
      </div>
    </footer>
  );
};

export default Footer;
