import React from "react";
import ProfileForm from "../profile/ProfileForm";

const ProfilePage = () => {

    const onSubmitClicked = () => {

    }

    return(
        <div>
            <h1>Profile page</h1>
            <div>
                <ProfileForm onSubmit={onSubmitClicked}/>
            </div>

        </div>
    )
}

export default ProfilePage;