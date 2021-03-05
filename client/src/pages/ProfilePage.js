import React, { useState, useEffect} from "react";
import { useAuth } from "../context/Context";
import { updateUser } from "../api/user";
import {getAllVacationRequestsByUser} from '../api/vacationRequest'
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileNav from "../components/profile/ProfileNav";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import '../components/profile/profilePage.scss';


const ProfilePage = (props) => {
  const { updateToken, loggedInUser } = useAuth();
  const [editDisabled, setEditDisabled] = useState(true);
  const [selectedView, setSelectedView] = useState(1);
  const [vacationRequests, setVacationRequest] = useState([]);

  useEffect(() => {
    const fetchVacationRequestsByUser = async() =>{
      let response =  await getAllVacationRequestsByUser();
      setVacationRequest(response.data.data);
    }
    fetchVacationRequestsByUser();
  }, []);

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
      <div className="profile-banner mb-4">
        <h1 className="text-center mt-5">Profile </h1>
        <h4 className="text-center mb-3"> Welcome {loggedInUser.firstName}</h4>
        <ProfileNav setSelectedView={setSelectedView}/>
    </div>

    <Container className="form-container">
      {selectedView === 1 &&
      <ProfileInfo
          editDisabled={editDisabled}
          setEditDisabled={setEditDisabled}
          updateProfileInfo={updateProfileInfo}/>
      }
      {selectedView === 2 && "myvacation"}

    </Container>
    </>
  );
};

export default ProfilePage;
