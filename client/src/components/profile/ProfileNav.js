import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import { faUser, faGlobeEurope } from "@fortawesome/free-solid-svg-icons";

const ProfileNav = (props) => {
  const { setSelectedView } = props;

  return (
    <div className="row justify-content-center">
      <Button
        className="btn-light btn-sm mr-2 mb-1"
        onClick={() => setSelectedView(1)}
      >
        <FontAwesomeIcon
          className="mr-1"
          icon={faUser}
          color="black"
        ></FontAwesomeIcon>
        My Profile
      </Button>
      <Button
        className="btn-light btn-sm mb-1"
        onClick={() => setSelectedView(2)}
      >
        <FontAwesomeIcon
          className="mr-1"
          icon={faGlobeEurope}
          color="black"
        ></FontAwesomeIcon>
        My Vacation Requests
      </Button>
    </div>
  );
};

export default ProfileNav;
