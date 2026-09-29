// ---------------------------------------------------------------------------
// Everything on the page comes from these data files. To add a paper, add one
// entry to `publications` (and optionally reference its id from a thread).
// ---------------------------------------------------------------------------

import followingImg from '../media/following-to-understanding.jpg';
import reachImg from '../media/reach-unreachable.jpg';
import robotsImg from '../media/service-robots.jpg';
import physicsImg from '../media/augmented-physics.jpg';
import summaryImg from '../media/reality-summary.jpg';
import remapImg from '../media/remapping-time.jpg';
import remapDemos from '../media/remapping-demos.jpg';

import reachPdf from '../papers/chi-24-to-reach-the-unreachable.pdf';
import physicsPdf from '../papers/uist-24-augmented-physics.pdf';
import robotsPdf from '../papers/chi-25-signaling-human-intentions.pdf';
import remapPdf from '../papers/uist-26-remapping-time.pdf';

export const ME = 'Nandi Zhang';

// Each publication. `firstAuthor` drives the first-author filter.
// `kind: 'short'` marks extended abstracts and short papers: they are listed separately
// on the publications page and left out of the sidebar and home page.
// `media` can be { image } or { video } (a looping .mp4 you import, like the images);
// add `fit: 'contain'` for figures that shouldn't be cropped.
//
// Slots on every paper page (leave empty to hide):
//   videos.teaser  YouTube ID or link, shown at the top of the page instead of `media`
//   videos.full    YouTube ID or link for the full video figure, in its own section
//   videos.talk    YouTube ID or link for a conference talk, next to the video figure
//   figures        [{ image: importedImage, alt: '...', caption: '...' }], shown as a gallery
export const publications = [
  {
    id: 'remapping-time',
    short: 'Remapping Time',
    title: 'Remapping Time in Augmented Reality',
    authors: ['Nandi Zhang', 'Yukang Yan'],
    venue: 'UIST 2026',
    year: 2026,
    firstAuthor: true,
    medium: ['AR'],
    doi: '10.1145/3830398.3830686',
    blurb:
      'In video see-through AR, the world arrives through a camera pipeline, so visual time itself can be designed. We formalize time remapping as a simple dynamical system; slowing fleeting moments roughly doubled people’s ability to identify briefly visible cards without significantly reducing comfort.',
    notes: [
      'Time remapping is continuous, frame-level control over which captured moment the display shows. A first-order model lets displayed time slow, pause, or race ahead, and then settle back to the present without overshooting.',
      'In a within-subjects study (N=21), participants identified playing cards that were only visible mid-motion, either watching someone else deal or dealing themselves, with remapping triggered by the user or by the system. Remapping helped in every combination. When the system slowed participants’ own motion, they also tended to slow their hands, a visuomotor effect we see as an opening for movement guidance.',
      'From interviews we derived a six-dimensional design space (anchor, control, parametrization, scope, representation, and transparency) and built three demonstrations: slowing lifts during strength training, water that feels thicker the deeper your hand goes, and a slash that looks faster than it really was.',
    ],
    media: {
      image: remapImg,
      fit: 'contain',
      alt: 'Frames of a hand flicking a playing card, shown in real time with motion blur and remapped so the card is legible',
    },
    bib: {
      booktitle: 'Proceedings of the 39th Annual ACM Symposium on User Interface Software and Technology',
      series: "UIST '26", numpages: 14, location: 'Detroit, MI, USA',
    },
    figures: [
      {
        image: remapDemos,
        alt: 'Three demonstrations: a slowed weight lift, a hand in virtual water, and an exaggerated slash',
        caption: 'Demonstrations: speed regulation for training, pseudo-texture in virtual water, and a forward-sampled slash.',
      },
    ],
    videos: { teaser: 'https://youtu.be/OUKte0xQy3o', full: 'https://youtu.be/eJDhAbtXmT4', talk: '' },
    links: [{ label: 'Paper', href: remapPdf }],
    experiment: 'viscosity',
    pipeline: {
      steps: [
        ['Capture', 'Meta Quest 3 Passthrough Camera API: left and right RGB cameras through Android Camera2, 1280×960 at 60 Hz.'],
        ['Buffer', 'Every frame is stored with its capture timestamp in a circular stereo frame buffer.'],
        ['Integrate', 'Each display frame advances the temporal offset d by one Euler step of the first-order model.'],
        ['Select', 'The buffered frame pair closest to the source time g(t) = t − d(t) is retrieved.'],
        ['Render', 'Frames go to a head-locked canvas aligned with the scene through camera extrinsics; system passthrough fills the rest of the view.'],
      ],
      triggers: 'User control uses a controller trigger. System control uses hand tracking and activates once the hand leaves the start position by 8 cm.',
      code: `// every display frame
const u = active ? 0.8 : 0.0;   // injection: playback at 0.2×
const a = active ? 0.05 : 8.0;  // recovery: weak while held, strong on release
d += dt * (u - a * d);          // Euler step of d' = u − αd
show(buffer.closestTo(t - d));  // displayed source time g(t) = t − d(t)`,
      note: 'The demo above runs this same update in JavaScript, on a canvas frame buffer in your browser.',
    },
  },
  {
    id: 'harmonia',
    short: 'Harmonia',
    title: 'Harmonia: Physiological Signal-Driven Music for Remote Relationship Maintenance',
    authors: ['Kewen Peng', 'Nandi Zhang'],
    venue: 'UIST 2026 Extended Abstract',
    kind: 'short',
    year: 2026,
    medium: ['Biosignals', 'Music'],
    blurb:
      'Music generated from partners’ physiological signals, as a way to stay connected in a long-distance relationship.',
    media: null,
    videos: { teaser: '', full: '', talk: '' },
    figures: [],
    links: [],
    bib: {
      booktitle: 'Adjunct Proceedings of the 39th Annual ACM Symposium on User Interface Software and Technology',
      series: "UIST Adjunct '26", location: 'Detroit, MI, USA',
    },
  },
  {
    id: 'following-to-understanding',
    short: 'From Following to Understanding',
    doi: '10.1145/3706598.3713293',
    title:
      'From Following to Understanding: Investigating the Role of Reflective Prompts in AR-Guided Tasks to Promote User Understanding',
    authors: ['Nandi Zhang', 'Yukang Yan', 'Ryo Suzuki'],
    venue: 'CHI 2025',
    year: 2025,
    firstAuthor: true,
    medium: ['AR'],
    role: 'Project lead: idea, system, all studies, paper, and video.',
    blurb:
      'AR instructions make a task easy to finish and easy not to understand. Adding reflective prompts to step-by-step guidance raised participants’ understanding and made them seek out more information, without hurting task performance.',
    media: { image: followingImg, alt: 'A participant wearing a headset pours water during an AR-guided coffee task' },
    figures: [],
    bib: {
      booktitle: 'Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems',
      series: "CHI '25", articleno: 1227, numpages: 18, location: 'Yokohama, Japan',
    },
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1145/3706598.3713293' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2501.13258' },
      { label: 'Video', href: 'https://www.youtube.com/watch?v=z3jImdZAPmQ' },
    ],
    videos: { teaser: '', full: 'z3jImdZAPmQ', talk: '' },
  },
  {
    id: 'service-robots',
    short: 'Signaling Intentions to Service Robots',
    doi: '10.1145/3706598.3714235',
    title:
      'Signaling Human Intentions to Service Robots: Understanding the Use of Social Cues during In-Person Conversations',
    authors: ['Hanfang Lyu', 'Xiaoyu Wang', 'Nandi Zhang', 'Shuai Ma', 'Qian Zhu', 'Yuhan Luo', 'Fugee Tsung', 'Xiaojuan Ma'],
    venue: 'CHI 2025',
    year: 2025,
    award: 'Honorable Mention',
    medium: ['HRI'],
    blurb:
      'An elicitation study (N=24) of how people signal intentions to four kinds of robot waiters, from humanoid to drone, while staying focused on a conversation. The robot’s form changes where people aim their cues.',
    media: { image: robotsImg, alt: 'Four robot waiters: a humanoid, a quadruped, a tiered delivery robot, and a drone' },
    videos: { teaser: '', full: '', talk: '' },
    figures: [],
    bib: {
      booktitle: 'Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems',
      series: "CHI '25", articleno: 603, numpages: 21, location: 'Yokohama, Japan',
    },
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1145/3706598.3714235' },
      { label: 'PDF', href: robotsPdf },
    ],
  },
  {
    id: 'reality-summary',
    short: 'RealitySummary',
    doi: '10.1145/3694907.3765933',
    title:
      'RealitySummary: Exploring On-Demand Mixed Reality Text Summarization and Question Answering using Large Language Models',
    authors: ['Aditya Gunturu', 'Shivesh Singh Jadon', 'Nandi Zhang', 'Morteza Faraji', 'Jarin Thundathil', 'Wesley Willett', 'Ryo Suzuki'],
    venue: 'SUI 2025',
    year: 2025,
    medium: ['MR', 'LLMs'],
    blurb:
      'An always-on MR reading assistant that pairs an LLM with camera and OCR, refined over three versions and studied in the lab, in the wild, and in a diary study.',
    media: { image: summaryImg, alt: 'Diagram of the RealitySummary pipeline from camera feed to spatial summaries' },
    videos: { teaser: '', full: '', talk: '' },
    figures: [],
    bib: {
      booktitle: 'Proceedings of the 2025 ACM Symposium on Spatial User Interaction',
      series: "SUI '25", articleno: 21, numpages: 13, location: 'Montreal, QC, Canada',
    },
    links: [
      { label: 'Paper', href: 'https://doi.org/10.1145/3694907.3765933' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2405.18620' },
    ],
  },
  {
    id: 'uist26-workshop',
    short: 'Cyber-Physical Systems for Accessibility',
    title: 'Cyber-Physical Systems for Accessibility and Ability Augmentation: Bridging Diverse Communities',
    authors: ['Shuchang Xu', 'Riku Arakawa', 'Mina Huh', 'Nandi Zhang', 'Tianyu Zhang', 'Wazeer Zulfikar', 'Ruei-Che Chang', 'Yotam Sechayk', 'Huamin Qu', 'Amy Pavel', 'Franklin Mingzhe Li', 'Yukang Yan', 'Brian A. Smith', 'Pattie Maes'],
    venue: 'UIST 2026 Workshop Proposal',
    kind: 'short',
    year: 2026,
    blurb:
      'A full-day workshop bringing together wearables, robotics, XR, and smart-environment researchers around systems that support and augment human abilities.',
    videos: { teaser: '', full: '', talk: '' },
    figures: [],
    bib: {
      booktitle: 'Adjunct Proceedings of the 39th Annual ACM Symposium on User Interface Software and Technology',
      series: "UIST Adjunct '26", location: 'Detroit, MI, USA',
    },
    links: [
      { label: 'Website', href: 'https://uist.acm.org/2026/workshops/#cyber-physical-systems-for-accessibility-and-ability-augmentation-bridging-diverse-communities' },
    ],
  },
  {
    id: 'uist25-workshop',
    short: 'Accessible Cyber‑Physical Activities',
    title: 'Accessible Cyber‑Physical Activities',
    authors: ['Riku Arakawa', 'Franklin Mingzhe Li', 'Nandi Zhang', 'Mina Huh', 'Amy Pavel', 'Ryo Suzuki', 'Patrick Carrington', 'Yukang Yan'],
    venue: 'UIST 2025 Workshop Proposal',
    kind: 'short',
    year: 2025,
    blurb:
      'A full-day workshop bringing together wearables, robotics, and XR researchers to design cyber-physical systems that meaningfully support accessibility and inclusion in everyday life.',
    videos: { teaser: '', full: '', talk: '' },
    figures: [],
    links: [
      { label: 'Website', href: 'https://accessible-cps.github.io/' },
    ],
  },
  {
    id: 'soft-skills',
    short: 'Soft-Skill Education in CS',
    title:
      'A Pedagogical Model for Soft-Skill Education in Computer Science: Pass/Fail Grading with Public In-Class Feedback',
    authors: ['Nandi Zhang', 'Nelson Wong'],
    venue: 'WCCCE 2025 Short Paper',
    kind: 'short',
    year: 2025,
    medium: ['CS education'],
    firstAuthor: true,
    videos: { teaser: '', full: '', talk: '' },
    figures: [],
    bib: {
      booktitle: 'Proceedings of the 2025 Western Canadian Conference on Computing Education',
      series: "WCCCE '25", publisher: null,
    },
    links: [],
  },
  {
    id: 'augmented-physics',
    short: 'Augmented Physics',
    doi: '10.1145/3654777.3676392',
    title:
      'Augmented Physics: Creating Interactive and Embedded Physics Simulations from Static Textbook Diagrams',
    authors: ['Aditya Gunturu', 'Yi Wen', 'Nandi Zhang', 'Jarin Thundathil', 'Rubaiat Habib Kazi', 'Ryo Suzuki'],
    venue: 'UIST 2024',
    year: 2024,
    award: 'Best Paper',
    medium: ['2D interface', 'Machine learning'],
    blurb:
      'Uses machine learning to turn static textbook diagrams into interactive physics simulations you can manipulate on the page.',
    media: { image: physicsImg, alt: 'A stylus manipulating an optics diagram that has become an interactive simulation' },
    figures: [],
    bib: {
      booktitle: 'Proceedings of the 37th Annual ACM Symposium on User Interface Software and Technology',
      series: "UIST '24", numpages: 12, location: 'Pittsburgh, PA, USA',
    },
    links: [
      { label: 'Paper', href: 'https://dl.acm.org/doi/10.1145/3654777.3676392' },
      { label: 'PDF', href: physicsPdf },
      { label: 'Video', href: 'https://www.youtube.com/watch?v=GqZnQJpfFSg' },
    ],
    videos: { teaser: '', full: 'GqZnQJpfFSg', talk: 'FxF4fP1pPGI' },
  },
  {
    id: 'reach-unreachable',
    short: 'To Reach the Unreachable',
    doi: '10.1145/3613904.3642912',
    title:
      'To Reach the Unreachable: Exploring the Potential of VR Hand Redirection for Upper Limb Rehabilitation',
    authors: ['Peixuan Xiong', 'Yukai Zhang', 'Nandi Zhang', 'Shihan Fu', 'Xin Li', 'Yadan Zheng', 'Jinni Zhou', 'Xiquan Hu', 'Mingming Fan'],
    venue: 'CHI 2024',
    year: 2024,
    medium: ['VR'],
    role: 'Built the prototype system.',
    blurb:
      'VR hand redirection shows stroke patients a reach slightly more successful than their real one, turning a perceptual illusion into motivation for rehabilitation.',
    media: { image: reachImg, alt: 'A patient in a VR headset using a rehabilitation arm, beside the virtual reaching task' },
    videos: { teaser: '', full: '', talk: '' },
    figures: [],
    bib: {
      booktitle: 'Proceedings of the CHI Conference on Human Factors in Computing Systems',
      series: "CHI '24", numpages: 11, location: 'Honolulu, HI, USA',
    },
    links: [
      { label: 'Paper', href: 'https://dl.acm.org/doi/10.1145/3613904.3642912' },
      { label: 'PDF', href: reachPdf },
    ],
    experiment: 'redirection',
  },
];

