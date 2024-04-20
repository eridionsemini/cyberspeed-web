import {createContext, FC, ReactElement, ReactNode} from 'react';

import {MoviesSDK} from 'movies-sdk';
const apiKey = process.env.REACT_APP_MOVIES_API_KEY;

interface SDKContextProps {
  children: ReactNode;
}

const {getActions, getSelectors, getStore} = new MoviesSDK();

export const SDKContext = createContext({getActions, getSelectors, getStore, apiKey});

export const SDKContextProvider: FC<SDKContextProps> = ({children}): ReactElement => {
  return (
    <SDKContext.Provider value={{getActions, getSelectors, getStore, apiKey}}>
      {children}
    </SDKContext.Provider>
  );
};
