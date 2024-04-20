import {FC, ReactElement} from 'react';

type SpinnerProps = {
  size?: 'normal' | 'small';
  color?: string;
  centered?: boolean;
};

export const Spinner: FC<SpinnerProps> = ({
  size = 'normal',
  color = 'black',
  centered = true,
}): ReactElement => (
  <div
    className={`border-2 border-${color} ${size === 'normal' ? 'h-5 w-5' : 'h-[14px] w-[14px]'} ${
      centered ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ' : ' '
    } rounded-full animate-spin border-t-transparent`}
  />
);
