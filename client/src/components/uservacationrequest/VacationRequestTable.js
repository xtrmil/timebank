import React from "react";
import { Table, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";

const VacationRequestTable = ({ vacationRequests, isViewable }) => {
  const history = useHistory();
  const table = vacationRequests.map((request, index) => {
    return (
      <tr className="text-center" key={index}>
        <td>{request.title}</td>
        <td>{request.startDate}</td>
        <td>{request.endDate}</td>
        <td>{request.status}</td>
        <td>
          {isViewable ? (
            <Button
              className="btn-sm"
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
            <th>Start date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </Table>
    </>
  );
};

export default VacationRequestTable;
