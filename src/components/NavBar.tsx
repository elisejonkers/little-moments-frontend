import "../styling/navbar.css"

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from "../assets/logo-test.png"

const NavBar: React.FC = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext)

  return (
    <div className="navbar-custom">
      {isLoggedIn && (
        <Navbar expand="sm" className="bg-body-primary">
          <Container>
            <Navbar.Brand href="/dashboard"><img src={logo} alt="logo" className="logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link onClick={logOutUser}>Log out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}

      {!isLoggedIn && (
        <Navbar expand="sm" className="bg-body-primary">
          <Container>
            <Navbar.Brand href="/"><img src={logo} alt="logo" className="logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="login">Login</Nav.Link>
                <Nav.Link href="signup">Sign up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

export default NavBar;
