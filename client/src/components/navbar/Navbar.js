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
  const onAdminOverviewClicked = () => {
    history.push("/admin");
  };

  const onProfileClicked = () => {
    history.push("/profile");
  };

  const handleLogout = () => {
    auth.logout();
    history.go(0);
  };

  return (
    <div>
      <BootstrapNavbar bg="dark" expand="lg">
        <BootstrapNavbar.Brand href="/home">
          <h3>
            <FontAwesomeIcon size="lg" color={"white"} icon={faClock} />{" "}
            Timebank
          </h3>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {auth.isLoggedIn && (
            <Nav className="mr-auto">
              <Button className="btn btn-sm m-2">Calendar</Button>
              <Button onClick={onProfileClicked} className="btn btn-sm m-2">
                Profile
              </Button>
              {auth.isAdmin && (
                <Button
                  onClick={onAdminOverviewClicked}
                  className="btn btn-sm m-2"
                >
                  Admin Overview
                </Button>
              )}

              <Button
                onClick={handleLogout}
                className="logout btn btn-sm m-2 d-inline-block"
              >
                Logout
              </Button>
            </Nav>
          )}
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </div>
  );
};

export default Navbar;
