import {Fade} from 'react-awesome-reveal';
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
      duration={1000}
      delay={500}
      {...props}
    />
  );
};

export default ScreenFade;
