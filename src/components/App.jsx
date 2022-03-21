import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { PortfolioProvider } from '../context/context';
import { aboutData, contactInfo, donationsData, footerData, heroData } from '../mock/data';
import About from './About';
import Contact from './Contact';
import Footer from './Footer/Footer';
import Hero from './Hero';
import Projects from './Projects';

function App() {
  const [hero, setHero] = useState({});
  const [about, setAbout] = useState({});
  const [donations, setDonations] = useState([]);
  const [contact, setContact] = useState({});
  const [footer, setFooter] = useState({});

  useEffect(() => {
    setHero({ ...heroData });
    setAbout({ ...aboutData });
    setDonations({ ...donationsData });
    setContact({ ...contactInfo });
    setFooter({ ...footerData });
  }, []);

  return (
    <PortfolioProvider value={{ hero, about, donations, contact, footer }}>
      <Hero />
      <LazyLoad height={100} once>
        <Projects />
      </LazyLoad>
      <LazyLoad>
        <About />
      </LazyLoad>
      <LazyLoad>
        <Contact />
      </LazyLoad>
      <Footer />
    </PortfolioProvider>
  );
}

export default App;
