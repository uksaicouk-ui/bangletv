import React from 'react';
import { X, ShieldCheck, MapPin, Building, Award, CheckCircle2 } from 'lucide-react';

interface OwnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPolicies: (tab?: string) => void;
}

export const OwnershipModal: React.FC<OwnershipModalProps> = ({
  isOpen,
  onClose,
  onOpenPolicies,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0d131f] border border-white/15 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Institutional Charter</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-brand">
              Ownership, Patronage & Operational Governance
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Public disclosure of strategic authority, platform patrons, and operational roles for BangleTV.com & BengalTV.com
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Two Key Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Anwar Tariq Khan */}
          <div className="p-4 bg-black/50 border border-emerald-500/30 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-emerald-400">United States</span>
                <span className="text-[11px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded">Ownership HQ</span>
              </div>
              <h3 className="text-base font-bold text-white mb-0.5">
                Anwar Tariq Khan
              </h3>
              <p className="text-xs font-medium text-emerald-300 mb-3">
                Owner, Patron & Principal Decision-Maker
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Based in and operating from the United States.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Controls principal digital assets, trademarks, and major strategic decisions.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Patronizes global expansion and institutional independence.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sheikh Mehedi Hasan Nadim */}
          <div className="p-4 bg-black/50 border border-blue-500/30 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-blue-400">Bangladesh</span>
                <span className="text-[11px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded">Operations Hub</span>
              </div>
              <h3 className="text-base font-bold text-white mb-0.5">
                Sheikh Mehedi Hasan Nadim
              </h3>
              <p className="text-xs font-medium text-blue-300 mb-3">
                Founding Member & Operational Head / Executive Operator
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Operating from Bangladesh.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Responsible for day-to-day administration & technical operations.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Maintains server deployments, pipeline maintenance, and execution.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Clear Legal Definition of Ownership vs. Operation */}
        <div className="p-4 bg-slate-900 border border-white/10 rounded-lg text-xs text-slate-300 space-y-2">
          <h4 className="font-semibold text-white flex items-center gap-1.5">
            <Building className="w-4 h-4 text-emerald-400" />
            Binding Legal Principle on Operational Jurisdiction
          </h4>
          <p className="leading-relaxed">
            In accordance with the founding bylaws of BangleTV.com and BengalTV.com:
          </p>
          <div className="p-3 bg-black/60 rounded border-l-2 border-emerald-400 font-mono text-[11px] text-emerald-300">
            “Operation from Bangladesh does not constitute ownership.”
          </div>
          <p className="leading-relaxed text-slate-400">
            All principal digital rights, patents, domain registries, trademark registrations, and sovereign capital allocations are legally vested in the United States under the patronage of Anwar Tariq Khan. Practical engineering execution and node uptime operations in Bangladesh are carried out under delegated executive administration.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              onClose();
              onOpenPolicies('ownership');
            }}
            className="text-xs text-emerald-400 hover:underline cursor-pointer"
          >
            Read Complete Written Ownership Charter →
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
