import React from 'react';
import '../styles/SimpleLogoLoop.css';

interface Logo {
  src: string;
  alt: string;
}

interface SimpleLogoLoopProps {
  logos: Logo[];
}

/**
 * SimpleLogoLoop Component
 * 
 * A simple, performant infinite logo carousel using pure CSS animations.
 * 
 * HOW INFINITE SCROLL WORKS:
 * 1. Logos are duplicated exactly once (2 sets total)
 * 2. CSS animation translates the track by -50% (exactly one logo set width)
 * 3. When animation completes, it loops back to 0% seamlessly
 * 4. Since both halves are identical, the transition is invisible
 * 
 * IMPORTANT: The -50% translation MUST equal exactly one complete set of logos.
 * This is why we duplicate exactly 2x (not more, not less).
 */
const SimpleLogoLoop: React.FC<SimpleLogoLoopProps> = ({ logos }) => {
  // Duplicate logos exactly once for seamless infinite loop
  // The CSS animation translates -50%, which equals one full set of logos
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="logo-loop-container">
      <div className="logo-loop-track">
        {duplicatedLogos.map((logo, index) => (
          <div key={`logo-${index}`} className="logo-item">
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleLogoLoop;
