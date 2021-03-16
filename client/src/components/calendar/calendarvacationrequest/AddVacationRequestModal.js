 import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {addVacationRequest} from "../../../api/vacationRequest";
import VacationRequestForm from "./VacationRequestForm";
import {useAuth} from "../../../context/Context"
import { useHistory } from "react-router";
const AddVacationRequestModal = () => {

    const auth = useAuth();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    const onClickAddVacationRequest = () =>{
        setShowModal(true);
    }

    const initialValues = {
        title: "",
        startDate: "",
        endDate: "",
        description:""
    }

    const onFormSubmit = async(data) => {
        const startDate = new Date (data.startDate);
        const endDate = new Date (data.endDate);
        try {
            if(startDate.getTime() < endDate.getTime()){
               const response =  await addVacationRequest(data);
                const request = response.data.data;
                history.push({pathname:`/request/${request.id}`,state:{request,from:history.location}})
                }
            }catch(error) {
            console.log("fail", error);
        }
    }

    return (
        <div>
            <Button className="ml-3" onClick={onClickAddVacationRequest}>Add Vacation Request</Button>
            <Modal show={showModal}>
                <Modal.Body>
                    <h4 className="text-center">Add Vacation Request</h4>
                    <VacationRequestForm
                        initialValues={initialValues}
                        setShowModal={setShowModal}
                        onSubmitClicked={onFormSubmit}/>
                </Modal.Body>
            </Modal>

        </div>
    );
}

export default AddVacationRequestModal;