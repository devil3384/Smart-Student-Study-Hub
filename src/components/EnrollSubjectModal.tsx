import React, { useState } from 'react';
import { SubjectModule } from '../types';

interface EnrollSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnrollSubject: (subject: SubjectModule) => void;
}

export const EnrollSubjectModal: React.FC<EnrollSubjectModalProps> = ({
  isOpen,
  onClose,
  onEnrollSubject
}) => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [credits, setCredits] = useState('3.0');
  const [schedule, setSchedule] = useState('Tue/Thu 10:00 AM');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) return;

    const newSubject: SubjectModule = {
      code: code.trim().toUpperCase(),
      title: title.trim(),
      credits: parseFloat(credits) || 3.0,
      colorAccent: 'primary',
      masteryPercentage: 15,
      instructor: instructor || 'Faculty Department Chair',
      schedule: schedule || 'Mon/Wed 11:00 AM',
      activeSyllabusBlock: 'Foundations & Course Orientation (Module 1)',
      completedTopics: 4,
      totalTopics: 36,
      stats: {
        assignments: '0/6',
        lectures: 2,
        quizzesOrNotebooks: 1
      },
      nextMilestone: {
        title: 'Orientation Syllabus Quiz',
        dueIn: 'in 5 days',
        priorityBadge: 'Upcoming'
      },
      quickLinks: [
        { label: 'Syllabus PDF', icon: 'description', href: '#' },
        { label: 'Course Notes', icon: 'article', href: '#' }
      ]
    };

    onEnrollSubject(newSubject);
    setCode('');
    setTitle('');
    setInstructor('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-6 sm:p-space-xl shadow-2xl flex flex-col gap-space-md border border-surface-container">
        <div className="flex items-center justify-between pb-1 border-b border-surface-container-low">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-xs">
              <span className="material-symbols-outlined text-[22px]">add_circle</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-on-surface">Enroll in New Subject</h3>
              <p className="text-xs text-on-surface-variant">Configure syllabus tracking and credit hours.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-on-surface">Course Code *</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. CS410 or ENG201"
              className="bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface placeholder:text-outline text-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 border border-transparent shadow-xs"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-on-surface">Subject Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Distributed Computing & Cloud Infrastructure"
              className="bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface placeholder:text-outline text-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 border border-transparent shadow-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface">Instructor Name</label>
              <input
                type="text"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                placeholder="Dr. Alan Doe"
                className="bg-surface-container-low px-3.5 py-2 rounded-xl text-on-surface placeholder:text-outline text-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 border border-transparent shadow-xs"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface">Credits</label>
              <input
                type="number"
                min="1"
                max="6"
                step="0.5"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                className="bg-surface-container-low px-3.5 py-2 rounded-xl text-on-surface text-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 border border-transparent shadow-xs"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-on-surface">Weekly Schedule</label>
            <input
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              placeholder="e.g. Mon/Wed 10:00 AM"
              className="bg-surface-container-low px-3.5 py-2 rounded-xl text-on-surface placeholder:text-outline text-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 border border-transparent shadow-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container-low">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-sm transition-colors shadow-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-all shadow-sm active:scale-98"
            >
              Save & Generate Syllabus Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
