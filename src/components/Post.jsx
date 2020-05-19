import { Link } from 'gatsby';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Tilt from 'react-tilt';
import ScreenFade from './ScreenFade';

const Post = ({ node }) => {
  const { title = node.fields.slug, imageUrl } = node.frontmatter;

  return (
    <Row key={node.fields.slug}>
      <Col lg={imageUrl ? 4 : 12} sm={12}>
        <ScreenFade>
          <div className="project-wrapper__text">
            <Link to={node.fields.slug}>
              <h3 className="project-wrapper__text-title">{title}</h3>
            </Link>
            <div>
              <p>{node.frontmatter.description || node.excerpt || ''}</p>
              <p className="mb-4">{node.frontmatter.date || ''}</p>
            </div>
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
                    <img className="preview" src={imageUrl} alt={title} />
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

export default Post;
