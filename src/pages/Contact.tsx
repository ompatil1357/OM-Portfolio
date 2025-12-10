import { useState, type FormEvent } from 'react';

const contactDetails = [
  {
    icon: 'fa-solid fa-envelope',
    value: 'op394907@gmail.com',
  },
  {
    icon: 'fa-solid fa-phone',
    value: '85-9103-4838',
  },
  {
    icon: 'fa-solid fa-location-dot',
    value: 'Mumbai, India',
  },
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
    href: 'https://www.instagram.com/omi.flexion/?hl=en',
    icon: 'fa-brands fa-whatsapp',
    ariaLabel: 'WhatsApp',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement actual form submission logic (e.g., send email, API call)
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact" id="contact">
      <p className="section-label">CONTACT</p>
      <h1 className="section-title">Get in Touch with Us</h1>
      <div className="contact-content">
        <div className="contact-info slide-in-left reveal-on-scroll">
          <p>I&apos;m always open to discuss exciting projects and new opportunities. Let&apos;s collaborate!</p>
          <div className="contact-details">
            {contactDetails.map((item, index) => (
              <div className="contact-item" key={index}>
                <i className={item.icon} />
                <span>{item.value}</span>
              </div>
            ))}
          </div>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="social-link"
                target="_blank"
                rel="noreferrer"
                aria-label={link.ariaLabel}
              >
                <i className={link.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="contact-form slide-in-right reveal-on-scroll">
          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                required
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                required
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn-send">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
