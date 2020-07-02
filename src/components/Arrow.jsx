import React from 'react';

const STYLE = { backgroundColor: 'transparent', border: 'none', outline: 'none' };

const Arrow = ({ props }) => {
  return <button type="button" className="arrow-button cta-btn" style={STYLE} {...props} />;
};

export default Arrow;
