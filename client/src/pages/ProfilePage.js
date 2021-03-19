import React, { useState, useEffect } from "react";
import { useAuth } from "../context/Context";
import { updateUser } from "../api/user";
import ProfileInfo from "../components/userprofile/ProfileInfo";
import ProfileNav from "../components/userprofile/ProfileNav";
import { Container } from "react-bootstrap";
import "./profilePage.scss";
import VacationRequestTable from "../components/uservacationrequest/VacationRequestTable";
import { getAllVacationRequestsByToken } from "../api/vacationRequest";

const ProfilePage = (props) => {
  const { updateToken, loggedInUser } = useAuth();
  const [editDisabled, setEditDisabled] = useState(true);
  const [view, setView] = useState(1);
  const [vacationRequests, setVacationRequests] = useState([]);

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
  const updateVacationRequestList = async () => {
    try {
      let response = await getAllVacationRequestsByToken();
      setVacationRequests(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    updateVacationRequestList();
  }, []);

  return (
    <>
      <div className="profile-banner my-4 pt-3 justify-content-center">
        <h6 className="text-center m-0 p-0">Welcome</h6>
        <h3 className="text-center">{loggedInUser.firstName} {loggedInUser.lastName}</h3>
        <ProfileNav setView={setView} />
      </div>

      <Container className="form-container">
        {view === 1 && (
          <ProfileInfo
            editDisabled={editDisabled}
            setEditDisabled={setEditDisabled}
            updateProfileInfo={updateProfileInfo}
          />
        )}

        {view === 2 && (
          <VacationRequestTable
          updateVacationRequestList={updateVacationRequestList}
            vacationRequests={vacationRequests}
            isViewable={true}
          />
        )}
      </Container>
    </>
  );
};

export default ProfilePage;
