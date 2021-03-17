import React from "react";
import {Modal, Button} from "react-bootstrap";


const DeleteIneligiblePeriodModal = (props) => {
    const {period, onDeletePeriodClicked, showDeleteModal, setShowDeleteModal} = props;

    const onDeleteClicked = () => {
        onDeletePeriodClicked(period.id);
        setShowDeleteModal(false);
    }

    const onCloseClicked = () => {
        setShowDeleteModal(false);
    }

    return(
        <>
            <Modal show={showDeleteModal}>
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
                            onClick={onDeleteClicked}
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