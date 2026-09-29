import cv from '../papers/Nandi_Zhang_CV.pdf';

export const profile = {
  name: 'Nandi Zhang',
  nameZh: '张南迪',
  email: 'nandi.zhang@rochester.edu',
  links: [
    { label: 'Email', href: 'mailto:nandi.zhang@rochester.edu' },
    { label: 'CV', href: cv },
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=zvPQR94AAAAJ' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nandi-zhang/' },
    { label: 'GitHub', href: 'https://github.com/nandi-zhang' },
    { label: 'X', href: 'https://x.com/nandizhang_' },
  ],
  seeking: 'I’m looking for a research internship for summer 2027.',
  closing: 'I study that mapping, and design for the new possibilities it opens.',
  // The overall narrative. Words wrapped in [[theme-id|text]] become jump links to that theme.
  narrative:
    'I study how people perceive, behave, and think when computers sit between them and the world, like XR and robotics systems. I build computational models of both human cognition and computer interfaces to understand and design for them. With these models, I aspire to explore and create cognitive experiences that were not possible before.',
};

export const engineering = {
  intro:
    'Alongside HCI, I have a background in machine learning.',
  items: [
    {
      title: 'Research intern, SenseTime',
      when: '2021 to 2022',
      body:
        'Worked on neural collapse in transfer learning, few-shot distillation, and a large-scale vision training framework; implemented and trained vision, language and reinforcement learning models.',
    },
  ],
  toolkit: [
    ['Mixed reality', 'Unity, C#, Swift, C++, Meta Quest and Snap Spectacles development'],
    ['Machine learning', 'PyTorch, vision and multimodal models, LLMs, reinforcement learning'],
    ['Studies and analysis', 'Controlled experiments, mixed-effects models, thematic analysis, Qualtrics'],
    ['Web and data', 'React, JavaScript, Python, R, SQL'],
  ],
};

// TODO(Nandi): fill in exact months where marked "2026".
export const news = [
  { when: 'Nov 2026', text: 'I will present Remapping Time, demo both Remapping Time and Harmonia, plus co-organize the Cyber-Physical System workshop at UIST 2026 in Detroit. I\'m also a student volunteer this time!' },
  { when: 'Jun 2026', text: 'Remapping Time accepted to UIST 2026, and Harmonia as an SIC extended abstract.' },
  { when: 'Oct 2025', text: 'Co-organized the Cyber-Physical System workshop at UIST 2025.' },
  { when: 'Sep 2025', text: 'Started my PhD at the University of Rochester with Yukang!' },
];

export const education = [
  { place: 'University of Rochester', what: 'PhD, Computer Science, with Yukang Yan', when: '2025 to present' },
  { place: 'University of Calgary', what: 'MSc (thesis-based), Computer Science, with Ryo Suzuki', when: '2023 to 2025' },
  { place: 'Hong Kong University of Science and Technology', what: 'BSc, Data Science and Technology, with Xiaojuan Ma', when: '2018 to 2022' },
];

export const teaching = [
  { course: 'CSC 442 Artificial Intelligence', role: 'TA', where: 'Rochester', when: 'Fall 2026' },
  { course: 'CSC 242 Artificial Intelligence', role: 'TA', where: 'Rochester', when: 'Spring 2026' },
  { course: 'DATA 201 Thinking with Data', role: 'Head TA', where: 'Calgary', when: '2023 to 2024' },
  { course: 'SCIE 398 Communication for Computer Science', role: 'Course development', where: 'Calgary', when: 'Fall 2024' },
  { course: 'CPSC 233 Introduction to CS II', role: 'TA', where: 'Calgary', when: 'Fall 2024' },
];

export const service = {
  reviewing: 'UIST 2026, CHI 2026, CHI PLAY 2026, CHI 2025, CSCW 2025, ISMAR 2025',
  other: 'UIST 2026, CHI 2024.',
};
