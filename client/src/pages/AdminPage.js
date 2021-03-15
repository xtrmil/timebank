import React, { useState, useEffect } from "react";
import { getAllVacationRequestAdminView } from "../api/vacationRequest";
import VacationRequestTable from "../components/uservacationrequest/VacationRequestTable";

const AdminPage = () => {
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
            <div>
                <h1>Admin Page</h1>
            </div>
            <div>Add user</div>
            <div>List requests</div>
            <VacationRequestTable
          updateVacationRequestList={updateVacationRequestList}
            vacationRequests={vacationRequests}
            isViewable={true}
          />
        </>
    )
}

export default AdminPage;