import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSanitrack } from '../context/SanitrackContext';
import { calculateDistanceKm, formatTimeAgo } from '../lib/utils';
import {
  Sparkles,
  MapPin,
  HeartHandshake,
  CheckCircle2,
  RefreshCw,
  Navigation,
  ArrowRight,
  ShieldCheck,
  Heart,
  Package,
} from 'lucide-react';

export const HygienePage: React.FC = () => {
  const { toilets, userLocation } = useSanitrack();
  const [stockFilter, setStockFilter] = useState<'all' | 'available' | 'low_out'>('all');
  const [itemTypeFilter, setItemTypeFilter] = useState<'all' | 'pads' | 'diapers'>('all');
  const [refillFeedback, setRefillFeedback] = useState<string | null>(null);

  // Filter toilets with sanitary facilities or senior diapers
  const hygieneToilets = toilets
    .filter((toilet) => {
      const padDispenser = toilet.sanitaryFacilities?.find(
        (sf) => sf.facilityType === 'pad_dispenser'
      );
      const diaperDispenser = toilet.sanitaryFacilities?.find(
        (sf) =>
          sf.facilityType === 'adult_diaper_dispenser' ||
          sf.itemCategory === 'adult_diapers'
      ) || (toilet.facilities.hasAdultDiapers ? { availability: true, currentStock: 'available' } : null);

      if (itemTypeFilter === 'pads' && !padDispenser) return false;
      if (itemTypeFilter === 'diapers' && !diaperDispenser) return false;
      if (!padDispenser && !diaperDispenser) return false;

      const hasStock =
        (padDispenser && padDispenser.currentStock === 'available') ||
        (diaperDispenser && (diaperDispenser as any).currentStock === 'available');

      if (stockFilter === 'available' && !hasStock) {
        return false;
      }
      if (stockFilter === 'low_out' && hasStock) {
        return false;
      }

      return true;
    })
    .map((toilet) => ({
      ...toilet,
      distanceKm: calculateDistanceKm(
        userLocation.lat,
        userLocation.lng,
        toilet.latitude,
        toilet.longitude
      ),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);

  const handleRequestRefill = (toiletName: string, item: 'pad' | 'diaper') => {
    setRefillFeedback(
      `Priority refill dispatched for ${item === 'diaper' ? 'Senior Adult Diapers' : 'Sanitary Pads'} at "${toiletName}".`
    );
    setTimeout(() => setRefillFeedback(null), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-24 md:pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-pink-950 via-purple-950 to-slate-950 text-white rounded-3xl p-4 sm:p-7 border border-pink-800/40 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-400/30">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Sanitary & Senior Dignity Network</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          Sanitary Napkins & Senior Citizen Adult Diapers
        </h1>

        <p className="max-w-3xl text-xs sm:text-sm text-pink-100 leading-relaxed">
          Locate public restrooms in Pune with active menstrual hygiene dispensers, adult diapers for old-age citizens, safe disposal incinerators, and senior grab rails.
        </p>

        {/* Rotary & Senior Citizen Partnership Credit */}
        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-pink-200">
          <span className="flex items-center gap-1.5 font-bold text-pink-300">
            <HeartHandshake className="w-4 h-4 text-pink-400" />
            Rotary Midtown & Senior Welfare Trust
          </span>
          <span className="text-pink-400">·</span>
          <span>Dual Coin & QR UPI Enabled</span>
          <span className="text-pink-400">·</span>
          <span>Adult Diaper Sizes M & L Available</span>
        </div>
      </div>

      {/* Refill Feedback Alert */}
      {refillFeedback && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center justify-between animate-fade-in">
          <span>✅ {refillFeedback}</span>
          <span className="text-emerald-600 font-normal text-[11px]">SLA: 2 hours</span>
        </div>
      )}

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        {/* Item Type Segment */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setItemTypeFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              itemTypeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Sanitary Items ({hygieneToilets.length})
          </button>
          <button
            onClick={() => setItemTypeFilter('pads')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              itemTypeFilter === 'pads'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
            }`}
          >
            ✨ Pads Only
          </button>
          <button
            onClick={() => setItemTypeFilter('diapers')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              itemTypeFilter === 'diapers'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            👴 Senior Diapers
          </button>
        </div>

        {/* Stock Status Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setStockFilter('available')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              stockFilter === 'available'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            In Stock
          </button>
          <button
            onClick={() => setStockFilter('low_out')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              stockFilter === 'low_out'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Needs Refill
          </button>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {hygieneToilets.map((toilet) => {
          const padDispenser = toilet.sanitaryFacilities?.find(
            (sf) => sf.facilityType === 'pad_dispenser'
          );
          const diaperDispenser = toilet.sanitaryFacilities?.find(
            (sf) =>
              sf.facilityType === 'adult_diaper_dispenser' ||
              sf.itemCategory === 'adult_diapers'
          );
          const hasIncinerator = toilet.sanitaryFacilities?.some(
            (sf) => sf.facilityType === 'incinerator'
          );
          const hasBin = toilet.sanitaryFacilities?.some(
            (sf) => sf.facilityType === 'sanitary_bin'
          );

          return (
            <div
              key={toilet.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:border-pink-300 hover:shadow-md transition-all space-y-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap mb-1">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                      {toilet.facilityCode}
                    </span>
                    {padDispenser && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200">
                        ✨ Pads: {padDispenser.currentStock}
                      </span>
                    )}
                    {(diaperDispenser || toilet.facilities.hasAdultDiapers) && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                        👴 Diapers: {diaperDispenser?.currentStock || 'available'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {toilet.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{toilet.locality}</span>
                    <span className="font-semibold text-slate-700">· {toilet.distanceKm} km away</span>
                  </div>
                </div>
              </div>

              {/* Sanitary & Senior Items Stock Breakdown */}
              <div className="space-y-2">
                {padDispenser && (
                  <div className="p-2.5 bg-pink-50/60 rounded-xl border border-pink-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-pink-900">Sanitary Napkins (Rotary WASH)</div>
                      <div className="text-[10px] text-pink-700">
                        Verified {formatTimeAgo(padDispenser.lastRefilledAt)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-pink-900">₹{padDispenser.pricePerPad || 5}</div>
                      {padDispenser.currentStock !== 'available' && (
                        <button
                          onClick={() => handleRequestRefill(toilet.name, 'pad')}
                          className="text-[10px] font-bold text-rose-600 hover:underline flex items-center gap-0.5"
                        >
                          <RefreshCw className="w-2.5 h-2.5" />
                          <span>Alert Refill</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {(diaperDispenser || toilet.facilities.hasAdultDiapers) && (
                  <div className="p-2.5 bg-purple-50/60 rounded-xl border border-purple-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-purple-900">👴 Senior Citizen Adult Diapers (M/L)</div>
                      <div className="text-[10px] text-purple-700">
                        {diaperDispenser?.itemDetails || 'Subsidized elderly care hygiene kit'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-900">
                        ₹{diaperDispenser?.pricePerDiaper || 10}
                      </div>
                      <button
                        onClick={() => handleRequestRefill(toilet.name, 'diaper')}
                        className="text-[10px] font-bold text-purple-700 hover:underline flex items-center gap-0.5"
                      >
                        <RefreshCw className="w-2.5 h-2.5" />
                        <span>Alert Refill</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sanitation Waste Disposal Features */}
              <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-600">
                {hasBin && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Lidded Sanitary Bins
                  </span>
                )}
                {hasIncinerator && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-medium">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    Disposal Incinerator
                  </span>
                )}
                {toilet.facilities.wheelchairRamp && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium">
                    ♿ Senior Ramp & Rails
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${toilet.latitude},${toilet.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-pink-700 hover:text-pink-800 flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>

                <Link
                  to={`/toilets/${toilet.id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HygienePage;
