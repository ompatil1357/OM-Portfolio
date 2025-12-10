import Bitcoin3D from '../components/Bitcoin3D';
import useTypingEffect from '../utils/useTypingEffect';

const HERO_WORDS = ['ML DEV', 'WEB3 DEV', 'Web Enthusiast'];

const socialLinks = [
  {
    href: 'https://github.com/ompatil1357',
    icon: 'fa-brands fa-github',
    ariaLabel: 'GitHub',
  },
  {
    href: 'https://discord.com',
    icon: 'fa-brands fa-discord',
    ariaLabel: 'Discord',
  },
  {
    href: 'https://www.linkedin.com/in/om-patil-579748316/',
    icon: 'fa-brands fa-linkedin',
    ariaLabel: 'LinkedIn',
  },
  {
    href: 'https://www.instagram.com/omi.flexion/',
    icon: 'fa-brands fa-instagram',
    ariaLabel: 'Instagram',
  },
];

const SocialLinks = () => (
  <div className="follow">
    <p className="followw">Follow me:</p>
    <ul>
      {socialLinks.map((link, index) => (
        <li key={index}>
          <a href={link.href} target="_blank" rel="noreferrer" aria-label={link.ariaLabel}>
            <i className={link.icon} />
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Hero = () => {
  const typedText = useTypingEffect(HERO_WORDS);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="home" id="home">
      <p className="home-p">
        <span className="home-s">.</span> Available for freelance work
      </p>
      <div className="home-container reveal-on-scroll">
        <div className="home-section">
          <div className="info-home">
            <h1>HI, I&apos;m OM</h1>
            <h3>    
              {typedText}
              <span className="cursor">|</span>
            </h3>
            <div className="info-p">
              <p>I create beautiful, functional, and user-centered digital experiences.</p>
              <p>With 2+ years of experience in web development / Web3 development, I bring ideas to life through clean code.</p>
              {/* <p>I&apos;m focused on crafting responsive interfaces and memorable user journeys.</p> */}
            </div>
            <div className="info-p2">
              <p>
                <i className="fa-solid fa-location-dot" /> Based in MUMBAI
              </p>
              <p>
                <i className="fa-solid fa-briefcase" /> Available Now
              </p>
            </div>
            <div className="btnn">
              <button type="button" className="btn-home1" onClick={() => scrollToSection('contact')}>
                <i className="fa-solid fa-arrow-right" /> Hire Me
              </button>
              <button type="button" className="btn-home2" onClick={() => scrollToSection('about')}>
                <i className="fa-solid fa-download" /> Download CV
              </button>
            </div>
            <div className="hhr">
              <hr />
            </div>
            <SocialLinks />
          </div>
        </div>
        <div className="home-image reveal-on-scroll">
          <Bitcoin3D 
            autoRotate={true} 
            enableZoom={false} 
            enablePan={true}
            className="bitcoin-hero-model"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;