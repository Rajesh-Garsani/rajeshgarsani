import React, { useState } from 'react';
import axios from 'axios';

function Contact({ profile, socials }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'info', message: 'Sending...' }); // Optional: adds a loading state

    // Dynamic API URL for Vercel deployment (falls back to localhost)
    const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

    try {
      // Updated to use the dynamic variable
      await axios.post(`${API_URL}/api/contact/`, formData);
      setStatus({ type: 'success', message: 'Your message has been sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset
    } catch (error) {
      setStatus({ type: 'danger', message: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="section-title"><h2>Contact Me</h2></div>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div><h4>Location</h4><p>{profile.location}</p></div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                <div><h4>Email</h4><p>{profile.email}</p></div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-phone"></i></div>
                <div><h4>Call</h4><p>{profile.phone}</p></div>
              </div>
            </div>
            <div className="social-links">
              {socials.map(social => (
                <a key={social.id} href={social.url} className="social-link" target="_blank" rel="noreferrer">
                  <i className={`fab fa-${social.platform}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-form">
            {status && <div className={`alert alert-${status.type}`} style={{ marginBottom: '15px' }}>{status.message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" placeholder="Name" required
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email" required
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" required
                  value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
              </div>
              <div className="form-group">
                <textarea placeholder="Message" required
                  value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              </div>
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
