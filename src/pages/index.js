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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title || 'Dār as-Ṣaḥābah'} />
        <meta property="og:description" content={description || 'Dār as-Ṣaḥābah Association'} />
        <meta name="description" content={description || 'Dār as-Ṣaḥābah Association'} />
        <meta property="og:url" content="http://dar-as-sahaba.com" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_CA" />
        <link rel="canonical" href="http://dar-as-sahaba.com" />
        <title>{title || 'Dār as-Ṣaḥābah'}</title>
        <html lang={lang || 'en'} />
      </Helmet>
      <App />
    </>
  );
};
