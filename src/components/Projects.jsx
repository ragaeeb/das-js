import React from 'react';
import { Container } from 'react-bootstrap';
import Posts from './Posts';
import Title from './Title';

const Projects = () => {
  return (
    <section id="projects">
      <Container>
        <div className="project-wrapper">
          <Title title="Projects" />
          <Posts />
        </div>
      </Container>
    </section>
  );
};

export default Projects;
