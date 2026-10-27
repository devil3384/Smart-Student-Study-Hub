import React, { useState } from 'react';
import { TaskItem } from '../types';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTask: (task: Partial<TaskItem>) => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  isOpen,
  onClose,
  onSaveTask
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('CS301');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [estHours, setEstHours] = useState('2.5');
  const [type, setType] = useState<TaskItem['type']>('Coding Project');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSaveTask({
      title,
      subject,
      priority,
      dueDate: dueDate || new Date(Date.now() + 86400000 * 2).toISOString(),
      dueLabel: 'Due in 2 days',
      estHours: parseFloat(estHours) || 2.0,
      type,
      description: notes || 'Detailed assignment guidelines and rubric requirements.',
      completed: false,
      subtasksDone: 0,
      subtasksTotal: 3
    });

    setTitle('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-xs">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh] border border-surface-container">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">add_task</span>
            </div>
            <h3 className="font-bold text-base sm:text-lg text-on-surface">Create New Academic Task</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-on-surface">Task Title / Assignment Name *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement Dijkstra Shortest Path Algorithm"
              className="px-3.5 py-2.5 bg-surface-container-low rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface">Academic Course / Subject *</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="px-3 py-2.5 bg-surface-container-low rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-transparent cursor-pointer"
              >
                <option value="CS301">CS301: Data Structures</option>
                <option value="CS315">CS315: DBMS Engines</option>
                <option value="CS320">CS320: Python & Data Science</option>
                <option value="MATH240">MATH240: Statistics</option>
                <option value="MATH210">MATH210: Discrete Math</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface">Priority Level *</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="px-3 py-2.5 bg-surface-container-low rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-transparent cursor-pointer"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface">Submission Deadline *</label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-3 py-2 bg-surface-container-low rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-transparent"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-on-surface">Estimated Study Hours</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={estHours}
                onChange={(e) => setEstHours(e.target.value)}
                placeholder="e.g. 2.5"
                className="px-3 py-2 bg-surface-container-low rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-on-surface">Category / Workload Type</label>
            <div className="flex flex-wrap gap-2">
              {(['Coding Project', 'Lab', 'Homework', 'Reading', 'Assignment'] as TaskItem['type'][]).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setType(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    type === cat
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-on-surface">Assignment Rubric & AI Notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste grading rubric links or key implementation requirements..."
              className="px-3 py-2 bg-surface-container-low rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-transparent resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-surface-container-low">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-on-surface-variant hover:text-on-surface font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm transition-all shadow-sm active:scale-98"
            >
              Save & Track Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
