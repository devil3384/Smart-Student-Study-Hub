import React, { useState } from 'react';
import { NavTab } from '../types';

interface AnalyticsPageProps {
  onNavigate: (tab: NavTab) => void;
  onOpenSchedule: () => void;
  onOpenAi: () => void;
  showToast: (msg: string) => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  onOpenSchedule,
  onOpenAi,
  showToast
}) => {
  const [selectedRange, setSelectedRange] = useState<'week' | 'month' | 'semester'>('week');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');

  const handleExportReport = () => {
    showToast('Generating official Spring 2025 Academic Performance PDF report...');
    setTimeout(() => {
      showToast('Academic report ready for download!');
    }, 1200);
  };

  const handleSyncNotion = () => {
    showToast('Syncing StudyFlow database with Notion workspace...');
    setTimeout(() => {
      showToast('Notion sync complete! 18 study blocks synchronized.');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg pb-space-xl">
      {/* Top Command & Filter Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">Progress Analytics</h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold">
              <span className="material-symbols-outlined text-[13px]">bolt</span> LIVE TELEMETRY
            </span>
          </div>
          <p className="text-sm text-on-surface-variant mt-0.5">
            Data-driven insights into your study habits, syllabus coverage, and academic performance.
          </p>
        </div>

        {/* Controls Cluster */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Date Range Selector */}
          <div className="inline-flex p-1 rounded-xl bg-surface-container-high shadow-xs border border-surface-container">
            <button
              onClick={() => setSelectedRange('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedRange === 'week'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              This Week (Feb 17 - 23)
            </button>
            <button
              onClick={() => setSelectedRange('month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedRange === 'month'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setSelectedRange('semester')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedRange === 'semester'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              Current Semester
            </button>
          </div>

          {/* Subject Filter */}
          <div className="relative">
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="appearance-none bg-surface-container-lowest text-on-surface text-xs font-semibold pl-8 pr-7 py-2 rounded-xl shadow-xs border border-surface-container cursor-pointer focus:outline-none"
            >
              <option>All Subjects</option>
              <option>CS301 Data Structures</option>
              <option>CS320 Python for Data Science</option>
              <option>CS315 DBMS</option>
              <option>MATH240 Probability & Stats</option>
              <option>MATH210 Discrete Math</option>
            </select>
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-[18px] text-tertiary pointer-events-none">
              category
            </span>
            <span className="material-symbols-outlined absolute right-2 top-2 text-[16px] text-outline pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSyncNotion}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest text-on-surface-variant hover:text-on-surface text-xs font-semibold shadow-xs transition-all border border-surface-container"
              title="Sync with Notion"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">cloud_sync</span>
              <span className="hidden md:inline">Sync Notion</span>
            </button>
            <button
              onClick={handleExportReport}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold shadow-sm transition-all active:scale-98"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
              <span>Export Academic Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards (4 Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {/* Card 1 */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-lg shadow-xs flex flex-col justify-between group hover:shadow-md transition-all border border-surface-container">
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-primary/5 pointer-events-none transition-transform group-hover:scale-125"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Logged Hours</span>
            <div className="w-8 h-8 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">pace</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-on-surface tracking-tight">34.5</span>
              <span className="text-sm text-outline">hrs</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="inline-flex items-center text-secondary text-xs font-bold bg-secondary-container/30 px-1.5 py-0.5 rounded">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +4.2h
              </span>
              <span className="text-xs text-outline">+14% velocity vs last week</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-lg shadow-xs flex flex-col justify-between group hover:shadow-md transition-all border border-surface-container">
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-tertiary/5 pointer-events-none transition-transform group-hover:scale-125"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Daily Average</span>
            <div className="w-8 h-8 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-on-surface tracking-tight">4.9</span>
              <span className="text-sm text-outline">hrs / day</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-xs text-on-surface-variant font-medium">Consistent high focus band</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-lg shadow-xs flex flex-col justify-between group hover:shadow-md transition-all border border-surface-container">
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-secondary/5 pointer-events-none transition-transform group-hover:scale-125"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Task Completion</span>
            <div className="w-8 h-8 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-on-surface tracking-tight">88</span>
              <span className="text-sm text-outline">%</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-xs font-semibold text-secondary-fixed-dim bg-on-secondary-fixed px-1.5 py-0.5 rounded">
                22 of 25
              </span>
              <span className="text-xs text-outline">Deliverables finished on-time</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-lg shadow-xs flex flex-col justify-between group hover:shadow-md transition-all border border-surface-container">
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-primary-container/10 pointer-events-none transition-transform group-hover:scale-125"></div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">Deep Work Ratio</span>
            <div className="w-8 h-8 rounded-xl bg-surface-variant flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-on-surface tracking-tight">78</span>
              <span className="text-sm text-outline">%</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="font-mono text-xs text-primary font-bold">42m</span>
              <span className="text-xs text-outline">Avg uninterrupted session</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* 1. Weekly Productivity Profile (8 Cols) */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs flex flex-col gap-space-md border border-surface-container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-on-surface">Weekly Productivity Profile</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-semibold">
                  Feb 17 - 23
                </span>
              </div>
              <p className="text-xs text-outline mt-0.5">Daily logged hours broken down by cognitive intensity</p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 flex-wrap text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-tertiary"></span>
                <span className="text-on-surface-variant">Deep Pomodoros</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-primary"></span>
                <span className="text-on-surface-variant">Assignment Prep</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-surface-variant"></span>
                <span className="text-on-surface-variant">Lecture Review</span>
              </div>
            </div>
          </div>

          {/* Inline SVG Chart */}
          <div className="relative w-full h-72 pt-2">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 740 240">
              <defs>
                <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4648d4" stopOpacity="0.18"></stop>
                  <stop offset="100%" stopColor="#4648d4" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>
              {/* Horizontal Grid */}
              <line stroke="#eaedff" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="720" y1="20" y2="20"></line>
              <line stroke="#eaedff" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="720" y1="70" y2="70"></line>
              <line stroke="#eaedff" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="720" y1="120" y2="120"></line>
              <line stroke="#eaedff" strokeDasharray="4 4" strokeWidth="1" x1="40" x2="720" y1="170" y2="170"></line>
              <line stroke="#c7c4d7" strokeWidth="1" x1="40" x2="720" y1="220" y2="220"></line>

              {/* Y Axis Labels */}
              <text fill="#767586" fontFamily="Inter" fontSize="11" fontWeight="500" textAnchor="end" x="28" y="24">6.5h</text>
              <text fill="#767586" fontFamily="Inter" fontSize="11" fontWeight="500" textAnchor="end" x="28" y="74">5.0h</text>
              <text fill="#767586" fontFamily="Inter" fontSize="11" fontWeight="500" textAnchor="end" x="28" y="124">3.5h</text>
              <text fill="#767586" fontFamily="Inter" fontSize="11" fontWeight="500" textAnchor="end" x="28" y="174">2.0h</text>
              <text fill="#767586" fontFamily="Inter" fontSize="11" fontWeight="500" textAnchor="end" x="28" y="224">0h</text>

              {/* Smooth Area Background */}
              <path d="M 85 64 Q 185 36, 285 78 T 485 54 T 685 96 L 685 220 L 85 220 Z" fill="url(#areaGradient)"></path>
              <path d="M 85 64 Q 185 36, 285 78 T 485 54 T 685 96" fill="none" opacity="0.4" stroke="#4648d4" strokeLinecap="round" strokeWidth="2.5"></path>

              {/* Mon */}
              <rect fill="#dae2fd" height="45" rx="3" width="28" x="71" y="175"></rect>
              <rect fill="#4648d4" height="50" rx="3" width="28" x="71" y="125"></rect>
              <rect fill="#6b38d4" height="59" rx="3" width="28" x="71" y="66"></rect>
              <text fill="#131b2e" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="85" y="58">5.2h</text>
              <text fill="#464554" fontFamily="Inter" fontSize="12" fontWeight="600" textAnchor="middle" x="85" y="238">Mon</text>

              {/* Tue */}
              <rect fill="#dae2fd" height="40" rx="3" width="28" x="171" y="180"></rect>
              <rect fill="#4648d4" height="65" rx="3" width="28" x="171" y="115"></rect>
              <rect fill="#6b38d4" height="75" rx="3" width="28" x="171" y="40"></rect>
              <text fill="#131b2e" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="185" y="32">6.0h</text>
              <text fill="#464554" fontFamily="Inter" fontSize="12" fontWeight="600" textAnchor="middle" x="185" y="238">Tue</text>

              {/* Wed */}
              <rect fill="#dae2fd" height="38" rx="3" width="28" x="271" y="182"></rect>
              <rect fill="#4648d4" height="50" rx="3" width="28" x="271" y="132"></rect>
              <rect fill="#6b38d4" height="56" rx="3" width="28" x="271" y="76"></rect>
              <text fill="#131b2e" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="285" y="68">4.8h</text>
              <text fill="#464554" fontFamily="Inter" fontSize="12" fontWeight="600" textAnchor="middle" x="285" y="238">Wed</text>

              {/* Thu */}
              <rect fill="#dae2fd" height="35" rx="3" width="28" x="371" y="185"></rect>
              <rect fill="#4648d4" height="60" rx="3" width="28" x="371" y="125"></rect>
              <rect fill="#6b38d4" height="70" rx="3" width="28" x="371" y="55"></rect>
              <text fill="#131b2e" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="385" y="47">5.5h</text>
              <text fill="#464554" fontFamily="Inter" fontSize="12" fontWeight="600" textAnchor="middle" x="385" y="238">Thu</text>

              {/* Fri */}
              <rect fill="#dae2fd" height="40" rx="3" width="28" x="471" y="180"></rect>
              <rect fill="#4648d4" height="45" rx="3" width="28" x="471" y="135"></rect>
              <rect fill="#6b38d4" height="50" rx="3" width="28" x="471" y="85"></rect>
              <text fill="#131b2e" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="485" y="77">4.5h</text>
              <text fill="#464554" fontFamily="Inter" fontSize="12" fontWeight="600" textAnchor="middle" x="485" y="238">Fri</text>

              {/* Sat */}
              <rect fill="#dae2fd" height="30" rx="3" width="28" x="571" y="190"></rect>
              <rect fill="#4648d4" height="45" rx="3" width="28" x="571" y="145"></rect>
              <rect fill="#6b38d4" height="51" rx="3" width="28" x="571" y="94"></rect>
              <text fill="#131b2e" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="585" y="86">4.2h</text>
              <text fill="#464554" fontFamily="Inter" fontSize="12" fontWeight="600" textAnchor="middle" x="585" y="238">Sat</text>

              {/* Sun (Projected) */}
              <rect fill="#dae2fd" height="30" rx="3" stroke="#767586" strokeDasharray="2 2" width="28" x="671" y="190"></rect>
              <rect fill="#4648d4" height="45" rx="3" stroke="#4648d4" strokeDasharray="2 2" width="28" x="671" y="145"></rect>
              <rect fill="#6b38d4" height="54" rx="3" stroke="#6b38d4" strokeDasharray="2 2" width="28" x="671" y="91"></rect>
              <text fill="#767586" fontFamily="Inter" fontSize="10" fontWeight="600" textAnchor="middle" x="685" y="83">4.3h proj</text>
              <text fill="#767586" fontFamily="Inter" fontSize="12" fontWeight="600" textAnchor="middle" x="685" y="238">Sun*</text>
            </svg>
          </div>

          {/* Insight Callout Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-on-surface">Peak focus window: 09:30 AM – 12:00 PM</span>
                <span className="text-xs text-outline">You resolve algorithm problems 1.4x faster in morning slots.</span>
              </div>
            </div>
            <span className="inline-flex items-center self-start sm:self-center px-3 py-1 rounded-md bg-surface-container-highest text-primary text-xs font-semibold">
              98% Retention
            </span>
          </div>
        </div>

        {/* 2. Deliverable Velocity Donut Chart (4 Cols) */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs flex flex-col justify-between h-full gap-space-md border border-surface-container">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-on-surface">Deliverable Velocity</span>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider bg-secondary-container/20 px-2 py-0.5 rounded-full">
                Week 7
              </span>
            </div>
            <p className="text-xs text-outline mt-0.5">25 assignments, labs & quizzes tracked</p>
          </div>

          {/* Donut Chart */}
          <div className="relative flex items-center justify-center my-2">
            <svg className="w-48 h-48 sm:w-52 sm:h-52 transform -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" fill="transparent" r="74" stroke="#eaedff" strokeWidth="20"></circle>
              {/* Completed: 88% */}
              <circle
                cx="100"
                cy="100"
                fill="transparent"
                r="74"
                stroke="#00687a"
                strokeDasharray="409.15 464.95"
                strokeDashoffset="0"
                strokeLinecap="round"
                strokeWidth="20"
              ></circle>
              {/* In Progress: 8% */}
              <circle
                cx="100"
                cy="100"
                fill="transparent"
                r="74"
                stroke="#4648d4"
                strokeDasharray="37.2 464.95"
                strokeDashoffset="-409.15"
                strokeWidth="20"
              ></circle>
              {/* Overdue: 4% */}
              <circle
                cx="100"
                cy="100"
                fill="transparent"
                r="74"
                stroke="#ba1a1a"
                strokeDasharray="18.6 464.95"
                strokeDashoffset="-446.35"
                strokeWidth="20"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-3xl sm:text-4xl font-extrabold text-on-surface leading-none">88%</span>
              <span className="text-xs text-outline uppercase tracking-wider mt-1 font-semibold">Completion</span>
            </div>
          </div>

          {/* Segment Details */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-surface-container-low">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="text-xs font-medium text-on-surface">Completed on time</span>
              </div>
              <span className="font-mono text-xs font-bold text-on-surface">22 <span className="text-outline font-normal">(88%)</span></span>
            </div>
            <div className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <span className="text-xs text-on-surface-variant font-medium">In Progress</span>
              </div>
              <span className="font-mono text-xs font-bold text-on-surface">2 <span className="text-outline font-normal">(8%)</span></span>
            </div>
            <div className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                <span className="text-xs text-error font-medium">Overdue</span>
              </div>
              <span className="font-mono text-xs font-bold text-error">1 <span className="text-outline font-normal">(4%)</span></span>
            </div>
          </div>

          {/* Deliverable Matrix */}
          <div className="pt-2 border-t border-surface-container-low">
            <span className="text-[11px] text-outline uppercase tracking-wider block mb-2 font-semibold">
              Deliverable Type Matrix
            </span>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-xl bg-surface-container-low flex flex-col">
                <span className="font-mono text-sm font-bold text-on-surface">10</span>
                <span className="text-[11px] text-on-surface-variant">Coding Labs</span>
              </div>
              <div className="p-2 rounded-xl bg-surface-container-low flex flex-col">
                <span className="font-mono text-sm font-bold text-on-surface">6</span>
                <span className="text-[11px] text-on-surface-variant">Problem Sets</span>
              </div>
              <div className="p-2 rounded-xl bg-surface-container-low flex flex-col">
                <span className="font-mono text-sm font-bold text-on-surface">4</span>
                <span className="text-[11px] text-on-surface-variant">Quizzes</span>
              </div>
              <div className="p-2 rounded-xl bg-surface-container-low flex flex-col">
                <span className="font-mono text-sm font-bold text-on-surface">2</span>
                <span className="text-[11px] text-on-surface-variant">Reports</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Analytics Row: Subject Investment & Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* 3. Subject-wise Time Investment (7 Cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs flex flex-col gap-space-md border border-surface-container">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-on-surface">Subject Distribution & Syllabus Mastery</span>
              <span className="text-xs text-outline">Logged time allocation vs academic curriculum completion</span>
            </div>
            <button
              onClick={() => showToast('Configured subject target weights')}
              className="text-primary hover:text-primary-container p-1 rounded-lg transition-colors"
              title="Filter course weights"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {/* Subject 1 */}
            <div className="p-3.5 rounded-xl bg-surface-container-low/70 flex flex-col gap-2 hover:bg-surface-container-low transition-colors border border-surface-container-low">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-sm font-bold text-on-surface">CS301 Data Structures</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-primary-fixed text-on-primary-fixed-variant uppercase">
                    Core
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-on-surface">12.5 hrs <span className="text-outline font-normal">(36%)</span></span>
                  <span className="text-xs font-bold text-secondary bg-surface-container-lowest px-2 py-0.5 rounded shadow-xs">82% Mastery</span>
                </div>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden flex">
                <div className="bg-primary h-full rounded-l-full" style={{ width: '36%' }}></div>
                <div className="bg-secondary h-full rounded-r-full opacity-85" style={{ width: '46%' }}></div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-medium text-outline pt-0.5">
                <span>Target: 10 hrs / wk (Exceeded by +2.5h)</span>
                <span>Module 7 of 9 Completed</span>
              </div>
            </div>

            {/* Subject 2 */}
            <div className="p-3.5 rounded-xl bg-surface-container-low/70 flex flex-col gap-2 hover:bg-surface-container-low transition-colors border border-surface-container-low">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                  <span className="text-sm font-bold text-on-surface">CS320 Python for Data Science</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-tertiary-fixed text-on-tertiary-fixed uppercase">
                    Elective
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-on-surface">8.0 hrs <span className="text-outline font-normal">(23%)</span></span>
                  <span className="text-xs font-bold text-secondary bg-surface-container-lowest px-2 py-0.5 rounded shadow-xs">76% Mastery</span>
                </div>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden flex">
                <div className="bg-tertiary h-full rounded-l-full" style={{ width: '23%' }}></div>
                <div className="bg-secondary h-full rounded-r-full opacity-85" style={{ width: '53%' }}></div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-medium text-outline pt-0.5">
                <span>Target: 8 hrs / wk (On track)</span>
                <span>NumPy & Pandas Pipelines verified</span>
              </div>
            </div>

            {/* Subject 3 */}
            <div className="p-3.5 rounded-xl bg-surface-container-low/70 flex flex-col gap-2 hover:bg-surface-container-low transition-colors border border-surface-container-low">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary"></span>
                  <span className="text-sm font-bold text-on-surface">CS315 Database Systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-on-surface">6.5 hrs <span className="text-outline font-normal">(19%)</span></span>
                  <span className="text-xs font-bold text-secondary bg-surface-container-lowest px-2 py-0.5 rounded shadow-xs">68% Mastery</span>
                </div>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden flex">
                <div className="bg-secondary h-full rounded-l-full" style={{ width: '19%' }}></div>
                <div className="bg-secondary-fixed-dim h-full rounded-r-full opacity-85" style={{ width: '49%' }}></div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-medium text-outline pt-0.5">
                <span>Target: 6 hrs / wk (On track)</span>
                <span>Relational Algebra Quiz due Thursday</span>
              </div>
            </div>

            {/* Subject 4 */}
            <div className="p-3.5 rounded-xl bg-surface-container-low/70 flex flex-col gap-2 hover:bg-surface-container-low transition-colors border border-surface-container-low">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                  <span className="text-sm font-bold text-on-surface">MATH240 Probability & Stats</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-on-surface">4.5 hrs <span className="text-outline font-normal">(13%)</span></span>
                  <span className="text-xs font-bold text-secondary bg-surface-container-lowest px-2 py-0.5 rounded shadow-xs">71% Mastery</span>
                </div>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden flex">
                <div className="bg-primary-container h-full rounded-l-full" style={{ width: '13%' }}></div>
                <div className="bg-secondary h-full rounded-r-full opacity-85" style={{ width: '58%' }}></div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-medium text-outline pt-0.5">
                <span>Target: 5 hrs / wk (-0.5h deficit)</span>
                <span>Poisson Distributions queued</span>
              </div>
            </div>

            {/* Subject 5 */}
            <div className="p-3.5 rounded-xl bg-surface-container-low/70 flex flex-col gap-2 hover:bg-surface-container-low transition-colors border border-surface-container-low">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-outline"></span>
                  <span className="text-sm font-bold text-on-surface">MATH210 Discrete Mathematics</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-error-container text-on-error-container uppercase">
                    Attention
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-on-surface">3.0 hrs <span className="text-outline font-normal">(9%)</span></span>
                  <span className="text-xs font-bold text-outline bg-surface-container-lowest px-2 py-0.5 rounded shadow-xs">62% Mastery</span>
                </div>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden flex">
                <div className="bg-outline h-full rounded-l-full" style={{ width: '9%' }}></div>
                <div className="bg-secondary h-full rounded-r-full opacity-85" style={{ width: '53%' }}></div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-medium text-outline pt-0.5">
                <span>Target: 5 hrs / wk (-2.0h deficit)</span>
                <span>Graph Theory Proofs backlog</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Study Habit Heatmap (5 Cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs flex flex-col justify-between gap-space-md border border-surface-container">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-on-surface">Consistency Matrix</span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">
                  🔥 14-day streak
                </span>
              </div>
              <span className="text-xs text-outline font-semibold">12 Weeks</span>
            </div>
            <p className="text-xs text-outline mt-0.5">Daily study rhythm and intensity telemetry</p>
          </div>

          {/* Telemetry strip */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-high/60 border border-surface-container">
            <div className="flex flex-col">
              <span className="text-[10px] text-on-surface-variant uppercase font-bold">Semester Total</span>
              <span className="text-lg sm:text-xl font-extrabold text-on-surface">198.5 hrs</span>
            </div>
            <div className="h-8 w-px bg-outline-variant/60"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-on-surface-variant uppercase font-bold">Active Days</span>
              <span className="text-lg sm:text-xl font-extrabold text-primary">56 / 64</span>
            </div>
            <div className="h-8 w-px bg-outline-variant/60"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-on-surface-variant uppercase font-bold">Max Day</span>
              <span className="text-lg sm:text-xl font-extrabold text-tertiary">7.8 hrs</span>
            </div>
          </div>

          {/* 12-Week Interactive Heatmap Grid */}
          <div className="flex flex-col gap-1.5 overflow-x-auto pb-1">
            <div className="flex items-center justify-between text-[11px] text-outline font-medium px-1">
              <span>Dec</span>
              <span>Jan</span>
              <span>Feb</span>
            </div>

            {/* Heatmap Grid */}
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[280px]">
              {/* Week 1 */}
              <div className="w-5 h-5 rounded bg-surface-container" title="Dec 2: 0h"></div>
              <div className="w-5 h-5 rounded bg-surface-container-high" title="Dec 3: 1.5h"></div>
              <div className="w-5 h-5 rounded bg-primary/40" title="Dec 4: 3.2h"></div>
              <div className="w-5 h-5 rounded bg-primary/40" title="Dec 5: 3.0h"></div>
              <div className="w-5 h-5 rounded bg-surface-container" title="Dec 6: 0h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Dec 7: 4.5h"></div>
              <div className="w-5 h-5 rounded bg-surface-container" title="Dec 8: 0h"></div>

              {/* Week 2 */}
              <div className="w-5 h-5 rounded bg-primary/40" title="Dec 9: 3.1h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Dec 10: 4.8h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Dec 11: 5.5h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Dec 12: 4.0h"></div>
              <div className="w-5 h-5 rounded bg-primary/40" title="Dec 13: 2.8h"></div>
              <div className="w-5 h-5 rounded bg-surface-container" title="Dec 14: 0h"></div>
              <div className="w-5 h-5 rounded bg-primary/40" title="Dec 15: 3.2h"></div>

              {/* Week 3 */}
              <div className="w-5 h-5 rounded bg-surface-container" title="Dec 16: 0h"></div>
              <div className="w-5 h-5 rounded bg-primary/40" title="Dec 17: 2.5h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Dec 18: 4.2h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Dec 19: 6.0h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Dec 20: 4.0h"></div>
              <div className="w-5 h-5 rounded bg-primary/40" title="Dec 21: 3.0h"></div>
              <div className="w-5 h-5 rounded bg-surface-container" title="Dec 22: 0h"></div>

              {/* Week 4 */}
              <div className="w-5 h-5 rounded bg-surface-container" title="Dec 23: 0h"></div>
              <div className="w-5 h-5 rounded bg-surface-container" title="Dec 24: 0h"></div>
              <div className="w-5 h-5 rounded bg-surface-container" title="Dec 25: 0h"></div>
              <div className="w-5 h-5 rounded bg-surface-container" title="Dec 26: 0h"></div>
              <div className="w-5 h-5 rounded bg-primary/40" title="Dec 27: 2.1h"></div>
              <div className="w-5 h-5 rounded bg-surface-container" title="Dec 28: 0h"></div>
              <div className="w-5 h-5 rounded bg-primary/40" title="Dec 29: 2.5h"></div>

              {/* Week 5 */}
              <div className="w-5 h-5 rounded bg-primary/40" title="Dec 30: 3.0h"></div>
              <div className="w-5 h-5 rounded bg-surface-container" title="Dec 31: 0h"></div>
              <div className="w-5 h-5 rounded bg-surface-container" title="Jan 1: 0h"></div>
              <div className="w-5 h-5 rounded bg-primary/40" title="Jan 2: 3.2h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Jan 3: 4.5h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Jan 4: 5.8h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Jan 5: 4.0h"></div>

              {/* Week 6 */}
              <div className="w-5 h-5 rounded bg-primary/60" title="Jan 6: 4.2h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Jan 7: 5.5h"></div>
              <div className="w-5 h-5 rounded bg-tertiary" title="Jan 8: 7.1h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Jan 9: 5.0h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Jan 10: 4.2h"></div>
              <div className="w-5 h-5 rounded bg-surface-container" title="Jan 11: 0h"></div>
              <div className="w-5 h-5 rounded bg-primary/40" title="Jan 12: 3.0h"></div>

              {/* Week 7 */}
              <div className="w-5 h-5 rounded bg-primary/60" title="Jan 13: 4.5h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Jan 14: 5.8h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Jan 15: 5.2h"></div>
              <div className="w-5 h-5 rounded bg-tertiary" title="Jan 16: 6.9h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Jan 17: 4.1h"></div>
              <div className="w-5 h-5 rounded bg-primary/40" title="Jan 18: 3.2h"></div>
              <div className="w-5 h-5 rounded bg-primary/40" title="Jan 19: 2.8h"></div>

              {/* Week 8 */}
              <div className="w-5 h-5 rounded bg-primary/60" title="Jan 20: 4.0h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Jan 21: 5.6h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Jan 22: 5.3h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Jan 23: 4.8h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Jan 24: 4.0h"></div>
              <div className="w-5 h-5 rounded bg-surface-container" title="Jan 25: 0h"></div>
              <div className="w-5 h-5 rounded bg-primary/40" title="Jan 26: 3.1h"></div>

              {/* Week 9 */}
              <div className="w-5 h-5 rounded bg-primary/60" title="Jan 27: 4.2h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Jan 28: 5.9h"></div>
              <div className="w-5 h-5 rounded bg-tertiary" title="Jan 29: 7.4h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Jan 30: 5.1h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Jan 31: 4.5h"></div>
              <div className="w-5 h-5 rounded bg-primary/40" title="Feb 1: 3.0h"></div>
              <div className="w-5 h-5 rounded bg-surface-container" title="Feb 2: 0h"></div>

              {/* Week 10 */}
              <div className="w-5 h-5 rounded bg-primary/60" title="Feb 3: 4.5h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Feb 4: 5.8h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Feb 5: 5.2h"></div>
              <div className="w-5 h-5 rounded bg-tertiary" title="Feb 6: 7.2h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Feb 7: 5.0h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Feb 8: 4.1h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Feb 9: 4.0h"></div>

              {/* Week 11 */}
              <div className="w-5 h-5 rounded bg-primary" title="Feb 10: 5.4h"></div>
              <div className="w-5 h-5 rounded bg-tertiary" title="Feb 11: 6.8h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Feb 12: 5.5h"></div>
              <div className="w-5 h-5 rounded bg-primary" title="Feb 13: 5.1h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Feb 14: 4.3h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Feb 15: 4.5h"></div>
              <div className="w-5 h-5 rounded bg-primary/60" title="Feb 16: 4.0h"></div>

              {/* Week 12 (Active) */}
              <div className="w-5 h-5 rounded bg-primary ring-2 ring-primary-fixed" title="Feb 17: 5.2h"></div>
              <div className="w-5 h-5 rounded bg-tertiary ring-2 ring-primary-fixed" title="Feb 18: 6.0h"></div>
              <div className="w-5 h-5 rounded bg-primary ring-2 ring-primary-fixed" title="Feb 19: 4.8h"></div>
              <div className="w-5 h-5 rounded bg-primary ring-2 ring-primary-fixed" title="Feb 20: 5.5h"></div>
              <div className="w-5 h-5 rounded bg-primary/60 ring-2 ring-primary-fixed" title="Feb 21: 4.5h"></div>
              <div className="w-5 h-5 rounded bg-primary/60 ring-2 ring-primary-fixed" title="Feb 22: 4.2h"></div>
              <div className="w-5 h-5 rounded bg-surface-container-highest animate-pulse ring-2 ring-secondary" title="Feb 23: Today Active"></div>
            </div>

            {/* Heatmap Key */}
            <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-2">
              <span>Less</span>
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded bg-surface-container"></span>
                <span className="w-3.5 h-3.5 rounded bg-primary/40"></span>
                <span className="w-3.5 h-3.5 rounded bg-primary/60"></span>
                <span className="w-3.5 h-3.5 rounded bg-primary"></span>
                <span className="w-3.5 h-3.5 rounded bg-tertiary"></span>
              </div>
              <span>More (7h+)</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container flex items-center justify-between text-xs">
            <span className="text-on-surface-variant">Optimal study pace maintained: <strong className="text-on-surface font-semibold">5/7 days above 4.5h</strong></span>
            <button
              onClick={() => showToast('Opening historical activity log...')}
              className="text-primary hover:underline font-semibold"
              type="button"
            >
              View log
            </button>
          </div>
        </div>
      </div>

      {/* 5. AI Performance Insights & Predictive Grade Analysis */}
      <div className="relative overflow-hidden rounded-2xl bg-inverse-surface text-inverse-on-surface p-6 sm:p-space-xl shadow-md border border-inverse-surface">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-tertiary-container/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col xl:flex-row items-stretch gap-6 sm:gap-space-xl">
          {/* Grade Projection Column */}
          <div className="xl:w-1/3 flex flex-col justify-between p-space-lg rounded-2xl bg-surface-variant/10 border border-white/10">
            <div>
              <div className="flex items-center gap-1.5 text-secondary-fixed-dim">
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                <span className="text-xs uppercase tracking-wider font-bold">Predictive AI Analytics</span>
              </div>
              <h3 className="text-xl font-bold text-on-primary mt-2">Predicted Term GPA</h3>
              <p className="text-xs text-outline-variant mt-1 leading-relaxed">
                Bayesian confidence projection trained on your past 14 assignment submissions and exam weighting.
              </p>
            </div>

            <div className="my-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-extrabold text-on-primary tracking-tight">3.82</span>
                <span className="text-base text-outline-variant">/ 4.00</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> 94.2% CONFIDENCE
                </span>
                <span className="text-xs text-outline-variant font-medium">Dean's List Track</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
              <div className="flex justify-between text-xs text-outline-variant">
                <span>Simulated Finals Floor:</span>
                <span className="text-on-primary font-semibold font-mono">3.71 GPA</span>
              </div>
              <div className="flex justify-between text-xs text-outline-variant">
                <span>Projected Ceiling:</span>
                <span className="text-secondary-fixed-dim font-semibold font-mono">3.94 GPA</span>
              </div>
            </div>
          </div>

          {/* Actionable AI Recommendations Column */}
          <div className="xl:w-2/3 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-fixed-dim text-[22px]">psychology_alt</span>
                <span className="text-lg font-bold text-on-primary">Actionable Algorithmic Prescriptions</span>
              </div>
              <span className="text-xs text-outline-variant hidden sm:inline">Refreshed 28 mins ago</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Recommendation 1 */}
              <div className="p-4 sm:p-space-lg rounded-2xl bg-surface-variant/10 flex flex-col justify-between gap-3 hover:bg-surface-variant/20 transition-all border border-white/5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-error-container text-on-error-container uppercase">
                      Grade Risk Alert
                    </span>
                    <span className="text-xs text-outline-variant">Discrete Math</span>
                  </div>
                  <h4 className="text-sm font-semibold text-on-primary">Allocate +1.5 hrs to Discrete Math this weekend</h4>
                  <p className="text-xs text-outline-variant leading-relaxed">
                    Your syllabus velocity in Graph Theory is 8% under benchmark. An additional 90-minute proof workshop protects your A- trajectory before Quiz #3.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onOpenSchedule();
                    showToast('Opening study planner to lock in 90m Discrete Math proof block...');
                  }}
                  className="inline-flex items-center gap-1 text-primary-fixed text-xs font-semibold hover:text-on-primary transition-colors self-start"
                  type="button"
                >
                  <span>Auto-schedule 90m block</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>

              {/* Recommendation 2 */}
              <div className="p-4 sm:p-space-lg rounded-2xl bg-surface-variant/10 flex flex-col justify-between gap-3 hover:bg-surface-variant/20 transition-all border border-white/5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-secondary-fixed text-on-secondary-fixed uppercase">
                      Circadian Optimization
                    </span>
                    <span className="text-xs text-outline-variant">Cognitive Peak</span>
                  </div>
                  <h4 className="text-sm font-semibold text-on-primary">Shift heavy coding sprints away from late evenings</h4>
                  <p className="text-xs text-outline-variant leading-relaxed">
                    Telemetry shows focus falls by 30% after 9:00 PM with 2.1x higher debug cycles. Rescheduling Data Structures to morning slots boosted your efficiency by 1.4x.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Morning study routine applied to weekly template!')}
                  className="inline-flex items-center gap-1 text-secondary-fixed-dim text-xs font-semibold hover:text-on-primary transition-colors self-start"
                  type="button"
                >
                  <span>Apply morning study routine</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Copilot Prompt Bar Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-3 rounded-xl bg-surface-variant/15 gap-3 border border-white/10">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-tertiary-fixed text-[20px] shrink-0">chat_spark</span>
                <span className="text-xs text-outline-variant truncate">
                  Want a customized syllabus recovery schedule for your upcoming midterms?
                </span>
              </div>
              <button
                onClick={onOpenAi}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-tertiary text-on-tertiary hover:bg-primary-container text-xs font-semibold whitespace-nowrap transition-all shadow-xs active:scale-98"
                type="button"
              >
                Generate Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
