import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../features/user/userSlice";

import './NavBar.css'

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow navBar">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          IVOverflow.
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/questions"}>
              Questions
            </Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              {token ? (
                <>
                  <NavDropdown.Item as={Link} to={"/profile"}>
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/favorites"}>
                    Favorites
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/something"}>
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item as={Link} to={"/login"}>
                  Log In
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
