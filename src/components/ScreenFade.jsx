import Fade from '@kogk/react-reveal/Fade';
import React, { useEffect, useState } from 'react';

const ScreenFade = (props) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
  }, []);

  return (
    <Fade
      left={isDesktop}
      bottom={isMobile}
      duration={1000}
      delay={500}
      distance="30px"
      {...props}
    />
  );
};

export default ScreenFade;
