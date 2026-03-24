import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">

          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <p className="copyright">© {new Date().getFullYear()} Rajesh kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;