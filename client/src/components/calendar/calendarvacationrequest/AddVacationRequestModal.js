 import React from "react";
import {Modal} from "react-bootstrap";
import {addVacationRequest} from "../../../api/vacationRequest";
import VacationRequestForm from "./VacationRequestForm";
import { useHistory } from "react-router";

const AddVacationRequestModal = ({showAddRequestModal, setShowAddRequestModal}) => {

    const history = useHistory();

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
            <Modal show={showAddRequestModal}>
                <Modal.Body>
                    <h4 className="text-center">Add Vacation Request</h4>
                    <VacationRequestForm
                        initialValues={initialValues}
                        setShowModal={setShowAddRequestModal}
                        onSubmitClicked={onFormSubmit}/>
                </Modal.Body>
            </Modal>

        </div>
    );
}

export default AddVacationRequestModal;