import React, { useState, useEffect} from "react";
import { useAuth } from "../context/Context";
import { updateUser } from "../api/user";
import {getAllVacationRequestsByUser} from '../api/vacationRequest'
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileNav from "../components/profile/ProfileNav";
import VacationRequestTable from '../components/profile/VacationRequestTable'
import { Container } from "react-bootstrap";
import '../components/profile/profilePage.scss';
import {getAllCommentsByRequestId} from '../api/comment'

const ProfilePage = (props) => {
  const { updateToken, loggedInUser } = useAuth();
  const [editDisabled, setEditDisabled] = useState(true);
  const [selectedView, setSelectedView] = useState(1);
  const [vacationRequests, setVacationRequest] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
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

  const onViewCommentClicked = async(requestId) =>{
   const response = await getAllCommentsByRequestId(requestId);

  }

  return (
    <>
      <div className="profile-banner my-4 justify-content-center">
        <h3 className="text-center py-3"> Welcome {loggedInUser.firstName}</h3>
        <ProfileNav setSelectedView={setSelectedView}/>
    </div>

    <Container className="form-container">
      {selectedView === 1 &&
      <ProfileInfo
          editDisabled={editDisabled}
          setEditDisabled={setEditDisabled}
          updateProfileInfo={updateProfileInfo}/>
      }
      {selectedView === 2 && <VacationRequestTable
       vacationRequests={vacationRequests}
       showDetails={showDetails}
       setShowDetails={setShowDetails}
       />}

    </Container>
    </>
  );
};

export default ProfilePage;
