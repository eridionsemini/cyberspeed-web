import { FC, ReactElement, useContext } from "react";
import { SDKContext } from "../context";
import { useAppDispatch, useAppSelector } from "../hooks";
import { chunkArray } from "../utils";
import { Movie, Navbar } from "../components";
import { Movie as MovieType } from 'movies-sdk';

const FavouriteMovies: FC = (): ReactElement => {
    const { getActions, getSelectors } = useContext(SDKContext);

    const { favouritesSelector } = getSelectors();
    const {
        removeMovieFromFavourites,
        getMovieDetails,
    } = getActions();


    const { data: fav } = useAppSelector(favouritesSelector);

    const dispatch = useAppDispatch();

    const handleClick = (v: string) => {
        dispatch(getMovieDetails({ i: v }));
    };

    const handleHeartClick = (movie: MovieType) => dispatch(removeMovieFromFavourites(movie));

    const arrayMovies = chunkArray(fav, 2);

    return (
        <>
            <Navbar />
            <div className="mx-10">
                {arrayMovies.map((movies, index) => (
                    <div key={index.toString()} className="flex my-4 items-center justify-evenly">
                        {movies.map((movie, index) => (
                            <Movie key={index.toString()} movie={movie} fav={fav} handleHeartClick={handleHeartClick} handleClick={handleClick} />
                        ))}
                    </div>
                ))}
            </div>
        </>

    )
}


export default FavouriteMovies;