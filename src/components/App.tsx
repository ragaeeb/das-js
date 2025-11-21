import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PortfolioProvider } from '@/context/context';
import { footerData, heroData } from '@/mock/data';
import Footer from './Footer/Footer';
import Hero from './Hero';
import NotFound from './NotFound';
import Privacy from './Privacy';

function App() {
  return (
    <HelmetProvider>
      <PortfolioProvider value={{ hero: heroData, footer: footerData }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Footer />
                </>
              }
            />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PortfolioProvider>
    </HelmetProvider>
  );
}

export default App;
