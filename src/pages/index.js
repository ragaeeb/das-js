import 'bootstrap/dist/css/bootstrap.min.css';
import { graphql } from 'gatsby';
import React from 'react';
import App from '../components/App';
import SEO from '../components/seo';
import '../style/main.scss';

export default ({ data }) => {
  const { title, lang, description } = data.site.siteMetadata;

  return (
    <>
      <SEO title={title} lang={lang} description={description} />
      <App />
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
