import React, { useState,useEffect } from "react";
import ProfileForm from "./ProfileForm";
import { Button } from "react-bootstrap";
import { updateUser, getUserById } from "../api/user";

const ProfilePage = (props) => {

    const [editDisabled, setEditDisabled] = useState(true);
    const [user, setUser] = useState({});
    useEffect(() => {
        fetchUser();

      },[]);
    const fetchUser = async () => {
        const result = await getUserById();
        setUser(result.data.data);
        console.log(result.data.data);

        console.log(user);
    }

    const onCancelClicked = () => {
        setEditDisabled(true);
    }

    const onEditClicked = () => {
        setEditDisabled(false);
    }


    const editProfile = async (props) => {
        try {
            await updateUser(props)
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <h1>Profile page</h1>
            <div className="form-container">
                <ProfileForm user={user} setEditDisabled={setEditDisabled} editDisabled={editDisabled} onSubmitClicked={editProfile} />
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