import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser:null);
  const [token, setToken] = useState(storedToken? storedToken:null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token){
      return;
    }

    fetch ("https://moviefy-288671c73ad6.herokuapp.com/movies", {
      headers: {Authorization: `Bearer ${token}` }
    })
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
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={(user) => setUser(user)}/>
          or
          <SignupView/>
        </Col>
      ): selectedMovie ? (
        <Col md={8} style={{border:"1[x solid black"}}>
          <MovieView
            style={{border:"1px solid green"}}
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ): movies.length === 0 ? (
        <div>The list is empty!</div>
      ): (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        <Col xs={12} className="text-center">
          <Button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
          </Col>
        </>
      )}
    </Row>
  );
};