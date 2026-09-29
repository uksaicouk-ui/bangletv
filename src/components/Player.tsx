import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, 
  RotateCcw, ShieldCheck, Radio, Tv, Info, Settings, 
  ExternalLink, Sparkles, Layers, Activity, AlertTriangle, 
  CheckCircle2, RefreshCw, Bookmark, Clock, Server, ArrowRight
} from 'lucide-react';
import { Channel, StreamSource } from '../types';
import { ChannelLogo } from './ChannelLogo';
import { BengalTVWatermark } from './BengalTVWatermark';

interface PlayerProps {
  channel: Channel;
  allChannels: Channel[];
  onSelectChannel: (channel: Channel) => void;
  onOpenDocArchive: () => void;
  onOpenPolicies: (tab?: string) => void;
  onOpenSchedule?: () => void;
  onOpenChannelInfo?: (channel: Channel) => void;
  onToggleFavorite?: (channelId: string) => void;
  isFavorite?: boolean;
}

export const Player: React.FC<PlayerProps> = ({
  channel,
  allChannels,
  onSelectChannel,
  onOpenDocArchive,
  onOpenPolicies,
  onOpenSchedule,
  onOpenChannelInfo,
  onToggleFavorite,
  isFavorite = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Stream Sources & Active Failover
  const sources: StreamSource[] = channel.sources && channel.sources.length > 0
    ? channel.sources
    : [{
        id: 'default-src',
        label: 'Server 1 (Primary Ingest)',
        type: channel.embedType,
        url: channel.streamUrl,
        quality: channel.resolution,
        isVerified: true,
        serverLocation: 'Dhaka Central'
      }];

  const [activeSourceIndex, setActiveSourceIndex] = useState<number>(0);
  const activeSource = sources[activeSourceIndex] || sources[0];

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '4:3' | '21:9'>('16:9');
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [streamHealth, setStreamHealth] = useState<'Optimal' | 'Stable' | 'Buffering'>('Optimal');
  const [bitrateInfo, setBitrateInfo] = useState<string>('5.2 Mbps');
  const [bufferSec, setBufferSec] = useState<number>(12.4);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [failoverCountdown, setFailoverCountdown] = useState<number | null>(null);
  const [isSwitchingSource, setIsSwitchingSource] = useState(false);

  // Reset active source index when channel changes
  useEffect(() => {
    setActiveSourceIndex(0);
    setStreamError(null);
    setFailoverCountdown(null);
  }, [channel.id]);

  // Stream initialization and error handling
  useEffect(() => {
    let hls: Hls | null = null;
    const video = videoRef.current;
    setStreamError(null);
    setStreamHealth('Optimal');

    if (activeSource.type === 'audio') {
      const audio = audioRef.current;
      if (audio) {
        audio.src = activeSource.url;
        audio.volume = volume;
        audio.muted = isMuted;
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
      return;
    }

    if (activeSource.type === 'hls' && video) {
      if (Hls.isSupported() && activeSource.url.endsWith('.m3u8')) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 60,
        });

        hls.loadSource(activeSource.url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
          setBitrateInfo(channel.resolution === '4K' ? '12.5 Mbps' : '5.2 Mbps');
        });

        hls.on(Hls.Events.BUFFER_APPENDED, () => {
          if (video.buffered.length > 0) {
            const buf = video.buffered.end(video.buffered.length - 1) - video.currentTime;
            setBufferSec(parseFloat(buf.toFixed(1)));
          }
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                setStreamHealth('Buffering');
                handleTriggerFailover();
                break;
              default:
                handleTriggerFailover();
                hls?.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = activeSource.url;
        video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [channel, activeSourceIndex]);

  // Volume & Mute listener
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Handle automatic failover trigger
  const handleTriggerFailover = () => {
    if (sources.length > 1) {
      const nextIdx = (activeSourceIndex + 1) % sources.length;
      setStreamError(`Primary upstream latency detected on ${activeSource.label}. Failover to backup endpoint starting...`);
      setFailoverCountdown(3);

      const interval = setInterval(() => {
        setFailoverCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            setActiveSourceIndex(nextIdx);
            setStreamError(null);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setStreamError(`Stream temporarily syncing from ${activeSource.serverLocation}. Reconnecting...`);
    }
  };

  const handleManualSourceSwitch = (idx: number) => {
    setIsSwitchingSource(true);
    setActiveSourceIndex(idx);
    setStreamError(null);
    setFailoverCountdown(null);
    setTimeout(() => setIsSwitchingSource(false), 300);
  };

  const togglePlay = () => {
    if (activeSource.type === 'audio' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      return;
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) setIsMuted(true);
    else if (isMuted) setIsMuted(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case '4:3': return 'aspect-[4/3]';
      case '21:9': return 'aspect-[21/9]';
      default: return 'aspect-[16/9]';
    }
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Video Viewport (Col 8/12 on large screens) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Player Shell */}
          <div 
            ref={containerRef}
            className={`group relative w-full bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-all ${getAspectClass()}`}
          >
            {/* 1. VISUAL STREAM AREA */}
            {activeSource.type === 'youtube' ? (
              <div className="absolute inset-0 w-full h-full bg-black">
                <iframe
                  key={channel.id + activeSource.url}
                  src={activeSource.url.includes('?') 
                    ? `${activeSource.url}&autoplay=1&mute=0&rel=0&modestbranding=1` 
                    : `${activeSource.url}?autoplay=1&mute=0&rel=0&modestbranding=1`
                  }
                  title={`${channel.name} Official Live Stream`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : activeSource.type === 'audio' ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-[#070a12] p-8 text-center">
                <audio ref={audioRef} autoPlay playsInline />
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                  <Radio className="w-10 h-10 text-emerald-400 animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{channel.name}</h3>
                <p className="text-sm text-slate-400 mb-6">{channel.currentShow}</p>
                
                {/* Audio visualizer bar simulation */}
                <div className="flex items-center gap-1.5 h-12">
                  {[24, 40, 18, 36, 50, 28, 44, 20, 48, 32, 16, 42].map((height, i) => (
                    <div 
                      key={i}
                      className="w-1.5 bg-emerald-400/80 rounded-full transition-all duration-300"
                      style={{ 
                        height: isPlaying ? `${height}px` : '4px',
                        opacity: isPlaying ? 0.9 : 0.3
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                autoPlay
                onClick={togglePlay}
              />
            )}

            {/* 2. BENGAL TV BROADCAST BUG WATERMARK (USER'S IMAGE REPRODUCTION) */}
            {/* Positioned in top-right corner with zero white background box */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-85 hover:opacity-100 transition-opacity">
              <BengalTVWatermark size="sm" showText={true} />
            </div>

            {/* 3. MULTI-SOURCE FAILOVER / ERROR RECOVERY OVERLAY */}
            {streamError && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center z-30 animate-fadeIn">
                <AlertTriangle className="w-10 h-10 text-amber-400 mb-2 animate-bounce" />
                <h4 className="text-base font-bold text-white font-brand mb-1">
                  Failover Stream Switcher Active
                </h4>
                <p className="text-xs text-slate-300 max-w-md mb-4 leading-relaxed">
                  {streamError}
                  {failoverCountdown !== null && (
                    <span className="block mt-1 font-mono text-emerald-400 font-bold">
                      Switching to backup relay in {failoverCountdown} seconds...
                    </span>
                  )}
                </p>

                {/* Manual Server Selection */}
                <div className="flex flex-wrap gap-2 justify-center mb-4 max-w-md">
                  {sources.map((src, idx) => (
                    <button
                      key={src.id}
                      onClick={() => handleManualSourceSwitch(idx)}
                      className={`px-3 py-1.5 text-xs font-mono rounded border transition-all cursor-pointer ${
                        activeSourceIndex === idx 
                          ? 'bg-emerald-400 text-slate-950 font-bold border-emerald-400' 
                          : 'bg-slate-800 hover:bg-slate-700 text-white border-white/10'
                      }`}
                    >
                      {src.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setStreamError(null);
                    setFailoverCountdown(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded cursor-pointer"
                >
                  Stay on Current Server
                </button>
              </div>
            )}

            {/* 4. TOP BROADCAST INFORMATION BAR */}
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-auto z-10">
              {/* Channel Number & Live Status */}
              <div className="flex items-center gap-2 px-2.5 py-1 bg-black/75 backdrop-blur-md border border-white/10 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase text-white font-mono">LIVE</span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-300 font-mono tabular-nums">{channel.viewersCount.toLocaleString()} watching</span>
              </div>

              {/* Active Server Badge with Switcher Trigger */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-black/75 backdrop-blur-md border border-white/10 rounded-lg text-xs text-slate-300 font-mono">
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeSource.label.split('(')[0]}</span>
              </div>
            </div>

            {/* 5. BOTTOM CONTROLS BAR (For Non-YouTube Streams) */}
            {activeSource.type !== 'youtube' && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col gap-2 z-10 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center justify-between text-white">
                  
                  {/* Left Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 hover:text-emerald-400 hover:bg-white/10 rounded transition-colors cursor-pointer"
                      aria-label={isPlaying ? 'Pause broadcast' : 'Play broadcast'}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>

                    {/* Volume Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleMute}
                        className="p-1.5 hover:text-emerald-400 rounded transition-colors cursor-pointer"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 sm:w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                        aria-label="Volume slider"
                      />
                    </div>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-2">
                    {/* Aspect Ratio */}
                    <div className="hidden sm:flex items-center bg-black/40 border border-white/10 rounded p-0.5 text-[11px]">
                      {(['16:9', '4:3', '21:9'] as const).map((ratio) => (
                        <button
                          key={ratio}
                          onClick={() => setAspectRatio(ratio)}
                          className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                            aspectRatio === ratio ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 hover:text-emerald-400 hover:bg-white/10 rounded transition-colors cursor-pointer"
                      aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* 6. OPERATIONAL FAILOVER SELECTOR & SOURCE SWITCHER BAR */}
          <div className="p-3 bg-[#0d131f] border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-slate-400">Stream Relay:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {sources.map((src, idx) => (
                  <button
                    key={src.id}
                    onClick={() => handleManualSourceSwitch(idx)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer whitespace-nowrap ${
                      activeSourceIndex === idx
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-bold'
                        : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {src.label.split('(')[0].trim()} ({src.quality})
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Channel Info Button */}
              {onOpenChannelInfo && (
                <button
                  onClick={() => onOpenChannelInfo(channel)}
                  className="px-2.5 py-1 bg-black/40 hover:bg-slate-800 text-slate-300 rounded border border-white/10 flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
                  title="Channel Technical Dossier"
                >
                  <Info className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Channel Info</span>
                </button>
              )}

              {/* Favorite Toggle Button */}
              {onToggleFavorite && (
                <button
                  onClick={() => onToggleFavorite(channel.id)}
                  className={`px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 text-xs cursor-pointer ${
                    isFavorite 
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold' 
                      : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                  }`}
                  title={isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current text-emerald-400' : ''}`} />
                  <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
                </button>
              )}
            </div>
          </div>

          {/* 7. EPG PROGRESS BAR & NOW PLAYING */}
          {channel.epgCurrent && (
            <div className="p-3 bg-[#0d131f] border border-white/10 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-semibold text-white">{channel.epgCurrent.title}</span>
                  {channel.epgCurrent.banglaTitle && (
                    <span className="text-slate-400 hidden sm:inline">({channel.epgCurrent.banglaTitle})</span>
                  )}
                </div>
                <span className="font-mono text-slate-400 text-[11px]">
                  {channel.epgCurrent.startTime} - {channel.epgCurrent.endTime}
                </span>
              </div>
              
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 rounded-full transition-all"
                  style={{ width: `${channel.epgCurrent.progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* 8. Stream Diagnostics Box (Expandable) */}
          {showDiagnostics && (
            <div className="p-4 bg-[#0d131f] border border-emerald-500/20 rounded-lg text-xs font-mono text-slate-300 space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-semibold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Cryptographic Peer Telemetry & Manifest Provenance
                </span>
                <span className="text-[11px] text-slate-500">Protocol v1.4-federated</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Active Ingest</span>
                  <span className="text-white font-semibold">{activeSource.label}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Resolution</span>
                  <span className="text-white font-semibold">{channel.resolution}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Bitrate Target</span>
                  <span className="text-emerald-400 font-semibold">{bitrateInfo}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Failover Relays</span>
                  <span className="text-white font-semibold">{sources.length} Standby</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar: Quick Channels Switcher & EPG (Col 4/12) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Channel Info Card */}
          <div className="p-5 bg-[#0b0f19] border border-white/10 rounded-xl space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <ChannelLogo channelId={channel.id} size="lg" />
                <div>
                  <div className="flex items-center gap-1.5">
                    {channel.number && (
                      <span className="text-[11px] font-mono text-emerald-400 font-bold">CH {channel.number}</span>
                    )}
                    <span className="text-slate-500">·</span>
                    <span className="text-[11px] font-mono text-slate-300">{channel.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-white font-brand">{channel.name}</h3>
                  {channel.banglaName && (
                    <p className="text-xs text-slate-400">{channel.banglaName}</p>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {channel.description}
            </p>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>{channel.country || 'Bangladesh'} · {channel.broadcastLanguage}</span>
              <span className="text-emerald-400">{channel.resolution}</span>
            </div>
          </div>

          {/* Quick Channel Roster */}
          <div className="p-4 bg-[#0b0f19] border border-white/10 rounded-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-slate-400">Live Grid Navigator</span>
              {onOpenSchedule && (
                <button
                  onClick={onOpenSchedule}
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>24h EPG</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
              {allChannels.slice(0, 10).map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => onSelectChannel(ch)}
                  className={`w-full p-2 rounded-lg flex items-center justify-between text-left transition-all cursor-pointer ${
                    ch.id === channel.id
                      ? 'bg-emerald-500/20 border border-emerald-500/50 text-white'
                      : 'bg-black/30 hover:bg-slate-800/60 border border-transparent text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <ChannelLogo channelId={ch.id} size="sm" />
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate text-white">{ch.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{ch.currentShow}</div>
                    </div>
                  </div>
                  
                  {ch.id === channel.id && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
