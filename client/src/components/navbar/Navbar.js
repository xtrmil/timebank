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
          <h3>
            <FontAwesomeIcon size="lg" color={"white"} icon={faClock} />{" "}
            Timebank
          </h3>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {auth.isLoggedIn && (
            <Nav className="ml-auto">

              <Nav.Link href="/home">
                <div className="item">Calendar</div>
              </Nav.Link>

              <Nav.Link href="/profile">
                <div className="item">Profile</div>
              </Nav.Link >

              {auth.isAdmin && (
                <Nav.Link href="/admin">
                  <div className="item">Admin Overview</div>
                </Nav.Link>
              )}

              <Button onClick={handleLogout} className=" btn-sm" id="logout-button">
                <div className="item">Logout</div>
              </Button>
            </Nav>
          )}
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </div>
  );
};

export default Navbar;
