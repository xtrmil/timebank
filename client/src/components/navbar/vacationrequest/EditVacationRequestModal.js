import React from "react";
import { Modal, Button } from "react-bootstrap";

const EditVacationRequestModal = (props) => {
    const { showModal, setShowModal, request } = props;
    const handleClose = () => {
        setShowModal(false);
    }
    return (
        <Modal show={showModal} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>{request.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>
                    {request.startDate} - {request.endDate}
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>

        </Modal>
    )
}

export default EditVacationRequestModal;

