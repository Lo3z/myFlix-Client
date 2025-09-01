import PropTypes from "prop-types";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const MovieCard =({movie, user, setUser, token}) => {
  const movieId = movie._id || movie.id;
  const isFavorite = user?.Favorites?.includes(movieId);
  

  const toggleFavorite = async() => {
    if (!user || !token ||!movie.id) {
      console.warn("Missing user, token, or movie ID");
      return;
    }

    const url = `https://moviefy-288671c73ad6.herokuapp.com/users/${user.Username}/movies/${movieId}`;
    const method = isFavorite? "DELETE" : "POST";

    try{
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to update favorites");
      }

      const updatedUser = await response.json();
      setUser({...updatedUser});
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Favorite error:", err);
      alert("Could not update favorites");
    };
};

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Link to ={`/movies/${movieId}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button
          variant={isFavorite ? "danger" : "success"}
          onClick={toggleFavorite}
          className="ms-2"
        >
          {isFavorite ? "Remove Favorite" : "Add Favorite"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onBookClick: PropTypes.func.isRequired,
};