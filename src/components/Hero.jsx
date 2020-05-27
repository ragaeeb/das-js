import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import PortfolioContext from '../context/context';
import calculate from '../utils/calculator';
import hijri from '../utils/hijri';

const renderTiming = ({ label, time }) => {
  return (
    <React.Fragment key={label}>
      {label} <span className="text-color-main">{time}</span>
      <br />
    </React.Fragment>
  );
};

const placeholder = {
  date: '',
  timings: [],
};

const Header = () => {
  const { hero } = useContext(PortfolioContext);
  const { latitude, longitude, timeZone, cta, fajrPdf, scheduleLabel } = hero;
  const [now, setNow] = useState(new Date());

  const nextDay = (delta = 1) => () => {
    const newDate = new Date(now.valueOf());
    newDate.setDate(newDate.getDate() + delta);
    setNow(newDate);

    window.analytics.track(delta === 1 ? 'NextDayTimings' : 'PrevDayTimings');
  };

  const onFajrPdfClicked = () => window.analytics.track('FajrTimingPdf');

  const { date, timings } =
    latitude && longitude ? calculate(latitude, longitude, timeZone, now) : placeholder;

  const { day, date: hijriDate, month, year } = hijri(0, now);

  return (
    <section id="hero" className="jumbotron">
      <Container>
        <h2 data-cy="gregorian">{date}</h2>
        <h2 data-cy="hijri">{`${day}, ${hijriDate} ${month} ${year} H`}</h2>
        <h1 className="hero-title">{timings.map(renderTiming)}</h1>
        {scheduleLabel && (
          <>
            <p className="hero-cta">
              <button type="button" onClick={nextDay(-1)} className="cta-btn cta-btn--hero">
                &lt;
              </button>
              <a
                target="_blank"
                onClick={onFajrPdfClicked}
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
          </>
        )}
      </Container>
    </section>
  );
};

export default Header;
