import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import PortfolioContext from '../../context/context';
import Title from '../Title/Title';

const renderService = ({ title, body }) => {
  return (
    <li key={title}>
      <strong>{title}</strong>:<br />
      {body}
    </li>
  );
};

const About = () => {
  const { about } = useContext(PortfolioContext);
  const { paragraphOne, paragraphTwo, services } = about;

  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
  }, []);

  return (
    <section id="about">
      <Container>
        <Title title="About Us" />
        <Row className="about-wrapper">
          <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
            <div className="about-wrapper__info">
              <p className="about-wrapper__info-text">{paragraphOne}</p>
              <p className="about-wrapper__info-text">{paragraphTwo}</p>
              <p className="about-wrapper__info-text">
                <ul>{(services || []).map(renderService)}</ul>
              </p>
            </div>
          </Fade>
        </Row>
      </Container>
      <br />
      <br />
      <br />
    </section>
  );
};

export default About;
