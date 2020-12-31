import { graphql, StaticQuery } from 'gatsby';
import React from 'react';

const GitHash = () => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            description
          }
        }
      }
    `}
    render={({ site }) => (
      <p className="footer__text">
        © {new Date().getFullYear()} {site.siteMetadata.description}
      </p>
    )}
  />
);

export default GitHash;
