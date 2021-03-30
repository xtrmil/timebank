import React, { useState } from "react";
import { exportAllVacationRequests, importRequestsFromJson } from "../../../api/vacationRequest";
import { Button, Col, Card } from "react-bootstrap";
import {useToast} from '../../../contexts/ToastContext';

const AdminJsonForm = () => {
    const {setToastHeader, setToastMsg, setToast} = useToast();
    const [selectedFile, setSelectedFile] = useState(null);
    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const OnClickUploadRequest = async () => {
        try{
            if (selectedFile !== null) {
                let formData = new FormData();
                formData.append('file', selectedFile);
               let response = await importRequestsFromJson(formData);
                setToastHeader("Success");
                setToastMsg(response.data.msg);
                setToast(true);
            }
        }catch(error){
            setToastHeader("Error");
            setToastMsg(error.message);
            setToast(true);
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
    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (
        <>
            <div id="container">

                <Col>
                    <Card className= "mb-3">
                        <Card.Body>
                            <p><strong>Import Requests from JSON file</strong></p>
                            <Button 
                                onClick={handleClick}
                                className="btn btn-sm btn-info mr-5">
                                Choose file
                            </Button>
                            <input 
                                type="file"
                                 onChange={onFileChange}
                                ref={hiddenFileInput}
                                style={{ display: 'none' }} />

                            {selectedFile && <Button onClick={OnClickUploadRequest} className="btn btn-sm btn-info">
                                Upload
                </Button>
                            }
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Body>
                            <p><strong>Export All Requests to JSON file</strong></p>
                            <Button onClick={exportRequests} className="btn btn-sm btn-info ml-1">Download</Button>
                        </Card.Body>
                    </Card>
                </Col>



                <p />
            </div>

        </>
    )
}

export default AdminJsonForm;