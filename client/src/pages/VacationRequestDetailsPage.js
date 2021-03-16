import React, { useState, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { getAllCommentsByRequestId } from "../api/comment";
import { getVacationRequestById } from "../api/vacationRequest";
import VacationRequestDetails from "../components/uservacationrequest/VacationRequestDetails";
const VacationRequestDetailsPage = () => {
  const history = useHistory();
  const [selectedRequest, setSelectedRequest] = useState(
    history?.location?.state?.request
  );
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadComments = useCallback(async (id) => {
    try {
      let response = await getAllCommentsByRequestId(id);
      setComments(response.data.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }, []);

  useEffect(() => {
    const fetchRequest = async () => {
      let response = await getVacationRequestById(id);
      setSelectedRequest(response.data.data);
    };
    if (!selectedRequest) {
      fetchRequest();
    }
    loadComments(id);
    setIsLoading(false);
  }, [loadComments, selectedRequest, id]);

  return (
    <Container>
      {selectedRequest && (
        <VacationRequestDetails
          setSelectedRequest={setSelectedRequest}
          selectedRequest={selectedRequest}
          comments={comments}
          isLoading={isLoading}
          loadComments={loadComments}
        />
      )}
    </Container>
  );
};

export default VacationRequestDetailsPage;
