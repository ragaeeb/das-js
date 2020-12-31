import Fade from '@kogk/react-reveal/Fade';
import { Link } from 'gatsby';
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import PortfolioContext from '../context/context';
import Title from './Title';

const Contact = () => {
  const { contact } = useContext(PortfolioContext);
  const { cta, emailButton, mailingList, telButton, email, tel, address, mapUrl } = contact;

  const onContactClicked = (key) => () => window.analytics.track(key);

  return (
    <section id="contact">
      <Container>
        <Title title="Contact" />
        <Fade bottom duration={1000} delay={800} distance="30px">
          <div className="contact-wrapper">
            <p className="contact-wrapper__text">{cta}</p>
            <p className="contact-wrapper__text">
              <a rel="noopener noreferrer" target="_blank" href={mapUrl} style={{ color: 'white' }}>
                {address}
              </a>
            </p>
            <p className="contact-wrapper__text">K2B 7W3</p>
            <a
              target="_blank"
              onClick={onContactClicked('EmailUs')}
              rel="noopener noreferrer"
              className="cta-btn cta-btn--resume"
              href={`mailto:${email}`}
            >
              {emailButton}
            </a>
            <a
              target="_blank"
              onClick={onContactClicked('CallUs')}
              rel="noopener noreferrer"
              className="cta-btn cta-btn--resume"
              href={`tel:${tel}`}
            >
              {telButton}
            </a>
            <Link to="newsletter">
              <a className="cta-btn cta-btn--resume" href="newsletter">
                {mailingList}
              </a>
            </Link>
          </div>
        </Fade>
      </Container>
    </section>
  );
};

export default Contact;
