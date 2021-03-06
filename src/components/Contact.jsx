import Fade from '@kogk/react-reveal/Fade';
import { Link } from 'gatsby';
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import PortfolioContext from '../context/context';
import Title from './Title';

const getMapLink = (mapUrl, address) => {
  if (mapUrl) {
    return (
      <a rel="noopener noreferrer" target="_blank" href={mapUrl} style={{ color: 'white' }}>
        {address}
      </a>
    );
  }

  return address;
};

const Contact = () => {
  const { contact } = useContext(PortfolioContext);
  const { cta, emailButton, mailingList, telButton, email, tel, address, mapUrl } = contact;

  const onContactClicked = (key) => () => window.analytics && window.analytics.track(key);

  return (
    <section id="contact">
      <Container>
        <Title title="Contact" />
        <Fade bottom duration={1000} delay={800} distance="30px">
          <div className="contact-wrapper">
            <p className="contact-wrapper__text">{cta}</p>
            <p className="contact-wrapper__text">{getMapLink(mapUrl, address)}</p>
            {emailButton && email && (
              <a
                target="_blank"
                onClick={onContactClicked('EmailUs')}
                rel="noopener noreferrer"
                className="cta-btn cta-btn--resume"
                href={`mailto:${email}`}
              >
                {emailButton}
              </a>
            )}
            {telButton && tel && (
              <a
                target="_blank"
                onClick={onContactClicked('CallUs')}
                rel="noopener noreferrer"
                className="cta-btn cta-btn--resume"
                href={`tel:${tel}`}
              >
                {telButton}
              </a>
            )}
            {mailingList && (
              <Link to="newsletter" data-cy="newsletter">
                <a className="cta-btn cta-btn--resume" href="newsletter">
                  {mailingList}
                </a>
              </Link>
            )}
          </div>
        </Fade>
      </Container>
    </section>
  );
};

export default Contact;
