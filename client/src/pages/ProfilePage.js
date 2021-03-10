import React, { useState, useEffect} from "react";
import { useAuth } from "../context/Context";
import { updateUser } from "../api/user";
import ProfileInfo from "../components/userprofile/ProfileInfo";
import ProfileNav from "../components/userprofile/ProfileNav";
import { Container } from "react-bootstrap";
import '../components/userprofile/profilePage.scss';


const ProfilePage = (props) => {
  const { updateToken, loggedInUser } = useAuth();
  const [editDisabled, setEditDisabled] = useState(true);

  const updateProfileInfo = async (props) => {
    try {
      let response = await updateUser(props);
      updateToken(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setEditDisabled(true);
    }
  };

  return (
    <>
      <div className="profile-banner my-4 justify-content-center">
        <h3 className="text-center py-3"> Welcome {loggedInUser.firstName}</h3>
        <ProfileNav/>
    </div>

    <Container className="form-container">
      <ProfileInfo
          editDisabled={editDisabled}
          setEditDisabled={setEditDisabled}
          updateProfileInfo={updateProfileInfo}/>
    </Container>
    </>
  );
};

export default ProfilePage;
