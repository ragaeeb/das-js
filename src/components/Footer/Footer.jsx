import { Link as RouteLink } from 'gatsby';
import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import {
  FaAngleUp,
  FaFacebook,
  FaInstagram,
  FaSoundcloud,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { Link } from 'react-scroll';
import PortfolioContext from '../../context/context';
import { githubButtons } from '../../mock/data';
import GithubButtons from '../GithubButtons/GithubButtons';
import GitHash from './GitHash';

const brandToNode = {
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  soundcloud: <FaSoundcloud />,
  telegram: <FaTelegram />,
  twitter: <FaTwitter />,
  youtube: <FaYoutube />,
};

const Footer = () => {
  const { footer } = useContext(PortfolioContext);
  const { networks } = footer;
  const { isEnabled } = githubButtons;

  const onSocialClicked = (name) => () => window.analytics.track(name);

  return (
    <footer className="footer navbar-static-bottom">
      <Container>
        <span className="back-to-top">
          <Link to="hero" smooth duration={1000}>
            <FaAngleUp size="2em" />
          </Link>
        </span>
        <div className="social-links">
          {networks &&
            networks.map((network) => {
              const { name, url } = network;
              return (
                <a
                  onClick={onSocialClicked(name)}
                  key={name}
                  href={url}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={name}
                >
                  {brandToNode[name]}
                </a>
              );
            })}
        </div>
        <hr />
        <p className="footer__text">© {new Date().getFullYear()} Dar As-Sahaba Association</p>
        {isEnabled && <GithubButtons />}
        <GitHash />
        <RouteLink style={{ color: 'white' }} to="privacy">
          Privacy Policy
        </RouteLink>
      </Container>
    </footer>
  );
};

export default Footer;
