// All the content of the site lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Kushagra Shrivastava',
  firstName: 'Kushagra',
  role: 'AI & ML developer',
  email: 'kushchess08@gmail.com',
  github: 'https://github.com/WanderingHippopotomus',
  githubHandle: 'WanderingHippopotomus',
  linkedin: 'https://www.linkedin.com/in/shrivastavakushagra',
  linkedinHandle: 'shrivastavakushagra',
  // Put a photo at public/photo.jpg to show it in the About section.
  photo: '/photo.jpeg',
}

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'chess', label: 'Chess' },
  { id: 'contact', label: 'Contact' },
]

export const projects = [
  {
    title: 'Performance Drift Prediction',
    kind: 'drift',
    tone: 'bg-sky',
    summary:
      'Predicts when your focus is about to slip, 15 to 30 minutes ahead, from typing speed, idle time and app switching.',
    detail:
      'Runs fully offline as a Windows app built on Flask, SQLite and PyWin32. Uses XGBoost, Random Forest and SVC, with a focus on personalization and explainable predictions.',
    tags: ['Python', 'XGBoost', 'Random Forest', 'SVC', 'KMeans', 'Flask'],
  },
  {
    title: 'Mental Health Screening Tool',
    kind: 'heart',
    tone: 'bg-blush',
    summary:
      'A private screening platform for college students, built around the PHQ-9 and GAD-7 assessments.',
    detail:
      'Includes an AI chatbot for emotional support, consent-based counsellor alerts, case management dashboards and crisis helplines, with secure data handling throughout.',
    tags: ['Python', 'Flask', 'Groq API', 'SQLite', 'Tailwind CSS'],
  },
  {
    title: 'Scam Text Detector',
    kind: 'shield',
    tone: 'bg-butter',
    summary:
      'Paste a message and get a risk score for how likely it is to be a scam.',
    detail:
      'TF-IDF text features plus message length, word count and URL presence feed Logistic Regression and Random Forest classifiers.',
    tags: ['Python', 'TF-IDF', 'Logistic Regression', 'Random Forest'],
  },
  {
    title: 'File Sorter',
    kind: 'folders',
    tone: 'bg-mint',
    summary:
      'A Windows desktop app that sorts a messy folder into tidy ones by file type.',
    detail:
      'Handles PDFs, Word, PowerPoint and spreadsheets in a hierarchy. Works offline, copes with large folders and never changes file contents.',
    tags: ['React', 'Electron', 'Python', 'JavaScript'],
  },
]

export const chessResults = [
  {
    place: '1st',
    event: 'Mannu Chess Festival',
    note: 'FIDE-rated tournament',
  },
  {
    place: '13th',
    event: '1st Andaman & Nicobar International Open',
    note: 'International open',
  },
  {
    place: '18th',
    event: '2nd Namma Bengaluru International GM Open',
    note: 'Grandmaster open',
  },
]

export const otherChess = [
  'Multiple national-level tournaments (SGFI, U09, U17, U18)',
  'Sports scholarship and Outstanding Achievement awards from Jagran Lakecity University',
]

export const skills = [
  {
    group: 'Machine learning',
    items: ['XGBoost', 'Random Forest', 'SVC', 'KMeans', 'Logistic Regression', 'TF-IDF', 'Scikit-Learn'],
  },
  {
    group: 'Data',
    items: ['Pandas', 'NumPy', 'Data preprocessing', 'Classification', 'Regression'],
  },
  {
    group: 'Building things',
    items: ['Python', 'Flask', 'SQLite', 'HTML', 'CSS', 'Luau'],
  },
]

export const hackathons = ['Smart India Hackathon', 'KRIYETA 5.0 Nationwide Hackathon']

export const interests = ['Chess', 'Basketball', 'Boxing', 'Piano', 'Game development']

export const certificates = [
  {
    title: 'Version Control',
    issuer: 'Coursera / Meta',
    date: 'Aug 2023',
    image: 'VersionControl.jpg',
    link: 'https://coursera.org/verify/3LG6V2UBAH3W',
  },
  {
    title: 'Improve Your English Communication Skills',
    issuer: 'Coursera / Georgia Tech',
    date: 'Nov 2023',
    image: 'Comms.jpg',
    link: 'https://coursera.org/verify/specialization/MPZV35H6XZWU',
  },
  {
    title: 'Communication in 21st Century Workplace',
    issuer: 'Coursera / UCI',
    date: 'April 2024',
    image: 'Communicate.jpg',
    link: 'https://coursera.org/verify/BPBVY72BU8YQ',
  },
]
