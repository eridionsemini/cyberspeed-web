import {FC, ReactElement} from 'react';
import {Movie as MovieType} from 'movies-sdk';
import {Heart} from './heart';
import {isFavourite} from '../utils';

interface MovieProps {
  movie: MovieType;
  handleClick?: (title: string) => void;
  handleHeartClick: (v: MovieType) => void;
  fav: Array<MovieType>;
}

export const Movie: FC<MovieProps> = ({
  movie,
  handleClick,
  handleHeartClick,
  fav,
}): ReactElement => {
  const isFav = isFavourite(fav, movie.imdbID);

  return (
    <div
      onClick={() => handleClick && handleClick(movie.imdbID)}
      className="relative border border-gray-200 shadow-md rounded-lg cursor-pointer">
      <img src={movie.Poster} alt="poster" className="rounded-lg h-80 w-80" />
      <div className="absolute top-4 left-4 z-10 text-sm text-cyan-500 font-bold">
        {movie.Title}
      </div>
      <div className="absolute bottom-4 left-4 z-10 text-sm text-cyan-500 font-bold">
        {movie.Year}
      </div>
      <Heart
        onClick={() => handleHeartClick(movie)}
        isFavourite={isFav}
        className="absolute top-4 right-4 z-10"
      />
    </div>
  );
};
