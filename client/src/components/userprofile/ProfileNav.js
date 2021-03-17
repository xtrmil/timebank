import React from "react";
import {useHistory} from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGlobeEurope } from "@fortawesome/free-solid-svg-icons";

const ProfileNav = ({setView}) => {

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
        My Profile
      </Button>
      <Button
        className="btn-light btn-sm mb-1"
        onClick={() =>setView(2)}
      >
        <FontAwesomeIcon
          className="mr-1"
          icon={faGlobeEurope}
          color="black"
          size="lg"
        />
        My Vacation Requests
      </Button>
    </div>
  );
};

export default ProfileNav;
