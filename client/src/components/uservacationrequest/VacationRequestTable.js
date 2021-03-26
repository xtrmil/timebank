import React, { useState } from "react";
import { Table, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import DeleteVacationRequestModal from "../calendar/calendarvacationrequest/DeleteVacationRequestModal";
import AddVacationRequestModal from "../calendar/calendarvacationrequest/AddVacationRequestModal";
import { deleteVacationRequest } from "../../api/vacationRequest";
import "./VacationRequestTable.scss";
const VacationRequestTable = ({
  vacationRequests,
  isViewable,
  updateVacationRequestList,
  showAddButton,
}) => {
  const history = useHistory();
  const { loggedInUser, isAdmin } = useAuth();
  const [request, setRequest] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const onDeleteRequestClicked = async (requestId) => {
    await deleteVacationRequest(requestId);
    await updateVacationRequestList();
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
      <Row className="justify-content-center">
        <h5>Vacation Requests</h5>
      </Row>
      {showAddButton && (
        <Row className="mb-2 justify-content-end" noGutters>
          <Button
            onClick={() => setShowAddModal(true)}
            className="btn btn-sm btn-info"
          >
            Add Vacation Request
          </Button>
        </Row>
      )}
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
      <AddVacationRequestModal
        showAddRequestModal={showAddModal}
        setShowAddRequestModal={setShowAddModal}
      />{" "}
    </>
  );
};

export default VacationRequestTable;
