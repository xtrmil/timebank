import React, {useState} from "react";
import IneligiblePeriodForm from "./IneligiblePeriodForm";
import {updateIneligiblePeriod} from "../../api/ineligiblePeriod";
import {Button, Modal} from "react-bootstrap";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const UpdateIneligiblePeriodModal = ({period}) => {
    const [showModal, setShowModal] = useState(false);
    console.log("inside update modal")

    const initialValues = {
        startDate: period.startDate,
        endDate: period.endDate
    }

    const onUpdateModalClicked = () => {
        setShowModal(true);
    }

    const onUpdateIneligiblePeriodClicked = (data) => {
        try{
            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);
            if(startDate.getTime() < endDate.getTime()){
                updateIneligiblePeriod(period.id, data);
                setShowModal(false);
            }
        }catch (error){
            console.log(error.response.data.msg);
        }
    }

    return(
        <>
            <Button onClick={onUpdateModalClicked}
                    className="btn btn-info btn-sm mr-2">
                <FontAwesomeIcon icon={faPencilAlt}/>
            </Button>
                <Modal show={showModal}>
                    <Modal.Body>
                        <h4 className="text-center">Update Ineligible Period</h4>
                        <IneligiblePeriodForm
                            initialValues={initialValues}
                            setShowModal={setShowModal}
                            onSubmitClicked={onUpdateIneligiblePeriodClicked}/>
                    </Modal.Body>
                </Modal>
        </>

    );
};

export default UpdateIneligiblePeriodModal;