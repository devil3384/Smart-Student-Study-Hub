export type NavTab = 
  | 'dashboard'
  | 'planner'
  | 'tasks'
  | 'subjects'
  | 'focus'
  | 'analytics'
  | 'settings';

export interface StudySession {
  id: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  dayNumber: number;
  startTime: string; // e.g. "09:00"
  endTime: string;   // e.g. "10:30"
  title: string;
  subtitle: string;
  subjectCode: string;
  subjectName: string;
  type: string;
  location: string;
  priority: 'high' | 'med' | 'low';
  completed?: boolean;
  isActiveNow?: boolean;
  colorTheme: 'tertiary' | 'primary' | 'secondary' | 'error' | 'surface' | 'stats';
  description?: string;
  milestones?: { text: string; done: boolean }[];
  resources?: { name: string; size: string; type: string }[];
}

export interface TaskItem {
  id: string;
  title: string;
  subject: string;
  priority: 'high' | 'medium' | 'low';
  type: 'Coding Project' | 'Lab' | 'Homework' | 'Reading' | 'Assignment' | 'Worksheet';
  dueDate: string;
  dueLabel: string;
  estHours: number;
  description: string;
  completed: boolean;
  isOverdue?: boolean;
  overdueText?: string;
  subtasksDone?: number;
  subtasksTotal?: number;
  grade?: string;
}

export interface SubjectModule {
  code: string;
  title: string;
  credits: number;
  colorAccent: string;
  masteryPercentage: number;
  instructor: string;
  schedule: string;
  activeSyllabusBlock: string;
  completedTopics: number;
  totalTopics: number;
  stats: {
    assignments: string;
    lectures: number;
    quizzesOrNotebooks: number;
    extraLabel?: string;
  };
  nextMilestone: {
    title: string;
    dueIn: string;
    priorityBadge: string;
    isUrgent?: boolean;
  };
  quickLinks: {
    label: string;
    icon: string;
    href: string;
  }[];
}

export interface NoteUpload {
  name: string;
  subject: string;
  format: string;
  size: string;
  timestamp: string;
  icon: string;
  color: string;
}
