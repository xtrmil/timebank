import React, { useState, useEffect } from "react";
import { getAllVacationRequestAdminView } from "../api/vacationRequest";
import VacationRequestTable from "../components/uservacationrequest/VacationRequestTable";
import AdminNav from "../components/adminprofile/AdminNav";
import {useAuth} from "../context/Context";
import {Container} from "react-bootstrap";
import IneligiblePeriodTable from "../components/ineligibleperiod/IneligiblePeriodTable";

const AdminPage = () => {
    const {loggedInUser} = useAuth();
    const [view, setView] = useState(2);
    const [vacationRequests, setVacationRequests] = useState([]);

    const updateVacationRequestList = async () => {
        try {
            let response = await getAllVacationRequestAdminView();
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
            <div className="profile-banner my-4 justify-content-center">
                <h3 className="text-center py-3"> Welcome administrator {loggedInUser.firstName}</h3>
                <AdminNav setView={setView} />
            </div>
            <Container>
                {view === 1 && (<div>Manage user page</div>)}

                {view === 2 && (
                    <VacationRequestTable
                        updateVacationRequestList={updateVacationRequestList}
                        vacationRequests={vacationRequests}
                        isViewable={true}/>
                    )}

                {view === 3 && (<IneligiblePeriodTable/>)}

            </Container>


          />
        </>
    )
}

export default AdminPage;