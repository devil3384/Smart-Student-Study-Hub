/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavTab, StudySession, TaskItem, SubjectModule } from './types';
import { INITIAL_STUDY_SESSIONS, INITIAL_TASKS, INITIAL_SUBJECTS } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ScheduleSessionModal } from './components/ScheduleSessionModal';
import { NewTaskModal } from './components/NewTaskModal';
import { EnrollSubjectModal } from './components/EnrollSubjectModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { NotificationModal } from './components/NotificationModal';
import { AiAssistantModal } from './components/AiAssistantModal';

import { DashboardPage } from './pages/DashboardPage';
import { StudyPlannerPage } from './pages/StudyPlannerPage';
import { TasksPage } from './pages/TasksPage';
import { SubjectsPage } from './pages/SubjectsPage';
import { FocusTimerPage } from './pages/FocusTimerPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  // Navigation State with hash sync
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [semester, setSemester] = useState('spring-2025');

  // Shared Data States
  const [sessions, setSessions] = useState<StudySession[]>(INITIAL_STUDY_SESSIONS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [subjects, setSubjects] = useState<SubjectModule[]>(INITIAL_SUBJECTS);

  // Global Pomodoro State (synced across sidebar & focus timer)
  const [pomodoroSeconds, setPomodoroSeconds] = useState(1458); // 24m 18s matching mockups
  const [totalDurationSeconds, setTotalDurationSeconds] = useState(1500);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [currentTaskFocus, setCurrentTaskFocus] = useState(
    'CS301: Implement AVL Tree Self-Balancing Rotations'
  );

  // Modal Visibility States
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  // Sync hash with currentTab on mount and on popstate
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validTabs: NavTab[] = [
        'dashboard',
        'planner',
        'tasks',
        'subjects',
        'focus',
        'analytics',
        'settings'
      ];
      if (validTabs.includes(hash as NavTab)) {
        setCurrentTab(hash as NavTab);
      }
    };

    syncFromHash();
    window.addEventListener('popstate', syncFromHash);
    return () => window.removeEventListener('popstate', syncFromHash);
  }, []);

  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    window.location.hash = `#/${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global Pomodoro countdown ticker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setPomodoroSeconds((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            setIsTimerRunning(false);
            showToast('Pomodoro cycle complete! Time for a 5-minute break.');
            return 0;
          }
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Pomodoro controls
  const handleToggleTimer = () => {
    setIsTimerRunning((prev) => !prev);
    showToast(isTimerRunning ? 'Pomodoro paused' : 'Pomodoro focus resumed');
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setPomodoroSeconds(totalDurationSeconds);
    showToast('Timer reset');
  };

  const handleAddFiveMinutes = () => {
    setPomodoroSeconds((prev) => prev + 300);
    setTotalDurationSeconds((prev) => prev + 300);
    showToast('+5 minutes added to focus session');
  };

  const handleSkipBreak = () => {
    setIsTimerRunning(false);
    setTotalDurationSeconds(300);
    setPomodoroSeconds(300);
    showToast('Switched to 5-minute break');
  };

  const handleSelectDuration = (seconds: number, label: string) => {
    setTotalDurationSeconds(seconds);
    setPomodoroSeconds(seconds);
    setIsTimerRunning(true);
    showToast(`Timer mode: ${label}`);
  };

  const handleStartFocusOnTask = (taskName?: string) => {
    if (taskName) {
      setCurrentTaskFocus(taskName);
    }
    handleSelectTab('focus');
    setIsTimerRunning(true);
    showToast(`Focus sprint activated for: ${taskName || currentTaskFocus}`);
  };

  // Task check toggle
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = !t.completed;
          showToast(updated ? `Marked "${t.title}" as completed!` : `Moved "${t.title}" back to active.`);
          return { ...t, completed: updated };
        }
        return t;
      })
    );
  };

  // Create new task
  const handleSaveTask = (taskData: Partial<TaskItem>) => {
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: taskData.title || 'New Academic Task',
      subject: taskData.subject || 'CS301',
      priority: taskData.priority || 'medium',
      type: taskData.type || 'Assignment',
      dueDate: taskData.dueDate || new Date().toISOString(),
      dueLabel: taskData.dueLabel || 'Due Soon',
      estHours: taskData.estHours || 2.0,
      description: taskData.description || '',
      completed: false,
      subtasksDone: 0,
      subtasksTotal: 3
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast(`Task "${newTask.title}" added to academic workload!`);
  };

  // Save new study session
  const handleSaveSession = (sessionData: Partial<StudySession>) => {
    const newSession: StudySession = {
      id: `session-${Date.now()}`,
      day: sessionData.day || 'Thu',
      dayNumber: sessionData.dayNumber || 20,
      startTime: sessionData.startTime || '14:00',
      endTime: sessionData.endTime || '16:00',
      title: sessionData.title || 'New Study Session',
      subtitle: sessionData.subtitle || 'Study Block',
      subjectCode: sessionData.subjectCode || 'CS301',
      subjectName: sessionData.subjectName || 'Academic Course',
      type: sessionData.type || 'Deep Work Focus',
      location: sessionData.location || 'Library Quiet Pod',
      priority: sessionData.priority || 'med',
      completed: false,
      colorTheme: sessionData.colorTheme || 'primary',
      description: sessionData.description || 'Targeted deep study and milestone progress.'
    };
    setSessions((prev) => [...prev, newSession]);
    showToast(`Session "${newSession.title}" added to timetable!`);
  };

  // Enroll new subject
  const handleEnrollSubject = (newSubject: SubjectModule) => {
    setSubjects((prev) => [newSubject, ...prev]);
    showToast(`Enrolled in ${newSubject.code}: ${newSubject.title}!`);
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        pomodoroSeconds={pomodoroSeconds}
        isTimerRunning={isTimerRunning}
        onToggleTimer={handleToggleTimer}
        onOpenAi={() => setIsAiOpen(true)}
        onOpenSchedule={() => setIsScheduleOpen(true)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="pl-0 lg:pl-64 min-h-screen flex flex-col">
        {/* Global Fixed Header */}
        <Header
          onOpenMobileMenu={() => setIsMobileOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenSchedule={() => setIsScheduleOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSettings={() => handleSelectTab('settings')}
          notificationCount={3}
          semester={semester}
          onSemesterChange={(s) => {
            setSemester(s);
            showToast(`Active term switched to: ${s}`);
          }}
        />

        {/* Dynamic Route Workspace */}
        <main className="w-full pt-20 px-4 sm:px-space-xl py-space-lg flex-1">
          {currentTab === 'dashboard' && (
            <DashboardPage
              onNavigate={handleSelectTab}
              onOpenSchedule={() => setIsScheduleOpen(true)}
              onOpenNewTask={() => setIsNewTaskOpen(true)}
              onStartFocus={handleStartFocusOnTask}
              onOpenAi={() => setIsAiOpen(true)}
              tasks={tasks}
              onToggleTask={handleToggleTask}
              showToast={showToast}
            />
          )}

          {currentTab === 'planner' && (
            <StudyPlannerPage
              sessions={sessions}
              onOpenSchedule={() => setIsScheduleOpen(true)}
              onStartFocus={handleStartFocusOnTask}
              onNavigate={handleSelectTab}
              showToast={showToast}
            />
          )}

          {currentTab === 'tasks' && (
            <TasksPage
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onOpenNewTask={() => setIsNewTaskOpen(true)}
              onStartFocus={handleStartFocusOnTask}
              onNavigate={handleSelectTab}
              showToast={showToast}
            />
          )}

          {currentTab === 'subjects' && (
            <SubjectsPage
              subjects={subjects}
              onOpenEnroll={() => setIsEnrollOpen(true)}
              onNavigate={handleSelectTab}
              showToast={showToast}
            />
          )}

          {currentTab === 'focus' && (
            <FocusTimerPage
              pomodoroSeconds={pomodoroSeconds}
              totalDurationSeconds={totalDurationSeconds}
              isTimerRunning={isTimerRunning}
              onToggleTimer={handleToggleTimer}
              onResetTimer={handleResetTimer}
              onAddFiveMinutes={handleAddFiveMinutes}
              onSkipBreak={handleSkipBreak}
              onSelectDuration={handleSelectDuration}
              currentTaskFocus={currentTaskFocus}
              showToast={showToast}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsPage
              onNavigate={handleSelectTab}
              onOpenSchedule={() => setIsScheduleOpen(true)}
              onOpenAi={() => setIsAiOpen(true)}
              showToast={showToast}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsPage showToast={showToast} />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <ScheduleSessionModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onSaveSession={handleSaveSession}
      />

      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onSaveTask={handleSaveTask}
      />

      <EnrollSubjectModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        onEnrollSubject={handleEnrollSubject}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleSelectTab}
      />

      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={handleSelectTab}
      />

      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
      />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-surface-variant/20 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
            check_circle
          </span>
          <span className="text-xs sm:text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}
