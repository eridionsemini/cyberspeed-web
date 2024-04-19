import {FC, HTMLProps, ReactElement} from 'react';

import HeartRed from '../assets/heart-red.svg';
import HeartWhite from '../assets/heart-white.svg';

export interface HeartProps extends HTMLProps<HTMLDivElement> {
  isFavourite: boolean;
  onClick: () => void;
}

export const Heart: FC<HeartProps> = ({onClick, isFavourite, className}): ReactElement => {
  return (
    <div onClick={onClick} className={className}>
      {isFavourite ? <img src={HeartRed} alt="" /> : <img src={HeartWhite} alt="" />}
    </div>
  );
};
