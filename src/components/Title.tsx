import type { FC } from 'react';
import Arrow from './Arrow';

interface TitleProps {
  title: string;
  onLeft?: () => void;
  onRight?: () => void;
}

const Title: FC<TitleProps> = ({ title, onLeft, onRight }) => (
  <h2 className="section-title">
    {onLeft && <Arrow onClick={onLeft}>&lt;</Arrow>}
    {title}
    {onLeft && <Arrow>&lt;</Arrow>}
    {onRight && <Arrow onClick={onRight}>&gt;</Arrow>}
  </h2>
);

export default Title;
