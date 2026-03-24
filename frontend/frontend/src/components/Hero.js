import React from 'react';

function Hero({ profile }) {
  // We set up a fallback string that also contains HTML if the profile isn't loaded yet
  const fallbackDescription = "<p>I create responsive, user-friendly websites and applications with modern python technologies. Passionate about clean code and intuitive user experiences.</p>";

  return (
    <section id="home">
      <div className="container">
        <div className="hero-content">
          <h1>Hi, I'm <span>{profile.name || "Rajesh kumar"}</span><br/>{profile.title || "Web Developer"}</h1>

          {/* Highlighted Fix: Use dangerouslySetInnerHTML to parse the HTML */}
          <div
            className="hero-description-text"
            dangerouslySetInnerHTML={{ __html: profile.hero_description || fallbackDescription }}
          />

          <div className="hero-btns">
            <a href="#projects" className="btn">View Projects</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </div>
        </div>

        <div className="hero-image">
          {profile.hero_image && (
            <style>
              {`
                #home .hero-image::before {
                  background: url(${profile.hero_image}) center/cover no-repeat !important;
                }
              `}
            </style>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;