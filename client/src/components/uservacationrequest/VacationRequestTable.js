import React, { useState } from "react";
import {useHistory, useParams} from "react-router-dom";
import { getAllCommentsByRequestId } from "../../api/comment";
import VacationRequestDetails from "./VacationRequestDetails";
import {useAuth} from "../../context/Context";
import { Table, Row, Button, Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const VacationRequestTable = (props) => {
  const { vacationRequests, showDetails, setShowDetails} = props;
  const [selectedRequest, setSelectedRequest] = useState({});
  const [comments, setComments] = useState([]);
  const {loggedInUser, isAdmin} = useAuth();
  const history = useHistory();
  const {user} = history.location.state;
  const {id} = useParams();

  const onViewDetailsClick = async (request) => {
    let response = await getAllCommentsByRequestId(request.id);
    console.log(response.data.data);
    setComments(response.data.data);
    setSelectedRequest(request);
    setShowDetails(true);
  };

  const loadComments = async (requestId) => {
      try{
          let response = await getAllCommentsByRequestId(requestId);
          console.log(response.data.data);
          setComments(response.data.data);
      }catch (error) {
          console.log(error.response.data.msg);
      }
  }

  const table = vacationRequests.map((request, index) => {
    return (
      <tr className="text-center" key={index}>
        <td>{request.title}</td>
        <td>{request.startDate}</td>
        <td>{request.endDate}</td>
        <td>{request.status}</td>
        <td>
            {(isAdmin || loggedInUser.id == id)
                ? <Button
                className="btn-sm"
                onClick={() => onViewDetailsClick(request)}
                >
                <FontAwesomeIcon icon={faEye} /> View
                </Button>
                : "-"
            }
        </td>
      </tr>
    );
  });
  return (
    <>
      <Row className="justify-content-center mb-3">
        <h5>{user.firstName} {user.lastName}s Vacation Requests</h5>
      </Row>
      {!showDetails && (
        <Table responsive striped>
          <thead>
            <tr className="text-center">
              <th>Title</th>
              <th>Start date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </Table>
      )}
      <VacationRequestDetails
          selectedRequest={selectedRequest}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          comments={comments}
          loadComments={loadComments}/>
    </>
  );
};

export default VacationRequestTable;
