import React from 'react';

interface ChannelLogoProps {
  channelId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ChannelLogo: React.FC<ChannelLogoProps> = ({ 
  channelId, 
  className = '',
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-14 h-14 text-sm font-bold'
  };

  switch (channelId) {
    case 'btv-world':
      // BTV World: Authentic National Broadcaster of Bangladesh Emblem (Deep Green and Crimson Red)
      return (
        <div className={`${sizeClasses[size]} rounded bg-[#006a4e] border border-emerald-500/40 flex items-center justify-center font-bold text-white shadow-inner flex-shrink-0 relative overflow-hidden ${className}`} title="BTV World (Bangladesh Television)">
          <div className="w-5 h-5 rounded-full bg-[#f42a41] flex items-center justify-center text-[10px] font-bold text-white">
            বি
          </div>
        </div>
      );

    case 'jamuna-tv-hd':
      // Jamuna TV: Authentic Crimson and White News Emblem
      return (
        <div className={`${sizeClasses[size]} rounded bg-[#990000] border border-red-500/40 flex flex-col items-center justify-center font-extrabold text-white shadow-inner flex-shrink-0 ${className}`} title="Jamuna Television HD">
          <span className="leading-none text-[10px] tracking-tight">যমুনা</span>
          <span className="text-[8px] text-amber-300 font-mono tracking-tighter">HD</span>
        </div>
      );

    case 'somoy-news':
      // Somoy News: Authentic Red & Dark News Mark
      return (
        <div className={`${sizeClasses[size]} rounded bg-[#cc0000] border border-red-600/50 flex flex-col items-center justify-center font-bold text-white shadow-inner flex-shrink-0 ${className}`} title="Somoy News Live">
          <span className="leading-none text-[9px] tracking-tighter">সময়</span>
          <span className="text-[7px] text-white/90 font-mono uppercase">NEWS</span>
        </div>
      );

    case 'channel-i-world':
      // Channel i: Iconic Yellow and Black Striped Emblem
      return (
        <div className={`${sizeClasses[size]} rounded bg-[#ffcc00] border border-yellow-500 flex items-center justify-center font-black text-black shadow-inner flex-shrink-0 ${className}`} title="Channel i Global">
          <span className="text-sm font-serif italic text-red-600 font-black">i</span>
        </div>
      );

    case 'ekattor-tv':
      // Ekattor TV: Authentic Red & Green 71 Mark
      return (
        <div className={`${sizeClasses[size]} rounded bg-[#111827] border border-red-500/60 flex items-center justify-center font-black text-white shadow-inner flex-shrink-0 ${className}`} title="Ekattor TV (71)">
          <span className="text-red-500 text-xs font-mono font-black">71</span>
        </div>
      );

    case 'bangladesh-doc-ref':
      // Bangladesh Documentary Reference: BBC & Al Jazeera Verified Dual Insignia
      return (
        <div className={`${sizeClasses[size]} rounded bg-slate-900 border border-emerald-500/50 flex flex-col items-center justify-center font-bold text-white shadow-inner flex-shrink-0 ${className}`} title="Bangladesh Documentary Archive (BBC & Al Jazeera)">
          <span className="text-[8px] font-mono text-emerald-400 font-bold leading-tight">BBC/AJ</span>
          <span className="text-[7px] text-slate-400 font-mono leading-tight">DOCS</span>
        </div>
      );

    case 'bbc-bangla-radio':
      // BBC World Service Bengali Radio
      return (
        <div className={`${sizeClasses[size]} rounded bg-[#bb1919] border border-red-700 flex flex-col items-center justify-center font-bold text-white shadow-inner flex-shrink-0 ${className}`} title="BBC Bangla Radio">
          <span className="text-[9px] font-bold tracking-tight">BBC</span>
          <span className="text-[7px] text-white/90">বাংলা</span>
        </div>
      );

    case 'radio-foorti-live':
      // Radio Foorti 88.0 FM
      return (
        <div className={`${sizeClasses[size]} rounded bg-[#ea580c] border border-amber-500/60 flex flex-col items-center justify-center font-bold text-white shadow-inner flex-shrink-0 ${className}`} title="Radio Foorti 88.0 FM">
          <span className="text-[8px] font-extrabold leading-none">FOORTI</span>
          <span className="text-[7px] text-amber-200 font-mono">88.0</span>
        </div>
      );

    case 'bangle-london-node':
      // Tower Hamlets London UK Diaspora Node
      return (
        <div className={`${sizeClasses[size]} rounded bg-[#1e293b] border border-blue-500/40 flex flex-col items-center justify-center font-bold text-white shadow-inner flex-shrink-0 ${className}`} title="London Tower Hamlets Node">
          <span className="text-[9px] text-blue-400 font-bold">LON</span>
          <span className="text-[7px] text-slate-400">UK Node</span>
        </div>
      );

    case 'bangle-ny-node':
      // New York Jackson Heights Node
      return (
        <div className={`${sizeClasses[size]} rounded bg-[#0f172a] border border-emerald-500/40 flex flex-col items-center justify-center font-bold text-white shadow-inner flex-shrink-0 ${className}`} title="New York Jackson Heights Node">
          <span className="text-[9px] text-emerald-400 font-bold">NYC</span>
          <span className="text-[7px] text-slate-400">USA Node</span>
        </div>
      );

    case 'bangle-sylhet-surma':
      // Sylhet Surma Valley Regional Node
      return (
        <div className={`${sizeClasses[size]} rounded bg-[#064e3b] border border-emerald-600/50 flex flex-col items-center justify-center font-bold text-white shadow-inner flex-shrink-0 ${className}`} title="Surma Valley Node">
          <span className="text-[8px] text-emerald-300 font-bold">সুরমা</span>
          <span className="text-[7px] text-emerald-400 font-mono">SYL</span>
        </div>
      );

    case 'bangle-kolkata-heritage':
      // Kolkata Arts & Literature Node
      return (
        <div className={`${sizeClasses[size]} rounded bg-[#451a03] border border-amber-700/50 flex flex-col items-center justify-center font-bold text-white shadow-inner flex-shrink-0 ${className}`} title="Kolkata Arts Node">
          <span className="text-[8px] text-amber-300 font-bold">কলকাতা</span>
          <span className="text-[7px] text-amber-400 font-mono">CCU</span>
        </div>
      );

    default:
      return (
        <div className={`${sizeClasses[size]} rounded bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-slate-300 shadow-inner flex-shrink-0 ${className}`}>
          {channelId.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};
