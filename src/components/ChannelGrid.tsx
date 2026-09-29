import React, { useState } from 'react';
import { Tv, Radio, Users, ShieldCheck, Play, Search, Filter } from 'lucide-react';
import { Channel } from '../types';
import { ChannelLogo } from './ChannelLogo';

interface ChannelGridProps {
  channels: Channel[];
  activeChannel: Channel;
  onSelectChannel: (channel: Channel) => void;
  onFilterByNode?: (nodeId: string) => void;
}

export const ChannelGrid: React.FC<ChannelGridProps> = ({
  channels,
  activeChannel,
  onSelectChannel,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedNode, setSelectedNode] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'National', 'News', 'Diaspora', 'Community', 'Culture', 'Radio', 'Documentary'];

  const nodes = [
    { id: 'All', label: 'All Global Nodes' },
    { id: 'node-dhaka-central', label: 'Dhaka Central (BD)' },
    { id: 'node-ny-usa', label: 'New York (USA)' },
    { id: 'node-london-uk', label: 'London (UK)' },
    { id: 'node-sylhet-bd', label: 'Sylhet (BD)' },
    { id: 'node-kolkata-in', label: 'Kolkata (IN)' },
    { id: 'node-global-ref', label: 'Global Reference' },
  ];

  const filteredChannels = channels.filter((ch) => {
    const matchesCategory = selectedCategory === 'All' || ch.category === selectedCategory;
    const matchesNode = selectedNode === 'All' || ch.communityNodeId === selectedNode;
    const matchesSearch =
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ch.banglaName && ch.banglaName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.communityNodeName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesNode && matchesSearch;
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-5 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono uppercase tracking-wider mb-1">
            <span>Federated Broadcast Directory</span>
            <span className="text-slate-500">·</span>
            <span>Opt-In Community Feeds</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-brand">
            Channel Discovery & Community Stations
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Explore national public broadcasters, independent private news, and autonomous diaspora community feeds across the globe.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search channels, cities, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-72 px-3 py-1.5 pl-8 text-xs bg-slate-900/80 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Filter Tabs & Node Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-8">
        
        {/* Category Segmented Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 border border-white/10 rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Node Dropdown filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedNode}
            onChange={(e) => setSelectedNode(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-900 border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            {nodes.map((node) => (
              <option key={node.id} value={node.id} className="bg-slate-900 text-white">
                {node.label}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredChannels.map((channel) => {
          const isCurrentActive = channel.id === activeChannel.id;
          return (
            <div
              key={channel.id}
              onClick={() => onSelectChannel(channel)}
              className={`group flex flex-col justify-between p-4 rounded-lg border transition-all cursor-pointer ${
                isCurrentActive
                  ? 'bg-emerald-950/20 border-emerald-500/50 shadow-lg shadow-emerald-950/30'
                  : 'bg-[#0b0f19] hover:bg-slate-900/60 border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <ChannelLogo channelId={channel.id} size="md" />

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                      {channel.resolution}
                    </span>
                    <span className="text-[10px] text-slate-400 tabular-nums">
                      {channel.viewersCount.toLocaleString()} watching
                    </span>
                  </div>
                </div>

                {/* Title & Bangla Name */}
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors mb-0.5">
                  {channel.name}
                </h3>
                {channel.banglaName && (
                  <p className="text-xs text-slate-400 mb-2">{channel.banglaName}</p>
                )}

                {/* Unboxed Metadata with separators */}
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-3">
                  <span>{channel.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-300">{channel.communityNodeName}</span>
                </div>

                {/* Now Playing */}
                <div className="p-2.5 bg-black/40 rounded border border-white/5 text-xs text-slate-300 mb-4">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-0.5">
                    Current Broadcast
                  </span>
                  <p className="line-clamp-2 font-medium text-white">{channel.currentShow}</p>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono">
                  {channel.broadcastLanguage}
                </span>

                <div className={`flex items-center gap-1 font-semibold ${isCurrentActive ? 'text-emerald-400' : 'text-slate-300 group-hover:text-white'}`}>
                  <span>{isCurrentActive ? 'Streaming Now' : 'Tune In'}</span>
                  <Play className="w-3 h-3 fill-current" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredChannels.length === 0 && (
        <div className="text-center py-16 bg-[#0b0f19] border border-white/10 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-2">No channels found matching the selected filters.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedNode('All'); setSearchQuery(''); }}
            className="text-xs text-emerald-400 hover:underline cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

    </section>
  );
};
