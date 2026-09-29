import React, { useState } from 'react';
import { 
  Tv, Radio, Users, ShieldCheck, Play, Search, Filter, 
  Bookmark, Info, Globe, CheckCircle2, ArrowRight 
} from 'lucide-react';
import { Channel } from '../types';
import { ChannelLogo } from './ChannelLogo';

interface ChannelGridProps {
  channels: Channel[];
  activeChannel: Channel;
  onSelectChannel: (channel: Channel) => void;
  onFilterByNode?: (nodeId: string) => void;
  onOpenChannelInfo?: (channel: Channel) => void;
  favorites?: string[];
  onToggleFavorite?: (channelId: string) => void;
}

export const ChannelGrid: React.FC<ChannelGridProps> = ({
  channels,
  activeChannel,
  onSelectChannel,
  onOpenChannelInfo,
  favorites = [],
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  const categories = [
    'All', 
    'News', 
    'Sports', 
    'National', 
    'Entertainment', 
    'Documentary', 
    'Education', 
    'Culture', 
    'Community', 
    'Radio'
  ];

  const regions = ['All', 'Bangladesh', 'Asia', 'Europe', 'Middle East', 'North America', 'Global'];
  const languages = ['All', 'Bangla', 'English', 'Arabic', 'Hindi', 'Urdu'];

  const filteredChannels = channels.filter((ch) => {
    if (onlyFavorites && !favorites.includes(ch.id)) return false;
    const matchesCategory = selectedCategory === 'All' || ch.category === selectedCategory;
    const matchesRegion = selectedRegion === 'All' || (ch.region && ch.region.includes(selectedRegion as any));
    const matchesLanguage = selectedLanguage === 'All' || (ch.language && ch.language.includes(selectedLanguage as any));
    const matchesSearch =
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ch.banglaName && ch.banglaName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.communityNodeName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesRegion && matchesLanguage && matchesSearch;
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-5 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono uppercase tracking-wider mb-1">
            <span>Federated Broadcast Directory</span>
            <span className="text-slate-500">·</span>
            <span>Real Operational Channel Sources</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-brand">
            Channel Roster & Live Transmission Grid
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Every channel is connected to operational multi-source failover endpoints. Filter by genre, territory, language, or your favorites.
          </p>
        </div>

        {/* Global Channel Counter */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              onlyFavorites
                ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                : 'bg-black/40 text-slate-300 hover:text-white border-white/10'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-current' : ''}`} />
            <span>Favorites ({favorites.length})</span>
          </button>

          <div className="px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-slate-400">
            <span className="text-white font-bold">{filteredChannels.length}</span> Active Channels
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-1.5 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setOnlyFavorites(false);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              selectedCategory === cat && !onlyFavorites
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold shadow-sm'
                : 'bg-black/30 hover:bg-slate-800/60 border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {cat === 'All' ? 'All Genres' : cat}
          </button>
        ))}
      </div>

      {/* Secondary Controls: Region, Language & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        
        {/* Region & Language Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-900 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {regions.map((reg) => (
                <option key={reg} value={reg} className="bg-slate-900 text-white">
                  {reg === 'All' ? 'All Territories' : reg}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-900 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang} className="bg-slate-900 text-white">
                  {lang === 'All' ? 'All Languages' : lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search channels, current shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 pl-8 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
        </div>

      </div>

      {/* Grid: Channels List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredChannels.map((channel) => {
          const isActive = channel.id === activeChannel.id;
          const isFav = favorites.includes(channel.id);

          return (
            <div
              key={channel.id}
              onClick={() => onSelectChannel(channel)}
              className={`group flex flex-col justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left shadow-lg ${
                isActive
                  ? 'bg-gradient-to-b from-[#111928] to-[#0a101b] border-emerald-500/70 ring-1 ring-emerald-500/40'
                  : 'bg-[#0b0f19] hover:bg-slate-900/70 border-white/10 hover:border-emerald-500/30'
              }`}
            >
              <div>
                {/* Card Top: Number, Logo, Category & Fav button */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <ChannelLogo channelId={channel.id} size="md" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        {channel.number && (
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">CH {channel.number}</span>
                        )}
                        <span className="text-slate-500">·</span>
                        <span className="text-[10px] font-mono text-slate-300">{channel.category}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {channel.name}
                      </h3>
                    </div>
                  </div>

                  {/* Actions on Card: Favorite & Info */}
                  <div className="flex items-center gap-1">
                    {onToggleFavorite && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(channel.id);
                        }}
                        className={`p-1 rounded hover:bg-white/10 transition-colors ${
                          isFav ? 'text-amber-400' : 'text-slate-500 hover:text-white'
                        }`}
                        title={isFav ? 'Remove Favorite' : 'Add to Favorites'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    )}

                    {onOpenChannelInfo && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenChannelInfo(channel);
                        }}
                        className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                        title="Channel Dossier"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Show Details */}
                <div className="space-y-1 mb-3">
                  <div className="text-xs text-white font-medium line-clamp-1">
                    {channel.currentShow}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono">
                    <span>Up next: {channel.nextShow}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {channel.description}
                </p>
              </div>

              {/* Card Bottom Meta */}
              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{channel.country || 'Global'} · {channel.broadcastLanguage || 'Bangla'}</span>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform">
                  <span>{channel.resolution}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredChannels.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-xs">
          No channels match your selected filter criteria. Try choosing "All Genres" or clearing the search query.
        </div>
      )}

    </section>
  );
};
