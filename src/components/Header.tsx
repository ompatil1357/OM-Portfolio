import React from 'react';

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
 * Header Component with Clean Navigation Menu
 * 
 * Features:
 * - Clean navigation UI without hamburger menu
 * - Theme-aware styling (light/dark)
 * - Responsive navigation that hides on mobile (navigation still accessible via scrolling)
 * 
 * Note: Hamburger menu has been removed for cleaner UX.
 * Navigation items are visible on larger screens and hidden on mobile.
 */
const Header: React.FC<HeaderProps> = ({
  navItems,
  activeSection,
  theme,
  onNavigate,
  onThemeToggle
}) => {
  // Determine if we're in dark theme for styling
  const isDarkTheme = theme === 'dark';

  return (
    <header className="header-list" role="banner">
      <div
        className="div-list"
        style={{
          display: 'flex',
          alignItems: 'center',
          // Theme-aware background color
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
            MAIN NAVIGATION LINKS - Desktop Only
            ============================================ */}
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

        {/* ============================================
            THEME TOGGLE BUTTON
            ============================================ */}
        <button
          type="button"
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label={theme === 'light' ? 'Activate dark mode' : 'Activate light mode'}
        >
          <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default Header;