import React, { useState } from 'react';
import { TaskItem, NavTab } from '../types';

interface TasksPageProps {
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
  onOpenNewTask: () => void;
  onStartFocus: (taskName?: string) => void;
  onNavigate: (tab: NavTab) => void;
  showToast: (msg: string) => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({
  tasks,
  onToggleTask,
  onOpenNewTask,
  onStartFocus,
  showToast
}) => {
  const [viewType, setViewType] = useState<'list' | 'kanban'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(true);

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || task.subject === selectedSubject;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    const matchesType = selectedType === 'all' || task.type === selectedType;

    return matchesSearch && matchesSubject && matchesPriority && matchesType;
  });

  const overdueTasks = filteredTasks.filter((t) => t.isOverdue && !t.completed);
  const upcomingTasks = filteredTasks.filter((t) => !t.isOverdue && !t.completed);
  const completedTasks = filteredTasks.filter((t) => t.completed);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('all');
    setSelectedPriority('all');
    setSelectedType('all');
    showToast('Filters cleared');
  };

  const handleBulkAction = (action: string) => {
    setIsBulkOpen(false);
    showToast(`Bulk action applied: ${action}`);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg pb-space-xl">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-2xl shadow-xs border border-surface-container">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-primary font-bold">
              Workspace / Academic Modules
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
            <span className="text-xs text-on-surface-variant font-medium">Spring 2025</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
            Tasks & Assignments
          </h1>
          <p className="text-sm text-on-surface-variant">
            Track problem sets, coding assignments, lab submissions, and reading tasks with algorithmic focus.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-surface-container-low p-1 rounded-xl border border-surface-container">
            <button
              onClick={() => setViewType('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewType === 'list'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewType('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewType === 'kanban'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">view_kanban</span>
              <span>Board View</span>
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsBulkOpen(!isBulkOpen)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs sm:text-sm transition-all border border-surface-container"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-outline">checklist_rtl</span>
              <span>Bulk Actions</span>
              <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
            </button>

            {isBulkOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest rounded-xl shadow-xl py-2 z-30 border border-surface-container animate-in fade-in duration-150">
                <button
                  onClick={() => handleBulkAction('Mark All Completed')}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-outline">done_all</span> Mark as Completed
                </button>
                <button
                  onClick={() => handleBulkAction('Reschedule Week')}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-outline">calendar_today</span> Reschedule Week
                </button>
                <button
                  onClick={() => handleBulkAction('Delete Completed')}
                  className="w-full text-left px-4 py-2 text-xs font-medium text-error hover:bg-error-container/30 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-error">delete</span> Delete Selected
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onOpenNewTask}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-98"
          >
            <span className="material-symbols-outlined text-[20px]">add_task</span>
            <span>Create New Task</span>
          </button>
        </div>
      </div>

      {/* Key Academic Workload Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {/* Total Workload */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-xs flex items-center justify-between border border-surface-container">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">Total Workload</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-bold text-on-surface">26</span>
              <span className="text-xs text-outline">items enrolled</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[24px]">assignment</span>
          </div>
        </div>

        {/* Overdue Alert Badge */}
        <div className="bg-error-container/30 p-space-md rounded-2xl shadow-xs flex items-center justify-between border border-error/20">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
              <span className="text-[11px] uppercase tracking-wider text-on-error-container font-bold">Overdue Urgency</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-bold text-error">3</span>
              <span className="text-xs text-on-error-container font-medium">requires immediate review</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center text-error">
            <span className="material-symbols-outlined text-[24px]">warning</span>
          </div>
        </div>

        {/* Pending / Due Soon */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-xs flex items-center justify-between border border-surface-container">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-secondary font-semibold">Due This Week</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-bold text-on-surface">9</span>
              <span className="text-xs text-secondary font-medium">pending submissions</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[24px]">schedule</span>
          </div>
        </div>

        {/* Completed & Velocity */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-xs flex items-center justify-between border border-surface-container">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-tertiary font-semibold">Sprint Velocity</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-bold text-on-surface">14</span>
              <span className="text-xs text-tertiary font-medium">solved (+8% vs LW)</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-tertiary-fixed/60 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[24px]">check_circle</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between border border-surface-container">
        <div className="relative w-full md:w-80 lg:w-96">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[20px]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title, tag, or description..."
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low rounded-xl text-xs sm:text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 transition-all border border-transparent"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Subject Filter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface border border-surface-container">
            <span className="material-symbols-outlined text-[18px] text-outline">category</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-transparent text-xs font-semibold text-on-surface focus:outline-none cursor-pointer"
            >
              <option value="all">All Subjects</option>
              <option value="CS301">CS301: Data Structures</option>
              <option value="CS315">CS315: DBMS Engines</option>
              <option value="CS320">CS320: Python & Data Analysis</option>
              <option value="MATH240">MATH240: Statistics</option>
              <option value="MATH210">MATH210: Discrete Math</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface border border-surface-container">
            <span className="material-symbols-outlined text-[18px] text-outline">flag</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-transparent text-xs font-semibold text-on-surface focus:outline-none cursor-pointer"
            >
              <option value="all">Priority: All</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface border border-surface-container">
            <span className="material-symbols-outlined text-[18px] text-outline">filter_list</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-transparent text-xs font-semibold text-on-surface focus:outline-none cursor-pointer"
            >
              <option value="all">Type: All</option>
              <option value="Assignment">Assignment</option>
              <option value="Coding Project">Coding Project</option>
              <option value="Lab">Lab</option>
              <option value="Reading">Reading</option>
              <option value="Homework">Homework</option>
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="p-2 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors"
            title="Reset Filters"
          >
            <span className="material-symbols-outlined text-[20px]">restart_alt</span>
          </button>
        </div>
      </div>

      {/* Main Views: List View or Kanban Board View */}
      {viewType === 'list' ? (
        <div className="flex flex-col gap-space-xl">
          {/* 1. OVERDUE SECTION (Targeted Red Alert) */}
          {overdueTasks.length > 0 && (
            <section className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between bg-error-container/25 px-space-md py-space-sm rounded-xl border border-error/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-error">
                    <span className="material-symbols-outlined text-[20px]">error</span>
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base text-on-surface font-bold">Past Due Critical Submissions</h2>
                    <p className="text-xs text-error font-medium">Late submission penalty active. Automated extension request ready.</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-error text-on-error text-xs font-bold uppercase tracking-wider">
                  {overdueTasks.length} Critical
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {overdueTasks.map((task) => (
                  <div
                    key={task.id}
                    className="task-item bg-surface-container-lowest p-space-md rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-surface-container"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className="mt-0.5 w-5 h-5 rounded-md bg-surface-container-low hover:bg-primary/20 flex items-center justify-center text-transparent hover:text-primary transition-colors border border-outline-variant"
                      >
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      </button>

                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-xs bg-primary-fixed text-on-primary-fixed-variant font-bold">
                            {task.subject}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs bg-error-container text-error font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">priority_high</span> High
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs bg-surface-container-low text-on-surface-variant font-medium">
                            {task.type}
                          </span>
                          <span className="text-xs text-error font-bold">{task.overdueText || 'Overdue'}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-on-surface">{task.title}</h3>
                        <p className="text-xs text-outline">{task.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 pl-8 md:pl-0">
                      <div className="flex flex-col md:items-end">
                        <span className="text-xs text-error font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">event_busy</span> {task.dueLabel}
                        </span>
                        <span className="text-xs text-outline font-mono">Est: {task.estHours} hrs remaining</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => showToast(`Extension requested for ${task.subject}`)}
                          className="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-on-surface transition-colors"
                        >
                          Request Extension
                        </button>
                        <button
                          onClick={() => showToast(`Opening late upload portal for ${task.title}...`)}
                          className="px-3 py-1.5 rounded-xl bg-error hover:bg-on-error-container text-on-error text-xs font-semibold transition-colors"
                        >
                          Submit Late
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 2. PENDING / DUE SOON SECTION (Primary Focus) */}
          <section className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">pending_actions</span>
                <h2 className="text-lg font-bold text-on-surface">Upcoming Academic Deliverables</h2>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary text-xs font-bold font-mono">
                  {upcomingTasks.length} Active
                </span>
              </div>
              <span className="text-xs text-outline font-medium">Sorted by: Deadline urgency</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="task-item bg-surface-container-lowest p-space-md rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-space-md border border-surface-container"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onToggleTask(task.id)}
                      className="mt-1 w-5 h-5 rounded-md bg-surface-container-low hover:bg-primary/20 flex items-center justify-center text-transparent hover:text-primary transition-colors border border-outline-variant"
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </button>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-primary-fixed text-on-primary-fixed-variant font-bold">
                          {task.subject}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            task.priority === 'high'
                              ? 'bg-error-container text-error'
                              : 'bg-surface-container-high text-on-surface'
                          }`}
                        >
                          {task.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-surface-container-low text-on-surface-variant font-medium">
                          {task.type}
                        </span>
                        <span className="text-xs text-secondary font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">timer</span> {task.dueLabel}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-on-surface">{task.title}</h3>
                      <p className="text-xs text-on-surface-variant">{task.description}</p>

                      {/* Subtask progress bar if defined */}
                      {task.subtasksTotal && task.subtasksTotal > 0 && (
                        <div className="flex items-center gap-3 mt-1">
                          <div className="w-44 h-2 rounded-full bg-surface-container-low overflow-hidden">
                            <div
                              className="bg-primary h-full rounded-full transition-all"
                              style={{ width: `${(task.subtasksDone! / task.subtasksTotal) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold text-on-surface">
                            {task.subtasksDone} of {task.subtasksTotal} subtasks done
                          </span>
                          <span className="text-xs text-outline font-mono">· Est: {task.estHours} hrs left</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end gap-3 pl-8 lg:pl-0">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onStartFocus(task.title)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-semibold text-xs transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                        <span>Focus Sprint</span>
                      </button>
                      <button
                        onClick={() => showToast(`Task options for: ${task.title}`)}
                        className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low"
                      >
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Motivational Completed Today State Card */}
          <div className="bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-low p-space-lg rounded-2xl flex flex-col md:flex-row items-center justify-between gap-space-md shadow-xs border border-surface-container">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs shrink-0">
                <span className="material-symbols-outlined text-[32px]">military_tech</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-on-surface">3 tasks completed today!</span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">
                    Velocity +14%
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                  You're completely on track for your weekly goal. Keep the study momentum going into the evening sprint.
                </p>
              </div>
            </div>
            <button
              onClick={() => onStartFocus('Quick Evening Sprint')}
              className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs sm:text-sm hover:bg-primary-container transition-all flex items-center gap-2 shrink-0 shadow-sm active:scale-98"
            >
              <span className="material-symbols-outlined text-[18px]">timer</span>
              <span>Start 25m Pomodoro</span>
            </button>
          </div>

          {/* 3. COMPLETED SECTION (Collapsible & Muted) */}
          <section className="flex flex-col gap-space-md">
            <button
              onClick={() => setIsArchiveOpen(!isArchiveOpen)}
              className="flex items-center justify-between p-space-md rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors w-full text-left border border-surface-container"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[22px]">check_circle</span>
                <h2 className="text-sm sm:text-base font-bold text-on-surface">Completed Submissions & Archives</h2>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface text-xs font-semibold font-mono">
                  {completedTasks.length} total
                </span>
              </div>
              <div className="flex items-center gap-2 text-outline text-xs">
                <span>{isArchiveOpen ? 'Hide archive' : 'Show archive'}</span>
                <span className={`material-symbols-outlined text-[20px] transition-transform ${isArchiveOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </div>
            </button>

            {isArchiveOpen && (
              <div className="flex flex-col gap-2">
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-surface-container-lowest/80 p-space-md rounded-2xl flex items-center justify-between gap-3 opacity-80 hover:opacity-100 transition-opacity border border-surface-container"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className="w-5 h-5 rounded-md bg-primary text-on-primary flex items-center justify-center"
                        title="Mark uncompleted"
                      >
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      </button>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="line-through text-sm font-semibold text-on-surface-variant">
                            {task.title}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-bold">
                            {task.subject}
                          </span>
                        </div>
                        <span className="text-xs text-outline">{task.description}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-primary text-xs font-bold font-mono shrink-0">
                      {task.grade || 'Submitted'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      ) : (
        /* KANBAN BOARD CONTAINER */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg w-full">
          {/* Backlog Column */}
          <div className="flex flex-col gap-space-md bg-surface-container-low p-space-md rounded-2xl border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-outline"></span>
                <span className="font-bold text-sm text-on-surface">Backlog / Next</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface text-xs font-bold">
                2
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs flex flex-col gap-2 border border-surface-container">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-container-high self-start text-on-surface">
                  MATH210
                </span>
                <h4 className="font-semibold text-sm text-on-surface">Discrete Math Quiz 2 Flashcards</h4>
                <span className="text-xs text-outline font-mono">Est: 1.0 hr</span>
              </div>
              <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs flex flex-col gap-2 border border-surface-container">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary-fixed self-start text-on-secondary-fixed">
                  CS315
                </span>
                <h4 className="font-semibold text-sm text-on-surface">Read Chapter 8: B-Trees</h4>
                <span className="text-xs text-outline">DDIA 34 pages</span>
              </div>
            </div>
          </div>

          {/* In Progress Column */}
          <div className="flex flex-col gap-space-md bg-surface-container-low p-space-md rounded-2xl border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
                <span className="font-bold text-sm text-on-surface">In Active Sprint</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold">
                {upcomingTasks.length}
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {upcomingTasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  onClick={() => onStartFocus(task.title)}
                  className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs flex flex-col gap-2 border border-surface-container hover:shadow-md cursor-pointer transition-all"
                >
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-fixed self-start text-on-primary-fixed-variant">
                    {task.subject}
                  </span>
                  <h4 className="font-semibold text-sm text-on-surface">{task.title}</h4>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: '70%' }}></div>
                  </div>
                  <span className="text-xs text-error font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">timer</span> {task.dueLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="flex flex-col gap-space-md bg-surface-container-low p-space-md rounded-2xl border border-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                <span className="font-bold text-sm text-on-surface">Delivered / Graded</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold">
                {completedTasks.length}
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-surface-container-lowest p-3.5 rounded-xl shadow-xs flex flex-col gap-2 opacity-90 border border-surface-container"
                >
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-fixed self-start text-on-primary-fixed-variant">
                    {task.subject}
                  </span>
                  <h4 className="font-semibold text-sm text-on-surface line-through">{task.title}</h4>
                  <span className="text-xs text-tertiary font-bold font-mono">
                    Score: {task.grade || 'Submitted'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
