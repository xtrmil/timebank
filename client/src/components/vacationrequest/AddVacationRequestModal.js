 import React from "react";
import {Modal} from "react-bootstrap";
import {addVacationRequest} from "../../api/vacationRequest";
import VacationRequestForm from "./VacationRequestForm";
import { useHistory } from "react-router";
 import {useToast} from "../../contexts/ToastContext";

const AddVacationRequestModal = ({showAddRequestModal, setShowAddRequestModal}) => {

    const history = useHistory();
    const {setToastHeader, setToastMsg, setToast} = useToast();

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
            if(startDate.getTime() <= endDate.getTime()){
                let response =  await addVacationRequest(data);
                const request = response.data.data;
                history.push({pathname:`/request/${request.id}`,state:{request,from:history.location}})
                setToastHeader("Success");
                setToastMsg(response.data.msg);
                setToast(true);
                }
        }catch(error) {
            setToastHeader("Error");
            setToastMsg(error.message);
            setToast(true);
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