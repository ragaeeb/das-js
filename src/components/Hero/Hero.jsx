import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import PortfolioContext from '../../context/context';
import calculate from '../../utils/calculator';
import formatter from '../../utils/eventFormatter';
import hijri from '../../utils/hijri';

const renderTiming = ({ label, time }) => {
  return (
    <React.Fragment key={label}>
      {label} <span className="text-color-main">{time}</span>
      <br />
    </React.Fragment>
  );
};

const Header = () => {
  const { hero } = useContext(PortfolioContext);
  const { latitude, longitude, timeZone, cta, fajrPdf, scheduleLabel, schedulePdf } = hero;

  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
  }, []);

  const nextDay = (delta = 1) => () => {
    const newDate = new Date(now.valueOf());
    newDate.setDate(newDate.getDate() + delta);
    setNow(newDate);
  };

  const result = calculate(latitude, longitude, now);
  const { date, timings } = formatter(result, timeZone);

  return (
    <section id="hero" className="jumbotron">
      <Container>
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={500} distance="30px">
          <h2>{date}</h2>
          <h2>{hijri(-1, now)}</h2>
          <h1 className="hero-title">{timings.map(renderTiming)}</h1>
        </Fade>
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
          <p className="hero-cta">
            <button type="button" onClick={nextDay(-1)} className="cta-btn cta-btn--hero">
              &lt;
            </button>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn--hero"
              href={fajrPdf}
            >
              {cta}
            </a>
            <button type="button" onClick={nextDay()} className="cta-btn cta-btn--hero">
              &gt;
            </button>
          </p>
          <p className="hero-cta">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn--hero"
              href={schedulePdf}
            >
              {scheduleLabel}
            </a>
          </p>
        </Fade>
      </Container>
    </section>
  );
};

export default Header;
