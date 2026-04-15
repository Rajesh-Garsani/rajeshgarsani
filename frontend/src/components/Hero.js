import React from 'react';

function Hero({ profile }) {
  // We set up a fallback string that also contains HTML if the profile isn't loaded yet
  const fallbackDescription = "<p>I create responsive, user-friendly websites and applications with modern python technologies. Passionate about clean code and intuitive user experiences.</p>";

  return (
    <section id="home">
      <div className="container">
        <div className="hero-content">
          <h1>Hi, I'm <span>{profile.name || "Rajesh kumar"}</span><br/>{profile.title || "Web Developer"}</h1>

          {/* Use dangerouslySetInnerHTML to parse the HTML */}
          <div
            className="hero-description-text"
            dangerouslySetInnerHTML={{ __html: profile.hero_description || fallbackDescription }}
          />

          <div className="hero-btns">
            <a href="#projects" className="btn">View Projects</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </div>
        </div>

        {/* FIXED: Replaced the dynamic <style> injection with a standard React <img> tag */}
        <div className="hero-image">
          {profile.hero_image && (
             <img src={profile.hero_image} alt={profile.name || "Profile"} />
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;