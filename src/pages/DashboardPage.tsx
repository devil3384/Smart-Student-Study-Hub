import React, { useState } from 'react';
import { NavTab, TaskItem } from '../types';
import { MOTIVATIONAL_QUOTES } from '../data/mockData';

interface DashboardPageProps {
  onNavigate: (tab: NavTab) => void;
  onOpenSchedule: () => void;
  onOpenNewTask: () => void;
  onStartFocus: (taskTitle?: string) => void;
  onOpenAi: () => void;
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
  showToast: (msg: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onOpenSchedule,
  onOpenNewTask,
  onStartFocus,
  onOpenAi,
  tasks,
  onToggleTask,
  showToast
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  const handleShareQuote = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${MOTIVATIONAL_QUOTES[quoteIndex].text} — ${MOTIVATIONAL_QUOTES[quoteIndex].author}`
      );
      showToast('Motivational quote copied to clipboard!');
    }
  };

  // Find 4 top upcoming deliverables
  const upcomingTasks = tasks.filter((t) => !t.completed).slice(0, 4);

  return (
    <div className="flex flex-col w-full gap-space-lg pb-space-xl">
      {/* Top Welcome & Motivation Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-stretch">
        {/* Welcome Narrative Card */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-space-lg rounded-2xl shadow-xs flex flex-col justify-between relative overflow-hidden border border-surface-container">
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-gradient-to-br from-primary-fixed/40 via-secondary-container/20 to-transparent blur-2xl pointer-events-none"></div>
          <div className="flex flex-col gap-1 relative z-10">
            <div className="flex items-center gap-space-sm">
              <span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                ACTIVE SEMESTER • WEEK 8
              </span>
              <span className="text-outline text-xs font-medium">Friday, March 28</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mt-1">
              Hey Alex, ready to make today productive?
            </h1>
            <p className="text-sm text-on-surface-variant max-w-2xl mt-0.5">
              You have <span className="font-semibold text-error">3 deadlines</span> approaching this week. <span className="font-semibold text-primary">Data Structures midterm prep</span> is up next on your schedule!
            </p>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 pt-2 relative z-10">
            <button
              onClick={onOpenSchedule}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs sm:text-sm transition-all shadow-xs active:scale-98"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>New Study Session</span>
            </button>
            <button
              onClick={onOpenNewTask}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs sm:text-sm transition-all shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
              <span>Add Task</span>
            </button>
            <button
              onClick={() => onStartFocus('Quick Pomodoro 25m Sprint')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-semibold text-xs sm:text-sm transition-all shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">bolt</span>
              <span>Quick Pomodoro (25m)</span>
            </button>
            <button
              onClick={onOpenAi}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-tertiary-container hover:bg-tertiary text-on-tertiary-container font-semibold text-xs sm:text-sm transition-all ml-auto shadow-xs active:scale-98"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>Ask AI Assistant</span>
            </button>
          </div>
        </div>

        {/* Daily Motivational Quote Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-surface-container-high via-surface-container to-surface-variant p-space-lg rounded-2xl shadow-xs flex flex-col justify-between relative overflow-hidden border border-surface-container">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold tracking-wider uppercase">
              <span className="material-symbols-outlined text-[14px]">format_quote</span>
              DAILY MINDSET
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handleNextQuote}
                className="p-1.5 rounded-lg bg-surface-container-lowest/80 text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-all"
                title="New quote"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
              </button>
              <button
                onClick={handleShareQuote}
                className="p-1.5 rounded-lg bg-surface-container-lowest/80 text-on-surface-variant hover:text-primary hover:bg-surface-container-lowest transition-all"
                title="Copy Quote"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
              </button>
            </div>
          </div>
          <div className="my-3 flex flex-col gap-1">
            <p className="text-lg font-bold text-on-surface tracking-tight leading-snug">
              {MOTIVATIONAL_QUOTES[quoteIndex].text}
            </p>
            <span className="text-xs text-tertiary font-bold tracking-wider uppercase">
              — {MOTIVATIONAL_QUOTES[quoteIndex].author}
            </span>
          </div>
          <div className="flex items-center justify-between text-outline text-xs pt-1 border-t border-surface-variant/30">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-secondary">psychology</span>
              Neuroplasticity focus: High
            </span>
            <span className="font-mono text-xs">Set #42</span>
          </div>
        </div>
      </div>

      {/* Key Metrics Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {/* Metric 1: Today's Study Hours */}
        <div
          onClick={() => onNavigate('planner')}
          className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-xs flex flex-col justify-between transition-all hover:shadow-md cursor-pointer border border-surface-container"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Today's Study</span>
            <span className="w-8 h-8 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">schedule</span>
            </span>
          </div>
          <div className="flex items-baseline gap-1.5 my-2">
            <span className="text-3xl font-extrabold text-on-surface tracking-tight">4.5</span>
            <span className="text-sm text-outline">/ 6.0 hrs</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
            </div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
              <span className="text-secondary font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +1.2h vs yesterday
              </span>
              <span className="font-semibold text-primary font-mono">75% done</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Tasks Completed */}
        <div
          onClick={() => onNavigate('tasks')}
          className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-xs flex flex-col justify-between transition-all hover:shadow-md cursor-pointer border border-surface-container"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Daily Tasks</span>
            <span className="w-8 h-8 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">task_alt</span>
            </span>
          </div>
          <div className="flex items-baseline gap-1.5 my-2">
            <span className="text-3xl font-extrabold text-on-surface tracking-tight">8</span>
            <span className="text-sm text-outline">/ 12 completed</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden flex gap-1">
              <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: '67%' }}></div>
              <div className="bg-surface-variant h-full rounded-full flex-1"></div>
            </div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
              <span className="text-on-surface-variant">4 remaining today</span>
              <span className="font-semibold text-secondary font-mono">67% complete</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Focus Sessions Done */}
        <div
          onClick={() => onNavigate('focus')}
          className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-xs flex flex-col justify-between transition-all hover:shadow-md cursor-pointer border border-surface-container"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Deep Work</span>
            <span className="w-8 h-8 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
            </span>
          </div>
          <div className="flex items-baseline gap-1.5 my-2">
            <span className="text-3xl font-extrabold text-on-surface tracking-tight">5</span>
            <span className="text-sm text-outline">Pomodoros</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <div className="flex-1 h-2 rounded-full bg-tertiary"></div>
              <div className="flex-1 h-2 rounded-full bg-tertiary"></div>
              <div className="flex-1 h-2 rounded-full bg-tertiary"></div>
              <div className="flex-1 h-2 rounded-full bg-tertiary"></div>
              <div className="flex-1 h-2 rounded-full bg-tertiary"></div>
              <div className="flex-1 h-2 rounded-full bg-surface-container-high"></div>
            </div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1">
              <span className="font-mono">125 mins logged</span>
              <span className="text-tertiary font-semibold">+2 vs target</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Study Streak */}
        <div
          onClick={() => onNavigate('analytics')}
          className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-xs flex flex-col justify-between transition-all hover:shadow-md cursor-pointer border border-surface-container"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Current Streak</span>
            <span className="w-8 h-8 rounded-xl bg-error-container flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
            </span>
          </div>
          <div className="flex items-baseline gap-1.5 my-2">
            <span className="text-3xl font-extrabold text-on-surface tracking-tight">14</span>
            <span className="text-sm text-outline">Days in a row 🔥</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <svg className="w-28 h-6 overflow-visible text-secondary" fill="none" viewBox="0 0 100 24">
              <path d="M 0 18 Q 15 14, 25 15 T 45 9 T 65 11 T 85 4 T 100 2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
              <circle className="fill-secondary animate-ping" cx="100" cy="2" opacity="0.6" r="3.5"></circle>
              <circle className="fill-secondary" cx="100" cy="2" r="3"></circle>
            </svg>
            <span className="text-xs text-on-surface-variant">Best: 21 days</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid (3:2 split) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT COLUMN: Weekly Progress Chart & Today's Schedule (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          {/* 1. Weekly Progress Chart Card */}
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-xs flex flex-col border border-surface-container">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-on-surface">Weekly Study Velocity</span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-xs text-primary font-bold">Week 12</span>
                </div>
                <span className="text-xs text-on-surface-variant mt-0.5">
                  Daily average: <strong className="text-on-surface">5.1 hrs/day</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                  36 / 40 hrs (90%)
                </span>
              </div>
            </div>

            {/* Chart Legend */}
            <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-3 pb-1 border-b border-surface-container-low">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-primary"></span>
                <span>Deep Work</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-secondary-container"></span>
                <span>Assignment Prep</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-surface-container-high"></span>
                <span>Review & Recap</span>
              </div>
            </div>

            {/* Custom SVG Weekly Bar Chart */}
            <div className="w-full relative h-64 flex items-end justify-between pt-6 px-2 bg-surface-container-low/50 rounded-xl">
              {/* Background Grid lines */}
              <div className="absolute inset-x-4 top-6 bottom-8 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="w-full h-px bg-outline-variant/50 flex justify-end"><span className="text-[10px] -mt-2 text-outline">6h</span></div>
                <div className="w-full h-px bg-outline-variant/50 flex justify-end"><span className="text-[10px] -mt-2 text-outline">4h</span></div>
                <div className="w-full h-px bg-outline-variant/50 flex justify-end"><span className="text-[10px] -mt-2 text-outline">2h</span></div>
                <div className="w-full h-px bg-outline-variant/50 flex justify-end"><span className="text-[10px] -mt-2 text-outline">0h</span></div>
              </div>

              {/* Mon */}
              <div className="flex-1 flex flex-col items-center gap-2 z-10 group relative">
                <div className="w-10 sm:w-12 flex flex-col rounded-t-lg overflow-hidden bg-surface-container-high transition-transform duration-200 group-hover:scale-105" style={{ height: '140px' }}>
                  <div className="bg-surface-container-high w-full" style={{ height: '15%' }}></div>
                  <div className="bg-secondary-container w-full" style={{ height: '25%' }}></div>
                  <div className="bg-primary w-full flex-1"></div>
                </div>
                <span className="text-xs text-on-surface-variant font-medium">Mon</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-xs pointer-events-none whitespace-nowrap shadow-md z-20">
                  5.2 hrs
                </div>
              </div>

              {/* Tue */}
              <div className="flex-1 flex flex-col items-center gap-2 z-10 group relative">
                <div className="w-10 sm:w-12 flex flex-col rounded-t-lg overflow-hidden bg-surface-container-high transition-transform duration-200 group-hover:scale-105" style={{ height: '165px' }}>
                  <div className="bg-surface-container-high w-full" style={{ height: '10%' }}></div>
                  <div className="bg-secondary-container w-full" style={{ height: '20%' }}></div>
                  <div className="bg-primary w-full flex-1"></div>
                </div>
                <span className="text-xs text-on-surface-variant font-medium">Tue</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-xs pointer-events-none whitespace-nowrap shadow-md z-20">
                  6.0 hrs
                </div>
              </div>

              {/* Wed */}
              <div className="flex-1 flex flex-col items-center gap-2 z-10 group relative">
                <div className="w-10 sm:w-12 flex flex-col rounded-t-lg overflow-hidden bg-surface-container-high transition-transform duration-200 group-hover:scale-105" style={{ height: '130px' }}>
                  <div className="bg-surface-container-high w-full" style={{ height: '20%' }}></div>
                  <div className="bg-secondary-container w-full" style={{ height: '30%' }}></div>
                  <div className="bg-primary w-full flex-1"></div>
                </div>
                <span className="text-xs text-on-surface-variant font-medium">Wed</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-xs pointer-events-none whitespace-nowrap shadow-md z-20">
                  4.8 hrs
                </div>
              </div>

              {/* Thu - ACTIVE / PINNED TOOLTIP */}
              <div className="flex-1 flex flex-col items-center gap-2 z-10 group relative">
                <div className="absolute -top-10 bg-inverse-surface text-inverse-on-surface px-2.5 py-1 rounded-md text-xs shadow-lg z-20 whitespace-nowrap flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span>
                  <span>5.5 hrs • 82% Deep Work</span>
                </div>
                <div className="w-10 sm:w-12 flex flex-col rounded-t-lg overflow-hidden bg-surface-container-high ring-2 ring-primary shadow-xs transition-transform duration-200 group-hover:scale-105" style={{ height: '152px' }}>
                  <div className="bg-surface-container-high w-full" style={{ height: '10%' }}></div>
                  <div className="bg-secondary-container w-full" style={{ height: '15%' }}></div>
                  <div className="bg-primary w-full flex-1"></div>
                </div>
                <span className="text-xs text-primary font-bold">Thu</span>
              </div>

              {/* Fri - Active Day */}
              <div className="flex-1 flex flex-col items-center gap-2 z-10 group relative">
                <div className="w-10 sm:w-12 flex flex-col rounded-t-lg overflow-hidden bg-surface-container-high transition-transform duration-200 group-hover:scale-105" style={{ height: '124px' }}>
                  <div className="bg-surface-container-high w-full" style={{ height: '15%' }}></div>
                  <div className="bg-secondary-container w-full" style={{ height: '35%' }}></div>
                  <div className="bg-primary w-full flex-1"></div>
                </div>
                <span className="text-xs text-on-surface font-semibold">Fri <span className="text-secondary">•</span></span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-xs pointer-events-none whitespace-nowrap shadow-md z-20">
                  4.5 hrs (Active)
                </div>
              </div>

              {/* Sat */}
              <div className="flex-1 flex flex-col items-center gap-2 z-10 group relative">
                <div className="w-10 sm:w-12 flex flex-col rounded-t-lg overflow-hidden opacity-60 bg-surface-container-high transition-transform duration-200 group-hover:scale-105" style={{ height: '82px' }}>
                  <div className="bg-secondary-container w-full" style={{ height: '40%' }}></div>
                  <div className="bg-primary w-full flex-1"></div>
                </div>
                <span className="text-xs text-on-surface-variant font-medium">Sat</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-xs pointer-events-none whitespace-nowrap shadow-md z-20">
                  3.0 hrs planned
                </div>
              </div>

              {/* Sun */}
              <div className="flex-1 flex flex-col items-center gap-2 z-10 group relative">
                <div className="w-10 sm:w-12 flex flex-col rounded-t-lg overflow-hidden opacity-40 bg-surface-container-high transition-transform duration-200 group-hover:scale-105" style={{ height: '55px' }}>
                  <div className="bg-secondary-container w-full" style={{ height: '30%' }}></div>
                  <div className="bg-primary w-full flex-1"></div>
                </div>
                <span className="text-xs text-on-surface-variant font-medium">Sun</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-xs pointer-events-none whitespace-nowrap shadow-md z-20">
                  2.0 hrs planned
                </div>
              </div>
            </div>

            <div className="mt-4 pt-1 flex items-center justify-between text-on-surface-variant text-xs">
              <span>Weekly target status: <strong className="text-secondary font-semibold">+4.2 hrs ahead of curve</strong></span>
              <button
                onClick={() => onNavigate('analytics')}
                className="text-primary hover:text-primary-container text-xs flex items-center gap-1 font-semibold"
                type="button"
              >
                View Historical Velocity <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* 2. Today's Focus Schedule Timeline */}
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-xs flex flex-col border border-surface-container">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">calendar_today</span>
                <h2 className="text-lg font-bold text-on-surface">Today's Focus Schedule</h2>
              </div>
              <span className="text-xs text-on-surface-variant font-medium">09:00 AM – 08:00 PM</span>
            </div>

            {/* Timeline track */}
            <div className="flex flex-col gap-4 relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-container-high"></div>

              {/* Session 1: Completed */}
              <div className="relative flex items-start gap-4 pl-10">
                <div className="absolute left-2.5 top-2 w-3.5 h-3.5 rounded-full bg-secondary flex items-center justify-center ring-4 ring-surface-container-lowest">
                  <span className="material-symbols-outlined text-[10px] text-on-secondary">check</span>
                </div>
                <div className="flex-1 p-3.5 rounded-xl bg-surface-container-low transition-all hover:bg-surface-container">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-xs text-on-surface-variant font-mono">09:30 AM — 11:00 AM</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-container-highest text-on-surface-variant">
                      COMPLETED
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-on-surface mt-1">CS301: Advanced Data Structures</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">Binary Trees & Heap Review • Room 402 / Library 3rd Floor</p>
                  <div className="flex items-center gap-3 mt-2 pt-1 text-outline text-xs">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">edit_note</span> 4 notes logged</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">timer</span> 90 mins recorded</span>
                  </div>
                </div>
              </div>

              {/* Session 2: Completed */}
              <div className="relative flex items-start gap-4 pl-10">
                <div className="absolute left-2.5 top-2 w-3.5 h-3.5 rounded-full bg-secondary flex items-center justify-center ring-4 ring-surface-container-lowest">
                  <span className="material-symbols-outlined text-[10px] text-on-secondary">check</span>
                </div>
                <div className="flex-1 p-3.5 rounded-xl bg-surface-container-low transition-all hover:bg-surface-container">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-xs text-on-surface-variant font-mono">01:00 PM — 02:30 PM</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-container-highest text-on-surface-variant">
                      COMPLETED
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-on-surface mt-1">CS315: Database Systems</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">SQL Query Optimization Lab • CS Computer Lab B</p>
                  <div className="flex items-center gap-3 mt-2 pt-1 text-outline text-xs">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">terminal</span> 12 queries benchmarked</span>
                  </div>
                </div>
              </div>

              {/* Session 3: LIVE - IN PROGRESS */}
              <div className="relative flex items-start gap-4 pl-10">
                <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center ring-4 ring-primary-fixed animate-pulse"></div>
                <div className="flex-1 p-4 rounded-xl bg-primary-fixed/30 shadow-xs border border-primary/20">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-xs text-primary font-bold font-mono">03:30 PM — 05:00 PM (NOW)</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary text-on-primary flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-on-primary animate-ping"></span>
                      LIVE IN PROGRESS
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-on-surface mt-1">MATH240: Probability & Statistics</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">Joint Probability Problem Set • Self Study & Peer Group</p>
                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-1">
                    <button
                      onClick={() => onStartFocus('MATH240 Probability & Statistics')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-all shadow-xs"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                      <span>Start Focus Timer</span>
                    </button>
                    <button
                      onClick={() => showToast('Connecting to Virtual Study Room 402 with 4 peers...')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-all shadow-xs"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px] text-tertiary">groups</span>
                      <span>Join Virtual Study Room (4 online)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Session 4: Upcoming */}
              <div className="relative flex items-start gap-4 pl-10">
                <div className="absolute left-2.5 top-2 w-3.5 h-3.5 rounded-full bg-outline-variant ring-4 ring-surface-container-lowest"></div>
                <div className="flex-1 p-3.5 rounded-xl bg-surface-container-lowest opacity-90 transition-all hover:bg-surface-container-low border border-surface-container">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-xs text-on-surface-variant font-mono">06:30 PM — 08:00 PM</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-container text-on-surface-variant">
                      UPCOMING
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-on-surface mt-1">CS320: Python for Data Science</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">Pandas & Data Cleaning Project Sprint • Home Workspace</p>
                  <div className="flex items-center gap-3 mt-2 pt-1 text-outline text-xs">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">dataset</span> Dataset v2.4 pre-loaded</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Deadlines & AI Optimization (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          {/* 1. Upcoming Deadlines */}
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-xs flex flex-col border border-surface-container">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[22px]">notification_important</span>
                <h2 className="text-lg font-bold text-on-surface">Upcoming Deadlines</h2>
              </div>
              <span className="text-xs text-outline">{upcomingTasks.length} deliverables</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {upcomingTasks.map((t) => (
                <div
                  key={t.id}
                  className={`p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex items-start gap-3 ${
                    t.completed ? 'opacity-50' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => onToggleTask(t.id)}
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary cursor-pointer shrink-0"
                  />
                  <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-primary">{t.subject}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                          t.priority === 'high'
                            ? 'bg-error-container text-on-error-container'
                            : 'bg-surface-variant text-on-surface-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[12px]">schedule</span>
                        {t.dueLabel}
                      </span>
                    </div>
                    <p
                      className={`text-sm font-semibold text-on-surface truncate ${
                        t.completed ? 'line-through text-outline' : ''
                      }`}
                    >
                      {t.title}
                    </p>
                    <div className="flex items-center justify-between text-outline text-xs mt-0.5">
                      <span>Est: {t.estHours}h remaining</span>
                      <span
                        className={`font-semibold ${
                          t.priority === 'high' ? 'text-error' : 'text-on-surface-variant'
                        }`}
                      >
                        {t.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('tasks')}
              className="mt-3 w-full py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1"
              type="button"
            >
              <span>View All Course Deliverables</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          {/* 2. Smart AI Study Recommendations */}
          <div className="bg-gradient-to-br from-surface-container-lowest to-surface-container-low p-space-lg rounded-2xl shadow-xs flex flex-col border border-surface-container">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[22px]">smart_toy</span>
                <h2 className="text-lg font-bold text-on-surface">AI Study Optimization</h2>
              </div>
              <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold uppercase tracking-wider">
                ALGORITHMIC
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {/* Insight 1: Circadian Retention */}
              <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container/60 flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-tertiary uppercase tracking-wider">Retention Boost</span>
                  <p className="text-xs text-on-surface leading-relaxed">
                    You retain <strong className="text-secondary font-semibold">34% more retention</strong> when reviewing <strong className="text-primary font-semibold">Data Structures flashcards</strong> 2 hours before bedtime.
                  </p>
                  <button
                    onClick={() => {
                      onOpenSchedule();
                      showToast('Scheduled Data Structures flashcard review for 10:00 PM');
                    }}
                    className="text-primary hover:text-primary-container text-xs font-semibold flex items-center gap-1 mt-1 self-start"
                    type="button"
                  >
                    <span>Schedule for 10:00 PM</span>
                    <span className="material-symbols-outlined text-[14px]">alarm_add</span>
                  </button>
                </div>
              </div>

              {/* Insight 2: Spaced Repetition */}
              <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container/60 flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[18px]">auto_graph</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">Suggested Mini-Sprint</span>
                  <p className="text-xs text-on-surface leading-relaxed">
                    Recommended: <strong className="font-semibold text-on-surface">25 mins of Python practice</strong> before tomorrow's lecture to reinforce DataFrame joins.
                  </p>
                  <button
                    onClick={() => onStartFocus('Python DataFrame Practice')}
                    className="text-secondary hover:text-on-secondary-container text-xs font-semibold flex items-center gap-1 mt-1 self-start"
                    type="button"
                  >
                    <span>Launch practice module</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Student Companion Photo Snippet */}
            <div className="mt-3 pt-2 flex items-center gap-3 p-2.5 rounded-xl bg-surface-container-high/60 border border-surface-variant/40">
              <img
                className="w-12 h-12 rounded-lg object-cover shadow-xs shrink-0"
                alt="Collaborative Group Room 402"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL1nP_lSELb6jZ3DL58E9jzgI3fGyCIJvcl9HNd3MsDhqOcgpmGnkNttdBXKsYeIWEgF_j6Ul-pgXiIa_0VmBys2J-pQhyGiqpDgqK5H7hQgWRCwUlSfTOFeGafr3g9llQBo4WwsPbX0P6O26Mp8S4cOUxGoRFKsUiC39zEwCJ0YvSzrr1-xzc73UKlk6F2mY6_-iRYz9KcJ9A7-1nrSStR2NiiNGtLxB5sPe9nXHmYhdb6ikK-won2g"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-on-surface truncate">Collaborative Group Room 402</span>
                <span className="text-[11px] text-on-surface-variant truncate">3 teammates currently active in CS301 chat</span>
              </div>
              <button
                onClick={() => showToast('Opening Collaborative Group Room 402 chat...')}
                className="ml-auto p-2 rounded-lg bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary transition-all shadow-xs"
                type="button"
                title="Open Peer Chat"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
