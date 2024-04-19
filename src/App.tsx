import { Provider } from 'react-redux';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { MoviesSDK } from 'movies-sdk';
import { SDKContextProvider } from './context';

function App() {

  const client = new MoviesSDK();
  const sdkStore = client.getStore();

  return (
    <SDKContextProvider>
      <Provider store={sdkStore}>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      </Provider>
    </SDKContextProvider>

  )
}

export default App
