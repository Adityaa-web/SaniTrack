import React, { useState, useEffect } from 'react';

export const LoadingSplash: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing SaniTrack Civic Node...');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setProgress(30);
      setStatusText('Connecting Pune Geo-Spatial Facilities...');
    }, 250);

    const t2 = setTimeout(() => {
      setProgress(65);
      setStatusText('Auditing Sanitary & Diaper Stock Data...');
    }, 650);

    const t3 = setTimeout(() => {
      setProgress(90);
      setStatusText('Synchronizing Public Map...');
    }, 1000);

    const t4 = setTimeout(() => {
      setProgress(100);
      setStatusText('SaniTrack Ready!');
    }, 1250);

    const t5 = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);

    const t6 = setTimeout(() => {
      setIsFinished(true);
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-white via-slate-50 to-emerald-50/30 transition-all duration-700 ease-out select-none ${
        isFadingOut
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient radial circles */}
      <div className="absolute w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl -top-12 -left-12 pointer-events-none animate-pulse"></div>
      <div className="absolute w-96 h-96 rounded-full bg-teal-200/20 blur-3xl -bottom-12 -right-12 pointer-events-none animate-pulse"></div>

      {/* Center Logo Showcase */}
      <div className="relative flex flex-col items-center text-center space-y-6 max-w-xs px-4">
        {/* Radar Ring Glow Effect around the Logo */}
        <div className="relative flex items-center justify-center">
          {/* Animated radar rings */}
          <div className="absolute w-36 h-36 rounded-full border-2 border-emerald-400/40 animate-ping"></div>
          <div className="absolute w-44 h-44 rounded-full border border-emerald-300/30 animate-pulse"></div>

          {/* Central Logo Box */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white p-3 shadow-2xl shadow-emerald-500/15 border border-emerald-100/80 flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-105">
            <img
              src="/flashload.jpg"
              alt="SaniTrack Official Logo"
              className="w-full h-full object-contain drop-shadow-xs"
            />
          </div>
        </div>

        {/* Brand Titles */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-center gap-1.5">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              SaniTrack
            </h1>
            <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
              Pune
            </span>
          </div>
          <p className="text-xs font-semibold text-emerald-800">
            Smart Public Sanitation & Dignity Network
          </p>
          <div className="text-[10px] text-slate-400 font-medium">
            Naya Bharat 2047 · Problem Statement 3.2
          </div>
        </div>

        {/* Loading Progress Bar & Status */}
        <div className="w-full space-y-2 pt-2">
          {/* Progress track */}
          <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-medium truncate max-w-[200px]">
              {statusText}
            </span>
            <span className="font-mono font-bold text-emerald-700">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Civic Credit */}
      <div className="absolute bottom-6 text-center text-[10px] text-slate-400">
        Empowering Citizens, Women & Seniors with Real-Time Sanitation Truth
      </div>
    </div>
  );
};

export default LoadingSplash;
