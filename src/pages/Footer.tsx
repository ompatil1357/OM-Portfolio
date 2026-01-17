const footerLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#project', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

const socialLinks = [
  {
    href: 'https://github.com/ompatil1357',
    icon: 'fa-brands fa-github',
    ariaLabel: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/om-patil-579748316/',
    icon: 'fa-brands fa-linkedin',
    ariaLabel: 'LinkedIn',
  },
  {
    href: 'https://x.com/Cryptonary_web3',
    icon: 'fa-brands fa-x-twitter',
    ariaLabel: 'X',
  },
];

const FooterLinks = () => (
  <ul className="footer-links">
    {footerLinks.map((link, index) => (
      <li key={index}>
        <a href={link.href}>{link.label}</a>
      </li>
    ))}
  </ul>
);

const SocialLinks = () => (
  <div className="footer-social">
    {socialLinks.map((link, index) => (
      <a
        key={index}
        href={link.href}
        target="_blank"
        rel="noreferrer"
        aria-label={link.ariaLabel}
      >
        <i className={link.icon} />
      </a>
    ))}
  </div>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-logo">OM</h2>
        <FooterLinks />
        <SocialLinks />
        <p className="footer-copy">&copy; {new Date().getFullYear()} OM. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
