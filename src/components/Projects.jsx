import { Link } from 'gatsby';
import React from 'react';
import { Container } from 'react-bootstrap';
import Posts from './Posts';
import Title from './Title';

const Projects = () => {
  return (
    <section id="projects">
      <Container>
        <div className="project-wrapper">
          <Title title="Updates" />
          <Posts />
        </div>
        <Link className="cta-btn cta-btn--hero" to="/something">
          Show More
        </Link>
      </Container>
    </section>
  );
};

export default Projects;
