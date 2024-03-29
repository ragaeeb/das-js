import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import PortfolioContext from '../context/context';
import Title from './Title';

const renderService = ({ title, body }) => (
  <li key={title}>
    <strong>{title}</strong>:<br />
    {body}
  </li>
);

const About = () => {
  const { about } = useContext(PortfolioContext);
  const { paragraphOne, paragraphTwo, services } = about;

  return (
    <section id="about">
      <Container>
        <Title title="About Us" />
        <Row className="about-wrapper">
          <div className="about-wrapper__info">
            <p className="about-wrapper__info-text">{paragraphOne}</p>
            <p className="about-wrapper__info-text">{paragraphTwo}</p>
            <ul className="about-wrapper__info-text">{(services || []).map(renderService)}</ul>
          </div>
        </Row>
      </Container>
      <br />
      <br />
      <br />
    </section>
  );
};

export default About;
