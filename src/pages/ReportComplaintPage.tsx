import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useSanitrack } from '../context/SanitrackContext';
import { useAuth } from '../context/AuthContext';
import { PriorityLevel } from '../types';
import {
  AlertOctagon,
  Camera,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Upload,
  ArrowRight,
  Info,
  X,
} from 'lucide-react';

const CATEGORIES = [
  'Dirty/unhygienic toilet',
  'No running water',
  'Broken flush/tap/pipe',
  'Broken door lock/latch',
  'Locked or unexpectedly closed',
  'Sanitary pad dispenser empty or broken',
  'Missing sanitary waste bin/disposal',
  'No electricity or dark approach',
  'Blocked drainage / water pooling',
  'Overflowing waste bin',
  'Accessibility ramp/rail broken',
  'Safety or attendant misconduct',
  'Other maintenance issue',
];

export const ReportComplaintPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toilets, submitComplaint } = useSanitrack();
  const { currentUser } = useAuth();

  const preselectedToiletId = searchParams.get('toiletId') || '';

  const [selectedToiletId, setSelectedToiletId] = useState(preselectedToiletId);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const toilet = toilets.find((t) => t.id === selectedToiletId);
    const toiletName = toilet ? toilet.name : 'Unspecified Pune Facility';

    const ref = submitComplaint({
      toiletId: selectedToiletId || 'toilet-fc-road-she',
      toiletName,
      category,
      description,
      priority,
      isAnonymous,
      photoDataUrl: photoPreview || undefined,
    });

    setSubmittedRef(ref);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
          <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
          <span>Citizen Grievance & Accountability</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Report a Sanitation Issue
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Help maintain public toilet standards across Pune. Your report triggers an automated SLA countdown for the municipal ward officer and field operator.
        </p>
      </div>

      {submittedRef ? (
        /* Submission Success Screen */
        <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-xl text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              Grievance Registered Successfully
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your report has been logged and queued for municipal triage. Keep this reference number to monitor the repair timeline publicly.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Tracking Reference Code
            </div>
            <div className="text-2xl font-mono font-black text-emerald-700 mt-1 select-all">
              {submittedRef}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to={`/track/${submittedRef}`}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2"
            >
              <span>Track Live Timeline</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                setSubmittedRef(null);
                setDescription('');
                setPhotoPreview(null);
              }}
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
            >
              Submit Another Report
            </button>
          </div>
        </div>
      ) : (
        /* Form */
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6"
        >
          {/* Facility Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Select Public Facility in Pune *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={selectedToiletId}
                onChange={(e) => setSelectedToiletId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
                required
              >
                <option value="">-- Choose Toilet Facility --</option>
                {toilets.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.locality} - {t.facilityCode})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Issue Category */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Issue Category *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition-all ${
                    category === cat
                      ? 'bg-rose-50 text-rose-800 border-rose-300 ring-1 ring-rose-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Detailed Description *
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe the issue clearly (e.g., tap leaking heavily in cubicle #2, no water in cistern, pad dispenser took ₹5 coin but did not dispense)..."
              className="w-full p-3.5 rounded-2xl border border-slate-200 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Estimated Severity / Priority
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['low', 'medium', 'high', 'urgent'] as PriorityLevel[]).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setPriority(lvl)}
                  className={`py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    priority === lvl
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Evidence Upload (Simulated) */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Attach Photo Evidence (Optional)
            </label>

            {photoPreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-w-xs">
                <img src={photoPreview} alt="Preview" className="w-full h-44 object-cover" />
                <button
                  type="button"
                  onClick={() => setPhotoPreview(null)}
                  className="absolute top-2 right-2 p-1.5 bg-black/70 text-white rounded-full hover:bg-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl cursor-pointer bg-slate-50/50 hover:bg-emerald-50/20 transition-colors">
                <Camera className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-xs font-semibold text-slate-700">
                  Click to upload or take a photograph
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  PNG, JPG up to 5MB (Privacy notice: please do not include faces)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Anonymous Reporting Checkbox */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <label className="flex items-center gap-2.5 text-xs font-bold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
              />
              <span>Submit Anonymously</span>
            </label>
            <p className="text-[11px] text-slate-500 leading-relaxed pl-6">
              When checked, your name will be masked as "Anonymous Citizen" across all public transparency feeds and municipal dashboards.
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="flex items-start gap-2 text-xs text-slate-500 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-[11px]">
              SaniTrack respects data privacy in accordance with civic norms. Only sanitized issue summaries and facility details are published publicly.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
          >
            <AlertOctagon className="w-4 h-4" />
            <span>Register Official Grievance</span>
          </button>
        </form>
      )}
    </div>
  );
};
