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
import Copyright from './Copyright';
import { GitHash } from './GitHash';

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

  const onSocialClicked = (name) => () => window.analytics && window.analytics.track(name);

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
                  data-cy={name}
                >
                  {brandToNode[name]}
                </a>
              );
            })}
        </div>
        <Copyright />
        <GitHash />
        <RouteLink style={{ color: 'white' }} to="privacy" data-cy="privacy">
          Privacy Policy
        </RouteLink>
      </Container>
    </footer>
  );
};

export default Footer;
