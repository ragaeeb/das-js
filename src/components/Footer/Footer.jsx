import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import PortfolioContext from '../../context/context';
import { githubButtons } from '../../mock/data';
import GithubButtons from '../GithubButtons/GithubButtons';
import GitHash from './GitHash';

const Footer = () => {
  const { footer } = useContext(PortfolioContext);
  const { networks } = footer;
  const { isEnabled } = githubButtons;

  const onSocialClicked = (name) => () => window.analytics.track(name);

  return (
    <footer className="footer navbar-static-bottom">
      <Container>
        <a href="#top" aria-label="Back To Top" className="back-to-top">
          <i className="fa fa-angle-up fa-2x" aria-hidden="true" />
        </a>
        <div className="social-links">
          {networks &&
            networks.map((network) => {
              const { id, name, url } = network;
              return (
                <a
                  onClick={onSocialClicked(name)}
                  key={id}
                  href={url}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={name}
                >
                  <i className={`fa fa-${name} fa-inverse`} />
                </a>
              );
            })}
        </div>
        <hr />
        <p className="footer__text">© {new Date().getFullYear()} Dar As-Sahaba Association</p>

        {isEnabled && <GithubButtons />}
        <GitHash />
      </Container>
    </footer>
  );
};

export default Footer;
