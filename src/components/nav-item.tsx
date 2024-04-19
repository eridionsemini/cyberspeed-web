import  {FC, ReactElement} from 'react';

import {useNavigate} from 'react-router-dom';

interface NavigationItemProps {
  name: string;
  to: string;
  replace?: boolean;
}

export const NavigationItem: FC<NavigationItemProps> = ({
  name,
  to,
  replace = false,
}): ReactElement => {
  const navigate = useNavigate();
  return (
    <div
      className="text-sm font-bold leading-6 text-white navigation-item cursor-pointer hover:text-shadow-lg shadow-white"
      onClick={() => navigate(to, {replace})}>
      {name}
    </div>
  );
};
