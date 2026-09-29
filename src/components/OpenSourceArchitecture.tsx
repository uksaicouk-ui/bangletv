import React, { useState } from 'react';
import { 
  Cpu, Server, Layout, PlaySquare, Network, FileCode2, 
  Terminal, HardDriveDownload, BookOpen, Copy, Check, ShieldCheck 
} from 'lucide-react';
import { OPEN_SOURCE_ECOSYSTEM, EcosystemModule } from '../data/federationNodesData';

export const OpenSourceArchitecture: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>('mod-core');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'stack' | 'schema' | 'quickstart'>('stack');

  const activeModule = OPEN_SOURCE_ECOSYSTEM.find(m => m.id === activeModuleId) || OPEN_SOURCE_ECOSYSTEM[0];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sampleSchema = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "BangleTVCommunityFeedV1",
  "type": "object",
  "required": ["nodeId", "nodeName", "operator", "channels", "cryptographicProof"],
  "properties": {
    "nodeId": { "type": "string", "example": "node-dhaka-central" },
    "nodeName": { "type": "string", "example": "Dhaka Metropolitan Node" },
    "federationMode": { "type": "string", "enum": ["Opt-in Full Relay", "Opt-in Metadata Only", "Autonomous Isolated"] },
    "channels": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "name", "streamUrl", "licenseType"],
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "streamUrl": { "type": "string", "format": "uri" },
          "licenseType": { "type": "string", "enum": ["Original Production", "Authorized Community Relay", "Public Broadcaster"] }
        }
      }
    },
    "cryptographicProof": {
      "algorithm": "Ed25519",
      "publicKey": "ed25519:9f4a7c8b21...",
      "signature": "3a09fb2e87c0..."
    }
  }
}`;

  const sampleDockerCommand = `# Launch an autonomous BangleTV community broadcast node
docker run -d \\
  --name bangletv-node \\
  -p 8080:8080 \\
  -v ./config/bangle-feed.json:/etc/bangletv/feed.json:ro \\
  -e NODE_REGION="Sylhet" \\
  -e FEDERATION_PEER="https://nyc.node.bangletv.com" \\
  bangletv/node-daemon:v1.4.2`;

  const getLayerIcon = (layer: string) => {
    switch (layer) {
      case 'Core': return <Cpu className="w-4 h-4" />;
      case 'Node': return <Server className="w-4 h-4" />;
      case 'Web': return <Layout className="w-4 h-4" />;
      case 'Player': return <PlaySquare className="w-4 h-4" />;
      case 'Federation': return <Network className="w-4 h-4" />;
      case 'Schema': return <FileCode2 className="w-4 h-4" />;
      case 'SDK': return <Terminal className="w-4 h-4" />;
      case 'Deployment': return <HardDriveDownload className="w-4 h-4" />;
      case 'Documentation': return <BookOpen className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="border-b border-white/10 pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono uppercase tracking-wider mb-2">
          <span>Open-Source Technical Blueprint</span>
          <span className="text-slate-500">·</span>
          <span>Decentralized Engineering</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-brand mb-3">
          The 9-Tier Modular Ecosystem
        </h2>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          BangleTV implements a complete open-source technology stack: <code className="text-emerald-400">Core → Node → Web → Player → Federation → Schema → SDK → Deployment → Documentation</code>.
        </p>

        {/* Content Sovereignty Distinction */}
        <div className="mt-4 p-3.5 bg-slate-900 border-l-3 border-emerald-400 rounded-r text-xs text-slate-300 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Constitutional Boundary: </strong>
            Open-source software must never mean open ownership of community content. While our software libraries are transparent and open under MIT/GPL/MPL licenses, all community broadcasts, journalism, scripts, and original art remain the sole proprietary possession of their respective community creators.
          </div>
        </div>
      </div>

      {/* View Switcher: Stack vs Schema vs Quickstart */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab('stack')}
          className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
            activeTab === 'stack' ? 'bg-emerald-400 text-slate-950' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          9-Tier Ecosystem Stack
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
            activeTab === 'schema' ? 'bg-emerald-400 text-slate-950' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          JSON-LD Feed Schema
        </button>
        <button
          onClick={() => setActiveTab('quickstart')}
          className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
            activeTab === 'quickstart' ? 'bg-emerald-400 text-slate-950' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Self-Host Node (Docker)
        </button>
      </div>

      {activeTab === 'stack' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Horizontal/Vertical Pipeline Bar */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
              Select Architecture Layer:
            </span>
            {OPEN_SOURCE_ECOSYSTEM.map((mod, idx) => {
              const isSelected = mod.id === activeModuleId;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleId(mod.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-white'
                      : 'bg-[#0b0f19] hover:bg-slate-900/60 border-white/5 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-500">
                      0{idx + 1}
                    </span>
                    <span className="text-emerald-400">{getLayerIcon(mod.layer)}</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{mod.name}</h4>
                      <p className="text-[10px] text-slate-400">{mod.layer} Layer</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{mod.techStack.split('/')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Module Inspector Pane */}
          <div className="lg:col-span-8 bg-[#0b0f19] border border-white/10 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    {getLayerIcon(activeModule.layer)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>Tier: {activeModule.layer}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-400 font-mono">{activeModule.license}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{activeModule.name}</h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-slate-400 block">Stack</span>
                  <span className="text-xs font-semibold text-white">{activeModule.techStack}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                    System Purpose & Role
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {activeModule.purpose}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                    Technical Specifications
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed p-3 bg-black/40 rounded border border-white/5 font-mono">
                    {activeModule.specSummary}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick snippet for this module */}
            <div className="p-3 bg-black/50 border border-white/10 rounded flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 truncate mr-2">
                git clone https://github.com/bangletv/{activeModule.name}.git
              </span>
              <button
                onClick={() => handleCopy(`git clone https://github.com/bangletv/${activeModule.name}.git`, activeModule.id)}
                className="p-1 hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
              >
                {copiedCode === activeModule.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{copiedCode === activeModule.id ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {activeTab === 'schema' && (
        <div className="bg-[#0b0f19] border border-white/10 rounded-lg p-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">bangle-feed.json Specification v1</h3>
              <p className="text-xs text-slate-400">All community nodes publish this validated schema at their feed endpoint.</p>
            </div>
            <button
              onClick={() => handleCopy(sampleSchema, 'schema')}
              className="px-3 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded border border-white/10 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedCode === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode === 'schema' ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>
          <pre className="p-4 bg-black/60 rounded border border-white/5 text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed">
            {sampleSchema}
          </pre>
        </div>
      )}

      {activeTab === 'quickstart' && (
        <div className="bg-[#0b0f19] border border-white/10 rounded-lg p-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Spin Up a Node in 30 Seconds</h3>
              <p className="text-xs text-slate-400">Run the lightweight node daemon on your server or cloud VPS.</p>
            </div>
            <button
              onClick={() => handleCopy(sampleDockerCommand, 'docker')}
              className="px-3 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded border border-white/10 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedCode === 'docker' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode === 'docker' ? 'Copied' : 'Copy Shell Command'}</span>
            </button>
          </div>
          <pre className="p-4 bg-black/60 rounded border border-white/5 text-xs text-slate-200 font-mono overflow-x-auto leading-relaxed">
            {sampleDockerCommand}
          </pre>
        </div>
      )}

    </section>
  );
};