// Kept deliberately vague while under double-blind review.
export const underReview = 'Three more papers are under review at CHI 2027.';

// The questions that organize the work. Used as filters on the home page.
export const questions = [
  {
    id: 'perception',
    label: 'Perception and the body',
    note: 'What people see of fleeting events, and of their own bodies, can be deliberately reshaped. These projects do that on purpose and measure what follows, in perception and in movement.',
    items: ['remapping-time', 'reach-unreachable'],
  },
  {
    id: 'understanding',
    label: 'Understanding, not just completion',
    note: 'Guidance can make a task easy to finish and easy not to understand. These projects, in headsets and on flat screens, look for ways to keep people thinking.',
    items: ['following-to-understanding', 'augmented-physics', 'reality-summary'],
  },
  {
    id: 'robots',
    label: 'People and robots',
    note: 'Robots bring physical presence that displays lack, but only if people and robots can read each other. This work looks at how people signal their intentions to robots without interrupting what they are doing.',
    items: ['service-robots'],
  },
];

// Order of work shown on the home page.
export const selected = [
  'remapping-time', 'following-to-understanding', 'service-robots',
  'augmented-physics', 'reach-unreachable', 'reality-summary',
];

export const mainPapers = publications.filter((p) => p.kind !== 'short');
export const shortPapers = publications.filter((p) => p.kind === 'short');
export const allWork = publications;
export const workById = Object.fromEntries(allWork.map((w) => [w.id, w]));

