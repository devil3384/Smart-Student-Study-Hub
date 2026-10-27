import React, { useState } from 'react';
import { StudySession } from '../types';

interface ScheduleSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSession: (session: Partial<StudySession>) => void;
}

export const ScheduleSessionModal: React.FC<ScheduleSessionModalProps> = ({
  isOpen,
  onClose,
  onSaveSession
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Data Structures & Algorithms');
  const [sessionType, setSessionType] = useState('Deep Work Focus');
  const [day, setDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'>('Thu');
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('16:00');
  const [priority, setPriority] = useState<'high' | 'med' | 'low'>('med');
  const [location, setLocation] = useState('Library 2nd Floor Quiet Zone');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let subjectCode = 'CS301';
    let colorTheme: StudySession['colorTheme'] = 'primary';
    if (subject.includes('Data Structures')) {
      subjectCode = 'CS301';
      colorTheme = 'tertiary';
    } else if (subject.includes('Python')) {
      subjectCode = 'CS320';
      colorTheme = 'primary';
    } else if (subject.includes('Database')) {
      subjectCode = 'CS315';
      colorTheme = 'secondary';
    } else if (subject.includes('Probability')) {
      subjectCode = 'MATH240';
      colorTheme = 'secondary';
    } else if (subject.includes('Discrete')) {
      subjectCode = 'MATH210';
      colorTheme = 'surface';
    }

    const dayNumberMap = {
      Mon: 17,
      Tue: 18,
      Wed: 19,
      Thu: 20,
      Fri: 21,
      Sat: 22,
      Sun: 23
    };

    onSaveSession({
      title,
      subtitle: sessionType,
      subjectCode,
      subjectName: subject,
      type: sessionType,
      day,
      dayNumber: dayNumberMap[day] || 20,
      startTime,
      endTime,
      priority,
      location,
      colorTheme
    });

    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-inverse-surface/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-all">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-space-xl flex flex-col gap-space-md border border-surface-container">
        {/* Header */}
        <div className="flex items-center justify-between pb-1 border-b border-surface-container-low">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[24px]">calendar_add_on</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface">Schedule Study Session</h3>
              <p className="text-xs text-on-surface-variant">Lock in a focused block on your weekly timetable.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-on-surface">Session Title & Topic *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Graph Traversal Algorithms & Dijkstra"
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest border border-transparent focus:border-primary/40 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent cursor-pointer"
              >
                <option>Data Structures & Algorithms</option>
                <option>Python Programming</option>
                <option>Database Management (DBMS)</option>
                <option>Probability & Statistics</option>
                <option>Discrete Mathematics</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface">Session Type</label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent cursor-pointer"
              >
                <option>Deep Work Focus</option>
                <option>Lecture & Note Synthesis</option>
                <option>Problem Set / Lab Assignment</option>
                <option>Group Revision / Peer Study</option>
                <option>Exam Mock Trial</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface">Day</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value as any)}
                className="w-full px-2.5 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent cursor-pointer"
              >
                <option value="Mon">Mon (Feb 17)</option>
                <option value="Tue">Tue (Feb 18)</option>
                <option value="Wed">Wed (Feb 19)</option>
                <option value="Thu">Thu (Feb 20)</option>
                <option value="Fri">Fri (Feb 21)</option>
                <option value="Sat">Sat (Feb 22)</option>
                <option value="Sun">Sun (Feb 23)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-2 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-2 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface">Priority</label>
              <div className="flex items-center gap-3 pt-1">
                <label className="flex items-center gap-1.5 text-xs text-on-surface font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="high"
                    checked={priority === 'high'}
                    onChange={() => setPriority('high')}
                    className="accent-primary"
                  />
                  High
                </label>
                <label className="flex items-center gap-1.5 text-xs text-on-surface font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="med"
                    checked={priority === 'med'}
                    onChange={() => setPriority('med')}
                    className="accent-primary"
                  />
                  Medium
                </label>
                <label className="flex items-center gap-1.5 text-xs text-on-surface font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value="low"
                    checked={priority === 'low'}
                    onChange={() => setPriority('low')}
                    className="accent-primary"
                  />
                  Low
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface">Location / Desk</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Library 2nd Floor Quiet Zone"
                className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container-low">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-variant text-on-surface font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-all shadow-sm active:scale-98"
            >
              Save Session Block
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
