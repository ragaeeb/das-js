const pack = require('./package.json');

module.exports = {
  siteMetadata: {
    title: pack.author,
    lang: 'en',
    description: pack.description,
    author: pack.author,
    siteUrl: pack.homepage,
  },
  flags: {
    PARALLEL_SOURCING: true,
    FAST_DEV: true,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: pack.description,
        short_name: pack.author,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#02aab0`,
        display: `standalone`,
        icon: 'src/images/favicon.png',
      },
    },
  ],
};
