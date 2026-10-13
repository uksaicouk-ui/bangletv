import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, UserCheck, Video, Radio, Plus, Trash2, Edit3, 
  Send, AlertCircle, CheckCircle2, Globe, Clock, MapPin, 
  Tv, Eye, Play, Sparkles, Key, FileText, QrCode, LogOut, ExternalLink, RefreshCw
} from 'lucide-react';
import { Journalist, JournalistDispatch, Channel } from '../types';
import { INITIAL_JOURNALISTS, INITIAL_DISPATCHES } from '../data/journalistsData';
import { DainikJahanLogo } from './DainikJahanLogo';
import { saveJournalistDispatchToCloud, subscribeJournalistDispatches } from '../services/firebaseDb';

interface JournalistPortalProps {
  channels: Channel[];
  onUpdateChannelStream?: (channelId: string, newStreamUrl: string, currentShow?: string) => void;
  onBroadcastBreakingNews?: (text: string, reporterName: string) => void;
  onPlayDispatch?: (dispatch: JournalistDispatch) => void;
  activeBreakingNews?: string | null;
}

export const JournalistPortal: React.FC<JournalistPortalProps> = ({
  channels,
  onUpdateChannelStream,
  onBroadcastBreakingNews,
  onPlayDispatch,
  activeBreakingNews,
}) => {
  // State for logged in journalist
  const [journalists, setJournalists] = useState<Journalist[]>(() => {
    try {
      const saved = localStorage.getItem('dj_journalists');
      return saved ? JSON.parse(saved) : INITIAL_JOURNALISTS;
    } catch {
      return INITIAL_JOURNALISTS;
    }
  });

  const [currentJournalist, setCurrentJournalist] = useState<Journalist | null>(() => {
    try {
      const savedId = localStorage.getItem('dj_active_journalist_id');
      if (savedId) {
        const found = journalists.find(j => j.id === savedId);
        if (found) return found;
      }
      return journalists[0]; // Default to first accredited reporter for quick preview
    } catch {
      return journalists[0];
    }
  });

  // Dispatches state
  const [dispatches, setDispatches] = useState<JournalistDispatch[]>(() => {
    try {
      const saved = localStorage.getItem('dj_dispatches');
      return saved ? JSON.parse(saved) : INITIAL_DISPATCHES;
    } catch {
      return INITIAL_DISPATCHES;
    }
  });

  // Form states
  const [activeTab, setActiveTab] = useState<'channel_control' | 'new_dispatch' | 'my_dispatches' | 'press_card'>('channel_control');
  
  // Breaking news flash state
  const [breakingText, setBreakingText] = useState('');
  const [flashSuccess, setFlashSuccess] = useState(false);

  // Channel Stream update state
  const [newStreamUrl, setNewStreamUrl] = useState('');
  const [newShowTitle, setNewShowTitle] = useState('');
  const [streamUpdateSuccess, setStreamUpdateSuccess] = useState(false);

  // New Dispatch form state
  const [dispTitle, setDispTitle] = useState('');
  const [dispBanglaTitle, setDispBanglaTitle] = useState('');
  const [dispCategory, setDispCategory] = useState<JournalistDispatch['category']>('Investigative');
  const [dispVideoUrl, setDispVideoUrl] = useState('');
  const [dispLocation, setDispLocation] = useState('');
  const [dispDuration, setDispDuration] = useState('15:00');
  const [dispSynopsis, setDispSynopsis] = useState('');
  const [dispSuccess, setDispSuccess] = useState(false);

  // Press card modal
  const [showPressCardModal, setShowPressCardModal] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dj_journalists', JSON.stringify(journalists));
    } catch {}
  }, [journalists]);

  useEffect(() => {
    try {
      localStorage.setItem('dj_dispatches', JSON.stringify(dispatches));
    } catch {}
  }, [dispatches]);

  useEffect(() => {
    const unsubscribe = subscribeJournalistDispatches((cloudDispatches) => {
      if (cloudDispatches && cloudDispatches.length > 0) {
        setDispatches(prev => {
          const merged = [...cloudDispatches];
          prev.forEach(p => {
            if (!merged.some(m => m.id === p.id)) merged.push(p);
          });
          return merged;
        });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentJournalist) {
      try {
        localStorage.setItem('dj_active_journalist_id', currentJournalist.id);
      } catch {}
    }
  }, [currentJournalist]);

  // Determine current channel assigned to logged in journalist
  const assignedChannel = channels.find(c => c.id === currentJournalist?.assignedChannelId) || channels[0];

  // Handle Breaking News Broadcast
  const handleSendBreakingNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!breakingText.trim() || !currentJournalist) return;

    if (onBroadcastBreakingNews) {
      onBroadcastBreakingNews(breakingText.trim(), currentJournalist.banglaName);
    }
    setFlashSuccess(true);
    setTimeout(() => setFlashSuccess(false), 3500);
    setBreakingText('');
  };

  // Handle Stream Source update
  const handleUpdateStream = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreamUrl.trim() || !assignedChannel) return;

    if (onUpdateChannelStream) {
      onUpdateChannelStream(assignedChannel.id, newStreamUrl.trim(), newShowTitle.trim() || undefined);
    }
    setStreamUpdateSuccess(true);
    setTimeout(() => setStreamUpdateSuccess(false), 3500);
    setNewStreamUrl('');
    setNewShowTitle('');
  };

  // Handle New Dispatch Publish
  const handlePublishDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispBanglaTitle.trim() || !dispVideoUrl.trim() || !currentJournalist) return;

    const newDispatch: JournalistDispatch = {
      id: `dispatch-${Date.now()}`,
      journalistId: currentJournalist.id,
      journalistName: currentJournalist.banglaName,
      channelId: assignedChannel.id,
      channelName: assignedChannel.name,
      title: dispTitle.trim() || dispBanglaTitle.trim(),
      banglaTitle: dispBanglaTitle.trim(),
      category: dispCategory,
      videoUrl: dispVideoUrl.trim(),
      duration: dispDuration || '15:00',
      location: dispLocation.trim() || currentJournalist.bureauLocation,
      date: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'Published',
      synopsis: dispSynopsis.trim(),
      views: 1200
    };

    setDispatches([newDispatch, ...dispatches]);
    saveJournalistDispatchToCloud(newDispatch);
    setDispSuccess(true);
    setTimeout(() => setDispSuccess(false), 3500);

    // Reset form
    setDispTitle('');
    setDispBanglaTitle('');
    setDispVideoUrl('');
    setDispLocation('');
    setDispSynopsis('');
  };

  // Delete dispatch
  const handleDeleteDispatch = (id: string) => {
    if (confirm('আপনি কি নিশ্চিত যে এই প্রতিবেদনটি অপসারণ করতে চান?')) {
      setDispatches(dispatches.filter(d => d.id !== id));
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn text-slate-200">
      
      {/* Top Banner & Reporter Credential Strip */}
      <div className="bg-[#0b0f19] border border-white/10 rounded-2xl p-6 mb-8 shadow-2xl relative overflow-hidden">
        {/* Background ambient badge glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Identity & Portal Header */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-600/10 border border-red-500/30 rounded-xl flex-shrink-0">
              <DainikJahanLogo size="sm" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-400 mb-1">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                <span>দৈনিক জাহান · অ্যাক্রেডিটেড সাংবাদিক প্যানেল (Press Desk)</span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400">লাইভ সিকিউর এক্সেস</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-brand flex items-center gap-3">
                <span>সাংবাদিক কন্ট্রোল সেন্টার ও চ্যানেল ডেস্ক</span>
              </h2>

              <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                অনুমোদিত প্রতিবেদক হিসেবে আপনার নির্ধারিত চ্যানেলে সরাসরি ফিল্ড ভিডিও সম্প্রচার, ব্রেকিং নিউজ টিকার আপডেট ও ইপিজি সময়সূচি পরিচালনা করুন।
              </p>
            </div>
          </div>

          {/* Journalist Switcher / Profile Badge */}
          <div className="bg-[#121927] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            {currentJournalist ? (
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                  {currentJournalist.banglaName.charAt(0)}
                </div>

                <div className="text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{currentJournalist.banglaName}</span>
                    <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 text-[10px] font-mono">
                      {currentJournalist.pressCardNo}
                    </span>
                  </div>
                  <div className="text-slate-400 mt-0.5">{currentJournalist.role}</div>
                  <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{currentJournalist.bureauLocation}</span>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Switch Journalist Dropdown for instant verification demo */}
            <div className="flex flex-col sm:border-l sm:border-white/10 sm:pl-4 gap-2">
              <label className="text-[10px] font-mono uppercase text-slate-400">প্রতিবেদক পরিবর্তন / নির্বাচন</label>
              <select
                value={currentJournalist?.id || ''}
                onChange={(e) => {
                  const sel = journalists.find(j => j.id === e.target.value);
                  if (sel) setCurrentJournalist(sel);
                }}
                className="px-2.5 py-1.5 text-xs bg-slate-900 border border-white/15 rounded-lg text-white focus:outline-none focus:border-red-500 cursor-pointer"
              >
                {journalists.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.banglaName} ({j.role.split('(')[0].trim()})
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowPressCardModal(true)}
                className="text-[11px] text-red-400 hover:text-red-300 font-medium flex items-center gap-1 cursor-pointer transition-colors"
              >
                <QrCode className="w-3 h-3" />
                <span>ডিজিটাল প্রেস কার্ড দেখুন →</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Tab Navigation for Journalist Portal */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('channel_control')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'channel_control'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
              : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>নিজস্ব চ্যানেল ও লাইভ ট্রান্সমিশন ডেস্ক</span>
        </button>

        <button
          onClick={() => setActiveTab('new_dispatch')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'new_dispatch'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
              : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>নতুন সরেজমিন প্রতিবেদন আপলোড</span>
        </button>

        <button
          onClick={() => setActiveTab('my_dispatches')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'my_dispatches'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
              : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>আমার প্রকাশিত প্রতিবেদন ({dispatches.filter(d => d.journalistId === currentJournalist?.id).length})</span>
        </button>
      </div>

      {/* TAB 1: Channel Control & Live Transmit Desk */}
      {activeTab === 'channel_control' && currentJournalist && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (8 cols): Breaking News Flash & Ingest URL */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Breaking News Flash Ticker Controller */}
            <div className="p-6 bg-[#0b0f19] border border-white/10 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                  <h3 className="text-base font-bold text-white font-brand">
                    লাইভ ব্রেকিং নিউজ টিকার সম্প্রচার (Breaking News Flash)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-800">
                  সরাসরি স্ক্রিনে প্রচার
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                মাঠপর্যায়ের যেকোনো জরুরি ঘটনা, ব্রেকিং আপডেট বা বিশেষ বার্তা এখানে লিখে তাৎক্ষণিকভাবে মূল লাইভ স্ক্রিনের লাল টিকার স্ট্রিপে প্রচার করুন।
              </p>

              {activeBreakingNews && (
                <div className="p-3 bg-red-950/50 border border-red-500/40 rounded-xl text-xs text-red-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">বর্তমানে প্রচারিত ব্রেকিং নিউজ:</span>
                    <span>{activeBreakingNews}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSendBreakingNews} className="space-y-3">
                <textarea
                  rows={2}
                  required
                  placeholder="যেমন: 'ব্রেকিং: দুর্নীতি দমন কমিশনের বিশেষ দলের অভিযান মতিঝিল ও গুলশানের তিনটি শীর্ষ আর্থিক প্রতিষ্ঠানে...'"
                  value={breakingText}
                  onChange={(e) => setBreakingText(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-black/60 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500 leading-relaxed font-sans"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">
                    প্রতিবেদক: <strong className="text-white">{currentJournalist.banglaName}</strong> ({currentJournalist.bureauLocation})
                  </span>

                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>টিকার সম্প্রচার করুন</span>
                  </button>
                </div>

                {flashSuccess && (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 font-mono animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>ব্রেকিং নিউজ সফলভাবে মূল ব্রডকাস্ট স্ক্রিনে সক্রিয় করা হয়েছে!</span>
                  </div>
                )}
              </form>
            </div>

            {/* 2. Live Ingest Source Switcher for Assigned Channel */}
            <div className="p-6 bg-[#0b0f19] border border-white/10 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Radio className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-base font-bold text-white font-brand">
                      লাইভ স্ট্রিম সোর্স ও ফিল্ড ফিড পরিচালনা
                    </h3>
                    <div className="text-[11px] text-slate-400 font-mono">
                      অ্যাসাইন্ড চ্যানেল: <strong className="text-emerald-400">{assignedChannel.name}</strong> ({assignedChannel.banglaName})
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono">
                  সরাসরি নিয়ন্ত্রণ
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                স্টুডিও ফিডের পাশাপাশি আউটডোর ওবি ভ্যান (OB Van) বা সরেজমিন ক্যামেরা ব্যাকপ্যাক থেকে সরাসরি লাইভ ফিডের লিংক (HLS m3u8 বা অনুমোদিত লাইভ স্ট্রিম) যুক্ত করে চ্যানেলে প্রচার করতে পারেন।
              </p>

              <form onSubmit={handleUpdateStream} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                      বর্তমান অনুষ্ঠান / লাইভ শিরোনাম
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: বিশেষ মাঠপর্যায়ের সরাসরি লাইভ বুলেটিন"
                      value={newShowTitle}
                      onChange={(e) => setNewShowTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                      নতুন লাইভ স্ট্রিম এন্ডপয়েন্ট URL *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="https://... (HLS m3u8 বা YouTube Live URL)"
                      value={newStreamUrl}
                      onChange={(e) => setNewStreamUrl(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-black/60 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>চ্যানেল স্ট্রিম আপডেট করুন</span>
                  </button>
                </div>

                {streamUpdateSuccess && (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 font-mono animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>চ্যানেলের লাইভ স্ট্রিম সফলভাবে প্রতিস্থাপন ও সক্রিয় করা হয়েছে!</span>
                  </div>
                )}
              </form>
            </div>

          </div>

          {/* Right Column (4 cols): Channel Card Preview & Live Stats */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Channel Ingest Status Dossier */}
            <div className="p-5 bg-[#0b0f19] border border-white/10 rounded-2xl shadow-xl space-y-4">
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-400">অ্যাসাইনমেন্ট ডসিয়ার</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">চ্যানেলের নাম</span>
                  <span className="font-bold text-white text-sm">{assignedChannel.name}</span>
                  <span className="text-slate-400 text-xs block">{assignedChannel.banglaName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-1 border-t border-white/5">
                  <div>
                    <span className="text-slate-500 text-[10px] block">ক্যাটাগরি</span>
                    <span className="text-slate-200">{assignedChannel.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">রেজোলিউশন</span>
                    <span className="text-emerald-400 font-bold">{assignedChannel.resolution}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">দর্শক সংখ্যা</span>
                    <span className="text-white font-bold">{assignedChannel.viewersCount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">নোড উৎস</span>
                    <span className="text-slate-300">{assignedChannel.communityNodeName}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <span className="text-slate-500 text-[10px] uppercase font-mono block">বর্তমান অনুষ্ঠান (Now Airing)</span>
                  <span className="text-white font-semibold">{assignedChannel.currentShow}</span>
                </div>

                <div className="pt-1">
                  <span className="text-slate-500 text-[10px] uppercase font-mono block">পরবর্তী অনুষ্ঠান (Up Next)</span>
                  <span className="text-slate-300">{assignedChannel.nextShow}</span>
                </div>
              </div>
            </div>

            {/* Journalist Fast Facts Card */}
            <div className="p-5 bg-[#0b0f19] border border-white/10 rounded-2xl shadow-xl space-y-3 text-xs">
              <div className="flex items-center gap-2 text-red-400 font-semibold font-brand pb-2 border-b border-white/10">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                <span>সাংবাদিক আচরণবিধি ও সম্পাদকীয় স্বাধীনতা</span>
              </div>

              <p className="text-slate-300 leading-relaxed text-[11px]">
                দৈনিক জাহান কোনো পক্ষপাতমূলক সেন্সরশিপ আরোপ করে না। প্রতিটি তথ্য ও অনুসন্ধানী নথি যাচাই-বাছাইপূর্বক জনগণের সত্য জানার অধিকার সমুন্নত রাখুন।
              </p>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5 space-y-1 text-[11px] font-mono text-slate-400">
                <div>• উৎস সুরক্ষা নিশ্চিত করুন (Source Confidentiality)</div>
                <div>• লাইভ টিকার সত্যতা যাচাইপূর্বক প্রচার করুন</div>
                <div>• জরুরি সহায়তায় সম্পাদকীয় ডেস্ক: +880 1911-001122</div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: Upload New Dispatch (সরেজমিন প্রতিবেদন ও ভিডিও আপলোড) */}
      {activeTab === 'new_dispatch' && currentJournalist && (
        <div className="max-w-3xl mx-auto p-6 bg-[#0b0f19] border border-white/10 rounded-2xl shadow-xl space-y-6">
          <div className="pb-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-brand">
                নতুন অনুসন্ধানী বা সরেজমিন প্রতিবেদন প্রকাশ
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                প্রতিবেদক হিসেবে আপনার ধারণকৃত ভিডিও রিপোর্ট প্ল্যাটফর্মের ভিওডি এবং আর্কাইভ লাইব্রেরিতে অন্তর্ভুক্ত করুন।
              </p>
            </div>
            <DainikJahanLogo size="xs" />
          </div>

          <form onSubmit={handlePublishDispatch} className="space-y-4 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">
                  প্রতিবেদনের শিরোনাম (বাংলা) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: পদ্মা অববাহিকায় নদীভাঙন ও পুনর্বাসন চিত্র"
                  value={dispBanglaTitle}
                  onChange={(e) => setDispBanglaTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">
                  ইংরেজি শিরোনাম (Title in English)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Padma Riverbank Erosion and Community Displacement"
                  value={dispTitle}
                  onChange={(e) => setDispTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">ক্যাটাগরি</label>
                <select
                  value={dispCategory}
                  onChange={(e) => setDispCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-white focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  <option value="Investigative">অনুসন্ধানী (Investigative)</option>
                  <option value="Field Report">সরেজমিন প্রতিবেদন (Field Report)</option>
                  <option value="Breaking News">ব্রেকিং নিউজ (Breaking News)</option>
                  <option value="Special Bulletin">বিশেষ বুলেটিন (Special Bulletin)</option>
                  <option value="Talk Show">আলোচনা / গোলটেবিল (Talk Show)</option>
                  <option value="Documentary">প্রামাণ্যচিত্র (Documentary)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">প্রতিবেদনের স্থান (Location)</label>
                <input
                  type="text"
                  placeholder="যেমন: শরীয়তপুর ও মুন্সীগঞ্জ"
                  value={dispLocation}
                  onChange={(e) => setDispLocation(e.target.value)}
                  className="w-full px-3 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">সময়কাল (Duration)</label>
                <input
                  type="text"
                  placeholder="যেমন: 18:30"
                  value={dispDuration}
                  onChange={(e) => setDispDuration(e.target.value)}
                  className="w-full px-3 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">
                ভিডিও স্ট্রিম বা এম্বেড URL *
              </label>
              <input
                type="text"
                required
                placeholder="https://... (YouTube Embed, HLS m3u8, অথবা অনুমোদিত ভিডিও লিংক)"
                value={dispVideoUrl}
                onChange={(e) => setDispVideoUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono uppercase text-[10px]">
                প্রতিবেদনের সারসংক্ষেপ ও অনুসন্ধানী প্রেক্ষাপট (Synopsis)
              </label>
              <textarea
                rows={3}
                placeholder="প্রতিবেদনের মূল তথ্য, অনুসন্ধানের পটভূমি এবং মাঠপর্যায়ের অনুসন্ধানী ফলাফল সংক্ষেপে লিখুন..."
                value={dispSynopsis}
                onChange={(e) => setDispSynopsis(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-red-500 leading-relaxed"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                লেখক স্বত্ব: {currentJournalist.banglaName} · প্রেস কার্ড: {currentJournalist.pressCardNo}
              </span>

              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>প্রতিবেদন প্রকাশ করুন</span>
              </button>
            </div>

            {dispSuccess && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 font-mono animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>প্রতিবেদনটি সফলভাবে প্ল্যাটফর্মে প্রকাশিত ও অন্তর্ভুক্ত হয়েছে!</span>
              </div>
            )}

          </form>
        </div>
      )}

      {/* TAB 3: My Published Dispatches List */}
      {activeTab === 'my_dispatches' && currentJournalist && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white font-brand">
                {currentJournalist.banglaName} কর্তৃক প্রকাশিত প্রতিবেদন ও ফুটেজ
              </h3>
              <p className="text-xs text-slate-400">
                আপনার ডেস্কে নিবন্ধিত মোট প্রতিবেদন খতিয়ান।
              </p>
            </div>

            <button
              onClick={() => setActiveTab('new_dispatch')}
              className="px-3.5 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-500 text-white rounded-xl shadow transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>নতুন প্রকাশনা</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dispatches
              .filter(d => d.journalistId === currentJournalist.id)
              .map((disp) => (
                <div
                  key={disp.id}
                  className="p-4 bg-[#0b0f19] border border-white/10 hover:border-red-500/40 rounded-2xl shadow-xl space-y-3 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950/60 text-red-400 border border-red-800">
                        {disp.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">{disp.date}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">
                      {disp.banglaTitle}
                    </h4>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {disp.synopsis}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-400" />
                      <span>{disp.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {onPlayDispatch && (
                        <button
                          onClick={() => onPlayDispatch(disp)}
                          className="px-2.5 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded-lg text-xs font-sans transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>প্লে করুন</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteDispatch(disp.id)}
                        className="p-1 hover:text-red-400 text-slate-500 rounded transition-colors cursor-pointer"
                        title="প্রতিবেদন মুছুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
          </div>

          {dispatches.filter(d => d.journalistId === currentJournalist.id).length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              এখনও কোনো প্রতিবেদন প্রকাশিত হয়নি। 'নতুন প্রকাশনা' বাটনে ক্লিক করে প্রথম প্রতিবেদন প্রকাশ করুন।
            </div>
          )}
        </div>
      )}

      {/* Digital Press Card Modal */}
      {showPressCardModal && currentJournalist && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1422] border-2 border-red-500/40 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative animate-fadeIn space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <DainikJahanLogo size="xs" />
                <span className="font-bold text-white text-sm font-brand">ডিজিটাল প্রেস কার্ড (PRESS PASS)</span>
              </div>
              <button
                onClick={() => setShowPressCardModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Press Pass Body */}
            <div className="p-4 bg-gradient-to-b from-[#182033] to-[#0d121f] border border-white/10 rounded-xl space-y-4 text-center">
              
              <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-bold text-2xl shadow-xl ring-4 ring-red-500/20">
                {currentJournalist.banglaName.charAt(0)}
              </div>

              <div>
                <h4 className="font-bold text-white text-base">{currentJournalist.banglaName}</h4>
                <div className="text-xs text-slate-300">{currentJournalist.role}</div>
                <div className="text-[11px] text-red-400 font-mono mt-1 font-bold">
                  কার্ড নং: {currentJournalist.pressCardNo}
                </div>
              </div>

              <div className="p-2.5 bg-black/50 border border-white/10 rounded-lg text-left text-[11px] space-y-1 font-mono text-slate-300">
                <div>ব্যুরো: <span className="text-white">{currentJournalist.bureauLocation}</span></div>
                <div>ইমেইল: <span className="text-slate-400">{currentJournalist.email}</span></div>
                <div>মোবাইল: <span className="text-slate-400">{currentJournalist.phone}</span></div>
                <div>যোগদানের তারিখ: <span className="text-slate-400">{currentJournalist.joinedDate}</span></div>
              </div>

              <div className="p-2 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-[10px] text-emerald-400 font-mono flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>দৈনিক জাহান কেন্দ্রীয় সম্পাদকীয় পরিষদ দ্বারা অনুমোদিত</span>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setShowPressCardModal(false)}
                className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
