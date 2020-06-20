import { Link } from 'gatsby';
import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import PortfolioContext from '../context/context';
import calculate from '../utils/calculator';
import hijri from '../utils/hijri';

const getLabel = (event, label, onClick, link) => {
  if (event === 'fajr') {
    return (
      <a
        target="_blank"
        onClick={onClick}
        rel="noopener noreferrer"
        className="hero-title fajr"
        href={link}
      >
        {label}
      </a>
    );
  }

  return label;
};

const renderTiming = (fajrPdf, fajrOnClick) => ({ label, time, iqamah, event }) => {
  return (
    <React.Fragment key={label}>
      {getLabel(event, label, fajrOnClick, fajrPdf)} <span className="text-color-main">{time}</span>
      {iqamah && <small className="iqamah">&nbsp;{iqamah}</small>}
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
  const { latitude, longitude, timeZone, fajrPdf, scheduleLabel, istijabaText, iqamahs } = hero;
  const [now, setNow] = useState(new Date());
  const isLoaded = latitude && longitude;

  const nextDay = (delta = 1) => () => {
    const newDate = new Date(now.valueOf());
    newDate.setDate(newDate.getDate() + delta);
    setNow(newDate);

    window.analytics.track(delta === 1 ? 'NextDayTimings' : 'PrevDayTimings');
  };

  const onFajrPdfClicked = () => window.analytics.track('FajrTimingPdf');

  const { date, timings, istijaba } = isLoaded
    ? calculate(latitude, longitude, timeZone, now, iqamahs)
    : placeholder;

  const { day, date: hijriDate, month, year } = hijri(0, now);

  return (
    <section id="hero" className="jumbotron">
      <Container>
        {istijaba && (
          <>
            <h2 data-cy="istijaba">{istijabaText}</h2>
            <br />
            <br />
          </>
        )}
        {isLoaded && (
          <h3 data-cy="gregorian">
            <button type="button" onClick={nextDay(-1)} className="arrow-button cta-btn">
              &lt;
            </button>
            &nbsp;
            {date}&nbsp;
            <button type="button" onClick={nextDay()} className="arrow-button cta-btn">
              &gt;
            </button>
          </h3>
        )}
        <h2 data-cy="hijri">{`${day}, ${hijriDate} ${month} ${year} H`}</h2>
        <h1 className="hero-title">{timings.map(renderTiming(fajrPdf, onFajrPdfClicked))}</h1>
        {scheduleLabel && (
          <>
            <Link to="monthly">
              <p className="hero-cta">
                <button type="button" className="cta-btn cta-btn--hero">
                  Monthly Schedule
                </button>
              </p>
            </Link>
          </>
        )}
      </Container>
    </section>
  );
};

export default Header;
