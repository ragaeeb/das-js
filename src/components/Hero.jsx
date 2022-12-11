import { Link } from 'gatsby';
import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import PortfolioContext from '../context/context';
import { daily, getIqamahTime, isFard } from '../utils/calculator';
import hijri from '../utils/hijri';

const getLabel = (event, label, onClick, link) => {
  if (onClick && link) {
    return (
      <a target="_blank" rel="noopener noreferrer" className="hero-title attached" href={link}>
        {label}
      </a>
    );
  }

  return label;
};

const renderSunnah = (event, label, time) =>
  time && (
    <div key={event} className="sunan">
      {label} <span className="text-color-main">{time}</span>
    </div>
  );

const renderTiming =
  (links) =>
  ({ label, time, iqamah, event }) => {
    if (!isFard(event)) {
      return renderSunnah(event, label, time);
    }

    return (
      <div key={label}>
        {getLabel(event, label, links[event])} <span className="text-color-main">{time}</span>
        {iqamah && <small className="iqamah">&nbsp;{iqamah}</small>}
        <br />
      </div>
    );
  };

const placeholder = {
  date: '',
  timings: [],
};

const Hero = () => {
  const { hero } = useContext(PortfolioContext);
  const { calculation, links = {}, istijabaText, iqamahs, labels = {}, hijriAdjust = 0 } = hero;
  const [now, setNow] = useState(new Date());
  const isLoaded = !!calculation;

  const nextDay =
    (delta = 1) =>
    () => {
      const newDate = new Date(now.valueOf());
      newDate.setDate(newDate.getDate() + delta);
      setNow(newDate);
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
            <h2>{istijabaText}</h2>
            <br />
            <br />
          </>
        )}
        {isLoaded && (
          <h3>
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
        <h2>{`${day}, ${hijriDate} ${month} ${year} H`}</h2>
        <h1 className="hero-title">
          {timings.map(renderTiming(links))}
          {isLoaded &&
            iqamahs &&
            renderSunnah('jumuah', labels.jumuah, getIqamahTime(now, iqamahs, 'jumuah'))}
          {isLoaded &&
            iqamahs &&
            renderSunnah('tarawih', labels.tarawih, getIqamahTime(now, iqamahs, 'tarawih'))}
        </h1>
      </Container>
    </section>
  );
};

export default Hero;
