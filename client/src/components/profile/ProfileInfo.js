import React, {useState} from "react";
import ProfileForm from "./ProfileForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import {Button, Card, Col, Container, Row} from "react-bootstrap";

const ProfileInfo = (props) => {
    const {editDisabled, setEditDisabled, updateProfileInfo} = props;
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    return(
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
    )
}

export default ProfileInfo;