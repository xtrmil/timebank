import React,{useState} from "react";
import ProfileForm from "./ProfileForm";
import {Button} from "react-bootstrap";
import {updateUser} from "../api/user";
const ProfilePage = () => {
    const [editDisabled, setEditDisabled] = useState(true); 

    const onCancelClicked = () => {
        setEditDisabled(true);
    }

    const onEditClicked = () => {
        setEditDisabled(false);
    }
    const onSubmitClicked = () => {
        
    }

    const editProfile = async (props) => {
        try{
            await updateUser()
        }
    }

    return(
        <div>
            <h1>Profile page</h1>
            <div className = "form-container">
                <ProfileForm editDisabled={editDisabled} onSubmit={onSubmitClicked}/>
                <div>
                    {
                        editDisabled && <Button onClick={onEditClicked} variant="primary">Edit</Button>
                    }
                
                    {
                        !editDisabled && <Button onClick={onCancelClicked} variant="primary">Cancel</Button>
                    }
                    
                </div>
                
            </div>

        </div>
    )
}

export default ProfilePage;