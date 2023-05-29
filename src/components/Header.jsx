import * as React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Nav, Navbar } from "react-bootstrap";
import LogIn from "../pages/login/login";
import { UserContext } from "../useContext/states";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';

function CustomNavbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const localStoredUser = JSON.parse(localStorage.getItem("user"));
    setUser(
      localStoredUser
        ? { loggedIn: true, venueManager: localStoredUser.isVenueManager }
        : { loggedIn: false, venueManager: false }
    );
  }, [setUser]);

  function logout() {
    if (window.confirm("Do you want to log out?")) {
      setUser({ loggedIn: false, venueManager: false });
      localStorage.clear();
      navigate("/");
    }
  }

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 1000px)" });
  const [value, setValue] = React.useState(0);


  if (isMobile) {

    return (
      <Box sx={{ width: '100%', position: 'fixed', bottom: '0', left: '0', borderTop: '1px solid black', zIndex: '9' }} value={value} onChange={(event, newValue) => { setValue(newValue) }}>
        <BottomNavigation
          sx={{ justifyContent: 'space-between' }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Link to="/">
            <BottomNavigationAction label="Home" icon={<HomeIcon />} sx={{ color: '#FF5A5F' }} />
          </Link>
          <Link to="/profile">
            <BottomNavigationAction label="Profile" icon={<PersonIcon />} sx={{ color: '#FF5A5F' }} />
          </Link>
          <Link to="/venues">
            <BottomNavigationAction label="Venues" icon={<LocationOnIcon />} sx={{ color: '#FF5A5F' }} />
          </Link>
        </BottomNavigation>
      </Box>
    );
  }

  return (
    <Navbar expand="md">
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Link to="/">Home</Link>
          {user.loggedIn && (
            <Nav.Link className="link">
              <Link to="/profile">Profile</Link>
            </Nav.Link>
          )}
          <Nav.Link className="link">
            <Link to="/venues">Venues</Link>
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {user.loggedIn ? (
            <>
              <Nav.Link className="link">
                <button className="loginBtn" onClick={logout}>
                  Log Out
                </button>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link className="link">
                <button className="loginBtn" onClick={handleLoginClick}>
                  Log In
                </button>
              </Nav.Link>
              <Nav.Link className="link">
                <Link to="/register">Register</Link>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
      <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LogIn handleClose={handleCloseLoginModal} />
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

function Header() {
  return (
    <header>
      <div class="logo">
        <Link to="/" class="home">HOLIDAZE</Link>
      </div>
      <CustomNavbar />
    </header>
  );
}

export default Header;
