import React, { useState } from 'react';
import { SubjectModule, NoteUpload, NavTab } from '../types';
import { RECENT_NOTE_UPLOADS } from '../data/mockData';

interface SubjectsPageProps {
  subjects: SubjectModule[];
  onOpenEnroll: () => void;
  onNavigate: (tab: NavTab) => void;
  showToast: (msg: string) => void;
}

export const SubjectsPage: React.FC<SubjectsPageProps> = ({
  subjects,
  onOpenEnroll,
  onNavigate,
  showToast
}) => {
  const [selectedTerm, setSelectedTerm] = useState('spring-2025');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewLayout, setViewLayout] = useState<'grid' | 'detailed'>('grid');
  const [recentNotes] = useState<NoteUpload[]>(RECENT_NOTE_UPLOADS);

  const filteredSubjects = subjects.filter(
    (s) =>
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (name: string) => {
    showToast(`Downloading: ${name}`);
  };

  const handlePreview = (name: string) => {
    showToast(`Opening preview modal for: ${name}`);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg pb-space-xl">
      {/* Header Section with Controls */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span>Curriculum Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">My Subjects</h1>
          <p className="text-sm text-on-surface-variant max-w-2xl mt-0.5">
            Academic course modules, syllabus progress, lecture notes, and study resources for Spring 2025.
          </p>
        </div>

        {/* Top Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Term Selector */}
          <div className="relative inline-flex items-center">
            <select
              value={selectedTerm}
              onChange={(e) => {
                setSelectedTerm(e.target.value);
                if (e.target.value === 'fall-2024') {
                  showToast('Viewing Fall 2024 Archived Semester (3.82 GPA)');
                }
              }}
              className="appearance-none bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs sm:text-sm pl-3.5 pr-8 py-2 rounded-xl cursor-pointer focus:outline-none transition-colors shadow-xs border border-surface-container"
            >
              <option value="spring-2025">Spring 2025 (Active)</option>
              <option value="fall-2024">Fall 2024 (Archived)</option>
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-2.5 text-on-surface-variant text-[18px]">
              expand_more
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative flex items-center min-w-[220px] flex-1 sm:flex-initial">
            <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">filter_list</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by code or title..."
              className="w-full bg-surface-container-low pl-9 pr-3 py-2 rounded-xl text-on-surface placeholder:text-outline text-xs sm:text-sm focus:outline-none focus:bg-surface-container-lowest transition-all shadow-xs border border-surface-container"
            />
          </div>

          {/* View Toggle */}
          <div className="inline-flex p-0.5 rounded-xl bg-surface-container-low shadow-xs border border-surface-container">
            <button
              onClick={() => setViewLayout('grid')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewLayout === 'grid'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">grid_view</span>
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewLayout('detailed')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewLayout === 'detailed'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">view_timeline</span>
              <span>Detailed</span>
            </button>
          </div>

          {/* Enroll New Subject Button */}
          <button
            onClick={onOpenEnroll}
            className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-98"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Enroll New Subject</span>
          </button>
        </div>
      </div>

      {/* Academic Telemetry Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="flex items-center gap-3 p-space-md rounded-2xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all border border-surface-container">
          <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[24px]">school</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">Total Workload</span>
            <span className="text-lg font-bold text-on-surface tracking-tight truncate">18.0 Credits</span>
            <span className="text-xs text-secondary font-medium">Full-Time STEM Status</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-space-md rounded-2xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all border border-surface-container">
          <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-tertiary shrink-0">
            <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">Target Term GPA</span>
            <span className="text-lg font-bold text-on-surface tracking-tight truncate">
              3.85 <span className="text-xs text-outline font-normal">/ 4.0</span>
            </span>
            <span className="text-xs text-primary font-semibold">Honors Dean's List Track</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-space-md rounded-2xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all border border-surface-container">
          <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[24px]">query_stats</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">Syllabus Mastery</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-on-surface tracking-tight">74%</span>
              <span className="text-xs text-secondary font-semibold">+6% this sprint</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-low rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: '74%' }}></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-space-md rounded-2xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all border border-surface-container">
          <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shrink-0">
            <span className="material-symbols-outlined text-[24px]">layers</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-outline font-semibold">Current Modules</span>
            <span className="text-lg font-bold text-on-surface tracking-tight truncate">5 Subjects</span>
            <span className="text-xs text-on-surface-variant font-medium">3 Core CS · 2 Applied Math</span>
          </div>
        </div>
      </div>

      {/* Subjects Dynamic Grid */}
      <div
        className={`gap-space-lg ${
          viewLayout === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
            : 'grid grid-cols-1'
        }`}
      >
        {filteredSubjects.map((sub) => {
          // Calculate circle dasharray for radial gauge
          const dash = `${sub.masteryPercentage}, 100`;

          return (
            <article
              key={sub.code}
              className="subject-card flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-space-lg shadow-xs hover:shadow-md transition-all relative overflow-hidden group border border-surface-container"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  sub.code === 'CS301'
                    ? 'bg-primary'
                    : sub.code === 'CS320'
                    ? 'bg-secondary-container'
                    : sub.code === 'CS315'
                    ? 'bg-secondary'
                    : sub.code === 'MATH240'
                    ? 'bg-secondary-fixed'
                    : 'bg-tertiary'
                }`}
              ></div>

              <div>
                {/* Header & Radial Progress */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary tracking-tight">{sub.code}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-surface-container text-on-primary-fixed-variant">
                        {sub.credits.toFixed(1)} Credits
                      </span>
                    </div>
                    <h2 className="text-base font-semibold text-on-surface mt-1 group-hover:text-primary transition-colors">
                      {sub.title}
                    </h2>
                  </div>

                  {/* Radial Progress Gauge */}
                  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-surface-container-low"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      ></path>
                      <path
                        className="text-primary transition-all duration-700"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray={dash}
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      ></path>
                    </svg>
                    <span className="absolute text-xs font-bold text-on-surface">{sub.masteryPercentage}%</span>
                  </div>
                </div>

                {/* Instructor & Schedule Details */}
                <div className="grid grid-cols-2 gap-2 text-on-surface-variant text-xs mb-3 py-2 px-3 rounded-xl bg-surface-container-low/70 border border-surface-container-low">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="material-symbols-outlined text-[16px] text-outline">badge</span>
                    <span className="truncate">{sub.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="material-symbols-outlined text-[16px] text-outline">schedule</span>
                    <span>{sub.schedule}</span>
                  </div>
                </div>

                {/* Active Syllabus Block */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="uppercase tracking-wider text-outline font-semibold">Active Syllabus Block</span>
                    <span className="text-primary font-bold">
                      {sub.completedTopics} / {sub.totalTopics} Topics
                    </span>
                  </div>
                  <p className="text-xs text-on-surface font-medium line-clamp-1">{sub.activeSyllabusBlock}</p>
                  <div className="w-full h-1.5 bg-surface-container rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(sub.completedTopics / sub.totalTopics) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-2 py-2 text-center rounded-xl bg-surface-container-lowest shadow-xs mb-3 border border-surface-container-low">
                  <div className="p-1">
                    <span className="block font-mono text-sm font-bold text-on-surface">
                      {sub.stats.assignments}
                    </span>
                    <span className="text-[11px] text-outline font-medium">Assignments</span>
                  </div>
                  <div className="p-1">
                    <span className="block font-mono text-sm font-bold text-on-surface">
                      {sub.stats.lectures}
                    </span>
                    <span className="text-[11px] text-outline font-medium">Lectures</span>
                  </div>
                  <div className="p-1">
                    <span className="block font-mono text-sm font-bold text-on-surface">
                      {sub.stats.quizzesOrNotebooks}
                    </span>
                    <span className="text-[11px] text-outline font-medium">
                      {sub.stats.extraLabel || 'Quizzes'}
                    </span>
                  </div>
                </div>

                {/* Next Milestone Banner */}
                <div
                  className={`flex items-center gap-2 p-2.5 rounded-xl mb-3 border ${
                    sub.nextMilestone.isUrgent
                      ? 'bg-error-container/40 text-on-error-container border-error/20'
                      : 'bg-surface-container-high text-on-surface border-surface-container'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      sub.nextMilestone.isUrgent ? 'text-error' : 'text-secondary'
                    }`}
                  >
                    {sub.nextMilestone.isUrgent ? 'event_upcoming' : 'pending_actions'}
                  </span>
                  <div className="flex-1 min-w-0 text-xs">
                    <span className="font-semibold">{sub.nextMilestone.title}</span>
                    <span className="text-on-surface-variant ml-1 font-mono">{sub.nextMilestone.dueIn}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shadow-xs ${
                      sub.nextMilestone.isUrgent
                        ? 'bg-surface-container-lowest text-error'
                        : 'bg-surface-container-lowest text-secondary'
                    }`}
                  >
                    {sub.nextMilestone.priorityBadge}
                  </span>
                </div>
              </div>

              {/* Quick Resource Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-surface-container-low">
                {sub.quickLinks.map((link, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => showToast(`Opening ${link.label} for ${sub.code}...`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">{link.icon}</span>
                    <span className="truncate">{link.label}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => showToast(`Opening course repository for ${sub.code}...`)}
                  className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors shadow-xs"
                  title="Open Course Vault"
                >
                  <span className="material-symbols-outlined text-[18px]">terminal</span>
                </button>
              </div>
            </article>
          );
        })}

        {/* Add Elective Placeholder Card */}
        <div
          onClick={onOpenEnroll}
          className="flex flex-col items-center justify-center p-space-lg rounded-2xl bg-surface-container-low/50 hover:bg-surface-container-low transition-all text-center group cursor-pointer shadow-xs border border-dashed border-outline-variant/60 min-h-[360px]"
        >
          <div className="w-14 h-14 rounded-full bg-surface-container-lowest group-hover:scale-105 flex items-center justify-center text-primary shadow-xs mb-3 transition-transform">
            <span className="material-symbols-outlined text-[28px]">add</span>
          </div>
          <h3 className="text-base font-semibold text-on-surface">Independent Research / Add Elective</h3>
          <p className="text-xs text-on-surface-variant max-w-xs mt-1">
            Configure syllabus tracking for extra honors credits or autonomous laboratory work.
          </p>
          <span className="mt-3 text-xs font-bold text-primary flex items-center gap-1 group-hover:underline">
            <span>Register Course Unit</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </span>
        </div>
      </div>

      {/* Bottom Split: Recent Notes & Study Uploads + Archive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg pt-1">
        {/* Left 2 Cols: Notes & Documents Table */}
        <div className="lg:col-span-2 flex flex-col p-space-lg rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">upload_file</span>
              <h3 className="text-base font-bold text-on-surface">Recent Course Notes & Study Uploads</h3>
            </div>
            <button
              onClick={() => showToast('Opening complete files repository (46 files)...')}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>View All Files (46)</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-outline uppercase text-[10px] font-bold border-b border-surface-container-low">
                  <th className="pb-2.5">Document Name</th>
                  <th className="pb-2.5">Subject</th>
                  <th className="pb-2.5">Format</th>
                  <th className="pb-2.5">Timestamp</th>
                  <th className="pb-2.5 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="text-on-surface divide-y divide-surface-container-low/60">
                {recentNotes.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-3 pr-2">
                      <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined ${doc.color} text-[20px]`}>
                          {doc.icon}
                        </span>
                        <span className="font-medium truncate max-w-xs">{doc.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container text-on-surface">
                        {doc.subject}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-on-surface-variant font-mono">{doc.format}</td>
                    <td className="py-3 px-2 text-on-surface-variant">{doc.timestamp}</td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handlePreview(doc.name)}
                          className="p-1.5 rounded-lg hover:bg-surface-container text-primary"
                          title="Preview Note"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button
                          onClick={() => handleDownload(doc.name)}
                          className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant"
                          title="Download"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Semester Archive Container & Empty State */}
        <div className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-outline text-[20px]">archive</span>
                <h3 className="text-base font-bold text-on-surface">Archived Courses</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-container-low text-outline">
                Spring 2025
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Subjects moved out of the active term view are stored with permanent syllabi and test scores.
            </p>

            {/* Clean Empty State Box */}
            <div className="flex flex-col items-center justify-center p-6 my-4 rounded-xl bg-surface-container-low/40 text-center border border-dashed border-outline-variant/60">
              <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-outline mb-2 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">folder_off</span>
              </div>
              <h4 className="text-sm font-semibold text-on-surface">No Archived Courses for Spring 2025</h4>
              <p className="text-xs text-on-surface-variant mt-1 max-w-xs">
                Courses from Fall 2024 are available in the semester archive repository.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => showToast('Switched to Fall 2024 Archive repository')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs sm:text-sm transition-colors shadow-xs border border-surface-container"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">history</span>
              <span>Explore Fall 2024 Archive</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
