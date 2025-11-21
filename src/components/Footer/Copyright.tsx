import { siteMetadata } from '../../config';
import type { FC } from 'react';

const Copyright: FC = () => {
  const { description } = siteMetadata;

  return (
    <p className="footer__text">
      © {new Date().getFullYear()} {description}
    </p>
  );
};

export default Copyright;
