import { func, string } from 'prop-types';
import React from 'react';
import Arrow from './Arrow';

const Title = ({ title, onLeft, onRight }) => (
  <h2 className="section-title">
    {onLeft && <Arrow onClick={onLeft}>&lt;</Arrow>}
    {title}
    {onLeft && <Arrow>&lt;</Arrow>}
    {onRight && <Arrow onClick={onRight}>&gt;</Arrow>}
  </h2>
);

Title.propTypes = {
  title: string.isRequired,
  onLeft: func,
  onRight: func,
};

export default Title;
