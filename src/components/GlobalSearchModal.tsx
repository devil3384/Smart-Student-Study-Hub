import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // handled at App level
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchableItems = [
    { type: 'Task', tab: 'tasks' as NavTab, title: 'Red-Black Tree Visualizer Project', tag: 'CS301 High Priority' },
    { type: 'Task', tab: 'tasks' as NavTab, title: 'PostgreSQL Indexing Benchmark Lab Report', tag: 'CS315 Lab' },
    { type: 'Session', tab: 'planner' as NavTab, title: 'Statistics MATH240 Bayes & Distributions', tag: 'Today Active 15:30' },
    { type: 'Subject', tab: 'subjects' as NavTab, title: 'CS301 Advanced Data Structures & Algorithms', tag: '4.0 Credits • 82% Mastery' },
    { type: 'Subject', tab: 'subjects' as NavTab, title: 'CS320 Python for Data Science & Machine Learning', tag: '3.0 Credits' },
    { type: 'Subject', tab: 'subjects' as NavTab, title: 'CS315 Database Management Systems (DBMS)', tag: '4.0 Credits' },
    { type: 'Document', tab: 'subjects' as NavTab, title: 'Red-Black_Trees_Rotations_Notes.pdf', tag: 'CS301 Note' },
    { type: 'Document', tab: 'subjects' as NavTab, title: 'Pandas_Aggregation_Cookbook.ipynb', tag: 'CS320 Jupyter Lab' },
    { type: 'Focus', tab: 'focus' as NavTab, title: 'Pomodoro Focus Session (25 min)', tag: 'Cognitive Workspace' },
    { type: 'Analytics', tab: 'analytics' as NavTab, title: 'Predicted Term GPA & Syllabus Mastery', tag: '3.82 GPA Estimate' }
  ];

  const filtered = searchableItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.tag.toLowerCase().includes(query.toLowerCase()) ||
    item.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-inverse-surface/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-surface-container-lowest shadow-2xl overflow-hidden border border-surface-container flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-container-low bg-surface-container-lowest">
          <span className="material-symbols-outlined text-[22px] text-primary">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subjects, notes, upcoming assignments, or timers..."
            className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono text-[11px] font-semibold">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 flex flex-col gap-1 divide-y divide-surface-container-low/40">
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  onNavigate(item.tab);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-surface-container text-on-surface-variant shrink-0">
                    {item.type}
                  </span>
                  <span className="text-sm font-medium text-on-surface truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </span>
                </div>
                <span className="text-xs text-outline shrink-0 ml-2">{item.tag}</span>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-outline text-sm">
              No matching academic resources found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-surface-container-low/60 border-t border-surface-container-low flex items-center justify-between text-[11px] text-outline">
          <div className="flex items-center gap-3">
            <span><strong>↑↓</strong> to navigate</span>
            <span><strong>Enter</strong> to open</span>
          </div>
          <span>StudyFlow Search</span>
        </div>
      </div>
    </div>
  );
};
