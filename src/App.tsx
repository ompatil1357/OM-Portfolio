import { useEffect, useState } from 'react';
import './App.css';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './pages/Footer';
import Hero from './pages/Hero';
import Project from './pages/project';
// import Service from './pages/Service';
import Header from './components/Header';
import Loader from './components/Loader';
import SimpleLogoLoop from './components/SimpleLogoLoop';

type NavItem = {
  id: string;
  label: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'fa-solid fa-house' },
  { id: 'about', label: 'About', icon: 'fa-regular fa-address-card' },
  { id: 'project', label: 'Projects', icon: 'fa-regular fa-folder-open' },
  // { id: 'services', label: 'Services', icon: 'fa-solid fa-code' },
  { id: 'contact', label: 'Contact', icon: 'fa-regular fa-envelope' },
];

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('portfolio-theme');
    if (stored === 'light' || stored === 'dark') {
      return stored as Theme;
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }

  return 'light';
};

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('portfolio-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    if (loading) {
      return;
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>('section'));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { threshold: [0.3, 0.6] }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active-reveal');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'));
    revealElements.forEach((el) => revealObserver.observe(el));

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      sections.forEach((section) => sectionObserver.unobserve(section));
      sectionObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  const handleNavigate = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div id="main-page" className="main-page visible">
          <Header 
            navItems={NAV_ITEMS}
            activeSection={activeSection}
            theme={theme}
            onNavigate={handleNavigate}
            onThemeToggle={handleThemeToggle}
          />

          <main>
            <Hero />

            {/* Tech Stack Section */}
            <div style={{ 
              width: '100%',
              padding: '2rem 0',
              margin: '0'
            }}>
              <SimpleLogoLoop 
                logos={[
                  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
                  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript' },
                  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', alt: 'JavaScript' },
                  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js' },
                  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python' },
                  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', alt: 'MongoDB' },
                  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', alt: 'PostgreSQL' },
                  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', alt: 'Docker' },
                ]}
              />
            </div>
            
            <About />
            <Project />
            {/* <Service /> */}
            <Contact />
          </main>

          <Footer />

          {showBackToTop && (
            <button id="back-to-top" type="button" onClick={handleBackToTop} aria-label="Back to top">
              <i className="fa-solid fa-chevron-up" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default App;