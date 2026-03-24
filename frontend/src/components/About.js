import React from 'react';

function About({ profile }) {
  return (
    <section id="about">
      <div className="container">
        <div className="section-title">
          <h2>About Me</h2>
        </div>
        <div className="about-content">
          <div className="about-image">
            <img src={profile.about_image || '/placeholder.png'} alt="About Me" />
          </div>
          <div className="about-text">
            <h3>{profile.about_title}</h3>

            {/* UPDATED: Render CKEditor HTML properly */}
            <div
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: profile.about_description_1 }}
            />
            {profile.about_description_2 && (
              <div
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: profile.about_description_2 }}
                style={{ marginTop: '15px' }}
              />
            )}

            <div className="about-details" style={{ marginTop: '30px' }}>
              <div className="detail-item">
                <div className="detail-icon"><i className="fas fa-user"></i></div>
                <div><h4>Name:</h4><p>{profile.name}</p></div>
              </div>
              <div className="detail-item">
                <div className="detail-icon"><i className="fas fa-envelope"></i></div>
                <div><h4>Email:</h4><p>{profile.email}</p></div>
              </div>
              <div className="detail-item">
                <div className="detail-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div><h4>Location:</h4><p>{profile.location}</p></div>
              </div>
              <div className="detail-item">
                <div className="detail-icon"><i className="fas fa-graduation-cap"></i></div>
                <div><h4>Education:</h4><p>{profile.education}</p></div>
              </div>
            </div>
            {profile.resume_file && (
              <a href={profile.resume_file} target="_blank" rel="noreferrer" className="btn" style={{ marginTop: '20px' }}>
                Download CV
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;