import React from "react";
import "./navbar.scss";
import {Link} from "react-router-dom";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Navbar = () => {

    return(
        <div className="nav-container">
            <Link to="/home">
                <h3>
                    <FontAwesomeIcon size="lg" color={"white"} icon={faClock}/> Timebank</h3>
            </Link>
        </div>
    )
}

export default Navbar;