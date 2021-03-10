import React from "react";
import {useHistory} from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGlobeEurope } from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../context/Context";

const ProfileNav = (props) => {
    const {loggedInUser} = useAuth();
    const history = useHistory();

  return (
    <div className="row justify-content-center">
      <Button
        className="btn-light btn-sm mr-2 mb-1"
        onClick={() => history.push("/profile")}
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
        onClick={() => history.push({pathname: `/request/user/${loggedInUser.id}`, state: {user: loggedInUser}})}
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
