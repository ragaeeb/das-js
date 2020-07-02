import { graphql, StaticQuery } from 'gatsby';
import React from 'react';

const GitHash = () => (
  <StaticQuery
    query={graphql`
      {
        gitCommit(latest: { eq: true }) {
          hash
          date
        }
      }
    `}
    render={({ gitCommit }) => {
      return (
        <p className="footer__text">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`https://github.com/ragaeeb/das-js/commit/${gitCommit.hash}`}
          >
            {gitCommit.hash}
          </a>{' '}
          [{new Date(gitCommit.date).toLocaleString()}]
        </p>
      );
    }}
  />
);

export default GitHash;
