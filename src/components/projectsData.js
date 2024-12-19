// projectsData.js
export const projectsData = [
  {
    id: "reflective-prompts",
    title: "From Following to Understanding: Investigating the Role of Reflective Prompts in AR-Guided Tasks to Promote Task Understanding",
    description: "Investigating the mindless instruction following behaviors in AR and reflective prompts as a solution.",
    image: require('./chi-25-reflective-prompts.png'),
    tags: ["Augmented Reality", "Instruction Following", "Human Behavior"],
    roles: [
      "As the only student author and project lead, proposed the idea, designed and conducted all the studies, designed and implemented the prototype system, wrote and revised the paper, and made the video"
    ],
    year: "2024",
    overview: `Augmented Reality (AR) is a promising medium for task guidance, enabling users to follow instructions by overlaying contextual digital content onto the physical environment. However, while AR excels at facilitating task completion, it might also encourage users to passively follow instructions step-by-step, which may lead to over-reliance on guidance, limited knowledge retention, and poor transferability of skills. By contrast, human experts and educational systems commonly integrate reflective prompts—contextual questions or statements that provoke critical thinking and deeper engagement with tasks. This paper investigates how reflective prompts can be embedded into AR-guided instructions to bridge the gap between task execution and genuine comprehension.
    Tis paper investigates different types of eflective prompts in AR instructional systems to encourage users to challenge assumptions, connect actions to outcomes, and explore hypothetical scenarios during task completion. `,
    // Add these new fields
    gallery: [
      { src: require('./reflective-prompts-application.png'), caption: "Use Case Exploration" },
      // Add more images as needed
    ],
    videos: [
      { 
        youtubeId: "z3jImdZAPmQ",
        title: "Project Video"
      }
    ],
    paper: {
      pdfUrl: require('./CHI_25_From_Following_to_Understanding_Clean.pdf'),
      title: "Paper Full Text"
    }
  },
  {
    id: "augmented-physics",
    title: "Augmented Physics: Creating Interactive and Embedded Physics Simulations from Static Textbook Diagrams",
    description: "Creating interactive and embedded physics simulations from static textbook diagrams",
    image: require('./uist-24-augmented-physics.png'),
    tags: ["Authoring Tool", "Education"],
    roles: [
      "Conducted the expert study with 12 participants",
      "Contributed to paper writing"
    ],
    year: "2024",
    overview: `This project addresses the challenge of making physics education more interactive and engaging. 
      We developed a system that uses augmented reality to transform static textbook diagrams into 
      interactive 3D simulations, allowing students to manipulate and explore physics concepts in real-time.`,
    gallery: [
      { src: require('./uist-24-agp.png'), caption: "System Overview" },
    ],  // Add your images here
    videos: [
      { 
        youtubeId: "HUgYeA3BKfk?si=CEX8qggZhQujgLrY",
        title: "Demo Video"
      },
      { 
        youtubeId: "FxF4fP1pPGI?si=Ea5zBFBIE9YVTJqR",
        title: "Presentation Video"
      },
    ],   // Add your YouTube video IDs here
    paper: {
      pdfUrl: "https://dl.acm.org/doi/10.1145/3654777.3676392",
      title: "DOI"
    }  // Add your paper details here
  },
  {
    id: "vr-rehabilitation",
    title: "To Reach the Unreachable: Exploring the Potential of VR Hand Redirection for Upper Limb Rehabilitation",
    description: "Using VR hand redirection illusion to motivate upper-limb rehabilitation",
    image: require('./chi-24-to-reach-the-unreachable.png'),
    tags: ["Virtual Reality", "Accessibility", "Perceptual Illusion"],
    roles: ["Developed the prototype system",
      "Helped conduct the study",
      "Created illustration figures in the paper"
    ],
    year: "2023",
    overview: "Rehabilitation therapies are widely employed to assist people with motor impairments in regaining control over their affected body parts. Nevertheless, factors such as fatigue and low self-efficacy can hinder patient compliance during extensive rehabilitation processes. This project explores and contributes to a VR hand illusion approach to create false positive feedback for stroke patients to motivate their rehabilitation.",
    gallery: [
      { src: require('./chi-24-rehab.png'), caption: "Technique Illustration" },
    ],  // Add your images here
    videos: [],   // Add your YouTube video IDs here
    paper: {
      pdfUrl: "https://dl.acm.org/doi/10.1145/3613904.3642912",
      title: "DOI"
    }    // Add your paper details here
  },
  {
    id: "social-robots",
    title: "Signaling Human Intentions to Service Robots: Understanding the Use of Social Cues during In-Person Conversations",
    description: "Investigating how humans use social cues (e.g., gestures, gaze, and verbal signals) to communicate intentions to service robots with varying morphologies during in-person conversations, focusing on minimizing interruptions to primary tasks.",
    image: require('./chi-25-social-robots.png'),
    tags: ["HRI", "Elicitation Study", "Robot Form Factor"],
    roles: [
      "Contributed to qualitative and quantitative coding",
      "Contributed to paper writing"
    ],
    year: "2024",
    overview: `As service robots become increasingly common in public settings like retail and hospitality, understanding how humans naturally signal their intentions to robots is crucial for designing socially acceptable interactions. This study explores the use of social cues—such as gaze, gestures, and vocal signals—when humans interact with four types of robot waiters (anthropomorphic, zoomorphic, grounded technical, and aerial technical) during a simulated coffee chat. By examining how participants (N=24) used these cues as speakers or listeners, the research reveals patterns in cue usage, the influence of robot morphology on cue positioning, and the complexity of social cues based on conversational roles. The findings provide insights into human perceptions of robots, cognitive load, and social context, offering design considerations for enhancing robots’ ability to recognize and respond to social cues effectively.`,
    gallery: [
      { src: require('./chi-25-social-robot-illustration.png'), caption: "Common Codes in Gesture Modality" },
    ],  // Add your images here
    videos: [
    ],   // Add your YouTube video IDs here
    paper: {
      pdfUrl: require('./chi-25-social-robots.pdf'),
      title: "Paper Full Text"
    } // Add your paper details here
  },
  {
    id: "reality-summary",
    title: "RealitySummary: Exploring On-Demand Mixed Reality Text Summarization and Question Answering using Large Language Models",
    description: "Investigating how humans interact with a mixed reality (MR) reading assistant that integrates large language models (LLMs) with always-on camera access, OCR-based text extraction, and augmented spatial outputs to enhance real-world reading experiences.",
    image: require('./chi-25-reality-summary.png'),
    tags: ["Augmented Reality", "LLM", "Reading Assistant"],
    roles: [
      "Help conduct the in-the-wild study",
      "Help implement the system",
      "Contributed to paper writing"
    ],
    year: "2024",
    overview: `RealitySummary combines mixed reality (MR) interfaces and large language models (LLMs) to create an innovative reading assistant designed for real-world use. The system leverages always-on camera functionality, OCR-based text extraction, and spatial and visual augmented responses to provide on-demand content summarization and augmentation. Through iterative development, RealitySummary evolved in three stages: a preliminary user study (N=12) to assess usability and perceptions, an in-the-wild deployment study (N=11) to explore real-world interactions, and a diary study (N=5) to understand long-term adaptation in work contexts. Findings revealed unique benefits of integrating LLMs and MR, such as implicit input, minimal context switching, and spatial affordances, enabling new use cases like summarizing documents, signage, and even bookshelves. This research highlights the potential of MR-LLM systems to move beyond traditional screen-based interactions, offering valuable insights and design considerations for future knowledge work and everyday reading applications.`,
    gallery: [
      { src: require('./study-overview.png'), caption: "Study Overview" },
    ],  // Add your images here
    videos: [
    ],   // Add your YouTube video IDs here
    paper: {
      pdfUrl: require('./chi-25-reality-summary.pdf'),
      title: "Paper Full Text"
    } // Add your paper details here
  },
  // {s
  // {
  //   id: "snap-vr",
  //   title: "SnapVR",
  //   description: "Enabling single-person authoring of human-robot collaboration scenarios in virtual reality",
  //   image: require('./SnapVR.png'),
  //   tags: ["VR", "Robotics", "HRI"],
  //   roles: ["Concept Design", "Implementation", "User Testing"],
  //   year: "2022",
  //   overview: "A system for authoring human-robot collaboration scenarios...",
  //   gallery: [],  // Add your images here
  //   videos: [],   // Add your YouTube video IDs here
  //   paper: null   // Add your paper details here
  // }
];

export default projectsData;