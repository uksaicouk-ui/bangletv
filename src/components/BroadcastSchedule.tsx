import React, { useState } from 'react';
import { 
  Calendar, Clock, Play, Bell, Check, Tv, Radio, 
  Search, Filter, ChevronRight, X, Download, Share2, Sparkles
} from 'lucide-react';
import { BROADCAST_SCHEDULE, ScheduledProgram } from '../data/scheduleData';
import { CHANNELS } from '../data/channelsData';
import { Channel } from '../types';
import { ChannelLogo } from './ChannelLogo';

interface BroadcastScheduleProps {
  onSelectChannel: (channel: Channel) => void;
  onOpenPolicies?: (tab?: string) => void;
}

export const BroadcastSchedule: React.FC<BroadcastScheduleProps> = ({
  onSelectChannel,
}) => {
  const [selectedDay, setSelectedDay] = useState<'Today' | 'Tomorrow' | 'Wednesday'>('Today');
  const [selectedSlot, setSelectedSlot] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'timeline' | 'cards'>('timeline');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected Program Modal
  const [activeModalProg, setActiveModalProg] = useState<ScheduledProgram | null>(null);
  const [remindedIds, setRemindedIds] = useState<Record<string, boolean>>({});

  const timeSlots = ['All', 'Morning', 'Afternoon', 'Primetime', 'Late Night'];
  const categories = ['All', 'News', 'Sports', 'National', 'Entertainment', 'Education', 'Culture', 'Documentary', 'Diaspora', 'Community', 'Radio'];

  // Filter programs
  const filteredPrograms = BROADCAST_SCHEDULE.filter((prog) => {
    const matchesDay = prog.day === selectedDay;
    const matchesSlot = selectedSlot === 'All' || prog.timeSlot === selectedSlot;
    const matchesCategory = selectedCategory === 'All' || prog.channelCategory === selectedCategory;
    const matchesQuery = 
      prog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prog.banglaTitle && prog.banglaTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      prog.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.synopsis.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDay && matchesSlot && matchesCategory && matchesQuery;
  });

  // Group programs by channel for the timeline grid
  const channelsWithPrograms = CHANNELS.filter(ch => {
    if (selectedCategory !== 'All' && ch.category !== selectedCategory) return false;
    return true;
  }).map(ch => {
    const progs = BROADCAST_SCHEDULE.filter(p => p.channelId === ch.id && p.day === selectedDay);
    return { channel: ch, programs: progs };
  }).filter(item => item.programs.length > 0);

  const handleTuneIn = (channelId: string) => {
    const found = CHANNELS.find(c => c.id === channelId);
    if (found) {
      onSelectChannel(found);
      setActiveModalProg(null);
    }
  };

  const handleToggleReminder = (progId: string, progTitle: string) => {
    setRemindedIds(prev => ({
      ...prev,
      [progId]: !prev[progId]
    }));
  };

  const generateIcsCalendar = (prog: ScheduledProgram) => {
    const now = new Date();
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BangleTV//Broadcast Schedule//EN
BEGIN:VEVENT
SUMMARY:${prog.title} [BangleTV - ${prog.channelName}]
DESCRIPTION:${prog.synopsis}
STATUS:CONFIRMED
DTSTART:${now.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DURATION:PT${prog.duration.replace('m', 'M')}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${prog.title.replace(/\s+/g, '_')}_BangleTV.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="border-b border-white/10 pb-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4" />
              <span>Electronic Program Guide (EPG)</span>
              <span className="text-slate-500">·</span>
              <span>Daily Multi-Channel Timeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-brand">
              Broadcast Programming Schedule
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore hourly programming across Bengali public broadcasting, diaspora channels, and BBC & Al Jazeera investigative airings. Set reminders and tune into live streams seamlessly.
            </p>
          </div>

          {/* Current Broadcast Clock & Quick Metrics */}
          <div className="flex items-center gap-3 bg-[#0d131f] border border-white/10 p-3 rounded-lg text-xs font-mono">
            <Clock className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Dhaka Time (BST)</span>
              <span className="text-white font-bold tabular-nums">18:35 GMT+6 · LIVE</span>
            </div>
          </div>
        </div>

        {/* Day Selector Segmented Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-white/10 rounded-lg">
            {(['Today', 'Tomorrow', 'Wednesday'] as const).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  selectedDay === day
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {day} Schedule
              </button>
            ))}
          </div>

          {/* View Mode Toggle: Timeline vs Cards */}
          <div className="flex items-center gap-1 bg-slate-900 border border-white/10 p-1 rounded-lg text-xs">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Timeline Grid
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Program Cards
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        
        {/* Time-of-Day Slots */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-mono text-[11px] mr-1 hidden sm:inline">Time Slot:</span>
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                selectedSlot === slot
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold'
                  : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>

        {/* Category & Search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
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

          <div className="relative">
            <input
              type="text"
              placeholder="Search schedule..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 sm:w-60 px-3 py-1.5 pl-8 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          </div>
        </div>

      </div>

      {/* VIEW 1: TIMELINE EPG MATRIX */}
      {viewMode === 'timeline' && (
        <div className="bg-[#0b0f19] border border-white/10 rounded-xl overflow-hidden shadow-xl">
          
          {/* Time scale header */}
          <div className="grid grid-cols-12 border-b border-white/10 bg-slate-900/80 text-[11px] font-mono text-slate-400 py-2.5 px-4">
            <div className="col-span-3 sm:col-span-3 font-semibold text-slate-300">
              Channel Feed
            </div>
            <div className="col-span-9 sm:col-span-9 flex items-center justify-between text-slate-400">
              <span>08:00</span>
              <span className="hidden sm:inline">11:00</span>
              <span>14:00</span>
              <span className="hidden sm:inline">17:00</span>
              <span className="text-emerald-400 font-bold">18:00 (Live Now)</span>
              <span>21:00</span>
              <span className="hidden sm:inline">23:30</span>
            </div>
          </div>

          {/* Channel Rows */}
          <div className="divide-y divide-white/5">
            {channelsWithPrograms.map(({ channel, programs }) => (
              <div 
                key={channel.id} 
                className="grid grid-cols-12 p-3 sm:p-4 items-center hover:bg-slate-800/20 transition-colors"
              >
                
                {/* Left: Channel Information */}
                <div className="col-span-12 sm:col-span-3 flex items-center gap-3 pr-2 mb-2 sm:mb-0">
                  <ChannelLogo channelId={channel.id} size="sm" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{channel.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">{channel.category}</span>
                  </div>
                </div>

                {/* Right: Program Timeline Blocks */}
                <div className="col-span-12 sm:col-span-9 flex flex-wrap sm:flex-nowrap gap-2 items-center">
                  {programs.map((prog) => {
                    const isLive = prog.status === 'live';
                    return (
                      <div
                        key={prog.id}
                        onClick={() => setActiveModalProg(prog)}
                        className={`group relative flex-1 min-w-[140px] sm:min-w-0 p-2.5 rounded-lg border transition-all cursor-pointer ${
                          isLive
                            ? 'bg-emerald-950/40 border-emerald-500/50 shadow-sm'
                            : 'bg-black/40 hover:bg-slate-800/60 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                          <span className={isLive ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                            {prog.startTime} - {prog.endTime}
                          </span>
                          {isLive && (
                            <span className="flex items-center gap-1 text-[9px] uppercase font-bold text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              ON AIR
                            </span>
                          )}
                        </div>

                        <h5 className="text-xs font-semibold text-white truncate group-hover:text-emerald-300 transition-colors">
                          {prog.title}
                        </h5>

                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1">
                          <span>{prog.duration}</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-slate-500 truncate">{prog.genre}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

          {channelsWithPrograms.length === 0 && (
            <div className="text-center py-12 text-xs text-slate-400">
              No broadcast programs match the selected filters for {selectedDay}.
            </div>
          )}

        </div>
      )}

      {/* VIEW 2: CARDS GRID VIEW */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrograms.map((prog) => {
            const isLive = prog.status === 'live';
            const hasReminder = remindedIds[prog.id];

            return (
              <div
                key={prog.id}
                onClick={() => setActiveModalProg(prog)}
                className={`flex flex-col justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                  isLive
                    ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg'
                    : 'bg-[#0b0f19] hover:bg-slate-900/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-emerald-400 tabular-nums">
                      {prog.startTime} – {prog.endTime} ({prog.duration})
                    </span>
                    {isLive ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE NOW
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono">{prog.timeSlot}</span>
                    )}
                  </div>

                  {/* Channel Attribution */}
                  <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5 text-slate-500" />
                    <span>{prog.channelName}</span>
                  </div>

                  {/* Program Title */}
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
                    {prog.title}
                  </h4>
                  {prog.banglaTitle && (
                    <p className="text-xs text-slate-400 mb-2">{prog.banglaTitle}</p>
                  )}

                  {/* Synopsis */}
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {prog.synopsis}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {prog.genre}
                  </span>

                  <div className="flex items-center gap-2">
                    {isLive ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTuneIn(prog.channelId);
                        }}
                        className="px-3 py-1 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Tune In</span>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleReminder(prog.id, prog.title);
                        }}
                        className={`p-1.5 rounded transition-colors flex items-center gap-1 text-[11px] cursor-pointer ${
                          hasReminder
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-slate-800/80 text-slate-400 hover:text-white'
                        }`}
                        title="Set browser reminder"
                      >
                        {hasReminder ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bell className="w-3.5 h-3.5" />}
                        <span>{hasReminder ? 'Reminder Set' : 'Remind Me'}</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Program Detail Modal */}
      {activeModalProg && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d131f] border border-white/15 rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-fadeIn">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-1">
                  <span className="text-emerald-400">{activeModalProg.channelName}</span>
                  <span>·</span>
                  <span>{activeModalProg.day} ({activeModalProg.startTime} - {activeModalProg.endTime})</span>
                </div>
                <h3 className="text-xl font-bold text-white font-brand">
                  {activeModalProg.title}
                </h3>
                {activeModalProg.banglaTitle && (
                  <p className="text-xs text-slate-400 mt-0.5">{activeModalProg.banglaTitle}</p>
                )}
              </div>
              <button
                onClick={() => setActiveModalProg(null)}
                className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Program Specs */}
            <div className="p-3 bg-black/40 border border-white/5 rounded-lg grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">Duration</span>
                <span className="text-white font-semibold">{activeModalProg.duration}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Genre</span>
                <span className="text-emerald-400">{activeModalProg.genre}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Time Slot</span>
                <span className="text-white">{activeModalProg.timeSlot}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Status</span>
                <span className={activeModalProg.status === 'live' ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                  {activeModalProg.status === 'live' ? 'ON AIR' : 'Scheduled'}
                </span>
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Program Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeModalProg.synopsis}
              </p>
            </div>

            {activeModalProg.presenter && (
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Host / Bureau: </span>
                {activeModalProg.presenter}
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => generateIcsCalendar(activeModalProg)}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-white/10 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Calendar (.ics)</span>
                </button>
                <button
                  onClick={() => handleToggleReminder(activeModalProg.id, activeModalProg.title)}
                  className={`px-3 py-1.5 text-xs border rounded flex items-center gap-1.5 transition-colors cursor-pointer ${
                    remindedIds[activeModalProg.id]
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-800 hover:bg-slate-700 border-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  {remindedIds[activeModalProg.id] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bell className="w-3.5 h-3.5" />}
                  <span>{remindedIds[activeModalProg.id] ? 'Reminder Set' : 'Set Reminder'}</span>
                </button>
              </div>

              {activeModalProg.status === 'live' ? (
                <button
                  onClick={() => handleTuneIn(activeModalProg.channelId)}
                  className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Tune In Now</span>
                </button>
              ) : (
                <button
                  onClick={() => setActiveModalProg(null)}
                  className="px-4 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Close
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