const BOOKTITLES = {
  CHI: 'Proceedings of the CHI Conference on Human Factors in Computing Systems',
  UIST: 'Proceedings of the ACM Symposium on User Interface Software and Technology',
  'UIST Workshop Proposal': 'Adjunct Proceedings of the ACM Symposium on User Interface Software and Technology',
  'UIST Extended Abstract': 'Adjunct Proceedings of the ACM Symposium on User Interface Software and Technology',
  SUI: 'Proceedings of the ACM Symposium on Spatial User Interaction',
  WCCCE: 'Proceedings of the Western Canadian Conference on Computing Education',
};

export function bibtex(p) {
  const b = p.bib || {};
  const last = (n) => n.split(' ').slice(-1)[0];
  const first = (n) => n.split(' ').slice(0, -1).join(' ');
  const name = (n) => (/^et al\.?$/.test(n) ? 'others' : `${last(n)}, ${first(n)}`);
  const skip = ['from', 'with', 'using', 'toward', 'towards', 'what', 'when', 'into', 'through'];
  const word = p.title.replace(/[^A-Za-z ]/g, '').split(' ').find((w) => w.length > 3 && !skip.includes(w.toLowerCase())) || 'paper';
  const key = `${last(p.authors[0]).toLowerCase()}${p.year}${word.toLowerCase()}`;
  const fields = [
    ['title', `{${p.title}}`], // double braces keep capitalization such as AR, VR, LLMs
    ['author', p.authors.map(name).join(' and ')],
    ['booktitle', b.booktitle || p.venue],
    ['series', b.series],
    ['year', p.year],
    ['articleno', b.articleno],
    ['numpages', b.numpages],
    ['location', b.location],
    ['publisher', b.publisher === null ? null : b.publisher || 'Association for Computing Machinery'],
    ['address', b.publisher === null ? null : 'New York, NY, USA'],
    ['doi', p.doi],
    ['url', p.doi ? `https://doi.org/${p.doi}` : null],
  ].filter(([, v]) => v !== undefined && v !== null && v !== '');
  const width = Math.max(...fields.map(([k]) => k.length));
  const body = fields.map(([k, v]) => `  ${k.padEnd(width)} = {${v}}`).join(',\n');
  return `@inproceedings{${key},\n${body}\n}`;
}

