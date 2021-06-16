import React from "react";
import {Button, Modal} from "react-bootstrap"

const DeleteEmployeeModal = (props) => {
    const {employee, showDeleteModal, setShowDeleteModal, onDeleteEmployeeClicked} = props;

    const onDeleteClicked = async () => {
        await onDeleteEmployeeClicked(employee.id);
        setShowDeleteModal(false);
    }

    const onCloseClicked = () => {
        setShowDeleteModal(false);
    }

    return(
        <>
            <Modal show={showDeleteModal}>
                <Modal.Body className="text-center">
                    <h4>Delete Employee: {employee.firstName} {employee.lastName}</h4>
                    <div className="m-4">
                        <h5>Are you sure?</h5>
                        <p>This action cannot be undone.</p>
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

export default DeleteEmployeeModal;