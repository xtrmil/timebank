import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getAllCommentsByRequestId } from "../api/comment";
import { getVacationRequestById } from "../api/vacationRequest";
import VacationRequestDetails from "../components/uservacationrequest/VacationRequestDetails";
import { useAuth } from "../contexts/AuthContext";

const VacationRequestDetailsPage = () => {
  const history = useHistory();
  console.log(history);
  const [selectedRequest, setSelectedRequest] = useState(
    history?.location?.state?.request
  );
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [redirect,setRedirect] = useState(false);
  const { loggedInUser, isAdmin } = useAuth();
  console.log(loggedInUser);

  const loadComments = async () => {
    try {
      let response = await getAllCommentsByRequestId(id);
      setComments(response.data.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  useEffect(() => {
    const fetchRequest = async () => {
      let response = await getVacationRequestById(id);
      setSelectedRequest(response.data.data);
    };
    if(!selectedRequest){
      fetchRequest();
      
    }
    loadComments();
    setIsLoading(false);
  }, []);

  useEffect(()=>{
    if(selectedRequest){
      setRedirect(isAdmin ? false : !isAdmin && loggedInUser.id === selectedRequest?.user.id ? false : true);
    }


  },[selectedRequest]);

  return (
    <>
      {redirect && <Redirect to="/home"/>}
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
