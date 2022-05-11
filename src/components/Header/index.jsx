import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BoxArrowDown, Twitch } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand href='/'>Findyourtech</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse className='justify-content-end' id='basic-navbar-nav'>
          <Nav>
            <Navbar.Text href='#upload'>
              <BoxArrowDown />
              <Link to="/upload" className="mx-2">Upload</Link>
            </Navbar.Text>
            <Nav.Link href='#login'>
              <Twitch />
              <span className="mx-2">Login</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
