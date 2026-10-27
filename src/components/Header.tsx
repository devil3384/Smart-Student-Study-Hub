import React from 'react';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  onOpenSchedule: () => void;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  notificationCount: number;
  semester: string;
  onSemesterChange: (s: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  onOpenSearch,
  onOpenSchedule,
  onOpenNotifications,
  onOpenSettings,
  notificationCount,
  semester,
  onSemesterChange
}) => {
  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-xs z-40 flex items-center justify-between px-4 sm:px-space-xl gap-3 sm:gap-space-lg border-b border-surface-container/60">
      {/* Mobile Menu & Global Search */}
      <div className="flex items-center gap-2 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-on-surface hover:bg-surface-container transition-colors"
          aria-label="Open Navigation Menu"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        <div
          onClick={onOpenSearch}
          className="relative w-full flex items-center cursor-pointer group"
        >
          <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] group-hover:text-primary transition-colors">
            search
          </span>
          <div className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-container-low text-on-surface text-xs sm:text-sm font-normal flex items-center justify-between border border-transparent group-hover:border-primary/20 group-hover:bg-surface-container-lowest transition-all shadow-xs">
            <span className="text-outline truncate">Search subjects, notes, upcoming assignments...</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-mono font-semibold">
              Cmd+K
            </span>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 sm:gap-space-md shrink-0">
        {/* Semester Selector */}
        <div className="relative hidden md:flex items-center">
          <select
            value={semester}
            onChange={(e) => onSemesterChange(e.target.value)}
            className="appearance-none bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-semibold text-xs py-2 pl-8 pr-7 rounded-xl cursor-pointer focus:outline-none transition-all shadow-xs border border-transparent hover:border-surface-variant"
          >
            <option value="spring-2025">Spring 2025 Semester</option>
            <option value="fall-2024">Fall 2024 (Archive)</option>
            <option value="summer-2025">Summer 2025 (Draft)</option>
          </select>
          <span className="material-symbols-outlined absolute left-2.5 text-primary text-[18px] pointer-events-none">
            school
          </span>
          <span className="material-symbols-outlined absolute right-2 text-outline text-[16px] pointer-events-none">
            expand_more
          </span>
        </div>

        {/* Schedule Study Session CTA */}
        <button
          onClick={onOpenSchedule}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-98"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span className="hidden sm:inline">New Study Session</span>
          <span className="sm:hidden">New</span>
        </button>

        {/* Notifications Icon with Badge */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"
          type="button"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-error text-on-error font-bold text-[10px] flex items-center justify-center leading-none ring-2 ring-surface-container-lowest">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Profile Avatar */}
        <div
          onClick={onOpenSettings}
          className="flex items-center pl-1 cursor-pointer group"
          title="Alex Chen Settings"
        >
          <img
            alt="Alex Chen Profile"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary transition-all shadow-xs"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBers2roXeDVcCAC3_mu0HYVYiHtA9SQjm_igBqbHuau5lrvF32UwHKUW5h5zUeeX7xU79mjnmc6TDyey-rf1jAlRG2Uju7GT1qaVL5M42RQOj51uk4Sxt8LAEYcP2p-YdGoCafzBnemkzpwg9D0L_jujfutRbkubw7_22MEcKKKKDnPCGvYVd4kCrf2Dfi8pTzOlWbW7yuPkFzXF-ZDruwIPMuFQ6_MvvAFReKve3s4XSQugbLHqShVg"
          />
        </div>
      </div>
    </header>
  );
};
