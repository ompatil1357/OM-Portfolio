import { projects } from '../data/projects';

/**
 * Project Section with Carousel Display
 * 
 * Features:
 * - Infinite horizontal scroll carousel
 * - Hardware-accelerated CSS animation
 * - Duplicated project cards for seamless looping
 * 
 * Note: The seamless infinite scroll is achieved by:
 * 1. Duplicating the project array (so we have original + copy)
 * 2. Animating translateX from 0 to -50% (half the track width)
 * 3. When animation reaches -50%, it loops back to 0, creating seamless illusion
 */
const Project = () => {
  // Duplicate projects for seamless infinite scroll
  // The animation translates exactly 50% of the total width,
  // which equals the width of the original projects array
  const duplicatedProjects = [...projects, ...projects];

  return (
    <section className="project" id="project">
      <p className="section-label">PROJECTS</p>
      <h1 className="section-title">Featured Work</h1>
      <hr className="section-divider" />
      <div className="info-pro">
        <p>A showcase of my recent projects demonstrating expertise in full-stack development, modern frameworks, and creative problem-solving.</p>
      </div>

      {/* Carousel container with gradient fade overlays */}
      <div className="carousel-wrapper">
        {/* Carousel track - animates infinitely */}
        <div className="carousel-track">
          {duplicatedProjects.map((projectItem, index) => (
            <article
              className="project-card carousel-card"
              key={`${projectItem.title}-${index}`}
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
      </div>
    </section>
  );
};

export default Project;
