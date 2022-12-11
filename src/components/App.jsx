import React from 'react';
import { PortfolioProvider } from '../context/context';
import { footerData, heroData } from '../mock/data';
import Footer from './Footer/Footer';
import Hero from './Hero';

function App() {
  return (
    <PortfolioProvider value={{ hero: heroData, footer: footerData }}>
      <Hero />
      <Footer />
    </PortfolioProvider>
  );
}

export default App;
