import {createContext, FC, ReactElement, ReactNode} from 'react';

import {MoviesSDK} from 'movies-sdk';

interface SDKContextProps {
  children: ReactNode;
}

const {getActions, getSelectors, getStore} = new MoviesSDK();

export const SDKContext = createContext({getActions, getSelectors, getStore});

export const SDKContextProvider: FC<SDKContextProps> = ({children}): ReactElement => {
  return (
    <SDKContext.Provider value={{getActions, getSelectors, getStore}}>
      {children}
    </SDKContext.Provider>
  );
};
