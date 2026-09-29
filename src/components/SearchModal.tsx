import React, { useState, useEffect } from 'react';
import { Search, X, Tv, Film, FileText, ArrowRight, Calendar, Clock } from 'lucide-react';
import { CHANNELS } from '../data/channelsData';
import { DOCUMENTARY_ARCHIVE } from '../data/documentaryArchiveData';
import { BROADCAST_SCHEDULE } from '../data/scheduleData';
import { Channel, DocumentaryReference } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChannel: (channel: Channel) => void;
  onSelectDocumentary: (doc: DocumentaryReference) => void;
  onSelectPolicy: (tab: string) => void;
  onSelectSchedule?: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectChannel,
  onSelectDocumentary,
  onSelectPolicy,
  onSelectSchedule,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredChannels = query.trim()
    ? CHANNELS.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          (c.banglaName && c.banglaName.toLowerCase().includes(query.toLowerCase())) ||
          c.category.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  const filteredDocs = query.trim()
    ? DOCUMENTARY_ARCHIVE.filter(
        (d) =>
          d.title.toLowerCase().includes(query.toLowerCase()) ||
          d.publisher.toLowerCase().includes(query.toLowerCase()) ||
          d.summary.toLowerCase().includes(query.toLowerCase()) ||
          d.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 4)
    : [];

  const filteredSchedule = query.trim()
    ? BROADCAST_SCHEDULE.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          (p.banglaTitle && p.banglaTitle.toLowerCase().includes(query.toLowerCase())) ||
          p.channelName.toLowerCase().includes(query.toLowerCase()) ||
          p.genre.toLowerCase().includes(query.toLowerCase()) ||
          p.synopsis.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  const policyMatches = query.trim()
    ? [
        { id: 'copyright', title: 'Copyright Protection & DMCA' },
        { id: 'federation', title: 'Federation Policy (“Federate the network”)' },
        { id: 'editorial', title: 'Editorial Policy & Archival Integrity' },
        { id: 'distribution', title: 'Content & Distribution Policy' },
        { id: 'ownership', title: 'Ownership & Strategic Control (USA / BD)' },
        { id: 'opensource', title: 'Open-Source Ecosystem Architecture' },
      ].filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-[#0d131f] border border-white/15 rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-slate-900/60">
          <Search className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search channels, BBC/Al Jazeera archives, policies, nodes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded ml-2 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4 text-xs">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-slate-500">
              Type to instantly search across all live channels, BBC & Al Jazeera documentaries, and network charters.
            </div>
          ) : (
            <>
              {/* Channels */}
              {filteredChannels.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] uppercase text-emerald-400 tracking-wider block mb-2">
                    Live Broadcast Channels ({filteredChannels.length})
                  </span>
                  <div className="space-y-1">
                    {filteredChannels.map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => {
                          onSelectChannel(ch);
                          onClose();
                        }}
                        className="w-full text-left p-2 rounded hover:bg-slate-800/60 flex items-center justify-between transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Tv className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
                          <span className="text-white font-medium">{ch.name}</span>
                          <span className="text-slate-500">· {ch.category}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Documentaries */}
              {filteredDocs.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] uppercase text-blue-400 tracking-wider block mb-2">
                    BBC & Al Jazeera Archival Records ({filteredDocs.length})
                  </span>
                  <div className="space-y-1">
                    {filteredDocs.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          onSelectDocumentary(doc);
                          onClose();
                        }}
                        className="w-full text-left p-2 rounded hover:bg-slate-800/60 flex items-center justify-between transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Film className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                          <span className="text-white font-medium truncate max-w-sm">{doc.title}</span>
                          <span className="text-slate-500">· {doc.publisher}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Scheduled Programs */}
              {filteredSchedule.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] uppercase text-amber-400 tracking-wider block mb-2">
                    Broadcast Programming Schedule ({filteredSchedule.length})
                  </span>
                  <div className="space-y-1">
                    {filteredSchedule.map((prog) => (
                      <button
                        key={prog.id}
                        onClick={() => {
                          if (onSelectSchedule) {
                            onSelectSchedule();
                          } else {
                            const found = CHANNELS.find((c) => c.id === prog.channelId);
                            if (found) onSelectChannel(found);
                          }
                          onClose();
                        }}
                        className="w-full text-left p-2 rounded hover:bg-slate-800/60 flex items-center justify-between transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400 group-hover:text-amber-400" />
                          <span className="text-white font-medium truncate max-w-sm">{prog.title}</span>
                          <span className="text-slate-500 font-mono">
                            {prog.startTime} ({prog.channelName})
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Policies */}
              {policyMatches.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] uppercase text-slate-400 tracking-wider block mb-2">
                    Institutional Charters & Policies
                  </span>
                  <div className="space-y-1">
                    {policyMatches.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectPolicy(p.id);
                          onClose();
                        }}
                        className="w-full text-left p-2 rounded hover:bg-slate-800/60 flex items-center justify-between transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
                          <span className="text-slate-300 group-hover:text-white font-medium">{p.title}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredChannels.length === 0 && filteredDocs.length === 0 && policyMatches.length === 0 && (
                <div className="text-center py-6 text-slate-400">
                  No records found matching "{query}". Try keywords like "BBC", "Jamuna", "July 2024", or "Copyright".
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
