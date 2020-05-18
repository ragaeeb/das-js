import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Tilt from 'react-tilt';
import ProjectImg from './Image/ProjectImg';
import ScreenFade from './ScreenFade';

const renderPost = ({ node }) => {
  const { title = node.fields.slug, imageUrl } = node.frontmatter;

  return (
    <Row key={node.fields.slug}>
      <Col lg={imageUrl ? 4 : 12} sm={12}>
        <ScreenFade>
          <div className="project-wrapper__text">
            <Link to={node.fields.slug}>
              <h3 className="project-wrapper__text-title">{title || 'Project Title'}</h3>
            </Link>
            <div>
              <p>
                {node.frontmatter.description ||
                  node.excerpt ||
                  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi neque, ipsa animi maiores repellendu distinctioaperiam earum dolor voluptatum consequatur blanditiis inventore debitis fuga numquam voluptate architecto itaque molestiae.'}
              </p>
              <p className="mb-4">{node.frontmatter.date || ''}</p>
            </div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn--hero"
              href={node.fields.slug || '#!'}
            >
              See Live
            </a>

            {node.fields.slug && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn text-color-main"
                href={node.fields.slug}
              >
                Source Code
              </a>
            )}
          </div>
        </ScreenFade>
      </Col>
      {imageUrl && (
        <Col lg={8} sm={12}>
          <ScreenFade>
            <div className="project-wrapper__image">
              <a
                href={node.fields.slug || '#!'}
                target="_blank"
                aria-label="Project Link"
                rel="noopener noreferrer"
              >
                <Tilt
                  options={{
                    reverse: false,
                    max: 8,
                    perspective: 1000,
                    scale: 1,
                    speed: 300,
                    transition: true,
                    axis: null,
                    reset: true,
                    easing: 'cubic-bezier(.03,.98,.52,.99)',
                  }}
                >
                  <div data-tilt className="thumbnail rounded">
                    <ProjectImg alt={title} filename={imageUrl} />
                  </div>
                </Tilt>
              </a>
            </div>
          </ScreenFade>
        </Col>
      )}
    </Row>
  );
};

const GitHash = () => (
  <StaticQuery
    query={graphql`
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 2) {
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
              }
            }
          }
        }
      }
    `}
    render={({ allMarkdownRemark: { edges: posts } }) => {
      return posts.map(renderPost);
    }}
  />
);

export default GitHash;
