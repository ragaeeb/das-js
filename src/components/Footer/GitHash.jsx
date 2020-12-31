import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import json from '../../../package.json';

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
    render={({ gitCommit }) => (
      <p className="footer__text">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={`${json.repository.url}/commit/${gitCommit.hash}`}
        >
          {gitCommit.hash}
        </a>{' '}
        [{new Date(gitCommit.date).toLocaleString()}]
      </p>
    )}
  />
);

export default GitHash;
