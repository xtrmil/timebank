import React, { useState } from "react";
import { Table, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faPlusCircle, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import DeleteVacationRequestModal from "./DeleteVacationRequestModal";
import AddVacationRequestModal from './AddVacationRequestModal';
import {deleteVacationRequest} from '../../api/vacationRequest';
import './VacationRequestTable.scss';
import "../commonButtonStyling.scss";
import {useToast} from "../../contexts/ToastContext";

const VacationRequestTable = ({ vacationRequests, isViewable, updateVacationRequestList,showAddButton}) => {
    const {setToastHeader, setToastMsg, setToast} = useToast();
    const history = useHistory();
    const { loggedInUser, isAdmin } = useAuth();
    const [request, setRequest] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal,setShowAddModal ] = useState(false);
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
            <button
              className="edit-button btn-sm mr-2"
              onClick={() =>
                history.push({
                  pathname: `/request/${request.id}`,
                  state: { request, from: history.location },
                })
              }
            >
              <FontAwesomeIcon color={"white"} icon={faEye} />
            </button>
          ) : (
            "-"
          )}

          {isAdmin && (
            <button
              onClick={() => {
                setRequest(request);
                setShowDeleteModal(true);
              }}
              disabled={isOwner}
              className="delete-button btn-sm"
            >
              <FontAwesomeIcon color={"white"} icon={faTrashAlt} />
            </button>
          )}
        </td>
      </tr>
    );
  });
  return (
    <>
      <Row className="justify-content-center">
        <h5>Vacation Requests</h5>
      </Row>
      {showAddButton && (
        <Row className="mb-2 justify-content-end" noGutters>
          <button
            onClick={() => setShowAddModal(true)}
            className="add-vacation-request-button btn-sm"
          >
              <FontAwesomeIcon icon={faPlusCircle}/>  Vacation Request
          </button>
        </Row>
      )}
      <Table responsive className="table-hover table-sm table-styling">
        <thead className="table-secondary">
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
      <AddVacationRequestModal
        showAddRequestModal={showAddModal}
        setShowAddRequestModal={setShowAddModal}
      />{" "}
    </>
  );
};

export default VacationRequestTable;
