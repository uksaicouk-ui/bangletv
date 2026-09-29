import React, { useState } from 'react';
import { Radio, Search, ShieldCheck, Globe, Menu, X, ExternalLink, Sparkles, MessageSquare, Server } from 'lucide-react';
import { Channel } from '../types';
import { BengalTVWatermark } from './BengalTVWatermark';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  activeChannel: Channel;
  onOpenSearch: () => void;
  onOpenContact: () => void;
  onOpenOwnership: () => void;
  onOpenFeedback?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  activeChannel,
  onOpenSearch,
  onOpenContact,
  onOpenOwnership,
  onOpenFeedback,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'player', label: 'Live TV' },
    { id: 'vod', label: 'VOD & Catch-up' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'regions', label: 'Regions' },
    { id: 'federation', label: 'Federation Nodes' },
    { id: 'admin', label: 'Admin Ops' },
    { id: 'policies', label: 'Charters' },
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070a12]/95 backdrop-blur-md border-b border-white/8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones */}
        <div className="flex items-center justify-between h-18">
          
          {/* Zone 1: Wordmark with User's Bengal TV Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('player')}
              className="text-left group cursor-pointer focus:outline-none flex items-center gap-2.5"
              aria-label="BangleTV Home"
            >
              <BengalTVWatermark size="sm" showText={false} />
              <div className="flex items-baseline gap-2">
                <span className="font-brand text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  BangleTV<span className="text-emerald-500">.com</span>
                </span>
                <span className="hidden sm:inline-block text-[11px] text-amber-400 font-serif font-bold tracking-wider">
                  বেঙ্গল টিভি
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1.5 transition-colors cursor-pointer text-sm ${
                    isActive 
                      ? 'text-emerald-400 font-semibold' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors cursor-pointer"
              title="Search Channels & Archival Dispatches (Ctrl + K)"
              aria-label="Search channels and archives"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Ownership transparency badge button */}
            <button
              onClick={onOpenOwnership}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-emerald-300 hover:bg-slate-800/80 rounded border border-white/10 transition-colors cursor-pointer"
              title="Ownership & Governance Disclosure"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Governance</span>
            </button>

            {/* Propose Programme / Channel Suggestion */}
            {onOpenFeedback && (
              <button
                onClick={onOpenFeedback}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors whitespace-nowrap cursor-pointer shadow-sm shadow-emerald-500/10"
                title="Submit Programme Ideas, Channel Suggestions, or Information"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Propose / Feedback</span>
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-md cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d131f] border-b border-white/10 px-4 py-5 space-y-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentTab === link.id
                    ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                onOpenOwnership();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800/40 rounded border border-white/10"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Ownership & Strategic Control
              </span>
              <span className="text-[11px] text-slate-400">USA / BD</span>
            </button>
            
            {onOpenFeedback && (
              <button
                onClick={() => {
                  onOpenFeedback();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-xs font-semibold text-center text-slate-950 bg-emerald-400 rounded flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Submit Programme Idea or Tip</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
