import React, { useState } from "react";
import { exportAllVacationRequests, importRequestsFromJson } from "../../api/vacationRequest";
import { Button, Row } from "react-bootstrap";


const AdminJsonForm = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const OnClickUploadRequest = async () => {
        if (selectedFile !== null) {
            let formData = new FormData();
            formData.append('file', selectedFile);
            importRequestsFromJson(formData);
            console.log(selectedFile);
        }
    };

    const exportRequests = async () => {

        let response = await exportAllVacationRequests()
        const url = window.URL.createObjectURL(new Blob([JSON.stringify(response.data)]));
        const link = document.createElement('a');
        link.href = url;
        const today = new Date();
        const fileName = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "-vacationrequests.json";
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    }

    return (
        <>
            <div id="container">
            <p><strong>Import Requests from json</strong></p>
                <Row>
                    
                    <input type="file" onChange={onFileChange} />
                    {selectedFile && <Button onClick={OnClickUploadRequest} className="btn btn-sm btn-info">
                        Import File
                </Button>
                    }
                </Row>
                <p><strong>Export all Requests from json</strong></p>
                <Button onClick={exportRequests} className="btn btn-sm btn-info ml-1">Export Json</Button>


                <p />
            </div>

        </>
    )
}

export default AdminJsonForm;