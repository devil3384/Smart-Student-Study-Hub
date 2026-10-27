import { StudySession, TaskItem, SubjectModule, NoteUpload } from '../types';

export const INITIAL_STUDY_SESSIONS: StudySession[] = [
  {
    id: 'mon-1',
    day: 'Mon',
    dayNumber: 17,
    startTime: '09:00',
    endTime: '10:30',
    title: 'Data Structures',
    subtitle: 'Algorithm Analysis',
    subjectCode: 'CS301',
    subjectName: 'Advanced Data Structures & Algorithms',
    type: 'Lecture',
    location: 'Science Hall 201',
    priority: 'high',
    completed: true,
    colorTheme: 'tertiary',
    description: 'Asymptotic complexity analysis, Big-O recurrence relations, and Master Theorem proofs.',
    milestones: [
      { text: 'Review asymptotic complexity proofs', done: true },
      { text: 'Verify Master Theorem cases 1-3', done: true }
    ],
    resources: [
      { name: 'Lecture_04_Asymptotic_Bounds.pdf', size: '3.1 MB', type: 'pdf' }
    ]
  },
  {
    id: 'mon-2',
    day: 'Mon',
    dayNumber: 17,
    startTime: '14:00',
    endTime: '15:30',
    title: 'DBMS',
    subtitle: 'Normalization Lab',
    subjectCode: 'CS315',
    subjectName: 'Database Management Systems',
    type: 'CS Lab 102',
    location: 'CS Lab 102',
    priority: 'med',
    completed: true,
    colorTheme: 'secondary',
    description: 'Hands-on normalization practice applying 1NF, 2NF, 3NF and BCNF decomposition rules.',
    milestones: [
      { text: 'Construct relational dependency diagrams', done: true },
      { text: 'Decompose relation into BCNF', done: true }
    ]
  },
  {
    id: 'tue-1',
    day: 'Tue',
    dayNumber: 18,
    startTime: '10:00',
    endTime: '11:30',
    title: 'Python Programming',
    subtitle: 'Object Oriented OOP',
    subjectCode: 'CS320',
    subjectName: 'Python for Data Science',
    type: 'Code Walkthrough',
    location: 'Tech Center 402',
    priority: 'med',
    completed: true,
    colorTheme: 'primary',
    description: 'Polymorphism, dunder methods, metaclasses, and abstract base classes in Python 3.12.',
    milestones: [
      { text: 'Implement custom iterator and context manager', done: true }
    ]
  },
  {
    id: 'tue-2',
    day: 'Tue',
    dayNumber: 18,
    startTime: '15:00',
    endTime: '17:00',
    title: 'Deep Work Focus',
    subtitle: 'DS Heap Assignment',
    subjectCode: 'CS301',
    subjectName: 'Advanced Data Structures',
    type: 'Solo Deep Session',
    location: 'Quiet Library 3rd Floor',
    priority: 'high',
    completed: true,
    colorTheme: 'tertiary',
    description: 'Implement min/max heap operations with array representation and percolate down algorithms.'
  },
  {
    id: 'wed-1',
    day: 'Wed',
    dayNumber: 19,
    startTime: '09:30',
    endTime: '11:00',
    title: 'Data Structures',
    subtitle: 'Binary Search Trees',
    subjectCode: 'CS301',
    subjectName: 'Advanced Data Structures & Algorithms',
    type: 'Completed',
    location: 'Room 402 / Library 3rd Floor',
    priority: 'med',
    completed: true,
    colorTheme: 'surface',
    description: 'Iterative vs recursive tree traversals and node predecessor/successor logic.'
  },
  {
    id: 'wed-2',
    day: 'Wed',
    dayNumber: 19,
    startTime: '13:00',
    endTime: '14:30',
    title: 'DBMS Review',
    subtitle: 'B+ Trees & Indexing',
    subjectCode: 'CS315',
    subjectName: 'Database Management Systems',
    type: 'Completed',
    location: 'CS Computer Lab B',
    priority: 'med',
    completed: true,
    colorTheme: 'surface',
    description: 'B+ Tree leaf node splitting, interior pointer cascades, and clustered indexing.'
  },
  {
    id: 'wed-3',
    day: 'Wed',
    dayNumber: 19,
    startTime: '15:30',
    endTime: '17:00',
    title: 'Statistics MATH240',
    subtitle: 'Bayes & Distributions',
    subjectCode: 'MATH240',
    subjectName: 'MATH240 Probability & Statistics',
    type: 'Active Now',
    location: 'Science Hall Room 304 / Self-Study Desk 12',
    priority: 'high',
    isActiveNow: true,
    colorTheme: 'secondary',
    description: 'Deep derivation of conditional probability densities and Bayesian hypothesis updates.',
    milestones: [
      { text: 'Review Lecture 7 slide deck (1-35)', done: true },
      { text: 'Derive marginal PDF formulas on whiteboard', done: true },
      { text: 'Complete 3 Bayes theorem homework cases', done: true },
      { text: 'Self-test on covariance & correlation matrix', done: false }
    ],
    resources: [
      { name: 'Lecture_07_Bayes.pdf', size: '4.2 MB', type: 'pdf' },
      { name: 'ProblemSet_3_Solutions.ipynb', size: '180 KB', type: 'notebook' }
    ]
  },
  {
    id: 'wed-4',
    day: 'Wed',
    dayNumber: 19,
    startTime: '18:30',
    endTime: '20:00',
    title: 'Python Lab',
    subtitle: 'AsyncIO & Threading',
    subjectCode: 'CS320',
    subjectName: 'Python for Data Science',
    type: 'Pair Programming',
    location: 'Home Workspace',
    priority: 'med',
    colorTheme: 'primary',
    description: 'Event loop concurrency, coroutines, and comparative benchmarks against multiprocessing.'
  },
  {
    id: 'thu-1',
    day: 'Thu',
    dayNumber: 20,
    startTime: '11:00',
    endTime: '12:30',
    title: 'Discrete Math',
    subtitle: 'Graph Theory & Euler Paths',
    subjectCode: 'MATH210',
    subjectName: 'Discrete Mathematics & Logic',
    type: 'Theory Revision',
    location: 'Lecture Hall 105',
    priority: 'low',
    colorTheme: 'surface',
    description: 'Degree sum formula, Konigsberg bridges proof, and Fleury algorithm for Eulerian trails.'
  },
  {
    id: 'thu-2',
    day: 'Thu',
    dayNumber: 20,
    startTime: '16:00',
    endTime: '18:00',
    title: 'Midterm Review',
    subtitle: 'DS Algorithm Mock Exam',
    subjectCode: 'CS301',
    subjectName: 'Advanced Data Structures',
    type: 'Prof. Office Hours',
    location: 'Prof. Vance Office (Hall 312)',
    priority: 'high',
    colorTheme: 'error',
    description: 'Comprehensive mock examination covering sorting bounds, heaps, and tree balancing.'
  },
  {
    id: 'fri-1',
    day: 'Fri',
    dayNumber: 21,
    startTime: '09:00',
    endTime: '10:30',
    title: 'DBMS Quiz Prep',
    subtitle: 'Relational Algebra & SQL',
    subjectCode: 'CS315',
    subjectName: 'Database Management Systems',
    type: 'Timed Practice',
    location: 'Library Quiet Pod 4',
    priority: 'med',
    colorTheme: 'secondary',
    description: 'Tuple relational calculus, joins, projection, and aggregation operators.'
  },
  {
    id: 'fri-2',
    day: 'Fri',
    dayNumber: 21,
    startTime: '14:00',
    endTime: '16:00',
    title: 'Python Sprint',
    subtitle: 'FastAPI Backend Endpoints',
    subjectCode: 'CS320',
    subjectName: 'Python for Data Science',
    type: 'Sprint Milestone 2',
    location: 'Lab Room 303',
    priority: 'high',
    colorTheme: 'primary',
    description: 'Writing Pydantic schemas, asynchronous routing, and OpenAPI documentation endpoints.'
  },
  {
    id: 'sat-1',
    day: 'Sat',
    dayNumber: 22,
    startTime: '10:00',
    endTime: '12:00',
    title: 'Flashcard Recall',
    subtitle: 'All STEM Definitions (120 cards)',
    subjectCode: 'CS301',
    subjectName: 'Spaced Repetition',
    type: 'Spaced Repetition',
    location: 'Home Study Lounge',
    priority: 'low',
    colorTheme: 'surface',
    description: 'Anki algorithm interval review for tree invariants, SQL clauses, and statistical axioms.'
  },
  {
    id: 'sat-2',
    day: 'Sat',
    dayNumber: 22,
    startTime: '14:00',
    endTime: '16:00',
    title: 'Math Problem Set',
    subtitle: 'Combinatorics & Graphs',
    subjectCode: 'MATH210',
    subjectName: 'Discrete Mathematics',
    type: 'Homework 4',
    location: 'Science Library Desk 8',
    priority: 'med',
    colorTheme: 'surface',
    description: 'Pigeonhole principle applications, permutation groups, and binomial theorem coefficients.'
  },
  {
    id: 'sun-1',
    day: 'Sun',
    dayNumber: 23,
    startTime: '11:00',
    endTime: '13:00',
    title: 'Weekly Roadmap',
    subtitle: 'Next Sprint Planning',
    subjectCode: 'CS301',
    subjectName: 'Goal Calibration',
    type: 'Goal Calibration',
    location: 'Campus Coffee Hub',
    priority: 'low',
    colorTheme: 'tertiary',
    description: 'Audit completed milestones, estimate impending p-sets, and allocate study time blocks.'
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  // Past Due Critical
  {
    id: 'task-overdue-1',
    title: 'Implement AVL Tree Self-Balancing Rotations',
    subject: 'CS301',
    priority: 'high',
    type: 'Coding Project',
    dueDate: '2025-02-18T23:59',
    dueLabel: 'Due Yesterday, Feb 18',
    estHours: 2.5,
    description: 'Requires left/right double rotation edge cases validation on LeetCode test suite.',
    completed: false,
    isOverdue: true,
    overdueText: 'Overdue by 1 day!',
    subtasksDone: 2,
    subtasksTotal: 4
  },
  {
    id: 'task-overdue-2',
    title: 'Relational Schema Normalization Worksheet',
    subject: 'CS315',
    priority: 'medium',
    type: 'Assignment',
    dueDate: '2025-02-16T23:59',
    dueLabel: 'Due Feb 16, 11:59 PM',
    estHours: 1.0,
    description: 'Convert raw relational schemas up to Boyce-Codd Normal Form (BCNF) proofs.',
    completed: false,
    isOverdue: true,
    overdueText: 'Overdue by 3 days',
    subtasksDone: 1,
    subtasksTotal: 3
  },
  // Upcoming Active Deliverables
  {
    id: 'task-upcoming-1',
    title: 'Red-Black Tree Visualizer Project (Part 1)',
    subject: 'CS301',
    priority: 'high',
    type: 'Coding Project',
    dueDate: '2025-02-20T23:59',
    dueLabel: 'Due Tomorrow at 11:59 PM',
    estHours: 3.5,
    description: 'Build Canvas 2D engine to display red/black node balance changes and rotation transitions.',
    completed: false,
    subtasksDone: 3,
    subtasksTotal: 4
  },
  {
    id: 'task-upcoming-2',
    title: 'PostgreSQL Indexing Benchmark Lab Report',
    subject: 'CS315',
    priority: 'high',
    type: 'Lab',
    dueDate: '2025-02-20T17:00',
    dueLabel: 'Thu Feb 20, 5:00 PM',
    estHours: 2.0,
    description: 'Compare B-Tree vs Hash vs GiST execution plans on 2.5M records dataset using EXPLAIN ANALYZE.',
    completed: false,
    subtasksDone: 1,
    subtasksTotal: 3
  },
  {
    id: 'task-upcoming-3',
    title: 'Multivariate Normal Distribution Problem Set #4',
    subject: 'MATH240',
    priority: 'medium',
    type: 'Homework',
    dueDate: '2025-02-21T10:00',
    dueLabel: 'Fri Feb 21, 10:00 AM',
    estHours: 1.5,
    description: 'Questions 4 through 9 on covariance matrix diagonalization and probability density calculations.',
    completed: false,
    subtasksDone: 0,
    subtasksTotal: 2
  },
  {
    id: 'task-upcoming-4',
    title: 'Pandas & NumPy Exploratory Data Analysis',
    subject: 'CS320',
    priority: 'medium',
    type: 'Assignment',
    dueDate: '2025-02-23T23:59',
    dueLabel: 'Sun Feb 23, 11:59 PM',
    estHours: 4.0,
    description: 'Perform feature engineering, missing value imputation, and Seaborn heatmaps on Kaggle housing data.',
    completed: false,
    subtasksDone: 2,
    subtasksTotal: 5
  },
  {
    id: 'task-upcoming-5',
    title: 'Read Chapter 8: B-Trees and Storage Engines',
    subject: 'CS315',
    priority: 'low',
    type: 'Reading',
    dueDate: '2025-02-24T23:59',
    dueLabel: 'Next Mon Feb 24',
    estHours: 2.0,
    description: 'Designing Data-Intensive Applications (DDIA) pages 79-112 covering LSM-Trees vs B-Trees.',
    completed: false,
    subtasksDone: 0,
    subtasksTotal: 1
  },
  {
    id: 'task-upcoming-6',
    title: 'Prepare Flashcards for Discrete Mathematics Quiz 2',
    subject: 'MATH210',
    priority: 'low',
    type: 'Assignment',
    dueDate: '2025-02-25T23:59',
    dueLabel: 'Next Tue Feb 25',
    estHours: 1.0,
    description: 'Set theory, Pigeonhole Principle formulas, and modular arithmetic identities.',
    completed: false,
    subtasksDone: 0,
    subtasksTotal: 1
  },
  // Completed Archives
  {
    id: 'task-done-1',
    title: 'Binary Search Tree Iterative vs Recursive Traversal',
    subject: 'CS301',
    priority: 'high',
    type: 'Coding Project',
    dueDate: '2025-02-17T23:59',
    dueLabel: 'Completed Yesterday',
    estHours: 3.0,
    description: 'Full test vectors passed with 100% test coverage.',
    completed: true,
    grade: '98% Grade'
  },
  {
    id: 'task-done-2',
    title: 'ER Diagram for Hospital Management Database',
    subject: 'CS315',
    priority: 'medium',
    type: 'Assignment',
    dueDate: '2025-02-15T23:59',
    dueLabel: 'Completed Feb 15',
    estHours: 2.0,
    description: "Verified Crow's Foot Notation & Cardinality constraints.",
    completed: true,
    grade: 'Submitted'
  },
  {
    id: 'task-done-3',
    title: 'Linear Algebra Matrix Eigenvalues Practice',
    subject: 'MATH240',
    priority: 'medium',
    type: 'Homework',
    dueDate: '2025-02-14T23:59',
    dueLabel: 'Completed Feb 14',
    estHours: 2.5,
    description: 'SVD Decomposition proofs verified.',
    completed: true,
    grade: 'Submitted'
  }
];

export const INITIAL_SUBJECTS: SubjectModule[] = [
  {
    code: 'CS301',
    title: 'Advanced Data Structures & Algorithms',
    credits: 4.0,
    colorAccent: 'primary',
    masteryPercentage: 82,
    instructor: 'Dr. Robert Vance',
    schedule: 'Mon/Wed 09:30 AM',
    activeSyllabusBlock: 'Self-Balancing Trees & Graph Algorithms (Mod 4/5)',
    completedTopics: 41,
    totalTopics: 50,
    stats: {
      assignments: '7/8',
      lectures: 14,
      quizzesOrNotebooks: 6
    },
    nextMilestone: {
      title: 'Midterm Exam',
      dueIn: 'in 8 days',
      priorityBadge: 'High Priority',
      isUrgent: true
    },
    quickLinks: [
      { label: 'Notes (14)', icon: 'description', href: '#/subjects/cs301/notes' },
      { label: 'Flashcards (120)', icon: 'style', href: '#/subjects/cs301/flashcards' }
    ]
  },
  {
    code: 'CS320',
    title: 'Python for Data Science & Machine Learning',
    credits: 3.0,
    colorAccent: 'secondary-container',
    masteryPercentage: 76,
    instructor: 'Dr. Elena Rostova',
    schedule: 'Tue/Thu 14:00 PM',
    activeSyllabusBlock: 'Data Wrangling with Pandas & Feature Engineering',
    completedTopics: 38,
    totalTopics: 50,
    stats: {
      assignments: '4/6',
      lectures: 18,
      quizzesOrNotebooks: 8,
      extraLabel: 'Datasets'
    },
    nextMilestone: {
      title: 'Kaggle Mini-Project',
      dueIn: 'in 4 days',
      priorityBadge: 'Mid Sprint'
    },
    quickLinks: [
      { label: 'Jupyter Labs', icon: 'code_blocks', href: '#/subjects/cs320/labs' },
      { label: 'Cheat Sheets', icon: 'fact_check', href: '#/subjects/cs320/cheatsheets' }
    ]
  },
  {
    code: 'CS315',
    title: 'Database Management Systems (DBMS)',
    credits: 4.0,
    colorAccent: 'secondary',
    masteryPercentage: 68,
    instructor: 'Prof. Marcus Thorne',
    schedule: 'Mon/Wed 13:00 PM',
    activeSyllabusBlock: 'Query Optimization, Indexing & B-Trees',
    completedTopics: 27,
    totalTopics: 40,
    stats: {
      assignments: '5',
      lectures: 12,
      quizzesOrNotebooks: 3,
      extraLabel: 'Sheets'
    },
    nextMilestone: {
      title: 'Indexing Benchmark Lab',
      dueIn: 'in 2 days',
      priorityBadge: 'Urgent',
      isUrgent: true
    },
    quickLinks: [
      { label: 'SQL Playground', icon: 'database', href: '#/subjects/cs315/sql' },
      { label: 'ER Diagrams', icon: 'schema', href: '#/subjects/cs315/erd' }
    ]
  },
  {
    code: 'MATH240',
    title: 'Probability & Applied Statistics',
    credits: 4.0,
    colorAccent: 'secondary-fixed',
    masteryPercentage: 71,
    instructor: 'Dr. Sarah Lin',
    schedule: 'Wed/Fri 15:30 PM',
    activeSyllabusBlock: 'Multivariate Distributions & Central Limit Theorem',
    completedTopics: 22,
    totalTopics: 31,
    stats: {
      assignments: '9',
      lectures: 11,
      quizzesOrNotebooks: 4,
      extraLabel: 'Exams'
    },
    nextMilestone: {
      title: 'Statistics Quiz 3',
      dueIn: 'in 3 days',
      priorityBadge: 'Upcoming'
    },
    quickLinks: [
      { label: 'Formula Sheet', icon: 'functions', href: '#/subjects/math240/formulas' },
      { label: 'R Scripts', icon: 'data_object', href: '#/subjects/math240/rscripts' }
    ]
  },
  {
    code: 'MATH210',
    title: 'Discrete Mathematics & Logic',
    credits: 3.0,
    colorAccent: 'tertiary',
    masteryPercentage: 62,
    instructor: 'Alan Turing Chair',
    schedule: 'Tue/Thu 11:00 AM',
    activeSyllabusBlock: 'Graph Theory & Combinatorics',
    completedTopics: 18,
    totalTopics: 29,
    stats: {
      assignments: '7',
      lectures: 15,
      quizzesOrNotebooks: 8,
      extraLabel: 'Decks'
    },
    nextMilestone: {
      title: 'Proof Homework #5',
      dueIn: 'in 6 days',
      priorityBadge: 'Assigned'
    },
    quickLinks: [
      { label: 'Proof Guide', icon: 'history_edu', href: '#/subjects/math210/proofs' },
      { label: 'Graph Vis', icon: 'hub', href: '#/subjects/math210/visualizer' }
    ]
  }
];

export const RECENT_NOTE_UPLOADS: NoteUpload[] = [
  {
    name: 'Red-Black_Trees_Rotations_Notes.pdf',
    subject: 'CS301',
    format: '2.4 MB PDF',
    size: '2.4 MB',
    timestamp: 'Today, 10:14 AM',
    icon: 'picture_as_pdf',
    color: 'text-primary'
  },
  {
    name: 'Pandas_Aggregation_Cookbook.ipynb',
    subject: 'CS320',
    format: '148 KB Jupyter',
    size: '148 KB',
    timestamp: 'Yesterday, 18:42',
    icon: 'code',
    color: 'text-secondary'
  },
  {
    name: 'Joint_Probability_Densities_Formulas.md',
    subject: 'MATH240',
    format: '45 KB Markdown',
    size: '45 KB',
    timestamp: '2 days ago',
    icon: 'functions',
    color: 'text-tertiary'
  },
  {
    name: 'B-Tree_Indexing_Mechanics_Cheatsheet.pdf',
    subject: 'CS315',
    format: '1.1 MB PDF',
    size: '1.1 MB',
    timestamp: '3 days ago',
    icon: 'table_rows',
    color: 'text-secondary'
  }
];

export const MOTIVATIONAL_QUOTES = [
  { text: '“The expert in anything was once a beginner.”', author: 'HELEN HAYES' },
  { text: '“Live as if you were to die tomorrow. Learn as if you were to live forever.”', author: 'MAHATMA GANDHI' },
  { text: '“Small disciplines repeated with consistency every day lead to great achievements.”', author: 'JOHN C. MAXWELL' },
  { text: '“It always seems impossible until it is done.”', author: 'NELSON MANDELA' },
  { text: '“An investment in knowledge pays the best interest.”', author: 'BENJAMIN FRANKLIN' }
];

export const AMBIENT_TRACKS = [
  {
    id: 'lofi',
    name: 'Lo-Fi Rain & Desk Lamp',
    desc: 'Cozy rhythmic rainfall with vinyl flutter',
    icon: 'water_drop',
    activeColor: 'text-secondary',
    durationSec: 1500
  },
  {
    id: 'cafe',
    name: 'Coffee Shop White Noise',
    desc: 'Low murmur, espresso steam & ceramic clicks',
    icon: 'local_cafe',
    activeColor: 'text-tertiary',
    durationSec: 1500
  },
  {
    id: 'gamma',
    name: '40Hz Gamma Brainwaves',
    desc: 'Binaural tones clinically linked to focus',
    icon: 'graphic_eq',
    activeColor: 'text-primary',
    durationSec: 1500
  },
  {
    id: 'library',
    name: 'Library Ambient Quiet',
    desc: 'Page turns, distant clock ticks, heavy wood warmth',
    icon: 'import_contacts',
    activeColor: 'text-on-surface-variant',
    durationSec: 1500
  }
];
