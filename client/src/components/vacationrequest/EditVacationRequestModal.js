import React from "react";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import VacationRequestForm from "./VacationRequestForm";
import { updateVacationRequest } from "../../api/vacationRequest";
import { Link } from "react-router-dom";
import {useToast} from "../../contexts/ToastContext";

const EditVacationRequestModal = (props) => {

  const { showModal, setShowModal, request, afterUpdate } = props;
  const {setToastHeader, setToastMsg, setToast} = useToast();
  const { loggedInUser, isAdmin } = useAuth();

  const initialValues = {
    title: request.title,
    startDate: request.startDate,
    endDate: request.endDate,
    description: request.description,
  };

  const editVacationRequest = async (data) => {
    try {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      if (startDate.getTime() <= endDate.getTime()) {
        let response = await updateVacationRequest(request.id, data);
        afterUpdate(response.data.data);
        setToastHeader("Success");
        setToastMsg(response.data.msg);
        setToast(true);
      }
    }catch (error){
      setToastHeader("Error");
      setToastMsg(error.message);
      setToast(true);
    }
  };

  const isEditable =
    (request?.user?.id === loggedInUser.id || isAdmin) &&
    request.status === "PENDING"
      ? true
      : false;

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Body>
            <h4 className="text-center">{ isEditable ?<Link to={{pathname: `/request/${request.id}`,state:{request}}} >{request.title}</Link> : request.title}</h4>
            <p>
              <strong>Name: </strong>
              <Link
                to={{
                  pathname: `/user/${request.user.id}`,
                  state: { user: request.user },
                }}
              >
                {request.user.firstName} {request.user.lastName}
              </Link>
            </p>

            {isEditable ? (
              <VacationRequestForm
                onSubmitClicked={editVacationRequest}
                setShowModal={setShowModal}
                initialValues={initialValues}
              />
            ) : (
              <div>
                {request.user && (
                  <>
                    <p>
                      <strong>Dates: </strong>
                      {request.startDate} - {request.endDate}
                    </p>
                    <p>
                      <strong>Approved by: </strong>
                      {request.admin.firstName} {request.admin.lastName}
                    </p>
                  </>
                )}
              </div>
            )}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default EditVacationRequestModal;
