import React from "react";
import {Modal} from "react-bootstrap";

const EditVacationRequestStatusModal = (props) => {

    const {request,showModal,setShowModal} = props;
    
    const handleClose = () => {
        setShowModal(false);
      };
    const initialValues = {
        status: request.status,
        comment: ""
      }
      return (
        <>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Body>
              <h4 className="text-center">{request.title}</h4>
              <p>request.status</p>
              <p>request.comment</p>

            </Modal.Body>
          </Modal>
    
        </>
      );
}

export default EditVacationRequestStatusModal;