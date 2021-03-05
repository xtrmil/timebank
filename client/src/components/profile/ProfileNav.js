import React from "react";
import {Button} from "react-bootstrap";

const ProfileNav = (props) => {

const {setSelectedView} = props;

    return(
        <div className="row justify-content-center">
            <Button
                className="btn-light btn-sm mr-2 mb-1"
                variant="link"
                onClick={() => setSelectedView(1)}
            >
                My Profile
            </Button>
            <Button
                className="btn-light btn-sm mb-1"
                variant="link"
                onClick={() => setSelectedView(2)}
            >
                My Vacation Requests
            </Button>
        </div>
    )
}

export default ProfileNav;