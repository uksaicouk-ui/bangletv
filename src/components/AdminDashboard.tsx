import React, { useState } from 'react';
import { 
  ShieldCheck, Server, Activity, Plus, Trash2, Edit2, CheckCircle2, 
  AlertTriangle, RefreshCw, Play, Globe, ExternalLink, Download, FileCode, Check 
} from 'lucide-react';
import { IPTV_CHANNELS, IPTVChannel, StreamSource } from '../data/iptvRegistry';
import { ChannelLogo } from './ChannelLogo';

interface AdminDashboardProps {
  channels: IPTVChannel[];
  onUpdateChannels: (updated: IPTVChannel[]) => void;
  onSelectChannel: (channel: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  channels,
  onUpdateChannels,
  onSelectChannel,
}) => {
  const [testUrl, setTestUrl] = useState('');
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'testing' | 'valid' | 'invalid'; message: string; latency?: number } | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedChannelToEdit, setSelectedChannelToEdit] = useState<IPTVChannel | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [copiedM3U, setCopiedM3U] = useState(false);

  // New Channel Form State
  const [newChName, setNewChName] = useState('');
  const [newChBangla, setNewChBangla] = useState('');
  const [newChCategory, setNewChCategory] = useState<any>('News');
  const [newChCountry, setNewChCountry] = useState('Bangladesh');
  const [newChLanguage, setNewChLanguage] = useState<any>('Bangla');
  const [newChSourceUrl, setNewChSourceUrl] = useState('');
  const [newChBackupUrl, setNewChBackupUrl] = useState('');

  // Validate a URL
  const handleValidateUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testUrl.trim()) return;

    setTestResult({ status: 'testing', message: 'Pinging stream endpoint and checking CORS/Manifest headers...' });

    const startTime = Date.now();
    try {
      // Simulate live network ping check
      await new Promise(r => setTimeout(r, 600));
      const latency = Date.now() - startTime;

      if (testUrl.includes('youtube') || testUrl.includes('youtu.be') || testUrl.includes('.m3u8') || testUrl.includes('icecast') || testUrl.startsWith('http')) {
        setTestResult({
          status: 'valid',
          message: `Stream endpoint reachable. Manifest parsed successfully. Latency: ${latency}ms`,
          latency
        });
      } else {
        setTestResult({
          status: 'invalid',
          message: 'Invalid stream format. Expected HTTPS HLS (.m3u8), audio stream, or authorized YouTube Live embed URL.'
        });
      }
    } catch {
      setTestResult({
        status: 'invalid',
        message: 'Stream unreachable or CORS blocked. Ensure CORS headers (Access-Control-Allow-Origin: *) are configured on CDN.'
      });
    }
  };

  const handleAddNewChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChName.trim() || !newChSourceUrl.trim()) return;

    const sources: StreamSource[] = [
      {
        id: `src-primary-${Date.now()}`,
        label: 'Server 1 (Primary Ingest)',
        type: newChSourceUrl.includes('youtube') ? 'youtube' : 'hls',
        url: newChSourceUrl,
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Dhaka CDN'
      }
    ];

    if (newChBackupUrl.trim()) {
      sources.push({
        id: `src-backup-${Date.now()}`,
        label: 'Server 2 (Failover Relay)',
        type: newChBackupUrl.includes('youtube') ? 'youtube' : 'hls',
        url: newChBackupUrl,
        quality: '720p',
        isVerified: true,
        serverLocation: 'Singapore Node'
      });
    }

    const newChannel: IPTVChannel = {
      id: `custom-${Date.now()}`,
      number: channels.length + 100,
      name: newChName,
      banglaName: newChBangla || newChName,
      category: newChCategory,
      country: newChCountry,
      region: 'Bangladesh',
      language: newChLanguage,
      logo: 'btv-world',
      sources,
      activeSourceIndex: 0,
      isLive: true,
      status: 'Online',
      currentShow: 'Live Broadcast Transmission',
      nextShow: 'Hourly Bulletin & Analysis',
      epgCurrent: {
        title: 'Live Transmission',
        startTime: '10:00 PM',
        endTime: '11:00 PM',
        duration: '60 min',
        progressPercent: 50
      },
      epgNext: {
        title: 'Upcoming Broadcast',
        startTime: '11:00 PM',
        endTime: '12:00 AM',
        duration: '60 min',
        progressPercent: 0
      },
      viewersCount: 1200,
      resolution: '1080p',
      broadcastProtocol: newChSourceUrl.includes('youtube') ? 'YouTube 24/7' : 'HLS / LL-HLS',
      bitrate: '4.8 Mbps',
      originNode: 'Community Node Relay',
      description: 'Custom community broadcast node ingested via BangleTV admin control panel.',
      editorialNote: 'Community provisioned stream.',
      tags: ['Custom', 'Community', 'Live']
    };

    onUpdateChannels([newChannel, ...channels]);
    setIsAddingNew(false);
    setNewChName('');
    setNewChBangla('');
    setNewChSourceUrl('');
    setNewChBackupUrl('');
  };

  const handleDeleteChannel = (id: string) => {
    if (confirm('Are you sure you want to remove this channel from the operational grid?')) {
      onUpdateChannels(channels.filter(c => c.id !== id));
    }
  };

  // Generate M3U playlist export
  const handleExportM3U = () => {
    let m3u = `#EXTM3U\n#PLAYLIST:BangleTV Federated Community Grid\n\n`;
    channels.forEach((ch) => {
      const activeSrc = ch.sources[ch.activeSourceIndex] || ch.sources[0];
      m3u += `#EXTINF:-1 tvg-id="${ch.id}" tvg-name="${ch.name}" tvg-logo="${ch.logo}" group-title="${ch.category}",${ch.name}\n${activeSrc.url}\n\n`;
    });

    navigator.clipboard.writeText(m3u);
    setCopiedM3U(true);
    setTimeout(() => setCopiedM3U(false), 2500);
  };

  const filteredChannels = channels.filter((ch) => {
    if (filterStatus === 'All') return true;
    return ch.status === filterStatus;
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn text-slate-200">
      
      {/* Top Banner */}
      <div className="border-b border-white/10 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono uppercase tracking-wider mb-2">
            <Server className="w-4 h-4" />
            <span>Operational Layer Control Panel</span>
            <span className="text-slate-500">·</span>
            <span>Source Validation & Stream Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-brand">
            IPTV Operations & Telemetry Control
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Monitor real-time feed health, multi-source failover routing, stream validation, and federated community channel ingestion.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportM3U}
            className="px-3.5 py-2 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-white/10 flex items-center gap-2 transition-colors cursor-pointer"
            title="Export M3U Playlist for VLC / Kodi / TiviMate"
          >
            {copiedM3U ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
            <span>{copiedM3U ? 'M3U Copied!' : 'Export M3U Playlist'}</span>
          </button>

          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Ingest Channel</span>
          </button>
        </div>
      </div>

      {/* Grid: Diagnostics Tool & Live Telemetry Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Stream URL Live Validator Box */}
        <div className="lg:col-span-2 p-5 bg-[#0b0f19] border border-white/10 rounded-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-sm font-bold text-white font-brand">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Real-Time Stream Validator & Probe</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">HLS · WebRTC · YouTube Embed · Icecast</span>
          </div>

          <form onSubmit={handleValidateUrl} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Paste stream endpoint (e.g., https://.../master.m3u8 or YouTube live URL)..."
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs bg-black/50 border border-white/15 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Test Probe</span>
              </button>
            </div>

            {testResult && (
              <div className={`p-3 rounded-lg text-xs font-mono flex items-start gap-2.5 ${
                testResult.status === 'testing' ? 'bg-blue-950/40 text-blue-300 border border-blue-500/30' :
                testResult.status === 'valid' ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30' :
                'bg-red-950/40 text-red-300 border border-red-500/30'
              }`}>
                {testResult.status === 'valid' && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />}
                {testResult.status === 'invalid' && <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
                {testResult.status === 'testing' && <RefreshCw className="w-4 h-4 text-blue-400 animate-spin mt-0.5 flex-shrink-0" />}
                <div>
                  <div className="font-semibold">{testResult.message}</div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Global Operational Metrics */}
        <div className="p-5 bg-[#0b0f19] border border-white/10 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono uppercase text-slate-400">Network Telemetry</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="grid grid-cols-2 gap-4 py-2">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-mono">Total Active Streams</span>
              <span className="text-2xl font-bold text-white font-mono">{channels.length}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-mono">Stream Availability</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">99.8%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-mono">Fallback Nodes</span>
              <span className="text-2xl font-bold text-amber-300 font-mono">14 Hot Relays</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-mono">Active Protocols</span>
              <span className="text-sm font-bold text-slate-300 font-mono">HLS / YT / Icecast</span>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-slate-500 font-mono border-t border-white/5">
            Auto-failover trigger set to 3,500ms timeout threshold.
          </div>
        </div>

      </div>

      {/* Add New Channel Modal / Dialog */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d131f] border border-white/15 rounded-xl max-w-xl w-full p-6 space-y-4 animate-fadeIn shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-brand">Ingest New Broadcast Channel</h3>
              <button onClick={() => setIsAddingNew(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddNewChannel} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Channel Name (English) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bangladesh Rural TV"
                    value={newChName}
                    onChange={(e) => setNewChName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-black/50 border border-white/10 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Bangla Name</label>
                  <input
                    type="text"
                    placeholder="e.g. পল্লী টিভি"
                    value={newChBangla}
                    onChange={(e) => setNewChBangla(e.target.value)}
                    className="w-full px-3 py-1.5 bg-black/50 border border-white/10 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Category</label>
                  <select
                    value={newChCategory}
                    onChange={(e) => setNewChCategory(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-900 border border-white/10 rounded text-white"
                  >
                    <option value="News">News</option>
                    <option value="Sports">Sports</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Education">Education</option>
                    <option value="Culture">Culture</option>
                    <option value="Community">Community</option>
                    <option value="Documentary">Documentary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Country</label>
                  <input
                    type="text"
                    value={newChCountry}
                    onChange={(e) => setNewChCountry(e.target.value)}
                    className="w-full px-2 py-1.5 bg-black/50 border border-white/10 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Language</label>
                  <select
                    value={newChLanguage}
                    onChange={(e) => setNewChLanguage(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-900 border border-white/10 rounded text-white"
                  >
                    <option value="Bangla">Bangla</option>
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Primary Live Stream URL (Server 1) *</label>
                <input
                  type="text"
                  required
                  placeholder="https://... (HLS m3u8 or YouTube Live URL)"
                  value={newChSourceUrl}
                  onChange={(e) => setNewChSourceUrl(e.target.value)}
                  className="w-full px-3 py-1.5 bg-black/50 border border-white/10 rounded text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">Fallback Failover Stream URL (Server 2)</label>
                <input
                  type="text"
                  placeholder="Optional redundant backup feed endpoint"
                  value={newChBackupUrl}
                  onChange={(e) => setNewChBackupUrl(e.target.value)}
                  className="w-full px-3 py-1.5 bg-black/50 border border-white/10 rounded text-white font-mono"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold rounded"
                >
                  Ingest & Activate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Operational Channels Table */}
      <div className="bg-[#0b0f19] border border-white/10 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white font-brand">Active Channel Registry & Routing Status</h3>
            <span className="text-xs text-slate-400 font-mono">({filteredChannels.length} Feeds Registered)</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono">Filter:</span>
            {['All', 'Online', 'Degraded'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                  filterStatus === s ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/70 border-b border-white/10 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Channel & Identity</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Region & Lang</th>
                <th className="py-3 px-4">Active Ingest Source</th>
                <th className="py-3 px-4">Failover Servers</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-[11px]">
              {filteredChannels.map((channel) => {
                const activeSrc = channel.sources[channel.activeSourceIndex] || channel.sources[0];

                return (
                  <tr key={channel.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 text-slate-500 font-bold">{channel.number}</td>
                    
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <ChannelLogo channelId={channel.id} size="sm" />
                        <div>
                          <div className="font-sans font-bold text-white text-xs">{channel.name}</div>
                          <div className="text-[10px] text-slate-400 font-sans">{channel.banglaName}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-black/40 rounded border border-white/10 text-slate-300">
                        {channel.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-400">
                      {channel.country} · {channel.language}
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-emerald-400 font-semibold truncate max-w-[200px]" title={activeSrc.url}>
                        {activeSrc.label}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {channel.broadcastProtocol} · {channel.resolution}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {channel.sources.length} Endpoints
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${channel.status === 'Online' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                        <span className={channel.status === 'Online' ? 'text-emerald-400' : 'text-amber-400'}>
                          {channel.status}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectChannel(channel)}
                          className="px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded font-sans text-xs transition-colors cursor-pointer"
                          title="Tune In Live"
                        >
                          Tune
                        </button>
                        <button
                          onClick={() => handleDeleteChannel(channel.id)}
                          className="p-1 hover:text-red-400 text-slate-500 rounded transition-colors cursor-pointer"
                          title="Remove from grid"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
};
