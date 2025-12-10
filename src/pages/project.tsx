import { projects } from '../data/projects';

const Project = () => {
  return (
    <section className="project" id="project">
      <p className="section-label">PROJECTS</p>
      <h1 className="section-title">Featured Work</h1>
      <hr className="section-divider" />
      <div className="info-pro">
        <p>A showcase of my recent projects demonstrating expertise in full-stack development, modern frameworks, and creative problem-solving.</p>
      </div>
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {/* Duplicate the projects array twice for seamless infinite scroll */}
          {[...projects, ...projects].map((projectItem, index) => (
            <article className="project-card carousel-card" key={`${projectItem.title}-${index}`}>
              <div className="project-image">
                <img src={projectItem.image} alt={projectItem.title} loading="lazy" />
              </div>
              <h3>{projectItem.title}</h3>
              <p>{projectItem.description}</p>
              <div className="skills">
                {projectItem.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="btns">
                <a href={projectItem.github ?? '#'} className="btn" target={projectItem.github ? '_blank' : undefined} rel={projectItem.github ? 'noreferrer' : undefined}>
                  <i className="fab fa-github" /> GitHub
                </a>
                <a href={projectItem.demo ?? '#'} className="btn" target={projectItem.demo ? '_blank' : undefined} rel={projectItem.demo ? 'noreferrer' : undefined}>
                  <i className="fas fa-external-link-alt" /> Live Demo
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
