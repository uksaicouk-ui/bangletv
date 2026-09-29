import React from 'react';
import { 
  X, Tv, Globe, Radio, ShieldCheck, Activity, 
  MapPin, Clock, Info, CheckCircle2, Play 
} from 'lucide-react';
import { IPTVChannel } from '../data/iptvRegistry';
import { ChannelLogo } from './ChannelLogo';

interface ChannelInfoModalProps {
  channel: IPTVChannel | null;
  isOpen: boolean;
  onClose: () => void;
  onPlayChannel: (channel: IPTVChannel) => void;
}

export const ChannelInfoModal: React.FC<ChannelInfoModalProps> = ({
  channel,
  isOpen,
  onClose,
  onPlayChannel,
}) => {
  if (!isOpen || !channel) return null;

  const activeSrc = channel.sources[channel.activeSourceIndex] || channel.sources[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0d131f] border border-white/15 rounded-xl max-w-2xl w-full p-6 shadow-2xl space-y-6 animate-fadeIn text-slate-200">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <ChannelLogo channelId={channel.id} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 font-bold">CH {channel.number}</span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-300 font-mono">{channel.category}</span>
                <span className="text-slate-500">·</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {channel.status}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-brand mt-0.5">
                {channel.name}
              </h3>
              {channel.banglaName && (
                <p className="text-xs text-slate-400">{channel.banglaName}</p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Transmission Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/40 border border-white/10 rounded-lg p-4 font-mono text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Country / Origin</span>
            <span className="text-white font-semibold">{channel.country}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Broadcast Language</span>
            <span className="text-white font-semibold">{channel.language}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Encoding Resolution</span>
            <span className="text-emerald-400 font-semibold">{channel.resolution}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Average Bitrate</span>
            <span className="text-white font-semibold">{channel.bitrate}</span>
          </div>
        </div>

        {/* EPG Now & Next */}
        <div className="p-4 bg-slate-900/60 border border-white/10 rounded-lg space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-white/5">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              Electronic Program Guide (EPG)
            </span>
            <span>Real-Time EPG Sync</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-emerald-400 uppercase font-mono block">● Now Broadcasting</span>
              <div className="font-bold text-white text-sm">{channel.epgCurrent.title}</div>
              <div className="text-[11px] text-slate-400 font-mono">{channel.epgCurrent.startTime} - {channel.epgCurrent.endTime}</div>
              {/* Progress bar */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1.5">
                <div 
                  className="h-full bg-emerald-400 rounded-full" 
                  style={{ width: `${channel.epgCurrent.progressPercent}%` }} 
                />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">○ Up Next</span>
              <div className="font-semibold text-slate-200">{channel.epgNext.title}</div>
              <div className="text-[11px] text-slate-500 font-mono">{channel.epgNext.startTime} - {channel.epgNext.endTime}</div>
            </div>
          </div>
        </div>

        {/* Ingest Source Routing */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-slate-400 block">
            Ingest Source Endpoints ({channel.sources.length} Active Servers)
          </span>
          <div className="space-y-1.5">
            {channel.sources.map((src, i) => (
              <div 
                key={src.id}
                className="p-2.5 bg-black/50 border border-white/5 rounded flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${i === channel.activeSourceIndex ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                  <span className="text-slate-300 font-semibold">{src.label}</span>
                  <span className="text-slate-500 text-[10px]">({src.serverLocation})</span>
                </div>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[10px]">
                  {src.quality}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Description & Editorial Note */}
        <div className="space-y-2 text-xs">
          <p className="text-slate-300 leading-relaxed">
            {channel.description}
          </p>
          <div className="p-3 bg-black/40 border border-white/5 rounded text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{channel.editorialNote}</span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500">
            Node: {channel.originNode}
          </span>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onPlayChannel(channel);
                onClose();
              }}
              className="px-5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Live Transmission</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
