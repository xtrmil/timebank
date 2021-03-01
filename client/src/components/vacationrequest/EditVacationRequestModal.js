import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../../context/Context";

const EditVacationRequestModal = (props) => {
  const { showModal, setShowModal, request } = props;
  const { loggedInUser } = useAuth();
  //Kolla om loggedInUser är admin eller ägaren till request
  //Kolla om request är pending
  //Visa då upp edit fälten.
  console.log(loggedInUser);
  console.log(request);
  const handleClose = () => {
    setShowModal(false);
  };
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditVacationRequestModal;
