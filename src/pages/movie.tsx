import {FC, ReactElement, useContext, useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';

import {Heart, Navbar} from '../components';

import {useAppDispatch, useAppSelector} from '../hooks';
import {SDKContext} from '../context';
import {isFavourite, convertStringToArray} from '../utils';

const Movie: FC = (): ReactElement | null => {
  const [fetched, setFetched] = useState<boolean>(false);
  const {getActions, getSelectors, apiKey} = useContext(SDKContext);
  const dispatch = useAppDispatch();
  const {favouritesSelector, movieDetailsSelector} = getSelectors();
  const {addMovieToFavourites, removeMovieFromFavourites, getMovieDetails} = getActions();
  const {details: movie, loading} = useAppSelector(movieDetailsSelector);
  const {data: fav} = useAppSelector(favouritesSelector);
  const {id} = useParams();

  useEffect(() => {
    if (!movie && !loading && id && !fetched) {
      setFetched(true);
      dispatch(getMovieDetails({i: id, apiKey: apiKey ? apiKey : ''}));
    }
  }, [movie, loading, id, fetched]);

  if (!movie) return null;

  console.log({id, movie});

  const actors = convertStringToArray(movie.Actors);
  const keywords = convertStringToArray(movie.Genre);
  const isFav = isFavourite(fav, movie.imdbID);

  const onClick = () => {
    const m = {
      imdbID: movie.imdbID,
      Year: movie.Year,
      Poster: movie.Poster,
      Type: movie.Type,
      Title: movie.Title,
    };
    if (isFav) {
      dispatch(removeMovieFromFavourites(m));
      return;
    }
    dispatch(addMovieToFavourites(m));
  };

  return (
    <>
      <Navbar />
      <div className=" mt-10">
        <div className="relative w-1/2 mx-auto">
          <img src={movie.Poster} className="w-full h-80 relative rounded-lg mx-auto" />
          <Heart
            isFavourite={isFav}
            onClick={onClick}
            className="absolute top-4 right-4 z-20 cursor-pointer"
          />
        </div>
        <div className="mt-10 flex items-center justify-evenly">
          <div>
            <div>Actors</div>
            {actors.map((a, i) => (
              <div key={i.toString()} className="text-xs">
                {a}
              </div>
            ))}
          </div>
          <div>
            <div>Keywords</div>
            {keywords.map((keyword, i) => (
              <div key={i.toString()} className="text-xs">
                {keyword}
              </div>
            ))}
          </div>
          <div>
            <div>Ratings</div>
            {movie.Ratings.map((rating, i) => (
              <div key={i.toString()} className="text-xs">
                {rating.Source} {rating.Value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
