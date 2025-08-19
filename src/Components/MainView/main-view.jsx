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
      const moviesFromApi = data.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.title,
          image: "",
          genre: doc.genre,
          director: doc.director,
          description: doc.description
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