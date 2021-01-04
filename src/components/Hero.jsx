import { Link } from 'gatsby';
import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import PortfolioContext from '../context/context';
import { daily, getJumuahTime, isFard } from '../utils/calculator';
import hijri from '../utils/hijri';

const getLabel = (event, label, onClick, link) => {
  if (onClick && link) {
    return (
      <a
        target="_blank"
        onClick={onClick(event)}
        rel="noopener noreferrer"
        className="hero-title attached"
        href={link}
      >
        {label}
      </a>
    );
  }

  return label;
};

const renderSunnah = (event, label, time) => (
  <div key={event} className="sunan" data-cy="sunan">
    {label} <span className="text-color-main">{time}</span>
  </div>
);

const renderTiming = (links, onClick) => ({ label, time, iqamah, event }) => {
  if (!isFard(event)) {
    return renderSunnah(event, label, time);
  }

  return (
    <React.Fragment key={label}>
      {getLabel(event, label, onClick, links[event])}{' '}
      <span className="text-color-main">{time}</span>
      {iqamah && <small className="iqamah">&nbsp;{iqamah}</small>}
      <br />
    </React.Fragment>
  );
};

const placeholder = {
  date: '',
  timings: [],
};

const onLinkClicked = (event) => () =>
  window.analytics && window.analytics.track(`${event}TimingPdf`);
const onCalendarClicked = () => window.analytics && window.analytics.track('Calendar');

const Hero = () => {
  const { hero } = useContext(PortfolioContext);
  const {
    calculation,
    links,
    istijabaText,
    iqamahs,
    labels = {},
    calendarUrl,
    hijriAdjust = 0,
  } = hero;
  const [now, setNow] = useState(new Date());
  const isLoaded = !!calculation;

  const nextDay = (delta = 1) => () => {
    const newDate = new Date(now.valueOf());
    newDate.setDate(newDate.getDate() + delta);
    setNow(newDate);

    window.analytics.track(delta === 1 ? 'NextDayTimings' : 'PrevDayTimings');
  };

  const { date, timings, istijaba } = isLoaded
    ? daily(labels, calculation, now, iqamahs)
    : placeholder;

  const { day, date: hijriDate, month, year } = hijri(hijriAdjust, now);

  return (
    <section id="hero" className="jumbotron">
      <Container>
        {istijaba && istijabaText && (
          <>
            <h2 data-cy="istijaba">{istijabaText}</h2>
            <br />
            <br />
          </>
        )}
        {isLoaded && (
          <h3 data-cy="gregorian">
            <button
              type="button"
              onClick={nextDay(-1)}
              className="arrow-button cta-btn"
              data-cy="prev"
            >
              &lt;
            </button>
            &nbsp;
            {date}&nbsp;
            <button
              type="button"
              onClick={nextDay()}
              className="arrow-button cta-btn"
              data-cy="next"
            >
              &gt;
            </button>
          </h3>
        )}
        <h2 data-cy="hijri">{`${day}, ${hijriDate} ${month} ${year} H`}</h2>
        <h1 className="hero-title" data-cy="timings">
          {timings.map(renderTiming(links, onLinkClicked))}
          {isLoaded && renderSunnah('jumuah', labels.jumuah, getJumuahTime(now, iqamahs))}
        </h1>
        <p className="hero-cta">
          {calendarUrl && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={calendarUrl}
              onClick={onCalendarClicked}
              data-cy="calendar"
            >
              <button type="button" className="cta-btn cta-btn--hero">
                Calendar
              </button>
            </a>
          )}
          <Link to="monthly">
            <button type="button" className="cta-btn cta-btn--hero" data-cy="monthly">
              Monthly Schedule
            </button>
          </Link>
          <Link to="yearly">
            <button type="button" className="cta-btn cta-btn--hero" data-cy="yearly">
              Annual
            </button>
          </Link>
        </p>
      </Container>
    </section>
  );
};

export default Hero;
