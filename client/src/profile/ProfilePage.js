import React, { useState,useEffect } from "react";
import {useAuth} from "../context/Context";
import { updateUser, getUserById } from "../api/user";
import ProfileForm from "./ProfileForm";
import UpdatePasswordForm from './UpdatePasswordForm';
import { Button, Container } from "react-bootstrap";


const ProfilePage = (props) => {
    const {updateToken} = useAuth();
    const [editDisabled, setEditDisabled] = useState(true);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
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
            <Container className="form-container">
               {!showPasswordForm && <ProfileForm
                    setEditDisabled={setEditDisabled}
                    editDisabled={editDisabled}
                    onSubmitClicked={updateProfileInfo}
                    setShowPasswordForm = {setShowPasswordForm}
                />}
              {showPasswordForm &&  <UpdatePasswordForm  setShowPasswordForm = {setShowPasswordForm}/>}
            </Container>
        </div>
    )
}

export default ProfilePage;