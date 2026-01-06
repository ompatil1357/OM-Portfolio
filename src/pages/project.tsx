import { projects } from '../data/projects';

/**
 * Project Section - Static Grid Display
 * 
 * Features:
 * - Responsive CSS Grid layout
 * - Smooth hover effects on cards
 * - Clean, modern design with proper spacing
 */
const Project = () => {
  return (
    <section className="project" id="project">
      <p className="section-label">PROJECTS</p>
      <h1 className="section-title">Featured Work</h1>
      <hr className="section-divider" />
      <div className="info-pro">
        <p>A showcase of my recent projects demonstrating expertise in full-stack development, modern frameworks, and creative problem-solving.</p>
      </div>

      {/* Projects Grid Container */}
      <div className="projects-grid">
        {projects.map((projectItem) => (
          <article
            className="project-card"
            key={projectItem.title}
          >
            {/* Project thumbnail */}
            <div className="project-image">
              <img
                src={projectItem.image}
                alt={projectItem.title}
                loading="lazy"
              />
            </div>

            {/* Project title */}
            <h3>{projectItem.title}</h3>

            {/* Project description */}
            <p>{projectItem.description}</p>

            {/* Technology tags */}
            <div className="skills">
              {projectItem.tags.map((tag) => (
                <span key={`${projectItem.title}-${tag}`}>{tag}</span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="btns">
              <a
                href={projectItem.github ?? '#'}
                className="btn"
                target={projectItem.github ? '_blank' : undefined}
                rel={projectItem.github ? 'noreferrer' : undefined}
              >
                <i className="fab fa-github" /> GitHub
              </a>
              <a
                href={projectItem.demo ?? '#'}
                className="btn"
                target={projectItem.demo ? '_blank' : undefined}
                rel={projectItem.demo ? 'noreferrer' : undefined}
              >
                <i className="fas fa-external-link-alt" /> Live Demo
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Project;
