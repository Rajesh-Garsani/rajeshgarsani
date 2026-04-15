import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Services.css';

function Services({ packages, faqs }) {
  const [openFaq, setOpenFaq] = useState(null);

  const [formData, setFormData] = useState({ name: '', email: '', location: '', subject: '', message: '', reference_link: '' });
  const [referenceImage, setReferenceImage] = useState(null);
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  const groupedPackages = (packages || []).reduce((groups, pkg) => {
    const category = pkg.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(pkg);
    return groups;
  }, {});

  const handleContactClick = (pkgName, category) => {
    setFormData({ ...formData, subject: `Inquiry: ${category} - ${pkgName} Package` });
    const formSection = document.getElementById('service-contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('subject', formData.subject);
    submitData.append('message', formData.message);
    if (formData.location) submitData.append('location', formData.location);
    if (formData.reference_link) submitData.append('reference_link', formData.reference_link);
    if (referenceImage) submitData.append('reference_image', referenceImage);

    try {
      await axios.post(`${API_URL}/api/service-contact/`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus({ type: 'success', message: 'Your inquiry has been sent successfully! I will contact you soon.' });
      setFormData({ name: '', email: '', location: '', subject: '', message: '', reference_link: '' });
      setReferenceImage(null);
      document.getElementById('file-upload').value = "";
    } catch (error) {
      setStatus({ type: 'danger', message: 'Failed to send inquiry. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-fade-in" style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--light)' }}>
      <section className="services-section">
        <div className="container">

          <div className="services-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ color: 'var(--secondary)', fontSize: '2.8rem' }}>Services & Pricing</h2>
            <p style={{ color: 'var(--gray)', marginTop: '10px', fontSize: '1.1rem' }}>Transparent pricing, professional delivery. Choose a category below.</p>
          </div>

          {Object.keys(groupedPackages).length > 0 ? (
            Object.entries(groupedPackages).map(([category, categoryPackages]) => (
              <div key={category} className="category-section" style={{ marginBottom: '80px' }}>

                <div className="category-header">
                  <h3 style={{ color: 'var(--primary)', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fas fa-layer-group"></i> {category}
                  </h3>
                  <div style={{ height: '3px', width: '60px', backgroundColor: 'var(--primary)', marginTop: '10px', borderRadius: '2px' }}></div>
                </div>

                <div className="pricing-grid" style={{ marginTop: '30px' }}>
                  {categoryPackages.map((pkg) => (
                    <div className={`pricing-card ${pkg.is_best_seller ? 'best-seller' : ''}`} key={pkg.id}>
                      {pkg.is_best_seller && <div className="badge-best-seller">MOST POPULAR</div>}

                      <h3 className="pkg-title">{pkg.name}</h3>
                      <p style={{ fontSize: '1.1rem', color: 'var(--gray)', marginBottom: '15px' }}>{pkg.title}</p>

                      <div className="pkg-price">{pkg.price}</div>
                      <p className="pkg-desc">{pkg.description}</p>

                      <div className="pkg-meta">
                        <span><i className="far fa-clock"></i> {pkg.delivery_time}</span>
                        <span><i className="fas fa-sync-alt"></i> {pkg.revisions}</span>
                      </div>

                      <ul className="pkg-features">
                        {pkg.features_list && pkg.features_list.map((feature, i) => (
                          <li key={i}><i className="fas fa-check" style={{ color: '#2ecc71', marginRight: '10px' }}></i> {feature}</li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handleContactClick(pkg.name, category)}
                        className={`btn ${pkg.is_best_seller ? '' : 'btn-outline'}`}
                        style={{ width: '100%', marginTop: 'auto', textAlign: 'center' }}
                      >
                        Contact Us
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', padding: '50px', color: 'var(--gray)' }}>No service packages currently available. Add them in the Django Admin.</p>
          )}

          <div className="external-ctas" style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', margin: '20px 0 80px' }}>
            <a href="https://fiverr.com" target="_blank" rel="noreferrer" className="btn" style={{ backgroundColor: '#1dbf73', borderColor: '#1dbf73', color: 'white' }}><i className="fab fa-dyalog"></i> Hire me on Fiverr</a>
            <a href="https://upwork.com" target="_blank" rel="noreferrer" className="btn" style={{ backgroundColor: '#14a800', borderColor: '#14a800', color: 'white' }}><i className="fas fa-briefcase"></i> View Profile on Upwork</a>
          </div>

          <div className="services-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ color: 'var(--secondary)' }}>What You'll Get</h2>
          </div>
          <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '80px' }}>
            {[
              { icon: 'fas fa-mobile-alt', title: 'Responsive Design' },
              { icon: 'fas fa-code', title: 'Clean & Modern Code' },
              { icon: 'fas fa-bolt', title: 'Fast Loading' },
              { icon: 'fas fa-search', title: 'SEO Friendly' }
            ].map((benefit, i) => (
              <div key={i} className="benefit-card">
                <i className={benefit.icon} style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '15px' }}></i>
                <h4 style={{ color: 'var(--secondary)' }}>{benefit.title}</h4>
              </div>
            ))}
          </div>

          {faqs && faqs.length > 0 && (
            <div className="faq-section" style={{ maxWidth: '800px', margin: '0 auto 80px' }}>
              <h2 style={{ textAlign: 'center', color: 'var(--secondary)', marginBottom: '30px' }}>Frequently Asked Questions</h2>
              {faqs.map((faq, index) => (
                <div key={faq.id} className="faq-item" onClick={() => toggleFaq(index)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: 'var(--secondary)' }}>
                    {faq.question}
                    <i className={`fas fa-chevron-${openFaq === index ? 'up' : 'down'}`}></i>
                  </div>
                  {openFaq === index && <div style={{ marginTop: '15px', color: 'var(--gray)', lineHeight: '1.6' }}>{faq.answer}</div>}
                </div>
              ))}
            </div>
          )}

          <div id="service-contact-form" className="service-contact-wrapper">
            <div className="services-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: 'var(--secondary)' }}>Discuss Your Project</h2>
              <p style={{ color: 'var(--gray)' }}>Have specific requirements? Send me the details and references.</p>
            </div>

            <div className="service-contact-form-container">
              {status && <div className={`alert alert-${status.type}`} style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px', backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da', color: status.type === 'success' ? '#155724' : '#721c24' }}>{status.message}</div>}

              <form onSubmit={handleFormSubmit}>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label>Name *</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="service-input" />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="service-input" />
                  </div>
                </div>

                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input type="text" required placeholder="Choose a package above or write your own" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="service-input" />
                  </div>
                  <div className="form-group">
                    <label>Location (City/Country)</label>
                    <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="service-input" />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '15px' }}>
                  <label>Project Details / Message *</label>
                  <textarea required rows="5" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="service-input"></textarea>
                </div>

                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                  <div className="form-group">
                    <label>Reference Link (Optional)</label>
                    <input type="url" placeholder="https://example.com" value={formData.reference_link} onChange={e => setFormData({...formData, reference_link: e.target.value})} className="service-input" />
                  </div>
                  <div className="form-group">
                    <label>Reference UI Image (Optional)</label>
                    <input id="file-upload" type="file" accept="image/*" onChange={e => setReferenceImage(e.target.files[0])} className="service-input file-input" />
                  </div>
                </div>

                <button type="submit" className="btn" style={{ width: '100%', marginTop: '25px' }} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Services;