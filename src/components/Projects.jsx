import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { Container } from 'react-bootstrap';
import Post from './Post';
import Title from './Title';

const Projects = () => {
  const {
    allMarkdownRemark: { edges: posts },
  } = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 3) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              imageUrl
              thumbnailUrl
            }
          }
        }
      }
    }
  `);

  return (
    <section id="projects">
      <Container>
        <div className="project-wrapper">
          <Title title="Updates" />
          {posts.map(Post)}
        </div>
        <Link className="cta-btn cta-btn--hero" to="/posts">
          All Posts
        </Link>
      </Container>
    </section>
  );
};

export default Projects;
