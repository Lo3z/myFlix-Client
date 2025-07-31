import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Dark Knight",
      image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
      genre: "Action",
      director: "Christopher Nolan",
      description: "Batman faces his greatest psychological and moral test as he battles the anarchic Joker in a city descending into chaos."
    },
    {
      id: 2,
      title: "The Matrix",
      image: "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_.jpg",
      genre: "Science Fiction",
      director: "Lana Wachowski",
      description: "A hacker discovers his world is a simulated reality and joins a rebellion to free humanity from machine control."
    },
    {
      id: 3,
      title: "Whiplash",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP84YZtk6WteBd3KpAKCqEEK_AhRvgOky_SQ&s",
      genre: "Drama",
      director: "Damien Chazelle",
      description: "An ambitious jazz drummer pushes himself to the limit under the ruthless mentorship of an obsessive music instructor."
    }
  ]);

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