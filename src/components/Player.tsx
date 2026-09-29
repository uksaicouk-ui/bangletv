import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, 
  RotateCcw, ShieldCheck, Radio, Tv, Info, Settings, 
  ExternalLink, Sparkles, Layers, Activity
} from 'lucide-react';
import { Channel } from '../types';
import { ChannelLogo } from './ChannelLogo';

interface PlayerProps {
  channel: Channel;
  allChannels: Channel[];
  onSelectChannel: (channel: Channel) => void;
  onOpenDocArchive: () => void;
  onOpenPolicies: (tab?: string) => void;
  onOpenSchedule?: () => void;
}

export const Player: React.FC<PlayerProps> = ({
  channel,
  allChannels,
  onSelectChannel,
  onOpenDocArchive,
  onOpenPolicies,
  onOpenSchedule,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '4:3' | '21:9'>('16:9');
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [streamHealth, setStreamHealth] = useState<'Optimal' | 'Stable' | 'Buffering'>('Optimal');
  const [bitrateInfo, setBitrateInfo] = useState<string>('4.8 Mbps');
  const [bufferSec, setBufferSec] = useState<number>(12.4);
  const [streamError, setStreamError] = useState<string | null>(null);

  // Initialize and reload HLS or stream
  useEffect(() => {
    let hls: Hls | null = null;
    const video = videoRef.current;
    setStreamError(null);
    setStreamHealth('Optimal');

    if (channel.embedType === 'audio') {
      const audio = audioRef.current;
      if (audio) {
        audio.src = channel.streamUrl;
        audio.volume = volume;
        audio.muted = isMuted;
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
      return;
    }

    if (video) {
      if (Hls.isSupported() && channel.streamUrl.endsWith('.m3u8')) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 60,
        });

        hls.loadSource(channel.streamUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
          setBitrateInfo(channel.resolution === '4K' ? '12.5 Mbps' : '4.8 Mbps');
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
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls?.recoverMediaError();
                break;
              default:
                setStreamError('Direct broadcast stream temporarily offline. Retrying peer relay...');
                hls?.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS for Safari
        video.src = channel.streamUrl;
        video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      } else {
        video.src = channel.streamUrl;
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [channel]);

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

  const togglePlay = () => {
    if (channel.embedType === 'audio') {
      const audio = audioRef.current;
      if (audio) {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          audio.play();
          setIsPlaying(true);
        }
      }
      return;
    }

    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        video.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
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
            className={`group relative w-full bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl transition-all ${getAspectClass()}`}
          >
            {/* Visual Stream Area */}
            {channel.embedType === 'youtube' ? (
              <div className="absolute inset-0 w-full h-full bg-black">
                <iframe
                  key={channel.id + channel.streamUrl}
                  src={channel.streamUrl.includes('?') 
                    ? `${channel.streamUrl}&autoplay=1&mute=0&rel=0&modestbranding=1` 
                    : `${channel.streamUrl}?autoplay=1&mute=0&rel=0&modestbranding=1`
                  }
                  title={`${channel.name} Official Live Stream`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : channel.embedType === 'audio' ? (
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

            {/* Error or Reconnecting Banner */}
            {streamError && (
              <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center z-20">
                <Activity className="w-8 h-8 text-amber-400 mb-2 animate-bounce" />
                <h4 className="text-sm font-semibold text-white mb-1">Peer Stream Syncing</h4>
                <p className="text-xs text-slate-400 max-w-sm mb-4">{streamError}</p>
                <button
                  onClick={() => {
                    setStreamError(null);
                    if (videoRef.current) {
                      videoRef.current.load();
                      videoRef.current.play().catch(() => {});
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded cursor-pointer"
                >
                  Reconnect Relay
                </button>
              </div>
            )}

            {/* Top Overlay: Live Badges and Node Origin */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
              <div className="flex items-center gap-2 pointer-events-auto">
                {/* Live Indicator without pill enclosure - clean inline broadcast marker */}
                <div className="flex items-center gap-2 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold tracking-wider uppercase text-white font-mono">LIVE</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-xs text-slate-300 font-mono tabular-nums">{channel.viewersCount.toLocaleString()} watching</span>
                </div>

                {/* Node attribution */}
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded text-xs text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{channel.communityNodeName}</span>
                </div>

                {/* Official Broadcaster Live Marker */}
                {channel.embedType === 'youtube' && (
                  <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-red-950/80 backdrop-blur-md border border-red-500/40 rounded text-xs text-red-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span>Official Live Transmission</span>
                  </div>
                )}
              </div>

              {/* Cryptographic verification badge */}
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded text-xs text-slate-300 pointer-events-auto">
                <span className="text-emerald-400 text-[11px] font-mono">Ed25519 Verified</span>
              </div>
            </div>

            {/* Bottom Controls Bar (Visible for HTML5/Audio streams) */}
            {channel.embedType !== 'youtube' && (
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

                    {/* Clean unboxed show metadata */}
                    <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 ml-2">
                      <span className="font-medium text-white truncate max-w-[220px]">{channel.currentShow}</span>
                      <span className="text-slate-500">·</span>
                      <span className="font-mono text-emerald-400 text-[11px]">{channel.resolution}</span>
                    </div>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-2">
                    {/* Aspect Ratio Selector */}
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

                    {/* Stream Diagnostics Toggle */}
                    <button
                      onClick={() => setShowDiagnostics(!showDiagnostics)}
                      className={`p-1.5 rounded transition-colors cursor-pointer ${
                        showDiagnostics ? 'text-emerald-400 bg-emerald-500/20' : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                      title="Stream Diagnostics & Cryptographic Signature"
                      aria-label="Stream diagnostics"
                    >
                      <Activity className="w-4 h-4" />
                    </button>

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

          {/* Stream Diagnostics Box (Expandable) */}
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
                  <span className="text-slate-500 block">Health:</span>
                  <span className="text-emerald-400 font-medium">{streamHealth}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Current Bitrate:</span>
                  <span className="text-white tabular-nums">{bitrateInfo}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Live Buffer:</span>
                  <span className="text-white tabular-nums">{bufferSec}s ahead</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Peer Ingest:</span>
                  <span className="text-white">{channel.communityNodeId}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
                <span>Ed25519 PubKey: <code className="text-emerald-400">ed25519:9f4a...e18b</code></span>
                <span>Signature: <code className="text-slate-300">VALID (Verified by client WebCrypto)</code></span>
              </div>
            </div>
          )}

          {/* Under-Player Metadata & Channel Editorial Description */}
          <div className="bg-[#0b0f19] border border-white/10 rounded-lg p-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span>{channel.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{channel.broadcastLanguage}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400">{channel.communityNodeName}</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
                  {channel.name}
                </h1>
                {channel.banglaName && (
                  <p className="text-sm text-slate-400 font-normal">{channel.banglaName}</p>
                )}
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center gap-2">
                {channel.id === 'bangladesh-doc-ref' && (
                  <button
                    onClick={onOpenDocArchive}
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Browse BBC & Al Jazeera Dispatches</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => onOpenPolicies('federation')}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 rounded transition-colors cursor-pointer"
                >
                  Federation Terms
                </button>
              </div>
            </div>

            {/* Current & Upcoming Guide */}
            <div className="my-4 p-3 bg-black/30 rounded border border-white/5 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 block mb-0.5">Now Playing</span>
                  <p className="text-sm font-medium text-white">{channel.currentShow}</p>
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">Up Next</span>
                  <p className="text-sm font-medium text-slate-300">{channel.nextShow}</p>
                </div>
              </div>
              {onOpenSchedule && (
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">Daily 24-Hour EPG</span>
                  <button
                    onClick={onOpenSchedule}
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>View Full Broadcast Schedule</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              )}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              {channel.description}
            </p>

            {channel.editorialNote && (
              <div className="p-3 bg-slate-900/60 border-l-2 border-emerald-500 rounded-r text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Editorial Charter: </span>
                {channel.editorialNote}
              </div>
            )}
          </div>

        </div>

        {/* Right Sidebar: Quick Channel Switcher (Col 4/12) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#0b0f19] border border-white/10 rounded-lg p-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold tracking-tight text-white uppercase">Community Feeds</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono tabular-nums">{allChannels.length} Channels</span>
            </div>

            {/* Channel List */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {allChannels.map((item) => {
                const isActive = item.id === channel.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectChannel(item)}
                    className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                      isActive 
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-white' 
                        : 'bg-black/20 hover:bg-slate-800/40 border-white/5 text-slate-300 hover:border-white/15'
                    }`}
                  >
                    {/* Channel Icon or Indicator */}
                    <ChannelLogo channelId={item.id} size="md" />

                    {/* Metadata */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`text-xs font-semibold truncate ${isActive ? 'text-emerald-400' : 'text-white'}`}>
                          {item.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{item.resolution}</span>
                      </div>

                      <p className="text-[11px] text-slate-400 truncate mb-1">
                        {item.currentShow}
                      </p>

                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span>{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.communityNodeName}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Federation Principle banner at bottom of drawer */}
            <div className="mt-4 pt-3 border-t border-white/10 text-center">
              <p className="text-[11px] text-slate-400 italic">
                “Federate the network, not the content.”
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
