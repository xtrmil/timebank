import React from "react";
import { useHistory } from "react-router";
import {Modal} from "react-bootstrap";
import {addIneligiblePeriod} from "../../api/ineligiblePeriod";
import IneligiblePeriodForm from "./IneligiblePeriodForm";
import {useToast} from "../../contexts/ToastContext";

const AddIneligiblePeriodModal = ({showAddPeriodModal, setShowAddPeriodModal,fetchIneligiblePeriods}) => {

    const history = useHistory();
    const {setToastHeader, setToastMsg, setToast} = useToast();

    const initialValues = {
        startDate: null,
        endDate: null
    };

    const onFormSubmit = async (data) => {
        try {
            const startDate = new Date (data.startDate);
            const endDate = new Date (data.endDate);
            if (startDate.getTime() <= endDate.getTime()){
                let response = await addIneligiblePeriod(data);
                setToastHeader("Success");
                setToastMsg(response.data.msg);
                setToast(true);
                setShowAddPeriodModal(false);
                fetchIneligiblePeriods();
            }
        }catch(error){
            setToastHeader("Error");
            setToastMsg(error.message);
            setToast(true);
        }
    }

    return (
        <div>
            <Modal show={showAddPeriodModal}>
                <Modal.Body>
                    <h4 className="text-center">Add Ineligible Period</h4>
                    <IneligiblePeriodForm
                        initialValues={initialValues}
                        setShowModal={setShowAddPeriodModal}
                        onSubmitClicked={onFormSubmit}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AddIneligiblePeriodModal;
