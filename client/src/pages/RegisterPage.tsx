import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { register } from "../services/userServices";
import { Link } from "react-router-dom";
import { RegisterUser } from "../interface/userInterface";

const RegisterPage: React.FC = () => {
  const [user, setUser] = useState<RegisterUser>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((u) => ({ ...u, [name]: value }));
  };
  return (
    <div className="App">
      <Form onSubmit={() => register(user)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="username"
            value={user.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>first name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="first name"
            value={user.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>last name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="last name"
            value={user.lastName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="email"
            value={user.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div>
        <p>
          Already have an account? <Link to="/login">login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
