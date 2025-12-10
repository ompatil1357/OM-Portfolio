import React from 'react';
import '../styles/SimpleLogoLoop.css';

interface Logo {
  src: string;
  alt: string;
}

interface SimpleLogoLoopProps {
  logos: Logo[];
}

const SimpleLogoLoop: React.FC<SimpleLogoLoopProps> = ({ logos }) => {
  return (
    <div className="logo-loop-container">
      <div className="logo-loop-track">
        {/* Render logos 4 times for truly seamless infinite loop */}
        {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
          <div key={index} className="logo-item">
            <img 
              src={logo.src} 
              alt={logo.alt}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleLogoLoop;
