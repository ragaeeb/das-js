import PropTypes from 'prop-types';
import React from 'react';

const Image = ({ filename, alt }) => <img src={filename} alt={alt} />;

Image.propTypes = {
  filename: PropTypes.string,
  alt: PropTypes.string,
};

export default Image;
