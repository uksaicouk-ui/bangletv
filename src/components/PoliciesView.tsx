import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, BookOpen, AlertOctagon, Users, 
  Network, Key, FileText, Code2, Mail, ShieldAlert, Check
} from 'lucide-react';
import { POLICIES_COLLECTION } from '../data/policiesData';

interface PoliciesViewProps {
  initialTab?: string;
  onOpenContact: () => void;
}

export const PoliciesView: React.FC<PoliciesViewProps> = ({
  initialTab = 'copyright',
  onOpenContact,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const policyTabs = [
    { id: 'copyright', label: 'Copyright Protection', icon: ShieldCheck },
    { id: 'privacy', label: 'Privacy & Data', icon: Lock },
    { id: 'editorial', label: 'Editorial Policy', icon: BookOpen },
    { id: 'distribution', label: 'Content & Distribution', icon: AlertOctagon },
    { id: 'governance', label: 'Community Governance', icon: Users },
    { id: 'federation', label: 'Federation Policy', icon: Network },
    { id: 'security', label: 'Security & Defense', icon: Key },
    { id: 'terms', label: 'Terms of Use', icon: FileText },
    { id: 'opensource', label: 'Open-Source Charter', icon: Code2 },
    { id: 'ownership', label: 'Ownership & Strategic Control', icon: ShieldAlert },
    { id: 'contact', label: 'Contact & Inquiries', icon: Mail },
  ];

  const currentDoc = POLICIES_COLLECTION[activeTab] || POLICIES_COLLECTION['copyright'];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono uppercase tracking-wider mb-2">
          <span>Institutional Governance</span>
          <span className="text-slate-500">·</span>
          <span>Legal & Editorial Directives</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-brand mb-2">
          Platform Policies & Community Governance
        </h2>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          The institutional charters protecting broadcaster copyright, decentralized community autonomy, journalistic integrity, and the sacred rule: “Federate the network, not the content.”
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar: Clickable Tabs Navigation */}
        <div className="lg:col-span-4 flex flex-col gap-1.5 p-2 bg-[#0b0f19] border border-white/10 rounded-lg">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-3 py-2">
            Governance Documents
          </span>
          {policyTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md transition-all cursor-pointer flex items-center justify-between text-xs ${
                  isSelected
                    ? 'bg-emerald-500/15 text-emerald-300 font-semibold border-l-2 border-emerald-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </div>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Right Content Area: Policy Text */}
        <div className="lg:col-span-8 bg-[#0b0f19] border border-white/10 rounded-lg p-6 sm:p-8">
          
          {/* Header of Active Document */}
          <div className="border-b border-white/10 pb-6 mb-6">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono text-emerald-400">Institutional Charter</span>
              <span>Last Revised: {currentDoc.lastUpdated}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-brand">
              {currentDoc.title}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {currentDoc.subtitle}
            </p>

            {/* Executive Summary Box */}
            <div className="p-4 bg-black/40 border border-emerald-500/20 rounded-lg text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-400 block mb-1">Executive Summary:</span>
              {currentDoc.executiveSummary}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {currentDoc.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {section.heading}
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Specific Contact CTA if on Contact Tab */}
          {activeTab === 'contact' && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={onOpenContact}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded cursor-pointer"
              >
                Open Official Contact & Intake Form
              </button>
            </div>
          )}

        </div>

      </div>

    </section>
  );
};
