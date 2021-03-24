import React, { useState, useEffect } from "react";
import { getAllVacationRequestAdminView } from "../api/vacationRequest";
import VacationRequestTable from "../components/uservacationrequest/VacationRequestTable";
import AdminNav from "../components/adminprofile/AdminNav";
import {useAuth} from "../contexts/AuthContext";
import {Container} from "react-bootstrap";
import IneligiblePeriodPage from "./IneligiblePeriodPage";
import EmployeePage from "./EmployeePage";
import "./adminPage.scss";

const AdminPage = () => {
    const {loggedInUser} = useAuth();
    const [view, setView] = useState(2);
    const [vacationRequests, setVacationRequests] = useState([]);

    const fetchVacationRequests = async () => {
        try {
            let response = await getAllVacationRequestAdminView();
            setVacationRequests(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchVacationRequests();
    }, []);

    return (
        <>
            <div className="profile-banner my-4 pt-3 justify-content-center">
                <div>
                    <h6 className="text-center m-0 p-0">Welcome</h6>
                    <h3 className="text-center"> Administrator {loggedInUser.firstName} {loggedInUser.lastName}</h3>
                </div>

                <AdminNav setView={setView} />
            </div>
            <Container>
                {view === 1 && (<EmployeePage/>)}

                {view === 2 && (
                    <VacationRequestTable
                        updateVacationRequestList={fetchVacationRequests}
                        vacationRequests={vacationRequests}
                        isViewable={true}/>
                    )}

                {view === 3 && (<IneligiblePeriodPage/>)}
            </Container>
        </>
    );
};

export default AdminPage;