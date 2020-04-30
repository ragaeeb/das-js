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
          {gitCommit.hash} [{new Date(gitCommit.date).toLocaleString()}]
        </p>
      );
    }}
  />
);

export default GitHash;