// The rotating sentence under "Selected work" ("From what an interface presents to what
// people ___"). Clicking the verb scrolls to its entry, which is highlighted while its verb
// shows. Entries with `ongoing` instead of `paper` appear under "Manuscripts under review".
export const verbs = [
  { key: 'perceive', verb: 'perceive', paper: 'remapping-time' },
  { key: 'motivated', verb: 'are motivated to do', paper: 'reach-unreachable' },
  { key: 'understand', verb: 'understand', paper: 'following-to-understanding' },
  { key: 'learn', verb: 'learn', paper: 'augmented-physics' },
  { key: 'sense', verb: 'make sense of', paper: 'reality-summary' },
  { key: 'infer', verb: 'infer', paper: 'service-robots' },
  { key: 'remember', verb: 'remember', ongoing: 'What people later remember about an annotated physical world.' },
  { key: 'recollect', verb: 'recollect', ongoing: 'What people discover about themselves.' },
  { key: 'feel', verb: 'feel', ongoing: 'How people may feel a virtual environment as part of their own body.' },
];

// Themes under "Selected work". `items` are verb keys.
export const themes = [
  {
    id: 'theme-perception',
    title: 'Perception and motor systems',
    blurb: 'Visual perception, motor control, proprioception, and embodiment: how interfaces reshape what people see, how they move, and what they feel their bodies can do.',
    items: ['perceive', 'motivated'],
  },
  {
    id: 'theme-understanding',
    title: 'Memory, learning, and language',
    blurb: 'Higher cognition: how what an interface says and shows shapes what people understand, learn, and remember.',
    items: ['understand', 'learn', 'sense'],
  },
  {
    id: 'theme-social',
    title: 'Social cognition',
    blurb: 'How people read and signal to others, human or robot, and how interfaces carry connection between people.',
    items: ['infer'],
  },
];

// Verb keys listed under "Manuscripts under review" (kept anonymous while in review).
export const manuscripts = ['remember', 'recollect', 'feel'];
