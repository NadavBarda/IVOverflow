import { useState } from "react";
import "./register.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ErrorList, register, validateUser } from "../../services/userServices";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../interface/userInterface";

const RegisterPage: React.FC = () => {
  const [errorList, setErrorList] = useState<ErrorList>({});
  const navigate = useNavigate();
  const [user, setUser] = useState<RegisterUser>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const validations = validateUser(user);
    setErrorList(validations.errors);
    if (!validations.isValid) return;
    try {
      const res = await register(user);
      if (res.status === 201) {
        navigate("/login");
      } else {
        console.error("Registration failed with status: ", res.status);
      }
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((u) => ({ ...u, [name]: value }));
  };

  return (
    <div className="page register-page">

      <h1 className="logo">Welcome to IVOverflow.</h1>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            value={user.username}
            onChange={handleChange}
          />
          {errorList["username"] && (
            <span className="error">{errorList["username"]}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={user.firstName}
            onChange={handleChange}
          />
          {errorList["firstName"] && (
            <span className="error">{errorList["firstName"]}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={user.lastName}
            onChange={handleChange}
          />
          {errorList["lastName"] && (
            <span className="error">{errorList["lastName"]}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={user.email}
            onChange={handleChange}
          />
          {errorList["email"] && (
            <span className="error">{errorList["email"]}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={user.password}
            onChange={handleChange}
          />
          {errorList["password"] && (
            <span className="error">{errorList["password"]}</span>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <div className="link mt-3">
        <p className="mb-0">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
