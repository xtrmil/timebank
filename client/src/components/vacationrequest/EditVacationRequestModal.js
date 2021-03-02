import React, {useState} from "react";
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../../context/Context";
import VacationRequestForm from "./VacationRequestForm";
import {addVacationRequest, updateVacationRequest} from "../../api/vacationRequest";

const EditVacationRequestModal = (props) => {
  const { showModal, setShowModal, request } = props;
  const { loggedInUser, isAdmin } = useAuth();

  //Kolla om loggedInUser är admin eller ägaren till request
  //Visa då upp edit fälten.

    const initialValues = {
        title: request.title,
        startDate: request.startDate,
        endDate: request.endDate
    }

   const editVacationRequest = (data) => {
        try{
            const startDate = new Date (data.startDate);
            const endDate = new Date (data.endDate);
            if(startDate.getTime() < endDate.getTime()){
                updateVacationRequest(request.id, data);
                setShowModal(false);
            }
        }catch(error){
        }
   }

    const isEditable = (request.user
        && (request.user.id === loggedInUser.id || isAdmin)
        && request.status === "PENDING" ? true : false);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Body>
                    <h4 className="text-center">{request.title}</h4>
                    { isEditable
                        ? <VacationRequestForm
                        onSubmitClicked={editVacationRequest}
                        setShowModal={setShowModal}
                        initialValues={initialValues}/> : <div><p>någon annans</p></div>}
                </Modal.Body>
            </Modal>

    </>
  );
};

export default EditVacationRequestModal;
