import React, { useState, useEffect, useRef } from 'react';
import { AMBIENT_TRACKS } from '../data/mockData';

interface FocusTimerPageProps {
  pomodoroSeconds: number;
  totalDurationSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onAddFiveMinutes: () => void;
  onSkipBreak: () => void;
  onSelectDuration: (sec: number, label: string) => void;
  currentTaskFocus?: string;
  showToast: (msg: string) => void;
}

export const FocusTimerPage: React.FC<FocusTimerPageProps> = ({
  pomodoroSeconds,
  totalDurationSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  onAddFiveMinutes,
  onSkipBreak,
  onSelectDuration,
  currentTaskFocus,
  showToast
}) => {
  const [activeMode, setActiveMode] = useState<'pomo' | 'short' | 'long' | 'custom'>('pomo');
  const [selectedTrackId, setSelectedTrackId] = useState('lofi');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [volume, setVolume] = useState(65);

  // Scratchpad items
  const [thoughts, setThoughts] = useState<string[]>([
    'Remember to email Prof. Vance regarding lab 4 extensions',
    'Pay student housing electric bill before Friday 5 PM'
  ]);
  const [newThought, setNewThought] = useState('');

  // Milestone checklist
  const [milestones, setMilestones] = useState([
    { id: 1, text: 'Write node rotation helper functions (leftRotate, rightRotate)', done: true, time: '15m spent' },
    { id: 2, text: 'Calculate node height & compute balance factor', done: true, time: '20m spent' },
    { id: 3, text: 'Rebalance on node insertion edge cases (Left-Right, Right-Left)', done: false, time: 'Active task', isCurrent: true },
    { id: 4, text: 'Run automated LeetCode test suite validation (60 test cases)', done: false, time: 'Est: 25m' }
  ]);

  // Web Audio ambient synthesizer reference
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioNode | null>(null);

  const toggleMilestone = (id: number) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m))
    );
  };

  const handleAddThought = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newThought.trim()) return;
    setThoughts((prev) => [...prev, newThought.trim()]);
    setNewThought('');
    showToast('Distraction saved to scratchpad. Stay focused!');
  };

  const handleDismissThought = (index: number) => {
    setThoughts((prev) => prev.filter((_, i) => i !== index));
    showToast('Distraction dismissed');
  };

  // Web Audio ambient sound simulation
  const toggleAmbientAudio = (trackId: string) => {
    if (selectedTrackId === trackId && isPlayingAudio) {
      // Pause
      stopAmbientSound();
      setIsPlayingAudio(false);
      showToast('Ambient soundscape paused');
    } else {
      setSelectedTrackId(trackId);
      startAmbientSound();
      setIsPlayingAudio(true);
      const track = AMBIENT_TRACKS.find((t) => t.id === trackId);
      showToast(`Playing ambient soundscape: ${track?.name}`);
    }
  };

  const startAmbientSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop previous
      stopAmbientSound();

      // Create pink noise buffer
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.035; // gentle ambient level
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter for rain / cozy warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = selectedTrackId === 'gamma' ? 380 : 750;

      const gain = ctx.createGain();
      gain.gain.value = (volume / 100) * 0.15;
      gainNodeRef.current = gain;

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      noiseSourceRef.current = whiteNoise;
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const stopAmbientSound = () => {
    if (noiseSourceRef.current) {
      try {
        (noiseSourceRef.current as any).stop();
        noiseSourceRef.current.disconnect();
      } catch {
        // ignore
      }
      noiseSourceRef.current = null;
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.value = (volume / 100) * 0.15;
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopAmbientSound();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Format digital clock
  const m = Math.floor(pomodoroSeconds / 60);
  const s = pomodoroSeconds % 60;
  const timeFormatted = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;

  // SVG circular dial parameters
  const radius = 140;
  const circumference = 2 * Math.PI * radius; // 879.64
  const progressRatio = (totalDurationSeconds - pomodoroSeconds) / totalDurationSeconds;
  const strokeOffset = circumference * (1 - progressRatio);

  const completedCount = milestones.filter((m) => m.done).length;

  return (
    <div className="flex flex-col w-full gap-space-lg pb-space-xl">
      {/* Top Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Cognitive Workspace • Focus Mode</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">Focus Timer</h1>
          <p className="text-sm text-on-surface-variant max-w-2xl mt-0.5">
            Enter deep focus state with the science-backed Pomodoro technique and ambient student study tools.
          </p>
        </div>

        {/* Quick Mode Selector Tabs */}
        <div className="flex items-center p-1 bg-surface-container rounded-xl self-start md:self-auto shadow-xs border border-surface-container">
          <button
            onClick={() => {
              setActiveMode('pomo');
              onSelectDuration(1500, 'Pomodoro (25m Focus)');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'pomo'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span>
            <span>Pomodoro (25m Focus)</span>
          </button>
          <button
            onClick={() => {
              setActiveMode('short');
              onSelectDuration(300, 'Short Break (5m)');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'short'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            <span>Short Break (5m)</span>
          </button>
          <button
            onClick={() => {
              setActiveMode('long');
              onSelectDuration(900, 'Long Break (15m)');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'long'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            <span>Long Break (15m)</span>
          </button>
          <button
            onClick={() => {
              setActiveMode('custom');
              onSelectDuration(3000, 'Custom Timer');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'custom'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Custom</span>
          </button>
        </div>
      </div>

      {/* Main Center Hero Layout: Focal Timer Stage */}
      <div className="relative w-full rounded-2xl bg-surface-container-lowest p-6 sm:p-space-xl shadow-xs overflow-hidden flex flex-col items-center border border-surface-container">
        {/* Ambient Radial Glow Effects */}
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>

        {/* Active Task Ribbon Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low shadow-xs mb-4 text-on-surface border border-surface-container">
          <span className="material-symbols-outlined text-primary text-[18px]">terminal</span>
          <span className="text-xs uppercase font-bold tracking-wider text-on-surface-variant">Current Focus:</span>
          <span className="text-xs sm:text-sm font-semibold text-primary truncate max-w-xs sm:max-w-md">
            {currentTaskFocus || 'CS301: Implement AVL Tree Self-Balancing Rotations'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
        </div>

        {/* Circular Pomodoro Engine */}
        <div className="relative flex items-center justify-center my-2 select-none">
          {/* SVG Progress Dial */}
          <svg className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 -rotate-90 transform" viewBox="0 0 320 320">
            <defs>
              <linearGradient id="timerGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#6063ee"></stop>
                <stop offset="60%" stopColor="#4648d4"></stop>
                <stop offset="100%" stopColor="#57dffe"></stop>
              </linearGradient>
            </defs>
            {/* Background Track */}
            <circle
              className="text-surface-container"
              cx="160"
              cy="160"
              fill="none"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
            ></circle>
            {/* Glowing Progress Track */}
            <circle
              className="transition-all duration-1000 ease-linear"
              cx="160"
              cy="160"
              fill="none"
              r={radius}
              stroke="url(#timerGradient)"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              strokeWidth="12"
            ></circle>
          </svg>

          {/* Center Digital Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-primary tracking-widest uppercase font-bold px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed mb-1">
              DEEP WORK FOCUS • SESSION 3 OF 4
            </span>
            <span className="font-mono text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface my-1">
              {timeFormatted}
            </span>
            <span className="text-xs text-on-surface-variant flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[16px] text-secondary">memory</span>
              Target: {Math.round(totalDurationSeconds / 60)} min • Next: 5 min stretch
            </span>
          </div>
        </div>

        {/* Timer Control Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 z-10">
          <button
            onClick={onToggleTimer}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-tertiary hover:opacity-95 text-on-primary font-semibold text-sm sm:text-base shadow-md transition-all scale-100 active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isTimerRunning ? 'pause' : 'play_arrow'}
            </span>
            <span>{isTimerRunning ? 'Pause Focus' : 'Resume Focus'}</span>
          </button>

          <button
            onClick={onResetTimer}
            className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-sm transition-all border border-surface-container"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] text-outline">replay</span>
            <span>Reset</span>
          </button>

          <button
            onClick={onAddFiveMinutes}
            className="flex items-center gap-1 px-4 py-3 rounded-xl bg-surface-container-low hover:bg-surface-variant text-on-surface-variant hover:text-on-surface text-xs font-semibold transition-all border border-surface-container"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">add_circle</span>
            <span>+5 Min Extension</span>
          </button>

          <button
            onClick={onSkipBreak}
            className="flex items-center gap-1 px-4 py-3 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container-low text-xs font-semibold transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">fast_forward</span>
            <span>Skip to Break</span>
          </button>
        </div>

        {/* Session Counter & Streak Dock */}
        <div className="w-full max-w-3xl mt-6 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-surface-container-low rounded-2xl px-5 py-3.5 border border-surface-container">
          {/* Session sequence */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Current Cycle</span>
              <span className="text-xs sm:text-sm font-bold text-on-surface">Pomodoro Set #1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1" title="Session 1: Completed">
                <span className="w-8 h-2.5 rounded-full bg-secondary"></span>
                <span className="text-[10px] text-outline">01</span>
              </div>
              <div className="flex flex-col items-center gap-1" title="Session 2: Completed">
                <span className="w-8 h-2.5 rounded-full bg-secondary"></span>
                <span className="text-[10px] text-outline">02</span>
              </div>
              <div className="flex flex-col items-center gap-1" title="Session 3: Active">
                <span className="w-8 h-2.5 rounded-full bg-primary relative overflow-hidden">
                  <span className="absolute inset-0 bg-white/40 animate-pulse"></span>
                </span>
                <span className="text-[10px] text-primary font-bold">03</span>
              </div>
              <div className="flex flex-col items-center gap-1" title="Session 4: Pending">
                <span className="w-8 h-2.5 rounded-full bg-surface-variant"></span>
                <span className="text-[10px] text-outline">04</span>
              </div>
            </div>
          </div>

          {/* Deep Work Target & Streak */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Today's Deep Work</span>
                <span className="font-mono text-xs font-bold text-on-surface">2h 15m / 4h 00m (56%)</span>
              </div>
              <div className="w-40 sm:w-48 h-2 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: '56%' }}></div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container text-on-surface border border-surface-container">
              <span className="text-xl">🔥</span>
              <div className="flex flex-col">
                <span className="font-bold text-xs leading-tight">14-Day</span>
                <span className="text-[10px] text-outline uppercase font-semibold">Streak</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting 2-Column Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* LEFT PANEL: Linked Assignment & Distraction Dump (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          {/* Linked Academic Assignment */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs flex flex-col gap-space-md border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-on-surface">Linked Academic Assignment</h2>
                  <span className="text-xs text-on-surface-variant">CS 301: Advanced Data Structures • Lab #4</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-xs text-primary font-bold">
                {completedCount} of {milestones.length} Completed
              </span>
            </div>

            {/* Task Title Card */}
            <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1 border border-surface-container">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-on-surface">AVL Tree Self-Balancing Rotations</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-error-container text-on-error-container">
                  Due Tomorrow, 11:59 PM
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Implementation of recursive balance checks, single and double rotations (LL, RR, LR, RL) with invariant testing.
              </p>
            </div>

            {/* Subtask Milestones */}
            <div className="flex flex-col gap-2 mt-1">
              <span className="text-[11px] uppercase text-outline font-semibold">Sprint Milestones</span>
              {milestones.map((m) => (
                <label
                  key={m.id}
                  className={`group flex items-start gap-2.5 p-2.5 rounded-xl transition-colors cursor-pointer border ${
                    m.isCurrent
                      ? 'bg-surface-container-low text-on-surface border-primary/30 shadow-xs'
                      : 'bg-surface hover:bg-surface-container-low border-surface-container-low'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={m.done}
                    onChange={() => toggleMilestone(m.id)}
                    className="mt-1 w-4 h-4 rounded text-primary accent-primary cursor-pointer shrink-0"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${m.done ? 'line-through text-outline' : m.isCurrent ? 'font-semibold text-primary' : 'text-on-surface'}`}>
                        {m.text}
                      </span>
                      {m.isCurrent && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-primary text-on-primary">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-outline font-mono shrink-0 ml-2">{m.time}</span>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={() => {
                const text = prompt('Enter new subtask milestone:');
                if (text && text.trim()) {
                  setMilestones((prev) => [
                    ...prev,
                    { id: Date.now(), text: text.trim(), done: false, time: 'Est: 15m' }
                  ]);
                  showToast('New milestone added to current focus block');
                }
              }}
              className="self-start flex items-center gap-1 text-primary hover:text-primary-container text-xs font-semibold transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add subtask milestone</span>
            </button>
          </div>

          {/* Quick Brain Dump / Distraction Scratchpad */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs flex flex-col gap-space-md border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-surface-variant text-on-surface flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">sticky_note_2</span>
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-on-surface">Distraction Scratchpad</h2>
                  <span className="text-xs text-on-surface-variant">
                    Dump stray thoughts immediately so they don't break your flow
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-surface-container text-outline">
                Auto-saved
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {thoughts.map((th, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl text-xs text-on-surface border border-surface-container-low"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                    {th}
                  </span>
                  <button
                    onClick={() => handleDismissThought(index)}
                    className="text-outline hover:text-error transition-colors p-1"
                    title="Dismiss thought"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">done</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Add stray thought */}
            <form onSubmit={handleAddThought} className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
                  add_comment
                </span>
                <input
                  type="text"
                  value={newThought}
                  onChange={(e) => setNewThought(e.target.value)}
                  placeholder="Jot down a sudden distraction and keep coding..."
                  className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-xl text-xs sm:text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all border border-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface text-xs font-semibold transition-colors"
              >
                Dump
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT PANEL: Ambient Soundscapes & Environment Shields (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          {/* Binaural & Ambient Sound Generator */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs flex flex-col gap-space-md border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">headphones</span>
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-on-surface">Ambient Soundscapes</h2>
                  <span className="text-xs text-on-surface-variant">Cognitive auditory flow anchors</span>
                </div>
              </div>

              {/* Playing badge */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  isPlayingAudio
                    ? 'bg-secondary/15 text-secondary'
                    : 'bg-surface-container text-outline'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isPlayingAudio ? 'bg-secondary animate-ping' : 'bg-outline'
                  }`}
                ></span>
                <span>{isPlayingAudio ? 'PLAYING' : 'PAUSED'}</span>
              </div>
            </div>

            {/* Track List */}
            <div className="flex flex-col gap-2 mt-1">
              {AMBIENT_TRACKS.map((track) => {
                const isSelected = selectedTrackId === track.id;
                const isPlaying = isSelected && isPlayingAudio;

                return (
                  <button
                    key={track.id}
                    onClick={() => toggleAmbientAudio(track.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all border ${
                      isSelected
                        ? 'bg-surface-container text-on-surface border-secondary/30 shadow-xs'
                        : 'bg-surface hover:bg-surface-container-low text-on-surface border-surface-container-low'
                    }`}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`material-symbols-outlined text-[22px] ${
                          isSelected ? track.activeColor : 'text-outline'
                        }`}
                      >
                        {track.icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm font-semibold">{track.name}</span>
                        <span className="text-[11px] text-on-surface-variant">{track.desc}</span>
                      </div>
                    </div>

                    {isPlaying ? (
                      <div className="flex items-end gap-1 h-5 shrink-0 ml-2">
                        <span className="w-1 bg-secondary rounded-full h-3 animate-pulse"></span>
                        <span className="w-1 bg-secondary rounded-full h-5 animate-pulse" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1 bg-secondary rounded-full h-2 animate-pulse" style={{ animationDelay: '300ms' }}></span>
                        <span className="w-1 bg-secondary rounded-full h-4 animate-pulse" style={{ animationDelay: '450ms' }}></span>
                      </div>
                    ) : (
                      <span className="material-symbols-outlined text-outline text-[18px] shrink-0 ml-2">
                        play_arrow
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 pt-1 border-t border-surface-container-low">
              <button
                onClick={() => setVolume((prev) => (prev > 0 ? 0 : 65))}
                className="p-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-variant transition-colors"
                title="Mute / Unmute"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {volume === 0 ? 'volume_off' : 'volume_up'}
                </span>
              </button>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-secondary"
                />
                <span className="font-mono text-xs text-outline font-semibold w-8 text-right">
                  {volume}%
                </span>
              </div>
            </div>
          </div>

          {/* Automation & Shields */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xs flex flex-col gap-space-md border border-surface-container">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">shield</span>
              </span>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-on-surface">Automation & Shields</h2>
                <span className="text-xs text-on-surface-variant">Intelligent study environment configurations</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-surface-container-low">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">Auto-start Breaks</span>
                  <span className="text-[11px] text-on-surface-variant">Switch directly to 5-min rest on completion</span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                />
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-surface-container-low">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">Auto-start Pomodoros</span>
                  <span className="text-[11px] text-on-surface-variant">Resume 25m sprint automatically after breaks</span>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                />
              </div>

              {/* Toggle 3: Shield */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-primary-fixed/30 shadow-xs border border-primary/20">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">notifications_off</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-primary-fixed-variant">Block Tab Distractions</span>
                    <span className="text-[11px] text-primary">Active browser shield: 12 social tabs silenced</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Neuroscience Break Insights Callout */}
          <div className="p-space-md rounded-2xl bg-gradient-to-br from-surface-container to-surface-variant/40 flex items-start gap-3 shadow-xs border border-surface-container">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">lightbulb</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs uppercase text-secondary font-bold tracking-wider">Neuroscience Insight</span>
              <p className="text-xs text-on-surface mt-1 leading-relaxed">
                Completed <span className="font-bold text-primary">5 Pomodoros today</span>! Taking a brisk 5-minute walk without your phone boosts hippocampus memory consolidation by <span className="font-bold text-secondary font-mono">22%</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
