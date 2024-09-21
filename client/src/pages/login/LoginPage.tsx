import { useState, FC } from "react";
import "./loginPage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { login } from "../../services/userServices";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";

const LoginPage: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = await login(username, password);
    if (!userData) return;
    localStorage.setItem("token", userData.token);
    dispatch(setUser(userData));
    navigate("/question");
  };

  return (
    <div className="loginPage page">
      <h1 className="logo">IVOverflow </h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
