import React, { useEffect, useState } from 'react';
import { version, repository } from '../../../package.json';

const GitHash = () => {
  const [tag, setTag] = useState({ html_url: '', published_at: '', tag_name: `v${version}` });

  useEffect(() => {
    const repo = repository.url.substring('https://github.com/'.length);
    fetch(`https://api.github.com/repos/${repo}/releases/tags/v${version}`)
      .then((response) => response.json())
      .then((data) => setTag(data));
  }, []);

  return (
    <p className="footer__text" data-cy="lastUpdate">
      <a rel="noopener noreferrer" target="_blank" href={`${tag.html_url}`}>
        {tag.tag_name} {tag.published_at && new Date(tag.published_at).toLocaleString()}
      </a>
    </p>
  );
};

export default GitHash;
