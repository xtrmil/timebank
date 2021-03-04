import React, { useState ,useEffect} from "react";
import { useAuth } from "../context/Context";
import { updateUser } from "../api/user";
import ProfileForm from "./ProfileForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {getAllVacationRequestsByUser} from '../api/vacationRequest'
import './profilePage.scss';
const ProfilePage = (props) => {
  const { updateToken, loggedInUser } = useAuth();
  const [editDisabled, setEditDisabled] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [vacationRequests, setVacationRequest] = useState([]);
  useEffect(() => {
    const fetchVacationRequestsByUser = async() =>{
      let response =  await getAllVacationRequestsByUser();
      setVacationRequest(response.data.data);
    }
    fetchVacationRequestsByUser();
  }, []);

  console.log(vacationRequests);
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
    <><div className="profile-banner">
    <h1 className="text-center mt-5">Profile </h1>
    <h4 className="text-center mb-5"> Welcome {loggedInUser.firstName}</h4>
    </div>
    <Container className="form-container">

      <Row>
        <Col xs={6}>
          <Card>
            <Card.Img variant="top" alt="someImg"></Card.Img>
            <Card.Body>
              <Button>Change image</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6}>
          {!showPasswordForm && (
            <ProfileForm
              setEditDisabled={setEditDisabled}
              editDisabled={editDisabled}
              onSubmitClicked={updateProfileInfo}
              setShowPasswordForm={setShowPasswordForm}
            />
          )}
          {showPasswordForm && (
            <UpdatePasswordForm setShowPasswordForm={setShowPasswordForm} />
          )}
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default ProfilePage;
