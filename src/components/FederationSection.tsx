import React, { useState } from 'react';
import { 
  Globe, ShieldCheck, Network, Cpu, ArrowUpRight, 
  Server, Lock, CheckCircle2, AlertCircle, PlusCircle, X
} from 'lucide-react';
import { FEDERATION_NODES } from '../data/federationNodesData';
import { CommunityNode } from '../types';

interface FederationSectionProps {
  onOpenPolicies: (tab?: string) => void;
  onOpenOwnership: () => void;
}

export const FederationSection: React.FC<FederationSectionProps> = ({
  onOpenPolicies,
  onOpenOwnership,
}) => {
  const [selectedNode, setSelectedNode] = useState<CommunityNode | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [formData, setFormData] = useState({
    communityName: '',
    city: '',
    country: '',
    operatorName: '',
    email: '',
    manifestUrl: '',
    federationAgreement: false,
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.federationAgreement) return;
    setRegisteredSuccess(true);
    setTimeout(() => {
      setRegisteredSuccess(false);
      setShowRegisterModal(false);
      setFormData({
        communityName: '',
        city: '',
        country: '',
        operatorName: '',
        email: '',
        manifestUrl: '',
        federationAgreement: false,
      });
    }, 2500);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Principle Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-950/40 via-[#0d131f] to-slate-900 border border-emerald-500/30 p-6 sm:p-8 mb-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            <Network className="w-4 h-4" />
            <span>The Federation Protocol Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-brand mb-3">
            “Federate the network, not the content.”
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            Every community retains sovereign ownership of its channels, programming, audience relationship, and editorial line. Federation across BangleTV is strictly opt-in. No central authority or external community can force carriage or dictate broadcast schedules.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm shadow-emerald-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register a Community Node</span>
            </button>
            <button
              onClick={() => onOpenPolicies('federation')}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 border border-white/10 rounded transition-colors cursor-pointer"
            >
              Read Federation Charter
            </button>
            <button
              onClick={onOpenOwnership}
              className="px-4 py-2 text-xs font-medium text-emerald-300 hover:text-emerald-200 bg-emerald-950/40 border border-emerald-500/20 rounded transition-colors cursor-pointer"
            >
              Executive Ownership Transparency
            </button>
          </div>
        </div>
      </div>

      {/* Leadership & Strategic Balance Callout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        
        {/* USA Patronage Card */}
        <div className="p-5 bg-[#0b0f19] border border-white/10 rounded-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono text-emerald-400">United States Principal Patronage</span>
              <span>Headquarters Node</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Anwar Tariq Khan
            </h3>
            <p className="text-xs text-emerald-300 font-medium mb-3">
              Owner, Patron and Principal Decision-Maker (United States)
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              BangleTV.com (and BengalTV.com), its principal core assets, trademark protections, and overarching strategic decisions are controlled, held, and patronized from the United States.
            </p>
          </div>
          <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Asset Jurisdiction: USA</span>
            <button onClick={onOpenOwnership} className="text-emerald-400 hover:underline">
              View Legal Scope →
            </button>
          </div>
        </div>

        {/* BD Operational Execution Card */}
        <div className="p-5 bg-[#0b0f19] border border-white/10 rounded-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono text-emerald-400">Bangladesh Operational Desk</span>
              <span>Engineering & Maintenance Hub</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Sheikh Mehedi Hasan Nadim
            </h3>
            <p className="text-xs text-emerald-300 font-medium mb-3">
              Founding Member & Operational Head / Executive Operator (Bangladesh)
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Operating from Bangladesh, responsible for day-to-day administration, technical maintenance, deployment, and practical execution. Operation from Bangladesh does not constitute ownership.
            </p>
          </div>
          <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Technical Execution: BD</span>
            <button onClick={onOpenOwnership} className="text-emerald-400 hover:underline">
              View Operations Scope →
            </button>
          </div>
        </div>

      </div>

      {/* Global Node Matrix */}
      <div className="border-b border-white/10 pb-4 mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-white font-brand">
            Active Community Nodes & Peering Status
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Decentralized broadcast daemons running the open BangleTV protocol.
          </p>
        </div>
        <span className="text-xs font-mono text-emerald-400 tabular-nums">
          {FEDERATION_NODES.length} Global Nodes Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEDERATION_NODES.map((node) => (
          <div
            key={node.id}
            onClick={() => setSelectedNode(node)}
            className="p-4 bg-[#0b0f19] hover:bg-slate-900/60 border border-white/10 hover:border-emerald-500/40 rounded-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-base">{node.flag}</span>
                <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {node.latencyMs}ms
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-0.5">{node.name}</h4>
              <p className="text-xs text-slate-400 mb-2">{node.city}, {node.country}</p>

              <div className="text-[11px] text-slate-300 line-clamp-2 mb-3">
                {node.description}
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">{node.channelCount} Local Channels</span>
              <span className="text-emerald-400 font-medium">Inspect Node →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Node Detail Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d131f] border border-white/15 rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-2xl mr-2">{selectedNode.flag}</span>
                <h3 className="text-xl font-bold text-white inline-block">{selectedNode.name}</h3>
                <p className="text-xs text-slate-400">{selectedNode.city}, {selectedNode.country} · Established {selectedNode.establishedYear}</p>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-black/40 rounded border border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Operator:</span>
                <span className="text-white font-medium">{selectedNode.operator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Role / Status:</span>
                <span className="text-emerald-400">{selectedNode.operatorRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Federation Mode:</span>
                <span className="text-slate-200">{selectedNode.federationMode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Node Public Feed:</span>
                <code className="text-emerald-400 font-mono text-[11px]">{selectedNode.endpointUrl}</code>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedNode.description}
            </p>

            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button
                onClick={() => setSelectedNode(null)}
                className="px-4 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Node Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d131f] border border-white/15 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Register Community Broadcast Node</h3>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {registeredSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Node Manifest Accepted</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Your community node proposal has been submitted to the technical operations desk led by Sheikh Mehedi Hasan Nadim for cryptographic certificate issuance.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Community Node Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Bangle Boston Diaspora Network"
                    value={formData.communityName}
                    onChange={(e) => setFormData({ ...formData, communityName: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">City</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Boston, MA"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Country</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. United States"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Operator Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Greater Boston Bengali Council"
                      value={formData.operatorName}
                      onChange={(e) => setFormData({ ...formData, operatorName: e.target.value })}
                      className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Contact Email</label>
                    <input
                      required
                      type="email"
                      placeholder="operator@community.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Public Feed Endpoint (bangle-feed.json)</label>
                  <input
                    required
                    type="url"
                    placeholder="https://node.mycommunity.org/v1/feed"
                    value={formData.manifestUrl}
                    onChange={(e) => setFormData({ ...formData, manifestUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white focus:outline-none focus:border-emerald-500 font-mono text-[11px]"
                  />
                </div>

                <div className="p-3 bg-slate-900 rounded border border-white/10 space-y-2">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.federationAgreement}
                      onChange={(e) => setFormData({ ...formData, federationAgreement: e.target.checked })}
                      className="mt-0.5 accent-emerald-500"
                    />
                    <span className="text-[11px] text-slate-300">
                      I agree to the principle: <strong>“Federate the network, not the content.”</strong> I certify that all streamed content is authorized, free from copyright infringement, and adheres to the Content & Distribution Policy.
                    </span>
                  </label>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(false)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded cursor-pointer"
                  >
                    Submit Intake Application
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
