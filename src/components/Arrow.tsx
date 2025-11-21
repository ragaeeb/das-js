import type { ButtonHTMLAttributes, FC } from 'react';

const STYLE = { backgroundColor: 'transparent', border: 'none', outline: 'none' };

const Arrow: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <button type="button" className="arrow-button cta-btn" style={STYLE} {...props} />;
};

export default Arrow;
