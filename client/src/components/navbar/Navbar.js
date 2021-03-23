import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/Context";
import { Navbar as BootstrapNavbar, Nav, Button } from "react-bootstrap";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navbar.scss";

const Navbar = () => {
  const auth = useAuth();
  const history = useHistory();


  const handleLogout = () => {
    auth.logout();
    history.go(0);
  };

  return (
    <div>
      <BootstrapNavbar className="custom-navbar" expand="lg">
        <BootstrapNavbar.Brand href="/home">
          <h3 className="logo">
            <FontAwesomeIcon size="lg" color={"#82ab9b"} icon={faClock} />{" "}
            Timebank
          </h3>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {auth.isLoggedIn && (
            <Nav className="ml-auto">

              <Nav.Link href="/profile">
                <span className="item">{auth.loggedInUser.firstName} {auth.loggedInUser.lastName}</span>
              </Nav.Link >

              <Nav.Link href="/home">
                <span className="item">Calendar</span>
              </Nav.Link>

              {auth.isAdmin && (
                <Nav.Link href="/admin">
                  <span className="item">Admin Overview</span>
                </Nav.Link>
              )}

              <Nav.Link onClick={handleLogout}>
                <span className="item">Logout</span>
              </Nav.Link>
            </Nav>
          )}
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </div>
  );
};

export default Navbar;
