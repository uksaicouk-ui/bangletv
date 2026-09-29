import React, { useState } from 'react';
import { 
  Globe, MapPin, Tv, Radio, ArrowRight, Play, 
  Users, Check, Search, Filter, ShieldCheck 
} from 'lucide-react';
import { CHANNELS } from '../data/channelsData';
import { Channel } from '../types';
import { ChannelLogo } from './ChannelLogo';

interface RegionDirectoryProps {
  onSelectChannel: (channel: Channel) => void;
}

export const RegionDirectory: React.FC<RegionDirectoryProps> = ({
  onSelectChannel,
}) => {
  const [selectedTerritory, setSelectedTerritory] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const territories = [
    'All',
    'Bangladesh',
    'United Kingdom',
    'United States',
    'India',
    'Global'
  ];

  const languages = ['All', 'Bengali', 'Sylheti', 'English'];
  const categories = ['All', 'News', 'Sports', 'National', 'Entertainment', 'Education', 'Culture', 'Documentary', 'Radio'];

  const filtered = CHANNELS.filter((ch) => {
    const matchesTerritory = selectedTerritory === 'All' || ch.region === selectedTerritory;
    const matchesLanguage = selectedLanguage === 'All' || ch.language === selectedLanguage;
    const matchesCategory = selectedCategory === 'All' || ch.category === selectedCategory;
    const matchesQuery = 
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ch.banglaName && ch.banglaName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ch.communityNodeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTerritory && matchesLanguage && matchesCategory && matchesQuery;
  });

  // Group by Territory for structured directory overview
  const territoryGroups = ['Bangladesh', 'United Kingdom', 'United States', 'India', 'Global'];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono uppercase tracking-wider mb-2">
              <Globe className="w-4 h-4" />
              <span>Territory & Language Directory</span>
              <span className="text-slate-500">·</span>
              <span>Global Bengali Broadcasting Grid</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-brand">
              Regional & Language Broadcast Index
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Navigate television and radio transmissions categorized by geographical origin, regional dialects (Sylheti, Standard Bengali), and community diaspora hubs.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#0d131f] border border-white/10 p-3 rounded-lg text-xs font-mono">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Active Hubs</span>
              <span className="text-white font-bold">5 Territories · 14 Channels</span>
            </div>
          </div>
        </div>

        {/* Territory Segmented Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-white/5">
          {territories.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTerritory(t)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                selectedTerritory === t
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold shadow-sm'
                  : 'bg-black/30 hover:bg-slate-800/60 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {t === 'All' ? 'All Territories' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        
        {/* Language & Genre Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-900 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang} className="bg-slate-900 text-white">
                  {lang === 'All' ? 'All Languages & Dialects' : lang}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-900 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900 text-white">
                  {cat === 'All' ? 'All Genres' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search regional channels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 pl-8 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
        </div>

      </div>

      {/* Structured Directory View */}
      {selectedTerritory === 'All' && searchQuery === '' && selectedLanguage === 'All' && selectedCategory === 'All' ? (
        <div className="space-y-10">
          {territoryGroups.map((group) => {
            const groupChannels = CHANNELS.filter(c => c.region === group);
            if (groupChannels.length === 0) return null;

            return (
              <div key={group} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-lg font-bold text-white font-brand">{group} Broadcast Hub</h3>
                    <span className="text-xs text-slate-500 font-mono">({groupChannels.length} Feeds)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {groupChannels.map((channel) => (
                    <div
                      key={channel.id}
                      onClick={() => onSelectChannel(channel)}
                      className="group flex flex-col justify-between p-4 rounded-xl bg-[#0b0f19] hover:bg-slate-900/70 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer shadow-md"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <ChannelLogo channelId={channel.id} size="md" />
                          <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                            {channel.resolution}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors mb-0.5">
                          {channel.name}
                        </h4>
                        {channel.banglaName && (
                          <p className="text-xs text-slate-400 mb-2">{channel.banglaName}</p>
                        )}
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {channel.description}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                        <span className="font-mono text-[10px]">{channel.language}</span>
                        <div className="text-emerald-400 flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
                          <span>Tune In</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Filtered Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((channel) => (
            <div
              key={channel.id}
              onClick={() => onSelectChannel(channel)}
              className="group flex flex-col justify-between p-4 rounded-xl bg-[#0b0f19] hover:bg-slate-900/70 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <ChannelLogo channelId={channel.id} size="md" />
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                    {channel.resolution}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors mb-0.5">
                  {channel.name}
                </h4>
                {channel.banglaName && (
                  <p className="text-xs text-slate-400 mb-2">{channel.banglaName}</p>
                )}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {channel.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[10px]">{channel.region} · {channel.language}</span>
                <div className="text-emerald-400 flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Tune In</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-xs">
          No channels found matching the selected territory, language, and category criteria.
        </div>
      )}

    </section>
  );
};
