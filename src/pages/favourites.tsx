import {FC, ReactElement, useContext} from 'react';

import {useNavigate} from 'react-router-dom';
import {Movie as MovieType} from 'movies-sdk';

import {SDKContext} from '../context';
import {useAppDispatch, useAppSelector} from '../hooks';
import {chunkArray} from '../utils';
import {Movie, Navbar} from '../components';

const FavouriteMovies: FC = (): ReactElement => {
  const {getActions, getSelectors, apiKey} = useContext(SDKContext);

  const {favouritesSelector} = getSelectors();
  const {removeMovieFromFavourites, getMovieDetails} = getActions();

  const {data: fav} = useAppSelector(favouritesSelector);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleClick = (v: string) => {
    dispatch(getMovieDetails({i: v, apiKey}));
    navigate(`/movie/${v}`);
  };

  const handleHeartClick = (movie: MovieType) => dispatch(removeMovieFromFavourites(movie));

  const arrayMovies = chunkArray(fav, 2);

  return (
    <>
      <Navbar />
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
      </div>
    </>
  );
};

export default FavouriteMovies;
