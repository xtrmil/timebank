import React from "react";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarTimes, faCog, faGlobeEurope, faUser} from "@fortawesome/free-solid-svg-icons";

const AdminNav = ({setView}) => {

    return (
        <div className="row justify-content-center">
            <Button
                className="btn-light btn-sm mr-2 mb-1"
                onClick={() => setView(1)}
            >
                <FontAwesomeIcon
                    className="mr-1"
                    icon={faUser}
                    color="black"
                    size="lg"
                />
                Employees
            </Button>
            <Button
                className="btn-light btn-sm mr-2 mb-1"
                onClick={() =>setView(2)}
            >
                <FontAwesomeIcon
                    className="mr-1"
                    icon={faGlobeEurope}
                    color="black"
                    size="lg"
                />
                Vacation Requests
            </Button>

            <Button
                className="btn-light btn-sm mr-2 mb-1"
                onClick={() =>setView(3)}
            >
                <FontAwesomeIcon
                    className="mr-1"
                    icon={faCalendarTimes}
                    color="black"
                    size="lg"
                />
                Ineligible Periods
            </Button>
            <Button
                className="btn-light btn-sm mb-1"
                onClick={() =>setView(4)}
            >
                <FontAwesomeIcon
                    className="mr-1"
                    icon={faCog}
                    color="black"
                    size="lg"
                />
                Settings
            </Button>
        </div>
    );
};

export default AdminNav;
