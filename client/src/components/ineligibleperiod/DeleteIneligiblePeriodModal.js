import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Modal, Button, Form} from "react-bootstrap";
import {deleteIneligiblePeriodById} from "../../api/ineligiblePeriod";

const DeleteIneligiblePeriodModal = ({period}) => {
    const [showModal, setShowModal] = useState(false);

    const onDeletePeriodClicked = () => {
        try{
            deleteIneligiblePeriodById(period.id);
            setShowModal(false);

        }catch (error) {
            console.log(error.response.data.msg);
        }
    }
    const onDeleteModalClicked = () => {
        setShowModal(true)
    }

    const onCloseClicked = () => {
        setShowModal(false);
    }

    return(
        <>
            <Button onClick={onDeleteModalClicked}
                    className="btn btn-danger btn-sm">
                <FontAwesomeIcon icon={faTrashAlt}/>
            </Button>
            <Modal show={showModal}>
                <Modal.Body className="text-center">
                    <h4>Delete Ineligible Period</h4>
                    <div className="m-4">
                        <h5>Are you sure?</h5>
                        <p>This action cannot be undone.</p>
                        <p><strong>Ineligibile Period: </strong>
                            {period.startDate} <strong> - </strong> {period.endDate}
                        </p>
                    </div>
                    <div className="text-center mt-5">
                        <Button
                            onClick={onCloseClicked}
                            className="btn btn-secondary mr-2">
                            Cancel
                        </Button>
                        <Button
                            onClick={onDeletePeriodClicked}
                            className="btn btn-danger">
                            Delete
                        </Button>
                    </div>


                </Modal.Body>

            </Modal>
        </>

    );
};

export default DeleteIneligiblePeriodModal;