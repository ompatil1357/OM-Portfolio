import { gsap } from 'gsap';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface HeaderProps {
  navItems: NavItem[];
  activeSection: string;
  theme: 'light' | 'dark';
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  onThemeToggle: () => void;
}

/**
 * Header Component with Premium Navigation Menu
 * 
 * Features:
 * - Smooth hamburger menu animation with GSAP
 * - Premium glassmorphism UI design
 * - Theme-aware styling (light/dark)
 * - Responsive navigation cards
 */
const Header: React.FC<HeaderProps> = ({
  navItems,
  activeSection,
  theme,
  onNavigate,
  onThemeToggle
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  // Prevent rapid toggling which causes glitches
  const [isAnimating, setIsAnimating] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);
  const collapsedHeightRef = useRef<number>(0);

  // Measure initial collapsed height on mount
  useLayoutEffect(() => {
    if (navRef.current) {
      collapsedHeightRef.current = navRef.current.offsetHeight;
    }
  }, []);

  /**
   * Calculate the expanded height of the menu
   * Measures content height dynamically
   */
  const calculateExpandedHeight = useCallback(() => {
    const navEl = navRef.current;
    const contentEl = contentRef.current;
    if (!navEl || !contentEl) return collapsedHeightRef.current + 200;

    // Temporarily make content visible to measure
    const wasDisplay = contentEl.style.display;
    const wasVisibility = contentEl.style.visibility;
    const wasPosition = contentEl.style.position;

    contentEl.style.display = 'grid';
    contentEl.style.visibility = 'hidden';
    contentEl.style.position = 'absolute';

    const contentHeight = contentEl.scrollHeight;

    // Restore styles
    contentEl.style.display = wasDisplay;
    contentEl.style.visibility = wasVisibility;
    contentEl.style.position = wasPosition;

    return collapsedHeightRef.current + contentHeight + 24;
  }, []);

  /**
   * Toggle menu open/close with smooth GSAP animations
   * Prevents glitches by:
   * 1. Blocking rapid toggle calls during animation
   * 2. Disabling CSS transitions during GSAP animation
   * 3. Using proper animation sequencing
   */
  const toggleMenu = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl || isAnimating) return; // Block if already animating

    // Lock animation state to prevent rapid toggling
    setIsAnimating(true);

    // CRITICAL: Disable CSS transitions to prevent conflict with GSAP
    navEl.style.transition = 'none';

    // Kill any existing animations immediately
    gsap.killTweensOf(navEl);
    cardsRef.current.forEach(card => {
      if (card) gsap.killTweensOf(card);
    });

    if (!isExpanded) {
      // ==========================================
      // OPENING ANIMATION
      // ==========================================

      // Measure current collapsed height BEFORE any changes
      collapsedHeightRef.current = navEl.offsetHeight;

      // Update visual states
      setIsHamburgerOpen(true);
      setIsExpanded(true);

      const targetHeight = calculateExpandedHeight();

      // Create smooth opening timeline
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          // Re-enable transitions after animation (optional)
        }
      });

      // Animate container expansion
      tl.to(navEl, {
        height: targetHeight,
        borderRadius: '24px',
        maxWidth: '800px',
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      // Stagger animate cards appearing
      tl.to(cardsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.05,
        overwrite: 'auto'
      }, '-=0.2');

    } else {
      // ==========================================
      // CLOSING ANIMATION - SMOOTH & GLITCH-FREE
      // ==========================================

      // Update hamburger icon state immediately for visual feedback
      setIsHamburgerOpen(false);

      // Get the target collapsed height
      const targetHeight = collapsedHeightRef.current;

      // Create smooth closing timeline
      const tl = gsap.timeline({
        onStart: () => {
          // Ensure nav element is in a good state
          navEl.style.overflow = 'hidden';
        },
        onComplete: () => {
          // Reset states after animation completes
          setIsExpanded(false);
          setIsAnimating(false);

          // Clear GSAP inline styles and restore CSS control
          if (navEl) {
            gsap.set(navEl, { clearProps: 'height,borderRadius,maxWidth,overflow' });
          }
          // Reset card transforms for next opening
          cardsRef.current.forEach(card => {
            if (card) {
              gsap.set(card, { clearProps: 'transform,opacity' });
            }
          });
        }
      });

      // Phase 1: Fade out cards quickly (simultaneously)
      tl.to(cardsRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.15,
        ease: 'power2.in',
        overwrite: 'auto'
      });

      // Phase 2: Collapse container smoothly
      tl.to(navEl, {
        height: targetHeight,
        borderRadius: '999px',
        maxWidth: '540px',
        duration: 0.35,
        ease: 'power2.inOut',
        overwrite: 'auto'
      }, '-=0.05'); // Slight overlap for smoother transition
    }
  }, [isExpanded, isAnimating, calculateExpandedHeight]);

  // Handle window resize
  useLayoutEffect(() => {
    const handleResize = () => {
      if (isExpanded && navRef.current && !isAnimating) {
        const newHeight = calculateExpandedHeight();
        gsap.to(navRef.current, { height: newHeight, duration: 0.2, ease: 'power2.out' });
      } else if (!isExpanded && navRef.current) {
        gsap.set(navRef.current, { height: 'auto' });
        collapsedHeightRef.current = navRef.current.offsetHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded, isAnimating, calculateExpandedHeight]);

  // Icon descriptions for each nav item (for premium UI)
  const getItemDescription = (id: string): string => {
    const descriptions: Record<string, string> = {
      'home': 'Start here',
      'about': 'Know me',
      'project': 'My work',
      'contact': 'Get in touch',
      'services': 'What I offer',
      'skills': 'My expertise'
    };
    return descriptions[id] || 'Explore';
  };

  // Get gradient colors for each card (premium design)
  const getCardGradient = (index: number, isDark: boolean): string => {
    const lightGradients = [
      'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
      'linear-gradient(135deg, #f093fb15 0%, #f5576c15 100%)',
      'linear-gradient(135deg, #4facfe15 0%, #00f2fe15 100%)',
      'linear-gradient(135deg, #43e97b15 0%, #38f9d715 100%)',
      'linear-gradient(135deg, #fa709a15 0%, #fee14015 100%)',
      'linear-gradient(135deg, #a18cd115 0%, #fbc2eb15 100%)'
    ];
    const darkGradients = [
      'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
      'linear-gradient(135deg, #f093fb20 0%, #f5576c20 100%)',
      'linear-gradient(135deg, #4facfe20 0%, #00f2fe20 100%)',
      'linear-gradient(135deg, #43e97b20 0%, #38f9d720 100%)',
      'linear-gradient(135deg, #fa709a20 0%, #fee14020 100%)',
      'linear-gradient(135deg, #a18cd120 0%, #fbc2eb20 100%)'
    ];
    const gradients = isDark ? darkGradients : lightGradients;
    return gradients[index % gradients.length];
  };

  // Get accent color for icon background
  const getAccentColor = (index: number, isDark: boolean): string => {
    const lightColors = [
      'rgba(102, 126, 234, 0.15)',
      'rgba(240, 147, 251, 0.15)',
      'rgba(79, 172, 254, 0.15)',
      'rgba(67, 233, 123, 0.15)',
      'rgba(250, 112, 154, 0.15)',
      'rgba(161, 140, 209, 0.15)'
    ];
    const darkColors = [
      'rgba(102, 126, 234, 0.25)',
      'rgba(240, 147, 251, 0.25)',
      'rgba(79, 172, 254, 0.25)',
      'rgba(67, 233, 123, 0.25)',
      'rgba(250, 112, 154, 0.25)',
      'rgba(161, 140, 209, 0.25)'
    ];
    const colors = isDark ? darkColors : lightColors;
    return colors[index % colors.length];
  };

  const isDarkTheme = theme === 'dark';

  return (
    <header className="header-list" role="banner">
      <div
        className="div-list relative overflow-hidden will-change-[height,border-radius,max-width]"
        ref={navRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          // Theme-aware background color - fixes dark mode issue
          background: isDarkTheme
            ? 'rgba(15, 15, 15, 0.95)'
            : '#ffffff',
          // Subtle border that adapts to theme
          borderColor: isDarkTheme
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(12, 12, 12, 0.08)',
        }}
      >
        {/* ============================================
            TOP BAR - Navigation Controls
            ============================================ */}
        <div className="w-full flex items-center justify-between h-[50px] shrink-0 px-2">

          {/* Hamburger Menu Button */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] px-3 rounded-xl transition-colors duration-200`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            aria-expanded={isExpanded}
            style={{
              background: isHamburgerOpen
                ? (isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)')
                : 'transparent'
            }}
          >
            <div
              className={`hamburger-line w-[22px] h-[2.5px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] origin-center ${isHamburgerOpen ? 'translate-y-[4.5px] rotate-45' : ''
                }`}
              style={{ backgroundColor: isDarkTheme ? '#f5f6ff' : '#111111' }}
            />
            <div
              className={`hamburger-line w-[22px] h-[2.5px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] origin-center ${isHamburgerOpen ? '-translate-y-[4.5px] -rotate-45' : ''
                }`}
              style={{ backgroundColor: isDarkTheme ? '#f5f6ff' : '#111111' }}
            />
          </div>

          {/* Main Navigation Links */}
          <ul className="ul-list" role="navigation" aria-label="Primary">
            {navItems.map((item) => (
              <li key={item.id} className={item.id === activeSection ? 'active' : ''}>
                <i className={item.icon} aria-hidden="true" />
                <a href={`#${item.id}`} onClick={(event) => onNavigate(event, item.id)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label={theme === 'light' ? 'Activate dark mode' : 'Activate light mode'}
          >
            <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`} aria-hidden="true" />
          </button>
        </div>

        {/* ============================================
            EXPANDED MENU CONTENT - Premium Card Grid
            ============================================ */}
        <div
          ref={contentRef}
          className="card-nav-content"
          style={{
            display: isExpanded ? 'grid' : 'none',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            padding: '8px 12px 16px',
            marginTop: '8px',
            width: '100%',
            opacity: isExpanded ? 1 : 0,
            visibility: isExpanded ? 'visible' : 'hidden',
          }}
        >
          {navItems.map((item, idx) => (
            <a
              key={`card-${item.id}`}
              href={`#${item.id}`}
              onClick={(e) => {
                onNavigate(e, item.id);
                // Small delay before closing for better UX
                setTimeout(() => toggleMenu(), 100);
              }}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className="nav-card group"
              style={{
                // Premium card styling
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: '16px',
                minHeight: '110px',
                cursor: 'pointer',
                textDecoration: 'none',
                // Theme-aware background with gradient overlay
                background: getCardGradient(idx, isDarkTheme),
                backgroundColor: isDarkTheme ? '#1a1a1a' : '#f8f9fc',
                // Subtle border
                border: `1px solid ${isDarkTheme ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                // Smooth transitions
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                // Initial animation state (GSAP will animate this)
                opacity: 0,
                transform: 'translateY(20px)',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(-4px) scale(1.02)';
                target.style.boxShadow = isDarkTheme
                  ? '0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)'
                  : '0 16px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)';
                target.style.borderColor = isDarkTheme
                  ? 'rgba(255,255,255,0.12)'
                  : 'rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(0) scale(1)';
                target.style.boxShadow = 'none';
                target.style.borderColor = isDarkTheme
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(0,0,0,0.04)';
              }}
            >
              {/* Icon Container with Gradient Background */}
              <div
                className="icon-container"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                  background: getAccentColor(idx, isDarkTheme),
                  transition: 'transform 0.3s ease, background 0.3s ease',
                }}
              >
                <i
                  className={`${item.icon}`}
                  style={{
                    fontSize: '18px',
                    color: isDarkTheme ? '#e0e0e0' : '#333333',
                    transition: 'color 0.3s ease'
                  }}
                />
              </div>

              {/* Text Content */}
              <div className="card-text">
                <span
                  style={{
                    display: 'block',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: isDarkTheme ? '#ffffff' : '#1a1a1a',
                    marginBottom: '4px',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: isDarkTheme ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
                    transition: 'transform 0.3s ease, color 0.3s ease'
                  }}
                  className="card-subtitle"
                >
                  {getItemDescription(item.id)}
                  <i
                    className="fa-solid fa-arrow-right"
                    style={{
                      fontSize: '10px',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;