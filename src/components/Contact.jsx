import Fade from '@kogk/react-reveal/Fade';
import { Link } from 'gatsby';
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import PortfolioContext from '../context/context';

const Contact = () => {
  const { contact } = useContext(PortfolioContext);
  const { cta, emailButton, mailingList, telButton, email, tel, address, contactForm } = contact;

  const onContactClicked = (key) => () => window.analytics.track(key);

  return (
    <section id="contact">
      <Container>
        <a
          target="_blank"
          onClick={onContactClicked('Contact')}
          rel="noopener noreferrer"
          className="cta-btn cta-btn--resume section-title"
          href={contactForm}
        >
          Contact
        </a>
        <Fade bottom duration={1000} delay={800} distance="30px">
          <div className="contact-wrapper">
            <p className="contact-wrapper__text">{cta}</p>
            <p className="contact-wrapper__text">
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://goo.gl/maps/14LYnHa7R9sZsQBG7"
                style={{ color: 'white' }}
              >
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
