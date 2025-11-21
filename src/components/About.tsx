import { type FC, useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import PortfolioContext from '@/context/context';
import Title from './Title';

interface Service {
  title: string;
  body: string;
}

const renderService = ({ title, body }: Service) => (
  <li key={title}>
    <strong>{title}</strong>:<br />
    {body}
  </li>
);

const About: FC = () => {
  const context = useContext(PortfolioContext);

  if (!context || !context.about) {
    return null;
  }

  const { paragraphOne, paragraphTwo, services } = context.about;

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
