import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

const Copyright = () => {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          description
        }
      }
    }
  `);

  return (
    <p className="footer__text">
      © {new Date().getFullYear()} {site.siteMetadata.description}
    </p>
  );
};

export default Copyright;
