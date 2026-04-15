import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import Services from './components/Services';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/portfolio-data/')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data || !data.profile) return <div style={{textAlign: 'center', marginTop: '100px'}}>Loading...</div>;

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Main Homepage */}
        <Route path="/" element={
          <>
            <Hero profile={data.profile} />
            <About profile={data.profile} />
            <Skills tech={data.technical_skills} prof={data.professional_skills} />
            <Projects projects={data.projects} />
            <Contact profile={data.profile} socials={data.social_links} />
          </>
        } />

        {/* Project Detail Page */}
        <Route path="/project/:id" element={<ProjectDetail projects={data.projects} />} />

        {/* Services Page */}
        <Route path="/services" element={<Services packages={data.packages || []} faqs={data.faqs || []} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;