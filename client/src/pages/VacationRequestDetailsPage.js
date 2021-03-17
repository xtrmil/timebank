import React, { useState, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getAllCommentsByRequestId } from "../api/comment";
import { getVacationRequestById } from "../api/vacationRequest";
import VacationRequestDetails from "../components/uservacationrequest/VacationRequestDetails";
import { useAuth } from "../context/Context";
const VacationRequestDetailsPage = () => {
  const history = useHistory();
  const [selectedRequest, setSelectedRequest] = useState(
    history?.location?.state?.request
  );
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loggedInUser, isAdmin } = useAuth();
  const redirect = loggedInUser.id !== selectedRequest?.user?.id && !isAdmin;

  const loadComments = useCallback(async () => {
    try {
      let response = await getAllCommentsByRequestId(id);
      setComments(response.data.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }, [id]);

  useEffect(() => {
    const fetchRequest = async () => {
      let response = await getVacationRequestById(id);
      setSelectedRequest(response.data.data);
    };
    if (!redirect) {
      if (!selectedRequest) {
        fetchRequest();
      }
      loadComments();
      setIsLoading(false);
    }
  }, [loadComments, selectedRequest, id, redirect]);

  return (
    <>
      {redirect && <Redirect to="/home"></Redirect>}
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
    </>
  );
};

export default VacationRequestDetailsPage;
