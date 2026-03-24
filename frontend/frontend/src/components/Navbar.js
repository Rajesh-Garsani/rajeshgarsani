import React, { useState, useEffect } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if the user previously selected dark mode when the site loads
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('portfolio-theme', 'light');
      setIsDarkMode(false);
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('portfolio-theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <header id="header">
      <div className="container">
        <nav className="navbar">
          <a href="/#home" className="logo">Portfo<span>lio.</span></a>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="nav-links">
              <li><a href="/#home" className="active" onClick={toggleMenu}>Home</a></li>
              <li><a href="/#about" onClick={toggleMenu}>About</a></li>

              <li><a href="/#skills" onClick={toggleMenu}>Skills</a></li>
              <li><a href="/#projects" onClick={toggleMenu}>Projects</a></li>
              <li><a href="/#contact" onClick={toggleMenu}>Contact</a></li>
            </ul>

            {/* Dark Mode Toggle Button */}
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Dark Mode">
              <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
            </button>

            <div className="menu-toggle" id="menu-toggle" onClick={toggleMenu} style={{ marginLeft: '15px' }}>
              <i className="fas fa-bars"></i>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;