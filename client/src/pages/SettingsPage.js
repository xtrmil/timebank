import React, { useState, useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import AdminJsonForm from "../components/adminprofile/settings/AdminJsonForm";
import SingleVacationRequestLengthLimitForm from "../components/adminprofile/settings/SingleVacationLengthLimitForm";
import { getSingleVacationRequestLengthLimit } from "../api/vacationRequest";

const SettingsPage = () => {
    const [editDisabled, setEditDisabled] = useState(true);
    const [lengthLimit, setLengthLimit] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const getLength = async () => {
        let response = await getSingleVacationRequestLengthLimit();
        setLengthLimit(response.data.data.length);
        setIsLoading(false);
    }
    useEffect(() => {
        getLength();
    }, []);
    return (

        <>
            <Container>
                <Row className="justify-content-center mb-3">
                    <h5>Admin Settings</h5>
                </Row>
                <Row className="justify-content-center mb-3">
                    {!isLoading &&
                        <SingleVacationRequestLengthLimitForm
                            setEditDisabled={setEditDisabled}
                            editDisabled={editDisabled}
                            lengthLimit={lengthLimit}
                            setLengthLimit={setLengthLimit}
                            getLength={getLength}
                        />}

                    <AdminJsonForm />
                </Row>
            </Container>
        </>
    );
};

export default SettingsPage;