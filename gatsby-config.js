const git = require('git-rev-sync');
require('dotenv').config();

const pack = require('./package.json');

module.exports = {
  siteMetadata: {
    title: pack.author,
    lang: 'en',
    description: pack.description,
    author: pack.author,
    siteUrl: pack.homepage,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `src/images`,
      },
    },
    {
      resolve: '@sentry/gatsby',
      options: {
        dsn: process.env.SENTRY_DSN,
        tags: { git_commit: git.short() },
        release: git.long(),
        environment: process.env.NODE_ENV,
        enabled: process.env.NODE_ENV === 'production',
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        // https://www.gatsbyjs.org/packages/gatsby-plugin-mailchimp/
        endpoint: process.env.MAILCHIMP_ENDPOINT, // should be something like https://dar-as-sahaba.a10.list-manage.com/subscribe/post?u=abcd&amp;id=1234
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    {
      resolve: `gatsby-plugin-chatwoot`,
      options: {
        baseUrl: 'https://app.chatwoot.com', // Required
        websiteToken: process.env.CHATWOOT_TOKEN, // Required
        includeInDevelopment: true, // Optional
        chatwootSettings: {}, // Optional
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
    `gatsby-plugin-preact`,
  ],
};
