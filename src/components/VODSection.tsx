import React, { useState } from 'react';
import { 
  Film, Play, Clock, Calendar, Filter, Search, 
  ExternalLink, Sparkles, Check, ChevronRight, X, Globe, Share2, Bookmark 
} from 'lucide-react';
import { VOD_CATALOG, VODItem } from '../data/vodData';

interface VODSectionProps {
  onOpenFeedbackModal?: () => void;
}

export const VODSection: React.FC<VODSectionProps> = ({
  onOpenFeedbackModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected VOD for Theater Playback Modal
  const [activeVOD, setActiveVOD] = useState<VODItem | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const categories = [
    'All', 
    'Documentary', 
    'News', 
    'Talk Show', 
    'Sports', 
    'Entertainment', 
    'Education', 
    'Culture'
  ];

  const regions = ['All', 'Bangladesh', 'International', 'UK / Bangladesh'];
  const languages = ['All', 'Bengali', 'English'];

  const filteredVOD = VOD_CATALOG.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesRegion = selectedRegion === 'All' || item.region.toLowerCase().includes(selectedRegion.toLowerCase());
    const matchesLang = selectedLanguage === 'All' || item.language === selectedLanguage;
    const matchesQuery = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.banglaTitle && item.banglaTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.synopsis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesRegion && matchesLang && matchesQuery;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="border-b border-white/10 pb-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono uppercase tracking-wider mb-2">
              <Film className="w-4 h-4" />
              <span>Video On Demand (VOD) & Catch-Up</span>
              <span className="text-slate-500">·</span>
              <span>Full Episodes & Curated Specials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-brand">
              On-Demand Broadcasts & Special Reports
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore full episodes, investigative series, political roundtables, sports reviews, and educational archives on demand.
            </p>
          </div>

          {/* Quick Viewer Proposal Trigger */}
          {onOpenFeedbackModal && (
            <button
              onClick={onOpenFeedbackModal}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow transition-colors flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Suggest a Program or Series</span>
            </button>
          )}
        </div>

        {/* Category Filter Pills (unboxed clean tabs) */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold shadow-sm'
                  : 'bg-black/30 hover:bg-slate-800/60 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'All' ? 'All VOD Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        
        {/* Region & Language Selectors */}
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
                  {reg === 'All' ? 'All Regions' : reg}
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

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search VOD series, shows, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-72 px-3 py-1.5 pl-8 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
        </div>

      </div>

      {/* VOD Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredVOD.map((item) => {
          const isBookmarked = bookmarkedIds[item.id];

          return (
            <div
              key={item.id}
              onClick={() => setActiveVOD(item)}
              className="group flex flex-col justify-between bg-[#0b0f19] hover:bg-slate-900/60 border border-white/10 hover:border-emerald-500/40 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer shadow-lg hover:shadow-emerald-950/20"
            >
              <div>
                {/* Thumbnail Container */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  {/* Duration Pill */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-[11px] font-mono text-white tabular-nums">
                    {item.duration}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 rounded text-[10px] font-mono text-emerald-400">
                    {item.category}
                  </div>

                  {/* Hover Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <div className="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-emerald-400 truncate max-w-[160px]">{item.channelName}</span>
                    <span className="font-mono text-slate-500">{item.airDate}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  {item.banglaTitle && (
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {item.banglaTitle}
                    </p>
                  )}

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1">
                    {item.synopsis}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-slate-400">
                  {item.region} · {item.language}
                </span>

                <button
                  onClick={(e) => toggleBookmark(item.id, e)}
                  className={`p-1.5 rounded transition-colors ${
                    isBookmarked ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 hover:text-white'
                  }`}
                  title={isBookmarked ? 'Saved to watchlist' : 'Save to watchlist'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredVOD.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-xs">
          No on-demand shows found matching your selected filters. Try choosing "All VOD Categories".
        </div>
      )}

      {/* VOD THEATER PLAYBACK MODAL */}
      {activeVOD && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0d131f] border border-white/15 rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl space-y-4 animate-fadeIn">
            
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/60">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-emerald-400">{activeVOD.channelName}</span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-300 font-semibold">{activeVOD.category}</span>
              </div>
              <button
                onClick={() => setActiveVOD(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Viewport */}
            <div className="relative aspect-[16/9] w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVOD.videoEmbedId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVOD.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Program Details in Modal */}
            <div className="p-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white font-brand">
                    {activeVOD.title}
                  </h3>
                  {activeVOD.banglaTitle && (
                    <p className="text-sm text-slate-400 mt-0.5">{activeVOD.banglaTitle}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 flex-shrink-0">
                  <span className="px-2.5 py-1 bg-black/40 rounded border border-white/10">{activeVOD.duration}</span>
                  <span className="px-2.5 py-1 bg-black/40 rounded border border-white/10">{activeVOD.airDate}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                {activeVOD.synopsis}
              </p>

              {activeVOD.presenter && (
                <div className="text-xs text-slate-400 pt-1">
                  <span className="font-semibold text-slate-300">Host / Correspondent: </span>
                  {activeVOD.presenter}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                {activeVOD.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-black/40 rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
