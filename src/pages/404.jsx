import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'gatsby';
import React from 'react';
import { Container } from 'react-bootstrap';
import '../style/main.scss';

const Four = () => (
  <>
    <section id="hero" className="jumbotron">
      <Container>
        <h1 className="hero-title text-center">Sorry, this path does not exist </h1>
        <p className="hero-cta justify-content-center">
          <Link className="cta-btn cta-btn--hero" to="/">
            Go back
          </Link>
        </p>
      </Container>
    </section>
  </>
);

export default Four;
