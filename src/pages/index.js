import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import App from '../components/App';
import SEO from '../components/seo';
import { headData } from '../mock/data';
import '../style/main.scss';

export default () => {
  const { title, lang, description } = headData;

  return (
    <>
      <SEO title={title} lang={lang} description={description} />
      <App />
    </>
  );
};
