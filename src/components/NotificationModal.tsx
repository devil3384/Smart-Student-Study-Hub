import React from 'react';
import { NavTab } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Past Due Submission Alert',
      desc: 'CS301 AVL Tree Self-Balancing Rotations is 1 day overdue. Submit late or request extension.',
      time: '12m ago',
      type: 'urgent',
      icon: 'warning',
      tab: 'tasks' as NavTab
    },
    {
      id: '2',
      title: 'Active Study Session Starting',
      desc: 'MATH240 Probability & Statistics in Science Hall Room 304 started at 03:30 PM.',
      time: '25m ago',
      type: 'info',
      icon: 'schedule',
      tab: 'planner' as NavTab
    },
    {
      id: '3',
      title: 'AI Pacing Tip Available',
      desc: 'You are ahead of schedule on Python. Shift 1 hour on Friday to Data Structures for 100% exam readiness.',
      time: '1h ago',
      type: 'ai',
      icon: 'auto_awesome',
      tab: 'analytics' as NavTab
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4 sm:pr-8 bg-black/20 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-surface-container-lowest shadow-2xl overflow-hidden border border-surface-container p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">notifications</span>
            <span className="font-bold text-sm text-on-surface">Notifications</span>
            <span className="px-1.5 py-0.2 rounded-full bg-error text-on-error font-bold text-[10px]">
              3 New
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onNavigate(n.tab);
                onClose();
              }}
              className="p-3 rounded-xl bg-surface-container-low/70 hover:bg-surface-container-low cursor-pointer transition-colors flex items-start gap-2.5"
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  n.type === 'urgent'
                    ? 'bg-error-container text-error'
                    : n.type === 'ai'
                    ? 'bg-tertiary-fixed text-tertiary'
                    : 'bg-primary-fixed text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{n.icon}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-on-surface truncate">{n.title}</span>
                  <span className="text-[10px] text-outline shrink-0">{n.time}</span>
                </div>
                <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-1 flex items-center justify-between border-t border-surface-container-low text-xs">
          <button
            onClick={onClose}
            className="text-primary hover:underline font-semibold"
          >
            Mark all read
          </button>
          <span className="text-[11px] text-outline">Spring 2025</span>
        </div>
      </div>
    </div>
  );
};
