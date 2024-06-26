import {FC, ReactElement, useContext, useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {Movie as MovieType} from 'movies-sdk';

import {SDKContext} from '../context';
import {useAppDispatch, useAppSelector} from '../hooks';
import {chunkArray, debounce, isFavourite} from '../utils';
import {Movie, Navbar} from '../components';

const Movies: FC = (): ReactElement => {
  const [fetched, setFetched] = useState<boolean>(false);

  const {getActions, getSelectors, apiKey} = useContext(SDKContext);

  const {favouritesSelector, moviesSelector} = getSelectors();
  const {
    getMoviesList,
    incrementMoviesListPage,
    loadMoreMovies,
    setFilterValue,
    addMovieToFavourites,
    removeMovieFromFavourites,
    getMovieDetails,
  } = getActions();

  const {
    data,
    loading,
    hasMore,
    page,
    filter: {s},
  } = useAppSelector(moviesSelector);

  const {data: fav} = useAppSelector(favouritesSelector);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const loadMoreClick = () => {
    if (hasMore) {
      dispatch(loadMoreMovies({page: page + 1, s, apiKey}));
      dispatch(incrementMoviesListPage());
    }
  };

  const handleClick = (v: string) => {
    dispatch(getMovieDetails({i: v, apiKey}));
    navigate(`/movie/${v}`);
  };

  const handleHeartClick = (movie: MovieType) => {
    const isFav = isFavourite(fav, movie.imdbID);
    if (isFav) {
      dispatch(removeMovieFromFavourites(movie));
      return;
    }
    dispatch(addMovieToFavourites(movie));
  };

  const handleDebouncedInputChange = debounce((value: string) => {
    dispatch(getMoviesList({page, s: value, apiKey}));
  }, 1000);

  const handleInputChange = (txt: string) => {
    dispatch(setFilterValue({key: 's', value: txt}));
    handleDebouncedInputChange(txt);
  };

  useEffect(() => {
    if (!loading && data && data.length === 0 && !fetched) {
      dispatch(getMoviesList({s, page: 1, apiKey}));
      setFetched(true);
    }
  }, [data, dispatch, loading, page, fetched, getMoviesList, apiKey, s]);

  const arrayMovies = chunkArray(data, 2);

  return (
    <>
      <Navbar />
      <div className="flex justify-center my-4">
        <div className="mx-6 w-1/4">
          <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
            Search for a movie
          </label>
          <input
            type="text"
            name="search"
            value={s}
            onChange={e => handleInputChange(e.target.value)}
            id="search"
            className="block w-full rounded-md px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="search"
          />
        </div>
      </div>
      <div className="mx-10">
        {arrayMovies.map((movies, index) => (
          <div
            key={index.toString()}
            className="flex flex-col my-4 items-center justify-evenly sm:flex-row">
            {movies.map((movie, index) => (
              <Movie
                key={index.toString()}
                movie={movie}
                fav={fav}
                handleHeartClick={handleHeartClick}
                handleClick={handleClick}
              />
            ))}
          </div>
        ))}
        <div className="mb-10 flex justify-center">
          <button
            disabled={!hasMore}
            onClick={loadMoreClick}
            type="button"
            className={`rounded  ${hasMore ? 'bg-indigo-600' : 'bg-gray-200'} px-2 py-1 text-xs font-semibold text-white shadow-sm ${hasMore ? 'hover:bg-indigo-500' : ''} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${hasMore ? 'focus-visible:outline-indigo-600' : ''}`}>
            Load more
          </button>
        </div>
      </div>
    </>
  );
};

export default Movies;
