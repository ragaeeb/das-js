import { type FC, type ReactNode, useContext } from 'react';
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
import { Link as RouteLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import pkg from '@/../package.json';
import PortfolioContext from '@/context/context';
import Copyright from './Copyright';

const version = pkg.version;
const buildTime = import.meta.env.VITE_BUILD_TIME
  ? new Date(import.meta.env.VITE_BUILD_TIME).toLocaleString()
  : new Date().toLocaleString();

const brandToNode: Record<string, ReactNode> = {
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  soundcloud: <FaSoundcloud />,
  telegram: <FaTelegram />,
  twitter: <FaTwitter />,
  youtube: <FaYoutube />,
};

const Footer: FC = () => {
  const context = useContext(PortfolioContext);

  // Handle possible undefined context
  if (!context || !context.footer) {
    return null;
  }

  const { networks } = context.footer;

  return (
    <footer className="footer navbar-static-bottom">
      <Container>
        <span className="back-to-top">
          <Link to="hero" smooth duration={1000}>
            <FaAngleUp size="2em" />
          </Link>
        </span>
        <div className="social-links">
          {networks?.map((network) => {
            const { name, url } = network;
            return (
              <a key={name} href={url} rel="noopener noreferrer" target="_blank" aria-label={name}>
                {brandToNode[name]}
              </a>
            );
          })}
        </div>
        <Copyright />
        <p className="footer__text">
          v{version} {buildTime}
        </p>
        <RouteLink style={{ color: 'white' }} to="privacy">
          Privacy Policy
        </RouteLink>
      </Container>
    </footer>
  );
};

export default Footer;
