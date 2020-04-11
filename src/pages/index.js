import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import App from '../components/App';
import { headData } from '../mock/data';
import '../style/main.scss';

export default () => {
  const { title, lang, description } = headData;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title || 'Dār as-Ṣaḥābah'}</title>
        <html lang={lang || 'en'} />
        <meta name="description" content={description || 'Dār as-Ṣaḥābah Association'} />
      </Helmet>
      <App />
    </>
  );
};
