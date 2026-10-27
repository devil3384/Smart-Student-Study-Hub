import React, { useState } from 'react';

interface SettingsPageProps {
  showToast: (msg: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ showToast }) => {
  const [name, setName] = useState('Alex Chen');
  const [degree, setDegree] = useState('BS CS, Year 3');
  const [weeklyGoalHours, setWeeklyGoalHours] = useState('34');
  const [dailyPomodoros, setDailyPomodoros] = useState('6');
  const [ambientVolume, setAmbientVolume] = useState('65');
  const [autoBreaks, setAutoBreaks] = useState(true);
  const [soundShield, setSoundShield] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Preferences updated successfully!');
  };

  return (
    <div className="flex flex-col w-full gap-space-lg pb-space-xl max-w-4xl">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-1">
          <span className="material-symbols-outlined text-[16px]">tune</span>
          <span>Account & Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">Settings</h1>
        <p className="text-sm text-on-surface-variant">
          Manage your academic profile, study targets, notification triggers, and focus automation.
        </p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-space-lg">
        {/* Profile Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs border border-surface-container flex flex-col gap-4">
          <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">person</span>
            Student Profile
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              alt="Alex Chen"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 shadow-xs"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBers2roXeDVcCAC3_mu0HYVYiHtA9SQjm_igBqbHuau5lrvF32UwHKUW5h5zUeeX7xU79mjnmc6TDyey-rf1jAlRG2Uju7GT1qaVL5M42RQOj51uk4Sxt8LAEYcP2p-YdGoCafzBnemkzpwg9D0L_jujfutRbkubw7_22MEcKKKKDnPCGvYVd4kCrf2Dfi8pTzOlWbW7yuPkFzXF-ZDruwIPMuFQ6_MvvAFReKve3s4XSQugbLHqShVg"
            />
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3.5 py-2 bg-surface-container-low rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-transparent"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface">Major & Academic Year</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="px-3.5 py-2 bg-surface-container-low rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Academic Goals Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs border border-surface-container flex flex-col gap-4">
          <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">target</span>
            Weekly Study Targets & GPA Benchmark
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface">Weekly Planned Hours</label>
              <input
                type="number"
                value={weeklyGoalHours}
                onChange={(e) => setWeeklyGoalHours(e.target.value)}
                className="px-3.5 py-2 bg-surface-container-low rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-transparent"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface">Daily Pomodoros Target</label>
              <input
                type="number"
                value={dailyPomodoros}
                onChange={(e) => setDailyPomodoros(e.target.value)}
                className="px-3.5 py-2 bg-surface-container-low rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-transparent"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface">Target Semester GPA</label>
              <input
                type="text"
                disabled
                value="3.85 / 4.0 (Dean's List)"
                className="px-3.5 py-2 bg-surface-container-high rounded-xl text-sm text-on-surface-variant font-semibold cursor-not-allowed border border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Focus & Shield Automation */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs border border-surface-container flex flex-col gap-4">
          <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[20px]">security</span>
            Cognitive Shield & Focus Settings
          </h2>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-low">
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-on-surface">Auto-start Breaks</span>
                <span className="text-xs text-on-surface-variant">Switch directly to 5-min rest on session end</span>
              </div>
              <input
                type="checkbox"
                checked={autoBreaks}
                onChange={(e) => setAutoBreaks(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-low">
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-on-surface">Block Tab Distractions</span>
                <span className="text-xs text-on-surface-variant">Browser notification shield during active pomodoros</span>
              </div>
              <input
                type="checkbox"
                checked={soundShield}
                onChange={(e) => setSoundShield(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-low">
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-on-surface">Daily Deadline Digest</span>
                <span className="text-xs text-on-surface-variant">Morning email alert summarizing urgent deliverables</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-all shadow-sm active:scale-98"
          >
            Save All Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
