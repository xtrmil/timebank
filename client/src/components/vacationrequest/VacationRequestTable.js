import React, { useState } from "react";
import { Table, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import DeleteVacationRequestModal from "./DeleteVacationRequestModal";
import {deleteVacationRequest} from '../../api/vacationRequest';
import './VacationRequestTable.scss'
import {useToast} from "../../contexts/ToastContext";

const VacationRequestTable = ({ vacationRequests, isViewable, updateVacationRequestList}) => {
    const {setToastHeader, setToastMsg, setToast} = useToast();
    const history = useHistory();
    const { loggedInUser, isAdmin } = useAuth();
    const [request, setRequest] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const onDeleteRequestClicked = async(requestId) => {
      try {
          let response = await deleteVacationRequest(requestId);
          setToastHeader("Success");
          setToastMsg(response.data.msg);
          setToast(true);
          await updateVacationRequestList();
      }catch(error){
          setToastHeader("Error");
          setToastMsg(error.message);
          setToast(true);
      }

  };

  const table = vacationRequests.map((request, index) => {
    const isOwner = loggedInUser.id === request.user.id;
    return (
      <tr className="text-center" key={index}>
        <td>{request.title}</td>
        <td>
          {request.user.firstName} {request.user.lastName}
        </td>
        <td>{request.startDate}</td>
        <td>{request.endDate}</td>
        <td>{request.status}</td>
        <td className="d-flex justify-content-center">
          {isViewable ? (
            <Button
              className="btn-sm mr-2"
              onClick={() =>
                history.push({
                  pathname: `/request/${request.id}`,
                  state: { request, from: history.location },
                })
              }
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          ) : (
            "-"
          )}

          {isAdmin && (
            <Button
              onClick={() => {
                setRequest(request);
                setShowDeleteModal(true);
              }}
              disabled={isOwner}
              className="btn btn-danger btn-sm delete-button"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          )}
        </td>
      </tr>
    );
  });
  return (
    <>
      <Row className="justify-content-center mb-3">
        <h5>Vacation Requests</h5>
      </Row>

      <Table responsive striped>
        <thead>
          <tr className="text-center">
            <th>Title</th>
            <th>Owner</th>
            <th>Start date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </Table>

      <DeleteVacationRequestModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        request={request}
        onDeleteRequestClicked={onDeleteRequestClicked}
      />
    </>
  );
};

export default VacationRequestTable;
