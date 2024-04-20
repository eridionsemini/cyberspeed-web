import {lazy, Suspense} from 'react';

import {Provider} from 'react-redux';
import {MoviesSDK} from 'movies-sdk';
import {Route, Routes} from 'react-router-dom';

import {Spinner} from './components';
import {SDKContextProvider} from './context';

const Movies = lazy(() => import('../src/pages/movies'));
const Movie = lazy(() => import('../src/pages/movie'));
const FavouriteMovies = lazy(() => import('../src/pages/favourites'));

function App() {
  const client = new MoviesSDK();
  const sdkStore = client.getStore();

  return (
    <SDKContextProvider>
      <Provider store={sdkStore}>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner />}>
                <Movies />
              </Suspense>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <Movie />
              </Suspense>
            }
          />
          <Route
            path="/favourites"
            element={
              <Suspense fallback={<Spinner />}>
                <FavouriteMovies />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Spinner />}>
                <Movies />
              </Suspense>
            }
          />
        </Routes>
      </Provider>
    </SDKContextProvider>
  );
}

export default App;
