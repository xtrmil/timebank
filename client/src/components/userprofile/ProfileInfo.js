import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useAuth } from "../../context/Context";

const ProfileInfo = (props) => {
  const { loggedInUser } = useAuth();
  const { editDisabled, setEditDisabled, updateProfileInfo } = props;
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  console.log(loggedInUser);
  return (
    <>
      <Row className="justify-content-center mb-3">
        <h5>My Profile</h5>
      </Row>
      <Row>
        <Col xs={6}>
          <Card>
            <Card.Img variant="top" alt="someImg"></Card.Img>
            <Card.Body>
              <Button>Change image</Button>
              <p>
                <strong>Total Vacation Days:</strong> 25
              </p>
              <p>
                <strong>Remaining Vacation Days: </strong> {loggedInUser.currentVacationDays}
                
              </p>
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
    </>
  );
};

export default ProfileInfo;
