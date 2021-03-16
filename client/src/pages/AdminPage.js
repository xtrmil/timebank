import React, { useState, useEffect } from "react";
import { getAllVacationRequestAdminView, exportAllVacationRequests } from "../api/vacationRequest";
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

    const exportRequests = async () => {

        let response = await exportAllVacationRequests()
        const url = window.URL.createObjectURL(new Blob([JSON.stringify(response.data)]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.json');
        document.body.appendChild(link);
        link.click();
        console.log(JSON.stringify(response.data));
    }

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

            <div id="container">

                <button onClick={exportRequests}>Download Json</button>
                <p />

            </div>
        </>
    )
}

export default AdminPage;