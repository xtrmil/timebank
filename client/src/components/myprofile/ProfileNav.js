import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGlobeEurope } from "@fortawesome/free-solid-svg-icons";

const ProfileNav = ({setView}) => {

  return (
    <div className="row justify-content-center my-3">
      <Button
        className=" custom-button btn-light btn-sm mr-2 mb-1"
        onClick={() => setView(1)}
      >
        <FontAwesomeIcon
          className="custom-icon mr-1"
          icon={faUser}
          color="black"
          size="lg"
        />
        My Profile
      </Button>
      <Button
        className="custom-button  btn-light btn-sm mb-1"
        onClick={() =>setView(2)}
      >
        <FontAwesomeIcon
          className="custom-icon mr-1"
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
