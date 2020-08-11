import { Link } from 'gatsby';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Tilt from 'react-tilt';

const Post = ({ node }) => {
  const { title = node.fields.slug, imageUrl, thumbnailUrl } = node.frontmatter;
  const pic = thumbnailUrl || imageUrl;

  return (
    <Row key={node.fields.slug}>
      <Col lg={pic ? 4 : 12} sm={12}>
        <div className="project-wrapper__text">
          <Link to={node.fields.slug}>
            <h3 className="project-wrapper__text-title">{title}</h3>
          </Link>
          <div>
            <p>{node.frontmatter.description || node.excerpt || ''}</p>
            <p className="mb-4">{node.frontmatter.date || ''}</p>
          </div>
        </div>
      </Col>
      {pic && (
        <Col lg={8} sm={12}>
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
                  <LazyLoadImage alt={title} className="preview" src={pic} />
                </div>
              </Tilt>
            </a>
          </div>
        </Col>
      )}
    </Row>
  );
};

export default Post;
