import React, { useState } from 'react';
import { StudySession, NavTab } from '../types';

interface StudyPlannerPageProps {
  sessions: StudySession[];
  onOpenSchedule: () => void;
  onStartFocus: (sessionTitle?: string) => void;
  onNavigate: (tab: NavTab) => void;
  showToast: (msg: string) => void;
}

export const StudyPlannerPage: React.FC<StudyPlannerPageProps> = ({
  sessions,
  onOpenSchedule,
  onStartFocus,
  showToast
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'week' | 'day' | 'month' | 'list'>('week');
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [selectedSessionId, setSelectedSessionId] = useState<string>('wed-3');
  const [scratchpadText, setScratchpadText] = useState(
    "Check with Prof. Lin about covariance matrix proofs before Friday's lab."
  );

  // Checkbox state for milestones in inspector
  const [milestonesState, setMilestonesState] = useState<Record<string, boolean>>({
    m1: true,
    m2: true,
    m3: true,
    m4: false
  });

  const dateRanges = [
    'Feb 10 – Feb 16, 2025',
    'Feb 17 – Feb 23, 2025',
    'Feb 24 – Mar 02, 2025'
  ];

  const currentDateRange = dateRanges[weekOffset + 1] || 'Feb 17 – Feb 23, 2025';

  const selectedSession =
    sessions.find((s) => s.id === selectedSessionId) ||
    sessions.find((s) => s.id === 'wed-3') ||
    sessions[0];

  const handleToggleMilestone = (key: string) => {
    setMilestonesState((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveScratchpad = () => {
    showToast('Sprint Scratchpad saved successfully!');
  };

  // Filter sessions
  const filteredSessions = sessions.filter((s) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ds') return s.subjectCode === 'CS301';
    if (activeFilter === 'python') return s.subjectCode === 'CS320';
    if (activeFilter === 'dbms') return s.subjectCode === 'CS315';
    if (activeFilter === 'stats') return s.subjectCode === 'MATH240';
    if (activeFilter === 'math') return s.subjectCode === 'MATH210';
    return true;
  });

  const doneCount = Object.values(milestonesState).filter(Boolean).length;
  const totalCount = Object.keys(milestonesState).length;
  const donePercent = Math.round((doneCount / totalCount) * 100);

  return (
    <div className="flex flex-col w-full gap-space-lg pb-space-xl">
      {/* Top Level Header & Navigation Controls */}
      <div className="flex flex-col gap-space-md">
        <div className="flex flex-wrap items-center justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-1.5 text-primary text-xs font-bold tracking-wider uppercase mb-1">
              <span className="material-symbols-outlined text-[16px]">calendar_view_week</span>
              <span>Semester Academic Schedule</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-on-surface">Study Planner</h1>
            <p className="text-sm text-on-surface-variant mt-0.5">
              Organize your weekly learning blocks, exam prep sessions, and lab hours.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* Week Navigator */}
            <div className="flex items-center bg-surface-container-low rounded-xl p-1 shadow-xs border border-surface-container">
              <button
                onClick={() => setWeekOffset((prev) => Math.max(prev - 1, -1))}
                className="px-2.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-1 text-xs font-semibold"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                <span className="hidden sm:inline">Prev Week</span>
              </button>
              <div className="px-3 py-1 text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-primary">event</span>
                <span>{currentDateRange}</span>
              </div>
              <button
                onClick={() => setWeekOffset((prev) => Math.min(prev + 1, 1))}
                className="px-2.5 py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-1 text-xs font-semibold"
                type="button"
              >
                <span className="hidden sm:inline">Next Week</span>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>

            <button
              onClick={() => {
                setWeekOffset(0);
                showToast('Reset to current week (Feb 17 - Feb 23, 2025)');
              }}
              className="px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-variant text-on-surface text-xs sm:text-sm font-semibold transition-all shadow-xs border border-surface-container"
              type="button"
            >
              Today
            </button>

            <button
              onClick={onOpenSchedule}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-98"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>Schedule Study Session</span>
            </button>
          </div>
        </div>

        {/* Secondary Bar: Filter Pills & View Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pt-1">
          {/* Filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs ${
                activeFilter === 'all'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
              type="button"
            >
              <span className="w-2 h-2 rounded-full bg-white"></span>
              All Subjects
            </button>
            <button
              onClick={() => setActiveFilter('ds')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs ${
                activeFilter === 'ds'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
              type="button"
            >
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              Data Structures
            </button>
            <button
              onClick={() => setActiveFilter('python')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs ${
                activeFilter === 'python'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
              type="button"
            >
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              Python Programming
            </button>
            <button
              onClick={() => setActiveFilter('dbms')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs ${
                activeFilter === 'dbms'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
              type="button"
            >
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              DBMS
            </button>
            <button
              onClick={() => setActiveFilter('stats')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs ${
                activeFilter === 'stats'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
              type="button"
            >
              <span className="w-2 h-2 rounded-full bg-secondary-fixed-variant"></span>
              Statistics
            </button>
            <button
              onClick={() => setActiveFilter('math')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs ${
                activeFilter === 'math'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
              }`}
              type="button"
            >
              <span className="w-2 h-2 rounded-full bg-outline"></span>
              Mathematics
            </button>
          </div>

          {/* View Switcher */}
          <div className="flex items-center self-start lg:self-auto bg-surface-container-low p-1 rounded-xl shadow-xs border border-surface-container">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'week'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">view_week</span>
              Week View
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'day'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">view_day</span>
              Day
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'month'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">calendar_view_month</span>
              Month
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                viewMode === 'list'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
              List
            </button>
          </div>
        </div>
      </div>

      {/* Primary Workspace Content: Calendar Grid + Right Rail Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        {/* Left Calendar Grid (8-9 Cols on XL) */}
        <div className="xl:col-span-8 2xl:col-span-9 bg-surface-container-lowest rounded-2xl shadow-xs overflow-hidden flex flex-col border border-surface-container">
          {/* Days of Week Header Strip */}
          <div className="grid grid-cols-8 bg-surface-container-low text-on-surface-variant py-3 px-2 text-center items-center border-b border-surface-container">
            <div className="text-[11px] font-bold text-outline uppercase tracking-wider">Time (EST)</div>
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-on-surface-variant uppercase font-medium">Mon</span>
              <span className="text-base sm:text-lg font-bold text-on-surface">17</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-on-surface-variant uppercase font-medium">Tue</span>
              <span className="text-base sm:text-lg font-bold text-on-surface">18</span>
            </div>
            {/* Wednesday (Today) Marker */}
            <div className="flex flex-col items-center bg-primary/10 py-1 px-2 rounded-xl text-primary relative">
              <span className="text-[11px] font-bold uppercase flex items-center gap-1">
                Wed <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              </span>
              <span className="text-base sm:text-lg font-bold text-primary">19</span>
              <span className="text-[9px] uppercase tracking-widest bg-primary text-on-primary px-1.5 rounded font-bold">Today</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-on-surface-variant uppercase font-medium">Thu</span>
              <span className="text-base sm:text-lg font-bold text-on-surface">20</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-on-surface-variant uppercase font-medium">Fri</span>
              <span className="text-base sm:text-lg font-bold text-on-surface">21</span>
            </div>
            <div className="flex flex-col items-center text-outline">
              <span className="text-[11px] uppercase font-medium">Sat</span>
              <span className="text-base sm:text-lg font-bold">22</span>
            </div>
            <div className="flex flex-col items-center text-outline">
              <span className="text-[11px] uppercase font-medium">Sun</span>
              <span className="text-base sm:text-lg font-bold">23</span>
            </div>
          </div>

          {/* Calendar Body: 08:00 to 21:00 Hours */}
          <div className="relative max-h-[720px] overflow-y-auto">
            <div className="grid grid-cols-8 min-h-[780px] relative bg-surface-container-lowest">
              {/* Column 0: Time Labels */}
              <div className="flex flex-col justify-between py-2 text-right pr-3 bg-surface-container-lowest select-none border-r border-surface-container-low text-xs text-outline font-medium">
                <span>08:00 AM</span>
                <span>09:00 AM</span>
                <span>10:00 AM</span>
                <span>11:00 AM</span>
                <span>12:00 PM</span>
                <span>01:00 PM</span>
                <span>02:00 PM</span>
                <span>03:00 PM</span>
                <span>04:00 PM</span>
                <span>05:00 PM</span>
                <span>06:00 PM</span>
                <span>07:00 PM</span>
                <span>08:00 PM</span>
                <span>09:00 PM</span>
              </div>

              {/* Column 1: Mon 17 */}
              <div className="relative p-1 bg-surface/30 border-r border-surface-container-low">
                {/* 09:00 - 10:30 Data Structures */}
                <div
                  onClick={() => setSelectedSessionId('mon-1')}
                  className={`session-block absolute left-1 right-1 top-[60px] h-[90px] rounded-xl p-2.5 bg-tertiary-fixed text-on-tertiary-fixed shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between overflow-hidden group border border-tertiary/20 ${
                    selectedSessionId === 'mon-1' ? 'ring-2 ring-primary scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-tertiary">
                      <span>09:00 - 10:30</span>
                      <span className="bg-error-container text-on-error-container px-1 rounded text-[10px]">High</span>
                    </div>
                    <div className="font-semibold text-xs sm:text-sm truncate mt-0.5 leading-snug">Data Structures</div>
                    <div className="text-[11px] text-on-tertiary-fixed-variant truncate">Algorithm Analysis</div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] opacity-80 font-medium">
                    <span className="material-symbols-outlined text-[13px]">school</span>
                    <span>Lecture</span>
                  </div>
                </div>

                {/* 14:00 - 15:30 DBMS */}
                <div
                  onClick={() => setSelectedSessionId('mon-2')}
                  className={`session-block absolute left-1 right-1 top-[360px] h-[90px] rounded-xl p-2.5 bg-secondary-fixed text-on-secondary-fixed shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between overflow-hidden border border-secondary/20 ${
                    selectedSessionId === 'mon-2' ? 'ring-2 ring-primary scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-secondary">
                      <span>14:00 - 15:30</span>
                      <span className="bg-secondary-fixed-dim text-on-secondary-fixed px-1 rounded text-[10px]">Lab</span>
                    </div>
                    <div className="font-semibold text-xs sm:text-sm truncate mt-0.5">DBMS</div>
                    <div className="text-[11px] text-on-secondary-fixed-variant truncate">Normalization Lab</div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] opacity-80 font-medium">
                    <span className="material-symbols-outlined text-[13px]">terminal</span>
                    <span>CS Lab 102</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Tue 18 */}
              <div className="relative p-1 bg-surface-container-lowest border-r border-surface-container-low">
                {/* 10:00 - 11:30 Python */}
                <div
                  onClick={() => setSelectedSessionId('tue-1')}
                  className={`session-block absolute left-1 right-1 top-[120px] h-[90px] rounded-xl p-2.5 bg-primary-fixed text-on-primary-fixed shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between overflow-hidden border border-primary/20 ${
                    selectedSessionId === 'tue-1' ? 'ring-2 ring-primary scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-primary">
                      <span>10:00 - 11:30</span>
                      <span className="bg-surface-variant text-on-surface-variant px-1 rounded text-[10px]">Normal</span>
                    </div>
                    <div className="font-semibold text-xs sm:text-sm truncate mt-0.5">Python Programming</div>
                    <div className="text-[11px] text-on-primary-fixed-variant truncate">Object Oriented OOP</div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] opacity-80 font-medium">
                    <span className="material-symbols-outlined text-[13px]">code</span>
                    <span>Code Walkthrough</span>
                  </div>
                </div>

                {/* 15:00 - 17:00 Deep Work Focus */}
                <div
                  onClick={() => setSelectedSessionId('tue-2')}
                  className={`session-block absolute left-1 right-1 top-[420px] h-[120px] rounded-xl p-2.5 bg-tertiary-container text-on-tertiary-container shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between overflow-hidden ${
                    selectedSessionId === 'tue-2' ? 'ring-2 ring-primary scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span>15:00 - 17:00</span>
                      <span className="bg-tertiary text-on-tertiary px-1 rounded text-[10px]">2h Sprint</span>
                    </div>
                    <div className="font-semibold text-xs sm:text-sm truncate mt-0.5">Deep Work Focus</div>
                    <div className="text-[11px] text-tertiary-fixed truncate">DS Heap Assignment</div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] opacity-90 font-medium">
                    <span className="material-symbols-outlined text-[13px]">psychology</span>
                    <span>Solo Deep Session</span>
                  </div>
                </div>
              </div>

              {/* Column 3: Wed 19 (TODAY) */}
              <div className="relative p-1 bg-surface-container-high/30 border-r border-surface-container-low">
                {/* Red Current Time Line Indicator (16:15) */}
                <div className="absolute left-0 right-0 top-[495px] z-20 flex items-center pointer-events-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-error -ml-1"></span>
                  <div className="h-0.5 w-full bg-error"></div>
                </div>

                {/* 09:30 - 11:00 Data Structures (Done) */}
                <div
                  onClick={() => setSelectedSessionId('wed-1')}
                  className={`session-block opacity-75 absolute left-1 right-1 top-[90px] h-[90px] rounded-xl p-2 bg-surface-container-high text-on-surface shadow-xs cursor-pointer hover:opacity-100 transition-all flex flex-col justify-between overflow-hidden border border-surface-container ${
                    selectedSessionId === 'wed-1' ? 'ring-2 ring-primary scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-medium text-on-surface-variant">
                      <span>09:30 - 11:00</span>
                      <span className="flex items-center text-primary font-semibold">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Done
                      </span>
                    </div>
                    <div className="font-semibold text-xs sm:text-sm truncate mt-0.5 line-through opacity-70">Data Structures</div>
                    <div className="text-[11px] text-on-surface-variant truncate">Binary Search Trees</div>
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-medium">Completed</div>
                </div>

                {/* 13:00 - 14:30 DBMS (Done) */}
                <div
                  onClick={() => setSelectedSessionId('wed-2')}
                  className={`session-block opacity-75 absolute left-1 right-1 top-[300px] h-[90px] rounded-xl p-2 bg-surface-container-high text-on-surface shadow-xs cursor-pointer hover:opacity-100 transition-all flex flex-col justify-between overflow-hidden border border-surface-container ${
                    selectedSessionId === 'wed-2' ? 'ring-2 ring-primary scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-medium text-on-surface-variant">
                      <span>13:00 - 14:30</span>
                      <span className="flex items-center text-primary font-semibold">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Done
                      </span>
                    </div>
                    <div className="font-semibold text-xs sm:text-sm truncate mt-0.5 line-through opacity-70">DBMS Review</div>
                    <div className="text-[11px] text-on-surface-variant truncate">B+ Trees & Indexing</div>
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-medium">Completed</div>
                </div>

                {/* 15:30 - 17:00 Statistics (ACTIVE NOW - highlighted) */}
                <div
                  onClick={() => setSelectedSessionId('wed-3')}
                  className={`session-block absolute left-1 right-1 top-[450px] h-[90px] rounded-xl p-2.5 bg-secondary-fixed text-on-secondary-fixed shadow-md ring-2 ring-primary cursor-pointer transition-all flex flex-col justify-between overflow-hidden z-10 border border-secondary/30 ${
                    selectedSessionId === 'wed-3' ? 'scale-[1.02]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-secondary">
                      <span className="font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                        15:30 - 17:00
                      </span>
                      <span className="bg-primary text-on-primary px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                        Active Now
                      </span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm truncate mt-0.5">Statistics MATH240</div>
                    <div className="text-[11px] text-on-secondary-fixed-variant truncate">Bayes & Distributions</div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-medium">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">place</span> Hall 304</span>
                    <span className="text-secondary font-bold">45m left</span>
                  </div>
                </div>

                {/* 18:30 - 20:00 Python Lab */}
                <div
                  onClick={() => setSelectedSessionId('wed-4')}
                  className={`session-block absolute left-1 right-1 top-[630px] h-[90px] rounded-xl p-2.5 bg-primary-fixed text-on-primary-fixed shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between overflow-hidden border border-primary/20 ${
                    selectedSessionId === 'wed-4' ? 'ring-2 ring-primary scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-primary">
                      <span>18:30 - 20:00</span>
                      <span className="bg-surface-variant text-on-surface-variant px-1 rounded text-[10px]">Coding</span>
                    </div>
                    <div className="font-semibold text-xs sm:text-sm truncate mt-0.5">Python Lab</div>
                    <div className="text-[11px] text-on-primary-fixed-variant truncate">AsyncIO & Threading</div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] opacity-80 font-medium">
                    <span className="material-symbols-outlined text-[13px]">group</span>
                    <span>Pair Programming</span>
                  </div>
                </div>
              </div>

              {/* Column 4: Thu 20 */}
              <div className="relative p-1 bg-surface-container-lowest border-r border-surface-container-low">
                {/* 11:00 - 12:30 Discrete Math */}
                <div
                  onClick={() => setSelectedSessionId('thu-1')}
                  className={`session-block absolute left-1 right-1 top-[180px] h-[90px] rounded-xl p-2.5 bg-surface-container-high text-on-surface shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between overflow-hidden border border-surface-container ${
                    selectedSessionId === 'thu-1' ? 'ring-2 ring-primary scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-outline">
                      <span>11:00 - 12:30</span>
                      <span className="bg-surface-container-highest px-1 rounded text-[10px]">Math</span>
                    </div>
                    <div className="font-semibold text-xs sm:text-sm truncate mt-0.5">Discrete Math</div>
                    <div className="text-[11px] text-on-surface-variant truncate">Graph Theory & Euler Paths</div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] opacity-80 font-medium">
                    <span className="material-symbols-outlined text-[13px]">menu_book</span>
                    <span>Theory Revision</span>
                  </div>
                </div>

                {/* 16:00 - 18:00 Midterm Review */}
                <div
                  onClick={() => setSelectedSessionId('thu-2')}
                  className={`session-block absolute left-1 right-1 top-[480px] h-[120px] rounded-xl p-2.5 bg-error-container text-on-error-container shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between overflow-hidden border border-error/20 ${
                    selectedSessionId === 'thu-2' ? 'ring-2 ring-primary scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-error">
                      <span>16:00 - 18:00</span>
                      <span className="bg-error text-on-error px-1.5 py-0.2 rounded text-[10px] font-bold">Urgent</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm truncate mt-0.5">Midterm Review</div>
                    <div className="text-[11px] text-on-error-container truncate">DS Algorithm Mock Exam</div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] opacity-90 font-medium">
                    <span className="material-symbols-outlined text-[13px]">priority_high</span>
                    <span>Prof. Office Hours</span>
                  </div>
                </div>
              </div>

              {/* Column 5: Fri 21 */}
              <div className="relative p-1 bg-surface-container-lowest border-r border-surface-container-low">
                {/* 09:00 - 10:30 DBMS Quiz Prep */}
                <div
                  onClick={() => setSelectedSessionId('fri-1')}
                  className={`session-block absolute left-1 right-1 top-[60px] h-[90px] rounded-xl p-2.5 bg-secondary-fixed text-on-secondary-fixed shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between overflow-hidden border border-secondary/20 ${
                    selectedSessionId === 'fri-1' ? 'ring-2 ring-primary scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-secondary">
                      <span>09:00 - 10:30</span>
                      <span className="bg-secondary-fixed-dim px-1 rounded text-[10px]">Quiz</span>
                    </div>
                    <div className="font-semibold text-xs sm:text-sm truncate mt-0.5">DBMS Quiz Prep</div>
                    <div className="text-[11px] text-on-secondary-fixed-variant truncate">Relational Algebra & SQL</div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] opacity-80 font-medium">
                    <span className="material-symbols-outlined text-[13px]">quiz</span>
                    <span>Timed Practice</span>
                  </div>
                </div>

                {/* 14:00 - 16:00 Python Sprint */}
                <div
                  onClick={() => setSelectedSessionId('fri-2')}
                  className={`session-block absolute left-1 right-1 top-[360px] h-[120px] rounded-xl p-2.5 bg-primary-fixed text-on-primary-fixed shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between overflow-hidden border border-primary/20 ${
                    selectedSessionId === 'fri-2' ? 'ring-2 ring-primary scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-primary">
                      <span>14:00 - 16:00</span>
                      <span className="bg-primary text-on-primary px-1 rounded text-[10px]">Project</span>
                    </div>
                    <div className="font-semibold text-xs sm:text-sm truncate mt-0.5">Python Sprint</div>
                    <div className="text-[11px] text-on-primary-fixed-variant truncate">FastAPI Backend Endpoints</div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] opacity-80 font-medium">
                    <span className="material-symbols-outlined text-[13px]">rocket_launch</span>
                    <span>Sprint Milestone 2</span>
                  </div>
                </div>
              </div>

              {/* Column 6: Sat 22 */}
              <div className="relative p-1 bg-surface-container-low/20 border-r border-surface-container-low">
                {/* 10:00 - 12:00 Weekend Review */}
                <div
                  onClick={() => setSelectedSessionId('sat-1')}
                  className={`session-block absolute left-1 right-1 top-[120px] h-[120px] rounded-xl p-2.5 bg-surface-container-high text-on-surface shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between overflow-hidden border border-surface-container ${
                    selectedSessionId === 'sat-1' ? 'ring-2 ring-primary scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-outline">
                      <span>10:00 - 12:00</span>
                      <span className="bg-surface-variant px-1 rounded text-[10px]">Review</span>
                    </div>
                    <div className="font-semibold text-xs sm:text-sm truncate mt-0.5">Flashcard Recall</div>
                    <div className="text-[11px] text-on-surface-variant truncate">All STEM Definitions (120 cards)</div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] opacity-80 font-medium">
                    <span className="material-symbols-outlined text-[13px]">style</span>
                    <span>Spaced Repetition</span>
                  </div>
                </div>

                {/* 14:00 - 16:00 Math Problem Set */}
                <div
                  onClick={() => setSelectedSessionId('sat-2')}
                  className={`session-block absolute left-1 right-1 top-[360px] h-[120px] rounded-xl p-2.5 bg-surface-variant text-on-surface shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between overflow-hidden ${
                    selectedSessionId === 'sat-2' ? 'ring-2 ring-primary scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-on-surface-variant">
                      <span>14:00 - 16:00</span>
                      <span className="bg-surface-container-lowest px-1 rounded text-[10px]">P-Set</span>
                    </div>
                    <div className="font-semibold text-xs sm:text-sm truncate mt-0.5">Math Problem Set</div>
                    <div className="text-[11px] text-on-surface-variant truncate">Combinatorics & Graphs</div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] opacity-80 font-medium">
                    <span className="material-symbols-outlined text-[13px]">calculate</span>
                    <span>Homework 4</span>
                  </div>
                </div>
              </div>

              {/* Column 7: Sun 23 */}
              <div className="relative p-1 bg-surface-container-low/20 flex flex-col justify-between">
                {/* 11:00 - 13:00 Weekly Planning */}
                <div
                  onClick={() => setSelectedSessionId('sun-1')}
                  className={`session-block absolute left-1 right-1 top-[180px] h-[120px] rounded-xl p-2.5 bg-tertiary-fixed text-on-tertiary-fixed shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between overflow-hidden border border-tertiary/20 ${
                    selectedSessionId === 'sun-1' ? 'ring-2 ring-primary scale-[1.01]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-tertiary">
                      <span>11:00 - 13:00</span>
                      <span className="bg-tertiary text-on-tertiary px-1 rounded text-[10px]">Planning</span>
                    </div>
                    <div className="font-semibold text-xs sm:text-sm truncate mt-0.5">Weekly Roadmap</div>
                    <div className="text-[11px] text-on-tertiary-fixed-variant truncate">Next Sprint Planning</div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] opacity-80 font-medium">
                    <span className="material-symbols-outlined text-[13px]">tune</span>
                    <span>Goal Calibration</span>
                  </div>
                </div>

                {/* Free Evening Preview Zone */}
                <div className="absolute left-1 right-1 bottom-4 top-[380px] rounded-xl p-3 bg-surface-container-lowest/60 flex flex-col items-center justify-center text-center border border-dashed border-outline-variant/60">
                  <span className="material-symbols-outlined text-[28px] text-outline mb-1">nightlight_round</span>
                  <p className="text-xs text-on-surface font-semibold leading-tight">Free Evening</p>
                  <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">
                    No sessions scheduled for Sunday evening — perfect for rest & recovery!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Footnote / Key */}
          <div className="px-space-md py-space-sm bg-surface-container-low flex flex-wrap items-center justify-between text-on-surface-variant text-xs gap-2 border-t border-surface-container">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-tertiary"></span> Data Structures</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-primary-container"></span> Python</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-secondary"></span> DBMS</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-secondary-fixed-variant"></span> Statistics</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-outline"></span> Math</span>
            </div>
            <div className="flex items-center gap-3 text-outline">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">touch_app</span> Click any session to inspect</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">drag_indicator</span> Drag edge to adjust duration</span>
            </div>
          </div>
        </div>

        {/* Right Rail: Session Details Inspector & Targets (3-4 Cols on XL) */}
        <div className="xl:col-span-4 2xl:col-span-3 flex flex-col gap-space-lg">
          {/* Active Session Details Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs flex flex-col gap-space-md border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                <span className="text-xs text-secondary font-bold uppercase tracking-wider">
                  {selectedSession.isActiveNow ? 'Active Study Session' : 'Inspected Session'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => showToast(`Editing block: ${selectedSession.title}`)}
                  className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                  title="Edit Session"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  onClick={() => showToast('Session options: Duplicate, Export to iCal, Share')}
                  className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                  title="Options"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">more_vert</span>
                </button>
              </div>
            </div>

            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary-fixed text-on-secondary-fixed">
                {selectedSession.subjectName}
              </span>
              <h2 className="text-xl font-bold text-on-surface mt-2 leading-tight">
                {selectedSession.title === 'Statistics MATH240'
                  ? "Joint Probability Distributions & Bayes' Theorem"
                  : selectedSession.title}
              </h2>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                {selectedSession.description || 'Deep derivation of conditional probability densities and Bayesian hypothesis updates.'}
              </p>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 gap-2.5 p-3 bg-surface-container-low rounded-xl">
              <div className="flex flex-col">
                <span className="text-[11px] text-outline uppercase font-semibold">Time Block</span>
                <span className="text-xs sm:text-sm text-on-surface font-semibold flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                  {selectedSession.startTime} - {selectedSession.endTime}
                </span>
                <span className="text-[11px] text-on-surface-variant">1h 30m allocated</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] text-outline uppercase font-semibold">Priority</span>
                <div className="mt-0.5">
                  <span className="px-2 py-0.5 rounded-full text-[11px] bg-error-container text-on-error-container font-semibold inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-error"></span> High Priority
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant mt-0.5">Exam in 6 days</span>
              </div>

              <div className="flex flex-col col-span-2 pt-1 border-t border-surface-container/60">
                <span className="text-[11px] text-outline uppercase font-semibold">Location / Desk</span>
                <span className="text-xs sm:text-sm text-on-surface flex items-center gap-1 mt-0.5 font-medium">
                  <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                  {selectedSession.location}
                </span>
              </div>
            </div>

            {/* Attached Checklist */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-on-surface">Subtasks & Milestones</span>
                <span className="text-xs text-primary font-bold">
                  {doneCount} of {totalCount} Done ({donePercent}%)
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={milestonesState.m1}
                    onChange={() => handleToggleMilestone('m1')}
                    className="w-4 h-4 rounded text-primary accent-primary"
                  />
                  <span className={`text-xs text-on-surface ${milestonesState.m1 ? 'line-through opacity-60' : 'font-medium'}`}>
                    Review Lecture 7 slide deck (1-35)
                  </span>
                </label>
                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={milestonesState.m2}
                    onChange={() => handleToggleMilestone('m2')}
                    className="w-4 h-4 rounded text-primary accent-primary"
                  />
                  <span className={`text-xs text-on-surface ${milestonesState.m2 ? 'line-through opacity-60' : 'font-medium'}`}>
                    Derive marginal PDF formulas on whiteboard
                  </span>
                </label>
                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={milestonesState.m3}
                    onChange={() => handleToggleMilestone('m3')}
                    className="w-4 h-4 rounded text-primary accent-primary"
                  />
                  <span className={`text-xs text-on-surface ${milestonesState.m3 ? 'line-through opacity-60' : 'font-medium'}`}>
                    Complete 3 Bayes theorem homework cases
                  </span>
                </label>
                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={milestonesState.m4}
                    onChange={() => handleToggleMilestone('m4')}
                    className="w-4 h-4 rounded text-primary accent-primary"
                  />
                  <span className={`text-xs text-on-surface ${milestonesState.m4 ? 'line-through opacity-60' : 'font-semibold'}`}>
                    Self-test on covariance & correlation matrix
                  </span>
                </label>
              </div>
            </div>

            {/* Attached Resources */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold text-on-surface">Attached Resources</span>
              <div className="flex flex-col gap-1.5">
                <div
                  onClick={() => showToast('Opening Lecture_07_Bayes.pdf viewer...')}
                  className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-error text-[20px]">picture_as_pdf</span>
                    <span className="text-xs font-medium text-on-surface truncate">Lecture_07_Bayes.pdf</span>
                  </div>
                  <span className="text-[11px] text-outline shrink-0">4.2 MB</span>
                </div>
                <div
                  onClick={() => showToast('Launching ProblemSet_3_Solutions.ipynb...')}
                  className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-primary text-[20px]">code_blocks</span>
                    <span className="text-xs font-medium text-on-surface truncate">ProblemSet_3_Solutions.ipynb</span>
                  </div>
                  <span className="text-[11px] text-outline shrink-0">180 KB</span>
                </div>
              </div>
            </div>

            {/* Session Action CTA Buttons */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => onStartFocus(selectedSession.title)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-space-md rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm shadow-sm transition-all active:scale-98"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">play_circle</span>
                <span>Start Timer for this Session</span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenSchedule();
                    showToast('Opening reschedule modal...');
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-surface-container-high hover:bg-surface-variant text-on-surface font-semibold text-xs transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">edit_calendar</span>
                  <span>Reschedule</span>
                </button>
                <button
                  onClick={() => showToast('Invited study buddy via campus link!')}
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-surface-container-high hover:bg-surface-variant text-on-surface font-semibold text-xs transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">share</span>
                  <span>Invite Buddy</span>
                </button>
              </div>
            </div>
          </div>

          {/* Weekly Study Target Widget */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs flex flex-col gap-space-md border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">target</span>
                <span className="text-sm font-bold text-on-surface">Weekly Study Goal</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                54% Completed
              </span>
            </div>

            {/* Telemetry Numbers */}
            <div className="grid grid-cols-3 gap-2 text-center p-2.5 bg-surface-container-low rounded-xl">
              <div className="flex flex-col">
                <span className="text-[11px] text-outline uppercase font-semibold">Planned</span>
                <span className="text-lg font-bold text-on-surface">34h</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-outline uppercase font-semibold">Finished</span>
                <span className="text-lg font-bold text-primary">18.5h</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-outline uppercase font-semibold">Left</span>
                <span className="text-lg font-bold text-on-surface-variant">15.5h</span>
              </div>
            </div>

            {/* Segmented Progress Bar */}
            <div className="flex flex-col gap-1.5">
              <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden flex">
                <div className="bg-tertiary h-full w-[24%]" title="Data Structures: 8h"></div>
                <div className="bg-secondary h-full w-[15%]" title="DBMS: 5h"></div>
                <div className="bg-primary-container h-full w-[15%]" title="Python: 5.5h"></div>
                <div className="bg-surface-container-high h-full w-[46%]" title="Remaining: 15.5h"></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-on-surface-variant px-0.5">
                <span>0 hrs</span>
                <span>Midpoint (17h)</span>
                <span>Target: 34 hrs</span>
              </div>
            </div>

            {/* AI Coach Insight Snippet */}
            <div className="p-3 rounded-xl bg-tertiary-fixed/30 flex items-start gap-2.5 border border-tertiary/20">
              <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">auto_awesome</span>
              <p className="text-xs text-on-tertiary-fixed leading-relaxed">
                <span className="font-bold">AI Pacing Tip:</span> You are ahead of schedule on Python labs. Shift 1 hour on Friday to Data Structures to guarantee 100% exam readiness.
              </p>
            </div>
          </div>

          {/* Quick Desk & Ambient Notes */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs flex flex-col gap-2.5 border border-surface-container">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-outline">sticky_note_2</span>
                Sprint Scratchpad
              </span>
              <button
                onClick={handleSaveScratchpad}
                className="text-primary hover:text-primary-container text-xs font-bold transition-colors"
                type="button"
              >
                Save
              </button>
            </div>
            <textarea
              value={scratchpadText}
              onChange={(e) => setScratchpadText(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none border border-transparent focus:border-primary/30"
              placeholder="Jot down quick reminders for tomorrow's professors or lab partners..."
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
