import React from "react";

import {useHistory} from "react-router-dom";
import {useAuth} from "../../context/Context";

import {Navbar as BootstrapNavbar, Nav, Button } from "react-bootstrap";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./navbar.scss";

const Navbar = () => {
    const auth = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        auth.logout();
        history.push("/login");
   }

    return(
        <div>
            <BootstrapNavbar bg="dark" expand="lg">
                <BootstrapNavbar.Brand href="/home">
                    <h3><FontAwesomeIcon size="lg" color={"white"} icon={faClock}/> Timebank</h3>
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                        {auth.isLoggedIn &&
                        <Button onClick={handleLogout}
                                className="logout btn btn-sm d-inline-block">Logout</Button>
                        }
                </BootstrapNavbar.Collapse>
            </BootstrapNavbar>
        </div>
    )
}

export default Navbar;