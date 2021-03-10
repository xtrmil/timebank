import React, {useEffect, useState} from "react";
import {getAllVacationRequestsByToken, getAllVacationRequestsByUserId} from "../api/vacationRequest";
import VacationRequestTable from "../components/uservacationrequest/VacationRequestTable";
import {Container} from "react-bootstrap";
import ProfileNav from "../components/userprofile/ProfileNav";
import {useAuth} from "../context/Context";
import {useParams} from "react-router-dom";

const VacationRequestPage = (props) => {
    const [vacationRequests, setVacationRequest] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const {loggedInUser} = useAuth();
    const {id} = useParams();

    useEffect(() => {
        const fetchVacationRequests = async() =>{
            let response;
            if(loggedInUser.id === id){
                response =  await getAllVacationRequestsByToken();
            }else{
                response = await getAllVacationRequestsByUserId(id);
            }
            setVacationRequest(response.data.data);
        }
        fetchVacationRequests();
    }, [id]);

    return(
        <>
            <div className="profile-banner my-4 justify-content-center">
                <h3 className="text-center py-3"> Welcome {loggedInUser.firstName}</h3>
                <ProfileNav/>
            </div>
            <Container className="form-container">
                <VacationRequestTable
                    vacationRequests={vacationRequests}
                    showDetails={showDetails}
                    setShowDetails={setShowDetails}
                />
                </Container>
        </>
    );
};

export default VacationRequestPage;