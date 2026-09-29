import React, { useState } from 'react';
import { 
  ExternalLink, Play, ShieldAlert, Award, FileText, 
  Search, CheckCircle2, Bookmark, Globe, X
} from 'lucide-react';
import { DOCUMENTARY_ARCHIVE } from '../data/documentaryArchiveData';
import { DocumentaryReference } from '../types';

interface BangladeshDocumentarySectionProps {
  onPlayChannelStream?: () => void;
  onOpenPolicies: (tab?: string) => void;
}

export const BangladeshDocumentarySection: React.FC<BangladeshDocumentarySectionProps> = ({
  onPlayChannelStream,
  onOpenPolicies,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPublisher, setSelectedPublisher] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalDoc, setActiveModalDoc] = useState<DocumentaryReference | null>(null);

  const categories = [
    'All',
    'July 2024 Uprising',
    'Investigative',
    'History & 1971',
    'Climate & River Delta',
    'Economy & Diaspora'
  ];

  const filteredDocs = DOCUMENTARY_ARCHIVE.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesPublisher = selectedPublisher === 'All' || doc.publisher.includes(selectedPublisher);
    const matchesQuery = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesPublisher && matchesQuery;
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <div className="border-b border-white/10 pb-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono uppercase tracking-wider mb-2">
              <span>Bangladesh Documentary & Reference Channel</span>
              <span className="text-slate-500">·</span>
              <span>International Archival Record</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-brand">
              BBC & Al Jazeera Global Coverage of Bangladesh
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
              Curated public-interest investigative exposés, historic milestones, and multi-perspective dispatches from the world’s leading international newsrooms. Organized objectively without state or partisan censorship.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenPolicies('copyright')}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-white/10 rounded transition-colors cursor-pointer"
            >
              Copyright Compliance Policy
            </button>
          </div>
        </div>

        {/* Legal & Copyright Declaration Box */}
        <div className="mt-6 p-4 bg-[#0a1120] border border-blue-500/20 rounded-lg flex items-start gap-3 text-xs text-slate-300">
          <ShieldAlert className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-white">
              Legal Citation & Publisher Attribution Mandate
            </p>
            <p className="text-slate-400 leading-relaxed">
              In strict adherence to international copyright conventions, BangleTV.com does not copy, download, rehost, or redistribute copyrighted BBC or Al Jazeera material. All entries present verified original hyperlinks and official embed players directly from each publisher’s authenticated domain.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        
        {/* Topic Filter Buttons (Segmented Controls) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-white/10 rounded-lg">
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

        {/* Search & Publisher Filter */}
        <div className="flex items-center gap-3">
          {/* Publisher Segment */}
          <div className="flex items-center bg-slate-900/90 border border-white/10 rounded-lg p-1 text-xs">
            {['All', 'BBC', 'Al Jazeera'].map((pub) => (
              <button
                key={pub}
                onClick={() => setSelectedPublisher(pub)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedPublisher === pub
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {pub}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search documentary topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 sm:w-60 px-3 py-1.5 pl-8 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          </div>
        </div>

      </div>

      {/* Documentary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <article
            key={doc.id}
            className="group flex flex-col bg-[#0b0f19] border border-white/10 hover:border-emerald-500/40 rounded-lg overflow-hidden transition-all duration-200"
          >
            {/* Visual Thumbnail Frame with measured scrim */}
            <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
              <img
                src={doc.thumbnailUrl}
                alt={doc.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to alternate YouTube CDN or clean broadcaster card
                  const target = e.currentTarget;
                  if (doc.officialEmbedId && !target.src.includes('img.youtube.com')) {
                    target.src = `https://img.youtube.com/vi/${doc.officialEmbedId}/hqdefault.jpg`;
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              {/* Original Broadcaster Verification Marker */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Original {doc.publisher} Thumbnail</span>
              </div>

              {/* Publisher & Duration Tag (Clean unboxed format) */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <span className="font-semibold text-emerald-400">{doc.publisher}</span>
                <span className="font-mono text-slate-300 text-[11px] tabular-nums">{doc.duration}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Clean unboxed metadata with separators */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span>{doc.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{doc.airDate}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2 leading-snug">
                  {doc.title}
                </h3>

                {doc.banglaTitle && (
                  <p className="text-xs text-slate-400 mb-2 font-normal">
                    {doc.banglaTitle}
                  </p>
                )}

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {doc.summary}
                </p>

                {/* Neutrality & Investigative Angle Note */}
                <div className="p-2.5 bg-black/30 border border-white/5 rounded text-[11px] text-slate-400 mb-4">
                  <span className="font-semibold text-slate-300 block mb-0.5">Archival Context:</span>
                  <span className="line-clamp-2">{doc.investigativeAngle}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalDoc(doc)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>View Archival Record</span>
                </button>

                <a
                  href={doc.originalPublisherUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/60 border border-white/10 rounded transition-colors flex items-center gap-1"
                  title="Direct link to official publisher site"
                >
                  <span>Publisher Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-16 bg-[#0b0f19] border border-white/10 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-2">No documentary dispatches match your search filters.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedPublisher('All'); setSearchQuery(''); }}
            className="text-xs text-emerald-400 hover:underline"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Documentary Modal Viewer */}
      {activeModalDoc && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d131f] border border-white/15 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/60">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  {activeModalDoc.verifiedSourceBadge}
                </span>
              </div>
              <button
                onClick={() => setActiveModalDoc(null)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Video Embed Frame or Direct Link Box */}
              <div className="relative aspect-[16/9] w-full bg-black rounded-lg overflow-hidden border border-white/10 flex items-center justify-center">
                {activeModalDoc.officialEmbedId ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${activeModalDoc.officialEmbedId}?autoplay=0&rel=0`}
                    title={activeModalDoc.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="text-center p-6 space-y-3">
                    <Globe className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-semibold text-white">Direct Broadcaster Streaming Portal</h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      This investigative documentary is hosted exclusively on {activeModalDoc.publisher}’s authenticated web service.
                    </p>
                    <a
                      href={activeModalDoc.originalPublisherUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded"
                    >
                      <span>Stream on {activeModalDoc.publisher}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>

              {/* Title & Metadata */}
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span>{activeModalDoc.publisher}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeModalDoc.airDate}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeModalDoc.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {activeModalDoc.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {activeModalDoc.summary}
                </p>
              </div>

              {/* Neutrality and Archival Note */}
              <div className="p-4 bg-slate-900/80 border border-white/10 rounded-lg space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Neutral Archival Standard & Verification</span>
                </div>
                <p className="leading-relaxed text-slate-400">
                  {activeModalDoc.neutralArchivalNote}
                </p>
              </div>

              {/* Publisher Outlink */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500 font-mono">
                  Origin: {activeModalDoc.publisherType}
                </span>
                <a
                  href={activeModalDoc.originalPublisherUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 border border-white/10 rounded"
                >
                  <span>Open Official {activeModalDoc.publisher} Article</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
