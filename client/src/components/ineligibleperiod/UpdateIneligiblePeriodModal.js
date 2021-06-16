import React, {useState} from "react";
import IneligiblePeriodForm from "./IneligiblePeriodForm";
import {Modal} from "react-bootstrap";

const UpdateIneligiblePeriodModal = (props) => {
    const {period, showUpdateModal, setShowUpdateModal, onUpdateIneligiblePeriodClicked} = props;


    const initialValues = {
        startDate: period.startDate,
        endDate: period.endDate
    }

    const onUpdateClicked = (data) => {
        onUpdateIneligiblePeriodClicked(period.id, data);
        setShowUpdateModal(false);
    }

    return(
        <>
            <Modal show={showUpdateModal}>
                <Modal.Body>
                    <h4 className="text-center">Update Ineligible Period</h4>
                    <IneligiblePeriodForm
                        initialValues={initialValues}
                        setShowModal={setShowUpdateModal}
                        onSubmitClicked={onUpdateClicked}/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UpdateIneligiblePeriodModal;