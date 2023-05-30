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
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

function CustomNavbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { profile, setProfile } = React.useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const localStoredUser = JSON.parse(localStorage.getItem("profile"));
    setProfile(
      localStoredUser
        ? { loggedIn: true, venueManager: localStoredUser.isVenueManager }
        : { loggedIn: false, venueManager: false }
    );
  }, [setProfile]);

  function logout() {
    if (window.confirm("Do you want to log out?")) {
      setProfile({ loggedIn: false, venueManager: false });
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
      <Box sx={{ width: '100%', position: 'fixed', bottom: '0', left: '0', borderTop: '1px solid var(--primary-faded-color)', zIndex: '9' }} value={value} onChange={(event, newValue) => { setValue(newValue) }}>
        <BottomNavigation
          sx={{ justifyContent: 'space-between' }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Link to="/">
            <BottomNavigationAction label="Home" icon={<HomeIcon />} sx={{ color: '#FF5A5F' }} />
          </Link>
          <Link to="/venues">
            <BottomNavigationAction label="Venues" icon={<LocationOnIcon />} sx={{ color: '#FF5A5F' }} />
          </Link>
          {profile.loggedIn ? (
            <Link to="/profile">
              <BottomNavigationAction label="Profile" icon={<PersonIcon />} sx={{ color: '#FF5A5F' }} />
            </Link>
          ) : (
            ""
          )}
          {profile.loggedIn ? (
            <>
              <Link to="/">
                <BottomNavigationAction label="Logout" icon={<LogoutIcon />} onClick={logout} sx={{ color: '#FF5A5F' }} />
              </Link>
            </>
          ) : (
            <>
              <div>
                <BottomNavigationAction label="Login" icon={<LoginIcon />} onClick={handleLoginClick} sx={{ color: '#FF5A5F' }} />
              </div>
            </>
          )}
          <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
            <Modal.Header closeButton>
              <Modal.Title>Log in</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <LogIn handleClose={handleCloseLoginModal} />
            </Modal.Body>
          </Modal>
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
          {profile.loggedIn && (
            <Nav.Link className="link">
              <Link to="/profile">Profile</Link>
            </Nav.Link>
          )}
          <Nav.Link className="link">
            <Link to="/venues">Venues</Link>
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {profile.loggedIn ? (
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
                  Log in
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
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LogIn handleClose={handleCloseLoginModal} />
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}

function Header() {
  const { profile, setProfile } = React.useContext(UserContext);

  useEffect(() => {
    const localStoredUser = JSON.parse(localStorage.getItem("profile"));
    setProfile(
      localStoredUser
        ? { loggedIn: true, venueManager: localStoredUser.isVenueManager }
        : { loggedIn: false, venueManager: false }
    );
  }, [setProfile]);

  return (
    <header>
      <div class="logo">
        <Link to="/" class="home">HOLIDAZE</Link>
        {profile.loggedIn ? (
          ""
        ) : (
          <Link to="/register" class="registerMobile">Register</Link>
        )}
      </div>
      <CustomNavbar />
    </header>
  );
}

export default Header;
