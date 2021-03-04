import React, { useState,useEffect } from "react";
import {useAuth} from "../context/Context";
import { updateUser, getUserById } from "../api/user";
import ProfileForm from "./ProfileForm";
import { Button } from "react-bootstrap";

const ProfilePage = (props) => {
    const {updateToken} = useAuth();
    const [editDisabled, setEditDisabled] = useState(true);

    const updateProfileInfo = async (props) => {
        try {
            let response = await updateUser(props);
            updateToken(response.data.data);
        } catch (error) {
            console.log(error);
        } finally{
            setEditDisabled(true);
        }
    }

    return (
        <div>
            <h1>Profile page</h1>
            <div className="form-container">
                <ProfileForm
                    setEditDisabled={setEditDisabled}
                    editDisabled={editDisabled}
                    onSubmitClicked={updateProfileInfo}
                />
            </div>
        </div>
    )
}

export default ProfilePage;