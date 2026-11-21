import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSanitrack } from '../context/SanitrackContext';
import { ToiletCard } from '../components/toilet/ToiletCard';
import {
  Search,
  Compass,
  Moon,
  Sparkles,
  AlertOctagon,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Droplets,
  Accessibility,
  ArrowRight,
  MapPin,
  TrendingUp,
  Award,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { toilets, campaigns, complaints } = useSanitrack();
  const [quickSearch, setQuickSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/find?q=${encodeURIComponent(quickSearch)}`);
  };

  // Top featured toilets
  const featuredToilets = toilets.slice(0, 3);
  const activeCampaign = campaigns[0];
  const openCount = toilets.filter((t) => t.currentStatus === 'open').length;
  const padAvailableCount = toilets.filter((t) =>
    t.sanitaryFacilities?.some(
      (sf) => sf.facilityType === 'pad_dispenser' && sf.currentStock === 'available'
    )
  ).length;

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          {/* Civic Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-xs">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>Naya Bharat 2047 · Problem Statement 3.2 Solution</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Is there a <span className="text-emerald-600 underline decoration-emerald-300">usable</span> toilet nearby?
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            SaniTrack connects citizens, sanitation operators, municipal ward officers, and community funding partners into a real-time accountability network for clean, safe, and accessible sanitation.
          </p>

          {/* Quick Search Box */}
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 p-2 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200"
            >
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  placeholder="Enter Pune area (e.g. FC Road, Swargate, Station, Deccan)..."
                  className="w-full pl-12 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/30 flex items-center gap-2 shrink-0"
              >
                <Compass className="w-4 h-4" />
                <span>Find Now</span>
              </button>
            </form>

            {/* Quick Action Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-semibold text-slate-600">
              <span className="text-slate-400 text-[11px]">Quick Filters:</span>
              <Link
                to="/find?filter=open"
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-emerald-800 hover:border-emerald-300 shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Open Right Now</span>
              </Link>
              <Link
                to="/hygiene"
                className="px-3 py-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-800 shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                <span>Sanitary Pads Available</span>
              </Link>
              <Link
                to="/night-mode"
                className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span>Night Safe Recommendations</span>
              </Link>
              <Link
                to="/find?filter=accessible"
                className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <Accessibility className="w-3.5 h-3.5 text-blue-600" />
                <span>Wheelchair Ramp & Rails</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Pilot Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">
              {openCount} / {toilets.length}
            </div>
            <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
              Verified Open Toilets
            </div>
            <div className="text-[11px] text-slate-500">Live Pune Pilot Audited</div>
          </div>

          <div className="space-y-1 pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-black text-pink-400">
              {padAvailableCount} Units
            </div>
            <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
              Stocked Pad Dispensers
            </div>
            <div className="text-[11px] text-slate-500">Real-time stock tracking</div>
          </div>

          <div className="space-y-1 pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-black text-teal-300">
              {complaints.filter((c) => c.status === 'resolved').length} Resolved
            </div>
            <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
              Citizen Grievances Fixed
            </div>
            <div className="text-[11px] text-slate-500">Photo-verified completion</div>
          </div>

          <div className="space-y-1 pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-black text-amber-400">
              ₹{(campaigns.reduce((acc, c) => acc + c.raisedAmount, 0)).toLocaleString()}
            </div>
            <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
              Community Funds Raised
            </div>
            <div className="text-[11px] text-slate-500">Rotary & Citizen Transparency</div>
          </div>
        </div>
      </section>

      {/* Core 4-Pillar Promise */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How SaniTrack Works: The Closed-Loop Civic Engine
          </h2>
          <p className="text-sm text-slate-600">
            Beyond ordinary static map pins. SaniTrack creates verified, timestamped sanitation trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1: Find */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900">Find Usable Toilets</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Locate open facilities on synchronized maps with instant distance, opening hours, gender sections, and wheelchair access data.
            </p>
          </div>

          {/* Card 2: Verify */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900">Verify Real Freshness</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every status is timestamped with its source: Operator log, Municipal audit, or Citizen verification. No stale or assumed data.
            </p>
          </div>

          {/* Card 3: Report */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-rose-300 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black text-lg">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900">Report & Track Publicly</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit issues with photos and track them via public reference codes. Ward officers are notified with strict resolution SLAs.
            </p>
          </div>

          {/* Card 4: Improve */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-lg">
              4
            </div>
            <h3 className="font-bold text-base text-slate-900">Fund & Fix Transparently</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rotary clubs and community groups sponsor overdue repairs. Every rupee raised is matched with public contractor receipts.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Toilets Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Featured Pune Facilities
            </h2>
            <p className="text-xs text-slate-500">
              Highest rated and recently verified facilities in the Pune Pilot zone
            </p>
          </div>
          <Link
            to="/find"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
          >
            <span>Explore all {toilets.length} pilot toilets on Map</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredToilets.map((toilet) => (
            <ToiletCard key={toilet.id} toilet={toilet} />
          ))}
        </div>
      </section>

      {/* Featured Community Funding Banner */}
      {activeCampaign && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800/40 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Active Community Maintenance Project</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {activeCampaign.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeCampaign.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-emerald-400">
                    ₹{activeCampaign.raisedAmount.toLocaleString()} Raised
                  </span>
                  <span className="text-slate-400">
                    Goal: ₹{activeCampaign.targetAmount.toLocaleString()}
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (activeCampaign.raisedAmount / activeCampaign.targetAmount) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={`/campaigns/${activeCampaign.id}`}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>View Project & Transparency Ledger</span>
                </Link>
                <Link
                  to="/campaigns"
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors"
                >
                  All Partner Campaigns &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">
          Encountered a locked or dirty public toilet in Pune?
        </h3>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Help your fellow citizens. Report an issue in 60 seconds with an optional photo. No login strictly required.
        </p>
        <Link
          to="/report"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/30 transition-all hover:scale-105"
        >
          <AlertOctagon className="w-4 h-4" />
          <span>Report a Sanitation Grievance</span>
        </Link>
      </section>
    </div>
  );
};
