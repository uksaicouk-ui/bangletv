import React from 'react';
import { ShieldCheck, Globe, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenPolicies: (policyId: string) => void;
  onOpenOwnership: () => void;
  onOpenContact: () => void;
  onOpenFeedback?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenPolicies,
  onOpenOwnership,
  onOpenContact,
  onOpenFeedback,
}) => {
  return (
    <footer className="w-full bg-[#05080e] border-t border-white/8 text-slate-400 text-xs mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/8">
          
          {/* Brand & Creed */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="font-brand text-xl font-bold tracking-tight text-white">
                BangleTV<span className="text-emerald-500">.com</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono uppercase">
                Open IPTV Network
              </span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              World-class open IPTV platform connecting Bengali communities globally. Empowering community autonomy, historical inquiry, and decentralized culture.
            </p>

            <div className="p-3 bg-slate-900/60 border-l-2 border-emerald-500 rounded-r text-[11px] text-slate-300">
              <span className="font-semibold text-emerald-400 block mb-0.5">Foundational Creed:</span>
              “Federate the network, not the content.” Every community retains sovereign ownership of its channels and audience.
            </div>
          </div>

          {/* Quick Broadcast Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-3">
              Broadcast Directory
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onSelectTab('player')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Live TV Broadcast
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('vod')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  VOD & Catch-up Shows
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('schedule')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Broadcast Schedule (EPG)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('regions')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Territory & Language Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('federation')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Global Federation Nodes
                </button>
              </li>
              {onOpenFeedback && (
                <li>
                  <button
                    onClick={onOpenFeedback}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer font-medium"
                  >
                    Submit Show Idea or Feed →
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Institutional Policies */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-3">
              Charters & Policies
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onOpenPolicies('copyright')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Copyright Protection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicies('privacy')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Privacy & Data Minimization
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicies('editorial')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Editorial Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicies('distribution')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Content & Distribution
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicies('governance')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Community Governance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicies('federation')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Federation Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Operations */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-3">
              Legal & Operations
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={onOpenOwnership}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer font-medium flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Ownership Disclosure</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicies('security')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Security Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicies('terms')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicies('opensource')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Open-Source Stack
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Ownership Disclosure Ledger */}
        <div className="py-6 border-b border-white/8 text-slate-400 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
              Official Ownership & Operations Ledger
            </span>
            <span className="text-[11px] text-slate-500">
              BangleTV.com / BengalTV.com
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">Anwar Tariq Khan</strong> — Owner, Patron and Principal Decision-Maker, based in the United States. BengalTV.com and BangleTV.com, its principal assets and major strategic decisions are controlled and patronized from the United States.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">Sheikh Mehedi Hasan Nadim</strong> — Founding Member and Operational Head / Executive Operator, operating from Bangladesh and responsible for day-to-day administration, technical operations, maintenance, deployment and practical execution.
          </p>
          <p className="text-[11px] text-slate-400 italic">
            * Legal notice: Operation from Bangladesh does not constitute ownership.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} BangleTV.com & BengalTV.com. All community content rights reserved to respective creators.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Decentralized Open Protocol</span>
            <span aria-hidden="true">·</span>
            <span>Ed25519 Cryptographic Verification</span>
            <span aria-hidden="true">·</span>
            <span>Zero Commercial Tracking</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
