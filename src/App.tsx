/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Player } from './components/Player';
import { ChannelGrid } from './components/ChannelGrid';
import { BroadcastSchedule } from './components/BroadcastSchedule';
import { BangladeshDocumentarySection } from './components/BangladeshDocumentarySection';
import { FederationSection } from './components/FederationSection';
import { OpenSourceArchitecture } from './components/OpenSourceArchitecture';
import { PoliciesView } from './components/PoliciesView';
import { OwnershipModal } from './components/OwnershipModal';
import { ContactModal } from './components/ContactModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { CHANNELS } from './data/channelsData';
import { Channel, DocumentaryReference } from './types';
import { Radio, ShieldCheck, Film, Globe, Sparkles, ArrowRight, Play, Server, Layers, Cpu, Network } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('player');
  const [selectedPolicyTab, setSelectedPolicyTab] = useState<string>('copyright');
  const [activeChannel, setActiveChannel] = useState<Channel>(CHANNELS[0]);
  
  // Modals state
  const [isOwnershipOpen, setIsOwnershipOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSelectChannel = (channel: Channel) => {
    setActiveChannel(channel);
    setCurrentTab('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPolicies = (policyId: string = 'copyright') => {
    setSelectedPolicyTab(policyId);
    setCurrentTab('policies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDocumentary = (_doc: DocumentaryReference) => {
    setCurrentTab('documentary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Top Bar Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeChannel={activeChannel}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenOwnership={() => setIsOwnershipOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* TAB 1: Live Player & Broadcast Suite */}
        {currentTab === 'player' && (
          <div>
            {/* Curated Hero Announcement Strip (Clean unboxed design) */}
            <div className="border-b border-white/8 bg-[#090d18]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-white">Global Bengali Broadcast Network</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">“Federate the network, not the content.”</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentTab('documentary')}
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Bangladesh Documentary Archive (BBC & AJ)</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <span className="text-slate-600">|</span>
                  <button
                    onClick={() => setIsOwnershipOpen(true)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Ownership Disclosure
                  </button>
                </div>
              </div>
            </div>

            {/* Video Player Component */}
            <Player
              channel={activeChannel}
              allChannels={CHANNELS}
              onSelectChannel={handleSelectChannel}
              onOpenDocArchive={() => {
                setCurrentTab('documentary');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenPolicies={handleOpenPolicies}
              onOpenSchedule={() => {
                setCurrentTab('schedule');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Channel Discovery Grid */}
            <ChannelGrid
              channels={CHANNELS}
              activeChannel={activeChannel}
              onSelectChannel={handleSelectChannel}
            />

            {/* Feature Spotlight Bento: Domain Anchors */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Feature 1: Bangladesh Documentary Reference Channel with Original Broadcaster Thumbnail */}
                <div 
                  onClick={() => {
                    setCurrentTab('documentary');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-emerald-500/40 bg-[#0b0f19] cursor-pointer transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    <img 
                      src="https://i.ytimg.com/vi/a6v75dGv2z8/hqdefault.jpg" 
                      alt="Original Broadcast: All the Prime Minister's Men by Al Jazeera"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono text-emerald-400">
                      Original Broadcaster Thumbnail
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                        Curated Archival Index
                      </span>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        BBC & Al Jazeera Coverage
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Investigative documentaries, historical war archives of 1971, and the July 2024 uprising coverage organized with direct publisher links.
                    </p>
                    <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Explore Archive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Feature 2: Decentralized Federation Principle (Authentic Topology Layout) */}
                <div 
                  onClick={() => {
                    setCurrentTab('federation');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-emerald-500/40 bg-[#0b0f19] cursor-pointer transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-slate-950 via-[#070e1b] to-emerald-950/30 p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                        Peer Mesh Architecture
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        8 Nodes Active
                      </span>
                    </div>

                    {/* Visual Network Matrix */}
                    <div className="space-y-2 my-auto">
                      <div className="flex items-center justify-between p-2 bg-black/40 rounded border border-white/5 text-[11px]">
                        <span className="text-white font-medium">Dhaka Central Hub</span>
                        <span className="font-mono text-emerald-400">14ms latency</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-black/40 rounded border border-white/5 text-[11px]">
                        <span className="text-white font-medium">New York Jackson Heights</span>
                        <span className="font-mono text-emerald-400">38ms latency</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        “Federate the network, not the content”
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Every community retains sovereign ownership of its audience and content. Peering is strictly opt-in with zero forced carriage.
                    </p>
                    <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Inspect Global Nodes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Feature 3: Modular Open-Source Architecture */}
                <div 
                  onClick={() => {
                    setCurrentTab('architecture');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-emerald-500/40 bg-[#0b0f19] cursor-pointer transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-slate-950 via-[#0d131f] to-slate-900 p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                        Modular Specification
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Open-Source Core
                      </span>
                    </div>

                    {/* Visual 9-Tier flow */}
                    <div className="flex flex-wrap gap-1.5 my-auto">
                      {['Core', 'Node', 'Web', 'Player', 'Federation', 'Schema', 'SDK'].map((layer) => (
                        <span key={layer} className="px-2 py-1 bg-black/50 border border-white/10 rounded text-[10px] font-mono text-slate-300">
                          {layer}
                        </span>
                      ))}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        Core → Node → Web → Player → SDK
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Open code primitives, JSON-LD feed schema, and containerized node deployment. Open code never means open ownership of content.
                    </p>
                    <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>View Open Stack</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* TAB 1.5: Broadcast Programming Schedule (EPG Timeline) */}
        {currentTab === 'schedule' && (
          <BroadcastSchedule
            onSelectChannel={handleSelectChannel}
            onOpenPolicies={handleOpenPolicies}
          />
        )}

        {/* TAB 2: Bangladesh Documentary & International Reference Channel */}
        {currentTab === 'documentary' && (
          <BangladeshDocumentarySection
            onPlayChannelStream={() => {
              const docChannel = CHANNELS.find(c => c.id === 'bangladesh-doc-ref') || CHANNELS[0];
              handleSelectChannel(docChannel);
            }}
            onOpenPolicies={handleOpenPolicies}
          />
        )}

        {/* TAB 3: Global Federation Nodes */}
        {currentTab === 'federation' && (
          <FederationSection
            onOpenPolicies={handleOpenPolicies}
            onOpenOwnership={() => setIsOwnershipOpen(true)}
          />
        )}

        {/* TAB 4: 9-Tier Open-Source Architecture */}
        {currentTab === 'architecture' && (
          <OpenSourceArchitecture />
        )}

        {/* TAB 5: Institutional Governance & Policies */}
        {currentTab === 'policies' && (
          <PoliciesView
            initialTab={selectedPolicyTab}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

      </main>

      {/* Global Modals */}
      <OwnershipModal
        isOpen={isOwnershipOpen}
        onClose={() => setIsOwnershipOpen(false)}
        onOpenPolicies={handleOpenPolicies}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onOpenPolicies={handleOpenPolicies}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectChannel={handleSelectChannel}
        onSelectDocumentary={handleSelectDocumentary}
        onSelectPolicy={handleOpenPolicies}
        onSelectSchedule={() => {
          setCurrentTab('schedule');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPolicies={handleOpenPolicies}
        onOpenOwnership={() => setIsOwnershipOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

    </div>
  );
}
