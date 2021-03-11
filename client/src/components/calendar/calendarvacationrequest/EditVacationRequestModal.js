import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../../../context/Context";
import VacationRequestForm from "./VacationRequestForm";
import { addVacationRequest, updateVacationRequest } from "../../../api/vacationRequest";
import {Link, useHistory} from "react-router-dom";

const EditVacationRequestModal = (props) => {
  const { showModal, setShowModal, request } = props;
  const { loggedInUser, isAdmin } = useAuth();
  const history = useHistory();

  //Kolla om loggedInUser är admin eller ägaren till request
  //Visa då upp edit fälten.

  const initialValues = {
    title: request.title,
    startDate: request.startDate,
    endDate: request.endDate,
    description: request.description
  }

  const editVacationRequest = (data) => {
    try {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      if (startDate.getTime() < endDate.getTime()) {
        updateVacationRequest(request.id, data);
        history.go(0);
      }
    } catch (error) {
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
          {isEditable
            ? <VacationRequestForm
              onSubmitClicked={editVacationRequest}
              setShowModal={setShowModal}
              initialValues={initialValues} />
            : <div>{request.user &&
              <>
                <p><strong>Name: </strong>
                  <Link to={ {pathname:`/user/${request.user.id}`, state: {user: request.user}}}>
                    {request.user.firstName} {request.user.lastName}
                  </Link>
                </p>
                <p><strong>Dates: </strong>{request.startDate} - {request.endDate}</p>
                <p><strong>Approved by: </strong>{request.admin.firstName} {request.admin.lastName}</p>
              </>
            }

            </div>}
        </Modal.Body>
      </Modal>

    </>
  );
};

export default EditVacationRequestModal;
