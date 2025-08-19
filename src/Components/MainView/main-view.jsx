import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import PropTypes from "prop-types";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch ("https://moviefy-288671c73ad6.herokuapp.com/movies")
    .then((response) => response.json())
    .then ((data) => {
      const moviesFromApi = data.map((doc) => {
        return {
          id: doc._id,
          title: doc.Name,
          image: doc.ImagePath,
          genre: doc.Genre?.Name,
          director: doc.Director?.Name,
          description: doc.Description
        };
      });

      setMovies(moviesFromApi);
    });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if(selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};