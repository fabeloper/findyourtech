import React, { useContext } from "react";
import { authentication } from "../../firebase/config";
import { TwitterAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BoxArrowDown, Twitter, CaretDown } from "react-bootstrap-icons";
import "./header.scss";
import { AuthenticationContext } from "../../App";

export default function Header() {
  const { user, setUser } = useContext(AuthenticationContext);
  const signInTwitter = () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => console.log(re))
      .catch((err) => console.error(err));
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Findyourtech</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav>
            {user && (
              <Navbar.Text href="#upload">
                <BoxArrowDown />
                <Link to="/upload" className="mx-2">
                  Upload
                </Link>
              </Navbar.Text>
            )}
            {!user ? (
              <Nav.Link onClick={signInTwitter}>
                <Twitter />
                <span className="mx-2">Login</span>
              </Nav.Link>
            ) : (
              <NavDropdown
                title={
                  <>
                    <Image
                      src={user.photoURL}
                      alt="UserName profile image"
                      roundedCircle
                      style={{ width: "30px" }}
                    />
                    <CaretDown />
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => signOut(authentication)}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
