import React, { useEffect, useState } from 'react';
import { PortfolioProvider } from '../context/context';
import {
  aboutData,
  contactInfo,
  donationsData,
  footerData,
  heroData,
  projectsData,
} from '../mock/data';
import About from './About';
import Contact from './Contact';
import Donate from './Donate';
import ErrorBoundary from './ErrorBoundary';
import Footer from './Footer/Footer';
import Hero from './Hero';
import Projects from './Projects';

function App() {
  const [hero, setHero] = useState({});
  const [about, setAbout] = useState({});
  const [donations, setDonations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contact, setContact] = useState({});
  const [footer, setFooter] = useState({});

  useEffect(() => {
    setHero({ ...heroData });
    setAbout({ ...aboutData });
    setDonations({ ...donationsData });
    setProjects([...projectsData]);
    setContact({ ...contactInfo });
    setFooter({ ...footerData });
  }, []);

  return (
    <ErrorBoundary>
      <PortfolioProvider value={{ hero, about, donations, projects, contact, footer }}>
        <Hero />
        <Projects />
        <About />
        <Donate />
        <Contact />
        <Footer />
      </PortfolioProvider>
    </ErrorBoundary>
  );
}

export default App;
