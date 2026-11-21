import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  Moon,
  Sparkles,
  AlertOctagon,
  HeartHandshake,
  User,
  LayoutDashboard,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentRole } = useAuth();
  const location = useLocation();

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

  const navItems = [
    {
      to: '/',
      label: 'Map',
      icon: Compass,
      exact: true,
    },
    {
      to: '/night-mode',
      label: 'Night Safe',
      icon: Moon,
    },
    {
      to: '/hygiene',
      label: 'Pads',
      icon: Sparkles,
    },
    {
      to: '/report',
      label: 'Report',
      icon: AlertOctagon,
      isAction: true,
    },
    {
      to: '/campaigns',
      label: 'Rotary',
      icon: HeartHandshake,
    },
    {
      to: getDashboardPath(),
      label: currentRole === 'citizen' ? 'My Desk' : currentRole.replace('_', ' '),
      icon: LayoutDashboard,
      isDashboard: true,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 sm:px-6 py-1.5 transition-all"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="max-w-lg md:max-w-2xl mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? location.pathname === '/' || location.pathname === '/find'
            : location.pathname.startsWith(item.to);

          if (item.isAction) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex flex-col items-center justify-center -mt-4 group touch-manipulation"
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                    isActive
                      ? 'bg-rose-700 text-white ring-4 ring-rose-200'
                      : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-rose-700 mt-1">
                  {item.label}
                </span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all touch-manipulation active:scale-95 ${
                isActive
                  ? 'text-emerald-700 font-bold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-colors ${
                  isActive ? 'bg-emerald-50' : 'bg-transparent'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-emerald-600' : 'text-slate-500'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] tracking-tight truncate max-w-[64px] text-center ${
                  isActive ? 'font-extrabold text-emerald-800' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
