import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import PortfolioContext from '../context/context';
import calculate from '../utils/calculator';
import hijri from '../utils/hijri';

const renderTiming = ({ label, time, iqamah }) => {
  return (
    <React.Fragment key={label}>
      {label} <span className="text-color-main">{time}</span>
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
  const {
    latitude,
    longitude,
    timeZone,
    cta,
    fajrPdf,
    scheduleLabel,
    istijabaText,
    iqamahs,
  } = hero;
  const [now, setNow] = useState(new Date());

  const nextDay = (delta = 1) => () => {
    const newDate = new Date(now.valueOf());
    newDate.setDate(newDate.getDate() + delta);
    setNow(newDate);

    window.analytics.track(delta === 1 ? 'NextDayTimings' : 'PrevDayTimings');
  };

  const onFajrPdfClicked = () => window.analytics.track('FajrTimingPdf');

  const { date, timings, istijaba } =
    latitude && longitude ? calculate(latitude, longitude, timeZone, now, iqamahs) : placeholder;

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
        <h2 data-cy="gregorian">
          <button type="button" onClick={nextDay(-1)} className="arrow-button cta-btn">
            &lt;
          </button>
          &nbsp;
          {date}&nbsp;
          <button type="button" onClick={nextDay()} className="arrow-button cta-btn">
            &gt;
          </button>
        </h2>
        <h2 data-cy="hijri">{`${day}, ${hijriDate} ${month} ${year} H`}</h2>
        <h1 className="hero-title">{timings.map(renderTiming)}</h1>
        {scheduleLabel && (
          <>
            <p className="hero-cta">
              <a
                target="_blank"
                onClick={onFajrPdfClicked}
                rel="noopener noreferrer"
                className="cta-btn cta-btn--hero"
                href={fajrPdf}
              >
                {cta}
              </a>
            </p>
          </>
        )}
      </Container>
    </section>
  );
};

export default Header;
