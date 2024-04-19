import {FC, ReactElement, useContext, useEffect, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {Movie as MovieType} from 'movies-sdk';

import {SDKContext} from '../context';
import {useAppDispatch, useAppSelector} from '../hooks';
import {chunkArray, debounce, isFavourite} from '../utils';
import {Movie, Navbar} from '../components';

const Movies: FC = (): ReactElement => {
  const [fetched, setFetched] = useState<boolean>(false);

  const {getActions, getSelectors} = useContext(SDKContext);

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
      dispatch(loadMoreMovies({page: page + 1, s}));
      dispatch(incrementMoviesListPage());
    }
  };

  const handleClick = (v: string) => {
    dispatch(getMovieDetails({i: v}));
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
    dispatch(getMoviesList({page, s: value}));
  }, 1000);

  useEffect(() => {
    if (!loading && data && data.length === 0 && !fetched) {
      dispatch(getMoviesList({s: 'movie', page: 1}));
      setFetched(true);
    }
  }, [data, dispatch, loading, page, fetched, getMoviesList]);

  const arrayMovies = chunkArray(data, 2);

  return (
    <>
      <Navbar />
      <div className="mx-10">
        {arrayMovies.map((movies, index) => (
          <div key={index.toString()} className="flex my-4 items-center justify-evenly">
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
      </div>
    </>
  );
};

export default Movies;
