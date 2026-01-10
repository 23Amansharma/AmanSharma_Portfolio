import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from './data';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaPlay,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaLinkedin,
  FaArrowUp,
  FaClock,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaLaptopCode,
  FaServer,
  FaTools,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaBrain,
  FaChartBar,
  FaCheckCircle,
  FaStar,
  FaAward, // Added Award Icon
} from 'react-icons/fa';

// --- CUSTOM HOOKS ---

const useTypewriter = (textArray, speed = 100, pause = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (index === textArray.length) return;

    if (subIndex === textArray[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), pause);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % textArray.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : speed, parseInt(Math.random() * 50)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, textArray, speed, pause]);

  useEffect(() => {
    setDisplayText(textArray[index].substring(0, subIndex));
  }, [subIndex, index, textArray]);

  return { displayText, blink };
};

// --- COMPONENTS ---

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const isSmall = width < 640; // reduce for phones
      const density = isSmall ? 12000 : 5000;
      const numStars = Math.floor((width * height) / density);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random(),
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'white';

      stars.forEach((star) => {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-30"
    />
  );
};

const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const handleTouch = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const { clientX, clientY } = touch;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.12, y: middleY * 0.12 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;
  return (
    <motion.button
      ref={ref}
      className={className}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={reset}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 p-4 bg-cyan-600 text-white rounded-full shadow-lg hover:bg-cyan-500 transition-all hover:scale-110"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // UPDATED NAV LINKS with Certificates
  const navLinks = [
    'About',
    'Journey',
    'Skills',
    'Projects',
    'Certificates',
    'Blog',
    'Contact',
  ];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left z-[60]"
        style={{ scaleX }}
      />
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a
            href="#"
            className="text-2xl font-bold text-white tracking-tighter flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center text-sm group-hover:rotate-12 transition-transform shadow-lg shadow-cyan-500/20">
              AS
            </div>
            <span>{portfolioData.personal.name}</span>
          </a>

          <div className="hidden md:flex gap-6 items-center text-sm font-medium text-slate-300">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-cyan-400 relative group transition-colors px-2 py-1"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 transition-all group-hover:w-full"></span>
              </a>
            ))}
            <MagneticButton
              className="px-6 py-2.5 bg-white text-slate-900 rounded-full font-bold hover:bg-cyan-50 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              onClick={() =>
                document
                  .getElementById('contact')
                  .scrollIntoView({ behavior: 'smooth' })
              }
            >
              Hire Me
            </MagneticButton>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-950 border-b border-slate-800 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((item, idx) => (
                  <motion.a
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="text-slate-300 hover:text-cyan-400 text-xl font-medium border-l-2 border-transparent hover:border-cyan-500 pl-4 transition-all"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

const Hero = () => {
  const { displayText, blink } = useTypewriter(portfolioData.personal.tagline);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 px-4 sm:px-6 lg:px-16 pt-24">
      
      {/* Background Blobs */}
      <div className="absolute -top-32 -right-32 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute -bottom-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-2 gap-8 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 border border-cyan-500/30 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
            System Online
          </div>

          <h1 className="font-black text-white leading-tight tracking-tight
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6">
            Think <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
              Execute
            </span>
            <br />
            Deploy
          </h1>

          {/* TYPEWRITER */}
          <div className="h-14 sm:h-16 mb-6">
            <p className="text-base sm:text-xl md:text-2xl text-slate-400 font-mono">
              I am{' '}
              <span className="text-white font-bold">{displayText}</span>
              <span
                className={`inline-block w-2 h-6 ml-1 bg-cyan-500 align-middle ${
                  blink ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </p>
          </div>

          {/* BUTTONS + SOCIAL */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mt-8 justify-center md:justify-start">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <MagneticButton className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold transition-all hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]">
                Download Resume
              </MagneticButton>
            </a>

            <div className="flex items-center gap-5 sm:border-l sm:border-slate-700 sm:pl-6 justify-center">
              {portfolioData.personal.social.map((s, i) => (
                <a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white text-xl sm:text-2xl transition-all hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE (VISIBLE on mobile now; responsive sizing) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <motion.div
            whileHover={{ rotateY: 8, rotateX: -8 }}
            className="relative w-[260px] sm:w-[300px] lg:w-[360px] h-[340px] sm:h-[420px] lg:h-[480px]
              bg-slate-900 rounded-2xl border border-slate-700 p-2 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-2xl" />
            <img
              src={portfolioData.personal.profileImage}
              alt="Profile"
              sizes="(max-width: 640px) 70vw, 360px"
              srcSet={`${portfolioData.personal.profileImage} 1x`}
              className="relative z-10 w-full h-full object-cover object-[50%_37%] rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
            />

            {/* FLOATING BADGES */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-10 bottom-30 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl z-20 hidden md:flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <FaLaptopCode />
              </div>
              <div>
                <p className="text-xs text-slate-400">Experience</p>
                <p className="text-white font-bold">Fresher</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -left-10 bottom-30 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl z-20 hidden md:flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white">
                <FaCheckCircle />
              </div>
              <div>
                <p className="text-xs text-slate-400">Projects</p>
                <p className="text-white font-bold">Progress</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
const About = () => {
  return (
    <section id="about" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Who is <span className="text-cyan-500">Aman?</span>
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            {portfolioData.about.description}
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            {portfolioData.about.highlights.map((item, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-slate-800 rounded-full text-sm text-cyan-300 border border-slate-700"
              >
                # {item}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-6">
            {portfolioData.about.stats.map((stat, i) => (
              <div
                key={i}
                className="text-center p-4 bg-slate-950 rounded-xl border border-slate-800"
              >
                <h3 className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs text-slate-500 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative w-full aspect-square bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-700 p-8 flex flex-col justify-center shadow-2xl">
            <FaBrain className="text-9xl text-slate-800 absolute top-4 right-4" />
            <div className="space-y-4 relative z-10 font-mono text-sm">
              <div className="flex gap-4 text-slate-500">
                <span>01</span>
                <span className="text-purple-400">class</span>
                <span className="text-yellow-300">Aspiring Software Engineer</span>
                <span className="text-slate-200">{`{`}</span>
              </div>
              <div className="flex gap-4 text-slate-500 pl-8">
                <span>02</span>
                <span className="text-purple-400">constructor</span>
                <span className="text-slate-200">() {`{`}</span>
              </div>
              <div className="flex gap-4 text-slate-500 pl-16">
                <span>03</span>
                <span className="text-blue-400">this</span>.name ={' '}
                <span className="text-green-400">"Aman Sharma"</span>;
              </div>
              <div className="flex gap-4 text-slate-500 pl-16">
                <span>04</span>
                <span className="text-blue-400">this</span>.skills = [
                <span className="text-green-400">"Gen AI"</span>,{' '}
                <span className="text-green-400">"Full-Stack Dev"</span>];
              </div>
              <div className="flex gap-4 text-slate-500 pl-8">
                <span>05</span>
                <span className="text-slate-200">{`}`}</span>
              </div>
              <div className="flex gap-4 text-slate-500">
                <span>06</span>
                <span className="text-slate-200">{`}`}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Journey = () => {
  return (
    <section
      id="journey"
      className="py-24 bg-slate-950 relative overflow-hidden"
    >
      <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-purple-500">Journey</span>
          </h2>
          <p className="text-slate-400">From Hello World to Full-Stack Developer.</p>
        </div>

        <div className="space-y-12">
          {portfolioData.journey.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`flex items-center gap-8 ${
                idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse text-right'
              }`}
            >
              <div
                className={`w-1/2 ${
                  idx % 2 === 0 ? 'text-right' : 'text-left'
                }`}
              >
                <div className="text-cyan-400 font-mono text-xl font-bold mb-2">
                  {item.year}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {item.title}
                </h3>
                <span className="inline-block px-3 py-1 rounded-full bg-slate-900 text-xs text-slate-300 border border-slate-700 mb-3">
                  {item.subtitle}
                </span>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="relative flex items-center justify-center w-16">
                <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,1)] z-10"></div>
                <div className="absolute w-12 h-12 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-slate-400 -z-0">
                  {item.icon === 'graduation' && <FaGraduationCap />}
                  {item.icon === 'briefcase' && <FaBriefcase />}
                  {item.icon === 'code' && <FaCode />}
                  {item.icon === 'brain' && <FaBrain />}
                </div>
              </div>

              <div className="w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState('programming');

  const tabs = [
    { id: 'programming', label: 'Languages', icon: <FaCode /> },
    { id: 'dataAnalytics', label: 'Data Analytics', icon: <FaChartBar /> },
    { id: 'frontend', label: 'Frontend', icon: <FaLaptopCode /> },
    { id: 'backend', label: 'Backend & DB', icon: <FaServer /> },
    { id: 'toolsAiCloud', label: 'Tools, AI & Cloud', icon: <FaTools /> },
  ];

  return (
    <section id="skills" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tech <span className="text-purple-500">Arsenal</span>
          </h2>
          <p className="text-slate-400">
            Comprehensive skill set across Development, Data, and AI.
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {portfolioData.skills[activeTab]?.map((skill, idx) => (
            <div
              key={idx}
              className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-3xl p-3 bg-slate-950 rounded-xl group-hover:scale-110 transition-transform text-slate-200">
                  {skill.icon}
                </div>
                <span className="text-lg font-bold text-cyan-500">
                  {skill.level}%
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {skill.name}
              </h3>

              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Data/AI', 'Software'];

  const filteredProjects =
    filter === 'All'
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Selected <span className="text-cyan-500">Work</span>
            </h2>
            <p className="text-slate-400">
              Solving complex problems with code.
            </p>
          </div>

          <div className="flex gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-cyan-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-2 flex flex-col h-full shadow-lg"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a
                      href={project.videoLink}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:scale-110 transition"
                    >
                      <FaPlay />
                    </a>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-cyan-400 text-xs font-bold rounded-full border border-slate-700">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-auto mb-4 bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <p className="text-xs text-green-400 font-bold mb-1">
                      IMPACT:
                    </p>
                    <p className="text-xs text-slate-300">{project.outcome}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-slate-900 text-xs text-slate-300 rounded border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center border-t border-slate-800 pt-4 mt-auto">
                    <a
                      href={project.repoLink}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
                    >
                      <FaGithub /> Code
                    </a>
                    <a
                      href={project.liveLink}
                      className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition"
                    >
                      Live Demo <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

// CERTIFICATES SECTION
const Certificates = () => {
  return (
    <section
      id="certificates"
      className="py-24 bg-slate-950 border-t border-slate-800 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-cyan-500">Certifications</span>
          </h2>
          <p className="text-slate-400">
            Validating skills with global standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.certificates.map((cert, idx) => (
            <motion.a
              key={idx}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-2 flex flex-col items-center text-center shadow-lg"
            >
              <div
                className={`w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center text-3xl mb-6 ${cert.color} group-hover:scale-110 transition-transform shadow-md`}
              >
                <FaAward />
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {cert.title}
              </h3>
              <p className="text-sm text-slate-400 mb-1">{cert.issuer}</p>
              <span className="text-xs text-slate-500 font-mono border border-slate-800 px-2 py-1 rounded">
                {cert.date}
              </span>

              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Feedback = () => {
  const [current, setCurrent] = useState(0);
  const total = portfolioData.feedback.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl font-bold text-white mb-12">
          Mentor <span className="text-cyan-500">Feedback</span>
        </h2>

        <div className="relative bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex justify-center mb-6 text-yellow-500 gap-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <img
                src={portfolioData.feedback[current].image}
                alt="Mentor"
                className="w-20 h-20 rounded-full border-2 border-cyan-500 mb-6 object-cover"
              />
              <p className="text-xl md:text-2xl text-slate-300 italic mb-8 leading-relaxed">
                "{portfolioData.feedback[current].text}"
              </p>
              <div>
                <h4 className="text-white font-bold text-lg">
                  {portfolioData.feedback[current].name}
                </h4>
                <p className="text-cyan-500 text-sm">
                  {portfolioData.feedback[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-slate-950 text-white hover:bg-cyan-600 transition border border-slate-800"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full bg-slate-950 text-white hover:bg-cyan-600 transition border border-slate-800"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Blogs = () => (
  <section id="blog" className="py-24 bg-slate-900 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          Tech <span className="text-purple-500">Insights</span>
        </h2>
        <p className="text-slate-400">Exploring AI, Data, and System Design.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {portfolioData.blogs.map((blog) => (
          <div
            key={blog.id}
            className="group bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all shadow-lg"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3 text-xs text-slate-500">
                <span className="text-cyan-400 font-bold">{blog.category}</span>
                <span className="flex items-center gap-1">
                  <FaClock /> {blog.readTime}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                {blog.excerpt}
              </p>
              <a
                href={blog.link}
                className="inline-flex items-center gap-2 text-sm font-bold text-white hover:gap-3 transition-all"
              >
                Read Article <FaArrowRight />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  return (
    <section id="contact" className="pt-14 pb-24 bg-slate-950 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Open to <span className="text-cyan-500">Opportunities</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Actively seeking entry level-roles or internships as a{' '}
            <strong>
              Software Engineer , Data Analyst , or AI Intern
            </strong>
            .
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="w-12 h-12 bg-cyan-500/20 text-cyan-500 rounded-lg flex items-center justify-center text-2xl">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email Me</p>
                <p className="text-white font-bold text-lg">
                  {portfolioData.personal.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-500 rounded-lg flex items-center justify-center text-2xl">
                <FaLinkedin />
              </div>
              <div>
                <p className="text-sm text-slate-500">Connect</p>
                <p className="text-white font-bold text-lg">LinkedIn Profile</p>
              </div>
            </div>
          </div>
        </div>

        <form
          action="https://formspree.io/f/xnjnekgw"
          method="POST"
          className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 ml-1">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full mt-1 px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
                placeholder="Recruiter Name"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 ml-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full mt-1 px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
                placeholder="recruiter@company.com"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 ml-1">Message</label>
              <textarea
                rows="4"
                name="message"
                required
                className="w-full mt-1 px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition resize-none"
                placeholder="Hi Aman, we have an opening for Data Analyst..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-lg transition-all bg-gradient-to-r from-cyan-600 to-purple-600 hover:shadow-lg text-white transform active:scale-95"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 border-t border-slate-800 py-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {portfolioData.personal.name}
        </h3>
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()}. Aspiring Software Engineer | AI and  Web Development.
        </p>
      </div>
      <div className="flex gap-4">
        {portfolioData.personal.social.map((s, i) => (
          <a
            key={i}
            href={s.link}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:bg-white hover:text-black transition-all"
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="bg-slate-950 min-h-screen w-full overflow-x-hidden text-white font-sans selection:bg-cyan-500 selection:text-white cursor-none-md">
      {/* Custom Cursor only on Desktop */}
      <div className="hidden md:block">
        <div
          className="fixed top-0 left-0 w-4 h-4 bg-cyan-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
          id="cursor-dot"
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Starfield />
        <Navbar />
        <Hero />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <Certificates />
        <Blogs />
        <Feedback />
        <Contact />
        <Footer />
        <ScrollToTop />
      </motion.div>
    </div>
  );
}

export default App;
