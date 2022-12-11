import 'bootstrap/dist/css/bootstrap.min.css';
import { graphql } from 'gatsby';
import React from 'react';
import App from '../components/App';
import '../style/main.scss';

// https://github.com/LasaleFamine/string-normalize-es6/blob/master/src/index.js
const normalize = (input) => input && input.normalize && input.normalize('NFKD').replace(/[\u0300-\u036f]/g, '') ;

const pages = () => <App />;

export default pages;

export const Head = ({ data }) => {
  const { title, description } = data.site.siteMetadata;
  const metaDescription = normalize(description || site.siteMetadata.description);
  const metaTitle = normalize(title);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="og:title" content={metaTitle} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content='website' />
      <meta name="twitter:card" content='summary' />
      <meta name="twitter:creator" content='summary' />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </>
  );
};

export const pageQuery = graphql`
  query AppTitleQuery {
    site {
      siteMetadata {
        lang
        title
        description
      }
    }
  }
`;
