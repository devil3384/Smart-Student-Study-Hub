import React from 'react';
import { NavTab } from '../types';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  pomodoroSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onOpenAi: () => void;
  onOpenSchedule: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  pomodoroSeconds,
  isTimerRunning,
  onToggleTimer,
  onOpenAi,
  isMobileOpen,
  onCloseMobile
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const navItems: { id: NavTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'planner', label: 'Study Planner', icon: 'calendar_month' },
    { id: 'tasks', label: 'Tasks & Assignments', icon: 'checklist' },
    { id: 'subjects', label: 'My Subjects', icon: 'menu_book' },
    { id: 'focus', label: 'Focus Timer', icon: 'timer' },
    { id: 'analytics', label: 'Progress Analytics', icon: 'insights' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-inverse-surface/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-inverse-surface text-inverse-on-surface z-50 flex flex-col justify-between overflow-y-auto transition-transform duration-200 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-space-lg">
          {/* Logo & Brand */}
          <div className="flex items-center gap-space-sm mb-space-lg">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base text-on-primary leading-tight">StudyFlow AI</span>
              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-tertiary-container text-on-tertiary-container self-start mt-0.5">
                STUDENT PRO
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile();
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all text-left text-sm font-medium ${
                    isActive
                      ? 'bg-primary text-on-primary font-semibold shadow-sm'
                      : 'text-outline-variant hover:bg-surface-variant/20 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Section */}
        <div className="p-space-lg flex flex-col gap-3">
          {/* 14-day study streak badge */}
          <div className="flex items-center justify-between px-3 py-1.5 rounded-full bg-surface-variant/20">
            <span className="text-xs font-semibold flex items-center gap-1.5 text-secondary-fixed-dim">
              <span className="text-sm">🔥</span> 14-day study streak
            </span>
            <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-pulse"></span>
          </div>

          {/* Mini Pomodoro Controller */}
          <div className="p-3 rounded-xl bg-surface-variant/10 flex items-center justify-between">
            <div
              className="flex flex-col cursor-pointer"
              onClick={() => {
                onSelectTab('focus');
                onCloseMobile();
              }}
            >
              <span className="text-[10px] uppercase tracking-wider text-outline-variant font-medium">Pomodoro</span>
              <span className="text-sm text-on-primary font-bold font-mono">
                {formatTime(pomodoroSeconds)} left
              </span>
            </div>
            <button
              onClick={onToggleTimer}
              className="w-8 h-8 rounded-lg bg-surface-variant/20 hover:bg-surface-variant hover:text-on-surface text-on-primary flex items-center justify-center transition-colors"
              type="button"
              title={isTimerRunning ? 'Pause Pomodoro' : 'Start Pomodoro'}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isTimerRunning ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>

          {/* Ask StudyFlow AI CTA button */}
          <button
            onClick={() => {
              onOpenAi();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-tertiary hover:bg-primary-container text-on-tertiary font-semibold text-sm transition-all shadow-md active:scale-98"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span>Ask StudyFlow AI</span>
          </button>

          {/* User Profile Tile */}
          <div className="pt-2 flex items-center justify-between border-t border-surface-variant/15">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => {
                onSelectTab('settings');
                onCloseMobile();
              }}
            >
              <div className="relative">
                <img
                  alt="Alex Chen"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-white/20"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBers2roXeDVcCAC3_mu0HYVYiHtA9SQjm_igBqbHuau5lrvF32UwHKUW5h5zUeeX7xU79mjnmc6TDyey-rf1jAlRG2Uju7GT1qaVL5M42RQOj51uk4Sxt8LAEYcP2p-YdGoCafzBnemkzpwg9D0L_jujfutRbkubw7_22MEcKKKKDnPCGvYVd4kCrf2Dfi8pTzOlWbW7yuPkFzXF-ZDruwIPMuFQ6_MvvAFReKve3s4XSQugbLHqShVg"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim ring-2 ring-inverse-surface"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-on-primary font-semibold">Alex Chen</span>
                <span className="text-[11px] text-outline-variant">BS CS, Year 3</span>
              </div>
            </div>
            <button
              onClick={() => {
                onSelectTab('settings');
                onCloseMobile();
              }}
              className="text-outline-variant hover:text-on-primary transition-colors p-1 rounded-lg"
              title="Open Settings"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
