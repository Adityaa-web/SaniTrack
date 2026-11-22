import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSanitrack } from '../context/SanitrackContext';
import { formatTimeAgo } from '../lib/utils';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  AlertOctagon,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  Camera,
  MapPin,
  Mail,
  FileText,
  Trash2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const OfficialActionPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const { complaints, resolveComplaintByOfficial, getComplaintByOfficialToken } =
    useSanitrack();

  const complaint = token ? getComplaintByOfficialToken(token) : undefined;

  const [officerNotes, setOfficerNotes] = useState(
    'Dispatched emergency sanitation squad. Fixtures repaired, water pressure restored, and adult diaper / sanitary supplies replenished.'
  );
  const [officerName, setOfficerName] = useState(
    'K. Deshmukh (Ward Sanitation Inspector / Governor Taskforce)'
  );
  const [proofPhoto, setProofPhoto] = useState<string | null>(null);
  const [justResolved, setJustResolved] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const success = resolveComplaintByOfficial(token, officerNotes, proofPhoto || undefined);
    if (success) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (err) {}
      setJustResolved(true);
    }
  };

  if (!complaint) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">
          Temporary Action Link Not Found or Expired
        </h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          This temporary emergency dispatch link does not exist or has already been purged from active duty.
        </p>
        <Link
          to="/reports"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs"
        >
          <span>Go to Public Reports Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // If already resolved and purged
  if (complaint.status === 'resolved' || complaint.tempDispatchStatus === 'purged' || justResolved) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-6 pb-28">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px] uppercase">
              Official Resolution Completed
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Temporary Incident Link Auto-Purged & Deleted
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              This emergency dispatch ticket for <strong>{complaint.toiletName}</strong> was officially resolved on{' '}
              {complaint.resolvedAt
                ? new Date(complaint.resolvedAt).toLocaleString('en-IN')
                : 'Today'}
              . The temporary department link has been automatically closed and deleted from active queue.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-left space-y-2 max-w-md mx-auto text-xs">
            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Public Verification Status: DONE</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              "{complaint.resolutionNotes || 'Remediation completed by Governor Sanitation Taskforce.'}"
            </p>
            <div className="text-[10px] text-slate-500 pt-1 border-t border-emerald-200/60 flex items-center justify-between">
              <span>Ref: {complaint.referenceCode}</span>
              <span>Citizen Notified: {complaint.reporterEmail || 'Registered Email'}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/reports"
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>View Public Reports Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={`/track/${complaint.referenceCode}`}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
            >
              <span>Track Resolution Timeline</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Active Temporary Action Link for Governor / Department Officials
  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-6 space-y-5 pb-28">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-7 border border-indigo-900/40 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold border border-indigo-400/30">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Governor's Grievance Action Taskforce</span>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1 animate-pulse">
            <Clock className="w-3 h-3" />
            TEMPORARY ACTION LINK: ACTIVE
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          Emergency Public Restroom Action Dispatch
        </h1>

        <p className="text-xs text-slate-300 leading-relaxed">
          Dispatched by SaniTrack Civic AI directly to the Governor's Public Toilet Grievance Division & Pune Municipal Corporation Sanitation Engineering Unit.
        </p>

        {/* Temporary Notice */}
        <div className="p-3 bg-indigo-950/80 rounded-xl border border-indigo-800/60 text-[11px] text-indigo-200 flex items-start gap-2">
          <Trash2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Lifecycle Notice:</strong> This page remains live exclusively while this issue is being addressed. As soon as you confirm resolution below, this temporary link will be <strong>automatically purged and deleted</strong>, and the verified status will be published live on the citizen portal.
          </p>
        </div>
      </div>

      {/* Incident Details Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-mono text-xs font-black text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {complaint.referenceCode}
              </span>
              <span className="text-xs uppercase font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                {complaint.priority} Priority
              </span>
              <span className="text-[10px] text-slate-500">
                Reported {formatTimeAgo(complaint.createdAt)}
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900">
              {complaint.category}
            </h2>
          </div>

          <div className="text-right shrink-0">
            <div className="text-[10px] text-slate-400">Target Ward</div>
            <div className="text-xs font-bold text-slate-800">{complaint.assignedWardName || 'PMC Central'}</div>
          </div>
        </div>

        {/* Facility & Citizen info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <div className="text-slate-400 font-bold uppercase text-[9px]">Affected Facility</div>
            <div className="font-bold text-slate-900">{complaint.toiletName}</div>
            <div className="text-slate-500 text-[11px] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>Swargate / FC Road / Shivajinagar Pilot Area</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <div className="text-slate-400 font-bold uppercase text-[9px]">Citizen Contact (For Closure Notice)</div>
            <div className="font-bold text-slate-900 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-indigo-600" />
              <span>{complaint.reporterEmail || 'Anonymous submission'}</span>
            </div>
            <div className="text-slate-500 text-[10px]">
              Will receive automated SMS/Email upon marking resolved
            </div>
          </div>
        </div>

        {/* Citizen Description */}
        <div className="space-y-1 text-xs">
          <div className="text-slate-500 font-bold uppercase text-[10px]">Citizen Grievance Description:</div>
          <div className="p-3 bg-slate-50 rounded-xl text-slate-800 leading-relaxed font-medium">
            "{complaint.description}"
          </div>
        </div>

        {/* Citizen Photo Attachment */}
        {complaint.attachments && complaint.attachments.length > 0 && (
          <div className="space-y-1 text-xs">
            <div className="text-slate-500 font-bold uppercase text-[10px]">Citizen Photo Evidence:</div>
            <img
              src={complaint.attachments[0].storagePath}
              alt="Grievance evidence"
              className="w-full max-h-60 object-cover rounded-2xl border border-slate-200"
            />
          </div>
        )}

        {/* AI Diagnostics Box */}
        <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-indigo-900">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Civic AI Priority Analysis:</span>
          </div>
          <p className="text-[11px] text-indigo-800 leading-relaxed">
            {complaint.aiDispatchSummary || 'High priority alert dispatched for immediate field resolution.'}
          </p>
        </div>
      </div>

      {/* Official Resolution Form */}
      <form
        onSubmit={handleResolve}
        className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4"
      >
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Confirm Resolution & Purge Temporary Link</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Document official actions taken before closing this emergency dispatch ticket
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Officer / Division In-Charge:
          </label>
          <input
            type="text"
            value={officerName}
            onChange={(e) => setOfficerName(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Official Remediation Notes / Work Done:
          </label>
          <textarea
            rows={3}
            value={officerNotes}
            onChange={(e) => setOfficerNotes(e.target.value)}
            placeholder="Describe repairs, cleaning, or restocking completed..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 leading-relaxed"
            required
          />
        </div>

        {/* Upload Proof Photo */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">
            Resolution Proof Photo (Optional):
          </label>
          {proofPhoto ? (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-h-48">
              <img src={proofPhoto} alt="Resolution proof" className="w-full h-44 object-cover" />
              <button
                type="button"
                onClick={() => setProofPhoto(null)}
                className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 text-white text-[10px] rounded-lg font-bold"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex items-center justify-center gap-2 p-3 rounded-2xl border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50 cursor-pointer transition-colors text-xs text-slate-600 font-semibold">
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>Upload Work Completion Photo</span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Mark as Resolved & Purge Temporary Link</span>
        </button>

        <div className="text-center text-[10px] text-slate-400">
          * Clicking will permanently delete this temporary link and publish the fix as DONE on SaniTrack Public Reports.
        </div>
      </form>
    </div>
  );
};

export default OfficialActionPage;
