import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Container } from 'react-bootstrap';
import Post from '../components/Post';
import Title from '../components/Title';

const AllPosts = () => {
  const {
    allMarkdownRemark: { edges: posts },
  } = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
          <Title title="All Posts" />
          {posts.map(Post)}
        </div>
      </Container>
    </section>
  );
};

export default AllPosts;
