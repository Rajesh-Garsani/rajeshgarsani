import React from 'react';
import { Link } from 'react-router-dom';

function Projects({ projects }) {
  // UPDATED: Strips HTML tags before truncating to prevent broken layouts
  const stripAndTruncateText = (htmlString, maxLength) => {
    if (!htmlString) return '';
    // Remove HTML tags using Regex
    const plainText = htmlString.replace(/<[^>]+>/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
  };

  return (
    <section id="projects">
      <div className="container">
        <div className="section-title">
          <h2>My Projects</h2>
        </div>
        <div className="projects-grid">
          {projects.map(project => (
            <div className="project-card" key={project.id}>
              <div className="project-img">
                <img src={project.image} alt={project.title} style={{ width: '100%', objectFit: 'cover' }} />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>

                {/* UPDATED: Safely render truncated plain text */}
                <p className="project-summary">{stripAndTruncateText(project.description, 120)}</p>

                <div className="project-tags">
                  {project.tags_list && project.tags_list.length > 0 ? (
                    project.tags_list.map((tag, index) => (
                      <span key={index} className="project-tag">{tag}</span>
                    ))
                  ) : (
                    <span className="project-tag">No tags</span>
                  )}
                </div>

                <div className="project-links" style={{ marginTop: '15px' }}>
                  <Link to={`/project/${project.id}`} className="btn">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;