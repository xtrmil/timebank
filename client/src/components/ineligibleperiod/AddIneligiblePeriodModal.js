import React from "react";

import {Modal} from "react-bootstrap";
import {addIneligiblePeriod} from "../../api/ineligiblePeriod";
import IneligiblePeriodForm from "./IneligiblePeriodForm";

const AddIneligiblePeriodModal = ({showAddPeriodModal, setShowAddPeriodModal}) => {

    const initialValues = {
        startDate: null,
        endDate: null
    };

    const onFormSubmit = (data) => {
        const startDate = new Date (data.startDate);
        const endDate = new Date (data.endDate);
        if (startDate.getTime() < endDate.getTime()){
            addIneligiblePeriod(data);
            setShowAddPeriodModal(false);
        }else { 
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
