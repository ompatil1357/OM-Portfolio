import aboutImage from '/images/img.jpg';

const aboutData = [
  {
    icon: 'fa-solid fa-code',
    title: 'Languages',
    description: 'Rust, Solidity, HTML, CSS, JavaScript, TypeScript',
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    title: 'Education',
    description: 'Student of AIML',
  },
  {
    icon: 'fa-solid fa-folder-open',
    title: 'Projects',
    description: 'Projects are in progress...',
  },
];

const About = () => {
  return (
    <section className="about" id="about">
      <p className="section-label">ABOUT ME</p>
      <div className="title reveal-on-scroll">
        <h1>Building Meaningful</h1>
        <h1>Digital Experiences</h1>
      </div>
      <div className="hrrr">
        <hr />
      </div>
      <div className="about-container">
        <div className="info-about reveal-on-scroll">
          <div className="about-info">
            <p>
              I&apos;m a creative front-end developer / Web3 developer passionate about building modern and responsive web experiences. And WEB3 logic.
              My journey began with a love for blockchain and evolved into a deep curiosity for how the web3 actually works —
              combining logic with creativity to bring ideas to life.
            </p>
            <p>
              When I&apos;m not coding, I enjoy learning new technologies, improving my projects, and exploring better ways to
              make the web faster and more engaging. I believe in continuous learning, attention to detail, and the power of
              clean, meaningful logics.
            </p>
          </div>
          <h2>What Drives Me</h2>
          <div className="card">
            {aboutData.map((item, index) => (
              <div className="c1" key={index}>
                <h3>
                  <i className={item.icon} /> {item.title}
                </h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="about-image reveal-on-scroll">
          <img src={aboutImage} alt="A portrait of Om, the developer, working on his laptop." />
        </div>
      </div>
    </section>
  );
};

export default About;