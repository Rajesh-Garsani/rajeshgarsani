import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

function ProjectDetail({ projects }) {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    Prism.highlightAll();
  }, [project]);

  if (!project) {
    return (
      <div className="container" style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh' }}>
        <h2>Project not found</h2>
        <Link to="/" className="btn mt-4">Go Back Home</Link>
      </div>
    );
  }

  return (
    <div className="page-fade-in">
      <section style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
        <div className="container">

          <Link to="/" className="btn btn-outline" style={{ marginBottom: '40px', display: 'inline-block' }}>
            <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i> Back to Portfolio
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'start' }}>

            {/* Left Column: Visuals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
                {project.image && (
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                )}
              </div>

              {/* Multi-Image Gallery */}
              {project.gallery_images && project.gallery_images.length > 0 && (
                <div className="case-study-section">
                  <h3 style={{ marginBottom: '15px', fontSize: '1.2rem', color: 'var(--secondary)' }}>Project Gallery</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: '15px'
                  }}>
                    {project.gallery_images.map(img => (
                      <div
                        key={img.id}
                        style={{
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '1px solid #eaeaea',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                        }}
                        onClick={() => window.open(img.image, '_blank')}
                        title="Click to view full size"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-5px)';
                          e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                        }}
                      >
                        <img
                          src={img.image}
                          alt="Gallery item"
                          style={{ width: '100%', height: '100px', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Information */}
            <div>
              <h1 style={{ fontSize: '2.8rem', color: 'var(--secondary)', marginBottom: '25px', lineHeight: '1.2' }}>
                {project.title}
              </h1>

              {/* Action Buttons */}
              <div className="project-links" style={{ marginBottom: '35px', display: 'flex', gap: '15px' }}>
                {project.demo_link && <a href={project.demo_link} className="btn" target="_blank" rel="noreferrer">Live Demo</a>}
                {project.source_link && <a href={project.source_link} className="btn btn-outline" target="_blank" rel="noreferrer">Source Code</a>}
              </div>

              {/* Tech Stack */}
              <div className="case-study-section" style={{ marginBottom: '35px' }}>
                <h3 style={{ marginBottom: '15px', fontSize: '1.2rem' }}>Technologies Used</h3>
                <div className="project-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {project.tags_list && project.tags_list.length > 0 ? (
                    project.tags_list.map((tag, index) => (
                      <span key={index} className="project-tag" style={{ margin: 0 }}>{tag}</span>
                    ))
                  ) : (
                    <span className="project-tag">No tags</span>
                  )}
                </div>
              </div>

              {/* Main Description */}
              <div className="case-study-section">
                <h3 style={{ marginBottom: '15px', fontSize: '1.2rem' }}>Overview</h3>
                <div
                  className="rich-text-content"
                  style={{ lineHeight: '1.8', color: '#555' }}
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectDetail;