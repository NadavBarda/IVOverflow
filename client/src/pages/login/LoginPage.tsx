import { useRef, FC, useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import "./loginPage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import { axiosPost } from "../../services/axiosConfig";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { loginUser } from "../../services/userServices";

const LoginPage: FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signIn = useSignIn();
  const authHeader = useAuthHeader();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials = getCredentials();

    if (!validateCredentials(credentials)) {
      setError("Please enter a username and password");
      return;
    }

    try {
      const userData = await loginUser(credentials);
      if (!userData) {
        setError("Invalid username or password");
        return;
      }
      handleSuccess(userData);
    } catch (error) {
      handleError();
    }
  };

  const getCredentials = () => {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    return { username, password };
  };

  const validateCredentials = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    return username && password;
  };

  const handleSuccess = (userData: any) => {
    setError(null);
    usernameRef.current!.value = "";
    passwordRef.current!.value = "";

    const token = userData.token;
    if (token) {
      signIn({
        auth: {
          token,
          type: "Bearer",
        },
        userState: {
          name: userData.user.username,
          uid: userData.user._id,
        },
      });
    }

    dispatch(setUser(userData.user));
    navigate("/question");
  };

  const handleError = () => {
    setError("Invalid username or password");
  };

  return (
    <div className="loginPage page">
      <h1 className="logo">IVOverflow.</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" ref={usernameRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>
        {error && <p className="error">{error}</p>}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <div className="mt-3">
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
