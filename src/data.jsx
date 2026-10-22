import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaLaptopCode,
  FaBrain,
  FaChartBar,
  FaServer,
  FaTools,
  FaUserGraduate,
  FaProjectDiagram,
  FaJava,
  FaPython,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCode, // Safe icon replacement
  FaJs,
  FaTwitter,
  FaRocket
} from 'react-icons/fa';
import {
  SiSpringboot,
  SiMysql,
  SiMongodb,
  SiPandas,
  SiNumpy,
  SiOpencv,
  SiScikitlearn,
  SiGooglecloud,
  SiGit,
  SiLeetcode, 
  SiHackerrank,
  SiBootstrap,
  SiTailwindcss,
  SiJupyter,
  SiMedium,
} from 'react-icons/si';

export const portfolioData = {
  personal: {
    name: 'Aman Sharma',
    role: 'Software Engineer & Data Analyst',
    tagline: [
      'Creating through Curiosity.',
      'Learning by Building.',
      'Growing with Every Challenges.',
    ],
    email: 'amansharma881023@gmail.com',
    phone: '#',
    location: 'Prayagraj, India',
    resumeLink:
      'https://drive.google.com/file/d/1wDSJKERtEUcjpbgpR35BnE0T8tUzqusf/view?usp=drive_link',
    profileImage: '/aman.jpeg',
    social: [
      {
        icon: <FaGithub />,
        link: 'https://github.com/23Amansharma',
        label: 'GitHub',
      },
      {
        icon: <FaLinkedin />,
        link: 'https://www.linkedin.com/in/aman-sharma-4aa314251',
        label: 'LinkedIn',
      },
      {
        icon: <SiHackerrank />,
        link: 'https://www.hackerrank.com/profile/AmanSharma2_3',
        label: 'hackerrank',
      },
      {
        icon: <FaTwitter />,
        link: 'https://x.com/AmanSha57475309',
        label: 'X',
      },
      {
        icon: <SiLeetcode />,
        link: 'https://leetcode.com/u/Aman_Sharma23/',
        label: 'Leetcode',
      },
         { 
  icon: <SiMedium />, 
  link: 'https://23amansharma.medium.com/', 
  label: 'Medium', 
},
      {
        icon: <FaEnvelope />,
        link: 'https://mail.google.com/mail/?view=cm&fs=1&to=amansharma881023@gmail.com',
        label: 'Email',
      },
    ],
  },

  about: {
    title: 'About Me',
    description:
      ' I’m a Computer Science graduate from AKTU with a passion for software development and problem-solving. I build practical applications using Java, Python, React, Next.js, and Spring Boot, with a growing interest in AI-powered solutions. I enjoy turning ideas into functional products and continuously improving my skills by building real-world projects.',
    stats: [
      { label: 'Projects', value: '5+' },
      { label: 'Code Commits', value: '1.1K+' },
      { label: 'Certifications', value: '10+' },
    ],
    highlights: [
      'Data Analyst & AI Enthusiast',
      'Full Stack Developer',
      'Problem Solver ',
      'Continuous Learner',
    ],
  },

  journey: [
    {
      year: '2022 – 2023',
      title: 'B.Tech CSE – Foundation Year',
      subtitle: 'Dr. A.P.J. Abdul Kalam Technical University',
      description:
        'Started Bachelor of Technology in Computer Science & Engineering. Studied core subjects including Engineering Physics, Engineering Mathematics, and Computer Fundamentals as per AKTU curriculum. Built a strong base in computing concepts, logical thinking, and basic programming understanding.',
      icon: 'graduation',
    },

    {
      year: 'Summer 2023',
      title: 'Summer Training & Mini Project',
      subtitle: 'Post First-Year Skill Application',
      description:
        'Completed summer training after first-year examinations. Designed and developed a mini project “Car Rental System”, focusing on basic software development workflow, logic building, and real-world system understanding.',
      icon: 'briefcase',
    },

    {
      year: '2023 – 2024',
      title: 'Python Programming & Automation',
      subtitle: 'SWAYAM Certified Course',
      description:
        'Successfully completed the “Programming in Python” course with a 93% score. Applied concepts practically by building a voice-based assistant (Jarvis-style) capable of executing system commands such as opening applications and YouTube through voice input.',
      icon: 'code',
    },

    {
      year: 'May 2024',
      title: 'Generative AI Skill Badges',
      subtitle: 'Google Cloud',
      description:
        'Earned skill badges for “Develop Generative AI Apps with Gemini and Streamlit” and “Prompt Design in Vertex AI”. Gained hands-on exposure to generative AI concepts, prompt engineering, and AI-driven application development.',
      icon: 'sparkles',
    },

    {
      year: '2024 – 2025',
      title: 'AI, Computer Vision & Front-End Development',
      subtitle: 'Projects, Virtual Internship & Certification',
      description:
        'Developed a Face Recognition Attendance System using computer vision techniques. Completed a Generative AI virtual internship with IBM, working on a Multi-Language Translator project. Also completed a Front-End Development course certified by NSDC through Reliance Foundation.',
      icon: 'brain',
    },

    {
      year: '2025',
      title: 'IoT, Data Analytics & Industry Exposure',
      subtitle: 'Advanced Skill Development',
      description:
        'Completed a 12-week Internet of Things course from NPTEL with Elite certification. Participated in GirlScript Summer Of Code 2025. Earned a Data Analytics certification from IBM SkillsBuild on 30 August 2025. Also completed a Solution Architecture Job Simulation via Forage.',
      icon: 'cpu',
    },

    {
      year: 'September 2025',
      title: 'Digital Applications Fundamentals',
      subtitle: 'NASSCOM',
      description:
        'Completed the Digital Application Fundamentals (STEAM) certification, strengthening understanding of digital systems, application design basics, and industry-relevant technology concepts.',
      icon: 'layers',
    },

    {
      year: '2025 – 2026',
title: 'Final Year & Career Preparation',
subtitle: 'B.Tech CSE – Final Phase',
description:
  'Currently in the final year of B.Tech CSE. Focused on consolidating skills in AI, Data Analytics, IoT, and software development. Developed InterviewAI — an AI-powered interview preparation assistant as a final year project, aimed at enhancing real-time interview practice, analysis, and career readiness while preparing for placements and real-world technical roles.',
icon: 'target',
    },
    {
  year: '2026 – Present',
  title: 'Building, Learning & Exploring',
  subtitle: 'Software Development | AI | Problem Solving',
  description:
    'Currently focused on strengthening my software development and problem-solving skills while preparing for GATE 2027. Building AI-powered applications, exploring modern technologies, and practicing Data Structures and Algorithms. Also working on personal projects and exploring ideas around entrepreneurship, with a long-term vision of building impactful products of my own.',
  icon: 'target',
},
  ],

  // 5 Categories as requested
  skills: {
    programming: [
      {
        name: 'Python',
        icon: <FaPython className="text-blue-400" />,
        level: 62,
      },
      {
        name: 'Core Java',
        icon: <FaJava className="text-red-500" />,
        level: 70,
      },
      {
        name: 'C ',
        icon: <FaCode className="text-blue-600" />,
        level: 75,
      },
      {
        name: 'JavaScript',
        icon: <FaJs className="text-yellow-400" />,
        level: 70,
      },
    ],

    frontend: [
      {
        name: 'HTML5 / CSS3',
        icon: <FaHtml5 className="text-orange-500" />,
        level: 95,
      },
      {
        name: 'React.js',
        icon: <FaReact className="text-cyan-400" />,
        level: 85,
      },
      {
        name: 'Bootstrap',
        icon: <SiBootstrap className="text-purple-600" />,
        level: 70,
      },
      {
        name: 'Tailwind CSS',
        icon: <SiTailwindcss className="text-teal-400" />,
        level: 65,
      },
    ],

    backend: [
      {
        name: 'Python (Backend & Automation)',
        icon: <FaPython className="text-blue-400" />,
        level: 77,
      },
      {
        name: 'Node.js',
        icon: <FaNodeJs className="text-green-500" />,
        level: 75,
      },
      {
        name: 'Spring Boot',
        icon: <SiSpringboot className="text-green-600" />,
        level: 60,
      },
      { name: 'MySQL', icon: <SiMysql className="text-blue-500" />, level: 85 },
      {
        name: 'MongoDB',
        icon: <SiMongodb className="text-green-400" />,
        level: 80,
      },
    ],

    dataAnalytics: [
      {
        name: 'Pandas & NumPy',
        icon: <SiPandas className="text-purple-600" />,
        level: 75,
      },
      {
        name: 'Data Visualization',
        icon: <FaChartBar className="text-pink-500" />,
        level: 80,
      },
      {
        name: 'Scikit-Learn',
        icon: <SiScikitlearn className="text-orange-400" />,
        level: 47,
      },
      {
        name: 'OpenCV',
        icon: <SiOpencv className="text-green-500" />,
        level: 49,
      },
    ],

    toolsAiCloud: [
      {
        name: 'Git & GitHub',
        icon: <SiGit className="text-red-500" />,
        level: 80,
      },
      {
        name: 'VS Code',
        icon: <FaCode className="text-blue-500" />,
        level: 95,
      },
      {
        name: 'Generative AI',
        icon: <FaBrain className="text-cyan-400" />,
        level: 70,
      },
      {
        name: 'Google Cloud',
        icon: <SiGooglecloud className="text-yellow-400" />,
        level: 60,
      },
      {
        name: 'Jupyter/Colab',
        icon: <SiJupyter className="text-orange-600" />,
        level: 90,
      },
    ],
  },
  projects: [
    {
      id: 1,
      title: 'Intivolution-AI Interview',
      category: 'Data/AI',
      description:
        'AI-based interview assistance system focused on analyzing interview responses using NLP techniques and basic data analytics to provide structured feedback.',
      tech: ['Next.js 14', 'Gemini AI', 'Clerk, NeonDB', 'Drizzle ORM'],
      outcome:
        'Helped automate basic interview feedback and suggestion generation based on keywords and response structure.',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
      repoLink: 'https://github.com/23Amansharma/Multimodel_Explainable-AI',
      liveLink: 'https://xai-interview-preparation.vercel.app/',
      videoLink: '#',
    },

    {
      id: 2,
      title: 'Face Recognition Attendance System',
      category: 'Data/AI',
      description:
        'AI-based attendance system that detects and recognizes faces in real time to automate attendance marking.',
      tech: [
        'Python',
        'OpenCV',
        'CNN',
        'SVM',
        'FaceNet',
        'Haar Cascades',
        'MySQL',
      ],
      outcome:
        'Automated attendance process and reduced manual effort while improving accuracy.',
      image:
        'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?auto=format&fit=crop&q=80&w=800',
      repoLink: 'https://github.com/23Amansharma/Face-Recognition-Attendance-System-',
      liveLink: '#',
      videoLink: '#',
    },

    {
      id: 3,
      title: 'Multilingual Translator',
      category: 'Data/AI',
      description:
        'Generative AI-based multilingual translation application built using Hugging Face Transformers to support translation across multiple languages.',
      tech: ['Python', 'Hugging Face', 'Transformers', 'Gradio'],
      outcome:
        'Enabled accurate text translation for multiple languages with a simple web-based interface.',
      image:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      repoLink: 'https://github.com/23Amansharma/Multi_Lang_Translater_ibm',
      liveLink:
        'https://huggingface.co/spaces/Amansharma23/Multi_Lang_Translater_ibm',
      videoLink: '#',
    },

    {
  id: 4,
  title: 'GetSmark - Smart Task Manager',
  category: 'Full Stack',
  description:
    'A full-stack team task management application with OTP-based email authentication, project creation, task assignment, and real-time email notifications for team collaboration.',
  tech: ['React', 'Vite', 'Spring Boot', 'Java', 'MongoDB', 'JWT', 'Brevo API', 'Railway', 'Vercel'],
  outcome:
    'Gained hands-on experience in full-stack development, REST API design, JWT authentication, email integration, and cloud deployment with custom domain configuration.',
  image:
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800',
  repoLink: 'https://github.com/23Amansharma/GetSmark---TaskManager',
  liveLink: 'https://getsmark.app',
  videoLink: 'https://drive.google.com/file/d/15fi8LY1bShE5Uxta1eo8eXhOzFJ4QNar/view?usp=drive_link',
},

    {
      id: 5,
      title: 'Jarvis Voice Assistant',
      category: 'Automation/AI',
      description:
        'Python-based voice assistant capable of executing basic voice commands such as opening applications and YouTube.',
      tech: ['Python', 'Speech Recognition', 'Automation'],
      outcome:
        'Strengthened understanding of Python automation and voice-based command handling.',
      image:
        'voice.png',
      repoLink: '#',
      liveLink: '#',
      videoLink: '#',
    },
  ],

  // ✅ FIXED: Changed 'Certificates' to 'certificates' (lowercase c)
  certificates: [
    {
      title: 'Gen AI 6 Weeks Internship',
      issuer: 'IBM / MOOC',
      date: 'Sept 2025',
      link: 'https://drive.google.com/file/d/1CJ9Rj1nEUi3rdhmdjpixQQ4zrDo9Cdu2/view?usp=drivesdk',
      color: 'text-blue-500',
    },
    {
      title: 'Data Analytics',
      issuer: 'IBM SkillsBuild',
      date: 'Aug 2025',
      link: 'https://www.credly.com/badges/4eaefabb-4782-4002-b781-21389df619f6',
      color: 'text-blue-400',
    },
    {
      title: 'Introduction to Cyber Security',
      issuer: 'Cisco Academy',
      date: 'Aug 2025',
      link: 'https://drive.google.com/file/d/14qM7hidUlgwei5Faf-x561na05h97ZdV/view?usp=drivesdk',
      color: 'text-cyan-400',
    },
    {
      title: 'Frontend Web Development',
      issuer: 'NSDC / Reliance',
      date: 'July 2025',
      link: 'https://drive.google.com/file/d/1lqu7Z7FOlJu8Ojb_0IbB8ejWgcVHw8BG/view?usp=drivesdk',
      color: 'text-orange-400',
    },
    {
      title: 'HTML5',
      issuer: 'Infosys Springboard',
      date: 'July 2025',
      link: 'https://drive.google.com/file/d/1eLp50XKsV0fZ8QXHM1yF-y01cFjA8Lue/view?usp=drivesdk',
      color: 'text-orange-500',
    },
    {
      title: 'Advanced Software Eng. Job Sim',
      issuer: 'Forage (Walmart USA)',
      date: 'June 2025',
      link: 'https://drive.google.com/file/d/1TAROnoQIr30VEISL2TBoEzTZr89T_kUE/view?usp=drivesdk',
      color: 'text-blue-300',
    },
    {
      title: 'Cybersecurity Analyst Job Sim',
      issuer: 'Forage (Tata Group)',
      date: 'June 2025',
      link: 'https://drive.google.com/file/d/1tDKa7Jd_EOU8WmSpkdlTr1MjRxHU9ssu/view?usp=drivesdk',
      color: 'text-purple-400',
    },
    {
      title: 'Data Analytics Job Sim',
      issuer: 'Forage',
      date: 'June 2025',
      link: 'https://drive.google.com/file/d/19W--ghN12ho5nqtu_mD5xz2v4Y39zV5x/view?usp=drivesdk',
      color: 'text-blue-400',
    },
    {
      title: 'AWS APAC Solution Arch. Sim',
      issuer: 'Forage',
      date: 'June 2025',
      link: 'https://drive.google.com/file/d/1-L77YZnM6LVpGthv1BZG2wsCQ1KExm_y/view?usp=drivesdk',
      color: 'text-yellow-500',
    },
    {
      title: 'IoT (Elite Grade)',
      issuer: 'NPTEL (IIT Kharagpur)',
      date: 'Jan-Apr 2025',
      link: 'https://drive.google.com/file/d/1_PN4ZLFHpmlZNMNABbUHoFRER_n5CB3h/view?usp=drivesdk',
      color: 'text-red-400',
    },
    {
      title: 'Programming in Python',
      issuer: 'Swayam (Dibrugarh Univ)',
      date: 'Jan 2025',
      link: 'https://drive.google.com/file/d/1_OxaeEcRZeu0EQf1OgJIm8WFkcqCirOW/view?usp=drivesdk',
      color: 'text-yellow-400',
    },
    {
      title: 'Develop GenAI Apps (Gemini)',
      issuer: 'Google Cloud',
      date: 'May 2024',
      link: 'https://www.credly.com/badges/6ada3f3b-c688-4132-beb2-d94482ee83d3',
      color: 'text-green-400',
    },
    {
      title: 'Prompt Design in Vertex AI',
      issuer: 'Google Cloud',
      date: 'May 2024',
      link: 'https://www.credly.com/badges/29c7abe6-d389-4f71-a104-5bfc2e22b9ae',
      color: 'text-green-400',
    },
    {
      title: 'Core Java Summer Training',
      issuer: 'UGI',
      date: 'Aug 2023',
      link: 'https://drive.google.com/file/d/1M8o0JJnOj9KXxlaSv2hMlTMI5jczM80-/view?usp=drivesdk',
      color: 'text-red-500',
    },
  ],

  feedback: [
    {
      id: 1,
      name: 'Aniket kumar',
      role: 'System Engineer',
      text: 'Aman demonstrates exceptional analytical skills. His approach to the Face Recognition project showed deep understanding of CNNs.',
      image:
        'img1.png',
    },
    {
      id: 2,
      name: 'Shreya Sharma',
      role: 'Technical Lead',
      text: 'Highly adaptable and quick learner. Delivered the technical modules ahead of schedule with clean, documented code.',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    },
  ],
  // Paste this INSIDE portfolioData, just after the feedback array
 blogs: [
    {
      id: 1,
      title: 'What Responsibility Taught Me About Life',
      date: '2026',
      excerpt:
        'Reflections on how taking ownership and responsibility changes your perspective on life and personal growth.',
      image:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
      link: 'https://23amansharma.medium.com/what-responsibility-taught-me-about-life-02d2461e63d5',
    },
    {
      id: 2,
      title: 'Is a Job the Ultimate Goal of Life?',
      date: '2026',
      excerpt:
        'Questioning traditional career milestones and looking deeper into purpose beyond standard employment.',
      image:
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
      link: 'https://23amansharma.medium.com/is-a-job-the-ultimate-goal-of-life-6ba1d20af7fd',
    },
  ],
};




