import React, {useState} from "react";

import {Button, Modal} from "react-bootstrap";
import {addIneligiblePeriod} from "../../api/ineligiblePeriod";
import {useAuth} from "../../context/Context"
import IneligiblePeriodForm from "./IneligiblePeriodForm";

const AddIneligiblePeriodModal = () => {

    const auth = useAuth();
    const [showModal, setShowModal] = useState(false);

    const onClickAddIneligiblePeriod = () =>{
        setShowModal(true);
    }

    const initialValues = {
        startDate: null,
        endDate: null
    }

    const onFormSubmit = (data) => {
        const startDate = new Date (data.startDate);
        const endDate = new Date (data.endDate);
        if (startDate.getTime() < endDate.getTime()){
            addIneligiblePeriod(data);
            setShowModal(false);
        }else { 
        }
    }

    return (
        <div>
            <Button className="ml-3" onClick={onClickAddIneligiblePeriod}>Add Ineligible Period</Button>
            <Modal show={showModal}>
                <Modal.Body>
                    <h4 className="text-center">Add Ineligible Period</h4>
                    <IneligiblePeriodForm
                        initialValues={initialValues}
                        setShowModal={setShowModal}
                        onSubmitClicked={onFormSubmit}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AddIneligiblePeriodModal;
