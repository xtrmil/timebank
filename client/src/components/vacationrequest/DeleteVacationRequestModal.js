import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteVacationRequestModal = (props) => {
  const {
    request,
    onDeleteRequestClicked,
    showDeleteModal,
    setShowDeleteModal,
  } = props;
  
  const onDeleteClicked = () => {
    onDeleteRequestClicked(request.id);
    setShowDeleteModal(false);
  };

  const onCloseClicked = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(true)}>
        <Modal.Body className="text-center">
          <h4>Delete Vacation Request</h4>
          <div className="m-4">
            <h5>Are you sure?</h5>
            <p>This action cannot be undone.</p>
            <p>
              <strong>Title: </strong> {request.title}
            </p>
            <p>
              <strong>Owner: </strong> {request.user?.firstName}{" "}
              {request.user?.lastName}
            </p>
            <p>
              <strong>Vacation Request: </strong>
              {request.startDate} <strong> - </strong> {request.endDate}
            </p>
            <p>
              <strong>description: </strong> {request.description}
            </p>
          </div>
          <div className="text-center mt-5">
            <Button onClick={onCloseClicked} className="btn btn-secondary mr-2">
              Cancel
            </Button>
            <Button onClick={onDeleteClicked} className="btn btn-danger">
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteVacationRequestModal;
