import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button} from "react-bootstrap";
import { useNavigate } from "react-router";
import { MovieCard } from "../MovieCard/movie-card.jsx";

export const ProfileView = ({movies, user, setUser}) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.Username;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    Email: "",
    Birthday:"",
  });

//Fetch User Data
  useEffect(() => {
    if(!token || !username) {
      setError("Not logged in");
      return;
    }
    
    fetch(`https://moviefy-288671c73ad6.herokuapp.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("fetched user data:", data);
        setUser(data);
        setFormData({
          Username: data.Username,
          Password: "", 
          Email: data.Email,
          Birthday: data.Birthday?.slice(0,10),
        })
      })
      .catch((err) =>  {
        setError(err.message);
      });
  }, [token, username]);

//Form Data Change
  const handleChange =(e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

//Update Account Info
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (!formData.Username || !formData.Email || !formData.Password) {
        alert("Username, Password, and Email are required");
        return;
      }

      if (formData.Username.length < 5) {
        alert("Username must be at least 5 characters");
        return;
      }

      const dataToSend = {
        Username: formData.Username,
        Password: formData.Password,
        Email: formData.Email,
        Birthday: formData.Birthday ? new Date(formData.Birthday).toISOString():null
      };

      console.log("Submitting update:", dataToSend);

      const response = await fetch(`https://moviefy-288671c73ad6.herokuapp.com/users/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new error(text || "Failed to update user");
      }
      else{
        const updatedUser = await response.json();
        setUser({...updatedUser});
        setSuccess(true);
        alert("Profile updated Successfully!");
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setFormData({...formData, Password: ""});
      }

    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    }
  };

//Deregister
  const handleDeregister = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }

    try {
      const response = await fetch(`https://moviefy-288671c73ad6.herokuapp.com/users/${username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        alert("Failed to deregister user");
      }

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      alert("Your account has been deleted.");
      navigate("/login", {replace: true});
      window.location.reload();
    } catch (err){
      console.error("Deregister error:",err);
      alert(err.message);
    }
  };

//Page Contents

//User Info
  return(
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">Profile Information</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="Username"
                    value={formData.Username}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    value={formData.Password}
                    placeholder="Enter password"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    name="Birthday"
                    value={formData.Birthday}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button type="submit" variant="primary">Update Profile</Button>
                <Button variant="danger" onClick={handleDeregister}>Delete Account</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  {/*Favorite Movies*/}
      {user && (
        <>
          <h3 className="mt-5">Favorites</h3>
          <Row>
            {movies.filter((m) => user.Favorites.includes(m.id))
            .map((movie) => (
              <Col className="mb-4" key={movie.id} md={4}>
                <MovieCard 
                  key={movie.id}
                  movie={movie}
                  user={user}
                  setUser={setUser}
                  token={token}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};