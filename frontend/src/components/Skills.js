import React from 'react';

function Skills({ tech, prof }) {
  // Renders skills as sleek, floating pills with a modern glowing dot
  const renderSkillPills = (skills) => (
    <div className="skill-pill-container">
      {skills.map(skill => (
        <div className="modern-skill-pill" key={skill.id}>
          <span className="pill-dot"></span>
          {skill.name}
        </div>
      ))}
    </div>
  );

  return (
    <section id="skills" className="modern-skills-section">
      <div className="container">
        <div className="section-title">
          <h2>My Tech Stack</h2>
        </div>

        <div className="skills-bento-box">
          {/* Technical Skills Card */}
          <div className="bento-card">
            <div className="bento-header">
              <div className="bento-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>Technical Stack</h3>
            </div>
            {renderSkillPills(tech)}
          </div>

          {/* Professional Skills Card */}
          <div className="bento-card">
            <div className="bento-header">
              <div className="bento-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Professional Skills</h3>
            </div>
            {renderSkillPills(prof)}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Skills;