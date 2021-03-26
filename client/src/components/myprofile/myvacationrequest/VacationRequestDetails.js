import React, { useState } from "react";
import CommentCard from "../mycomment/CommentCard";
import AddCommentForm from "../mycomment/AddCommentForm";
import EditVacationRequestModal from "../../vacationrequest/EditVacationRequestModal";
import EditVacationRequestStatusModal from "../../vacationrequest/EditVacationRequestStatusModal";
import { useAuth } from "../../../contexts/AuthContext";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft, faPencilAlt, faPlus, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import { useHistory,Link } from "react-router-dom";
import "../../commonButtonStyling.scss";
import "./vacationRequestDetails.scss";

const VacationRequestDetails = (props) => {
  const {
    comments,
    selectedRequest,
    loadComments,
    setSelectedRequest,
    isLoading,
  } = props;
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showEditRequestForm, setShowEditRequestForm] = useState(false);
  const [showEditStatusModal, setShowEditStatusModal] = useState(false);
  const isApproved = selectedRequest.status === "APPROVED" ? true : false;
  const { loggedInUser, isAdmin } = useAuth();
  const isOwner = selectedRequest.user.id === loggedInUser.id;
  const history = useHistory();
  const backUrl = history?.location?.state?.from?.pathname
    ? history.location.state.from.pathname
    : "/home";

  const onAddCommentClicked = () => {
    setShowCommentForm(true);
  };

  const onEditRequestClicked = () => {
    setShowEditRequestForm(true);
  };

  const onEditStatusClicked = () => {
    console.log(showEditRequestForm);
    setShowEditStatusModal(true);
  };
  const afterUpdate = (updatedRequest) => {
    console.log(updatedRequest);
    setSelectedRequest(updatedRequest);

    setShowEditRequestForm(false);
  };

  return (
    <>
      {!isLoading && selectedRequest && (
        <>
          <Row className="mb-2 justify-content-end my-3" noGutters>
              <Link href="#" onClick={() => history.push(backUrl)} className="back-item">
                <FontAwesomeIcon color={"black"} icon={faChevronLeft} className="back-icon"/>
                <span> Back</span>
              </Link>


          </Row>

          <Row noGutters>
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <Row className="justify-content-end" noGutters>
                    {!isApproved && (
                        <button
                            className="edit-myrequest-button btn-sm mr-2"
                            onClick={onEditRequestClicked}
                        >
                          <FontAwesomeIcon color={"white"} icon={faPencilAlt}/> Request
                        </button>
                    )}

                    <button className="add-comment-button btn-sm" onClick={onAddCommentClicked}>
                      <FontAwesomeIcon icon={faPlusCircle}/> Comment
                    </button>
                  </Row>


                  <Card.Title className="mt-2">
                    {selectedRequest.title}
                  </Card.Title>
                  <p>
                    <strong>Created by: </strong>
                    <Link to={ {pathname:`/user/${selectedRequest.user.id}`, state: {user: selectedRequest.user}}}>
                    {selectedRequest.user.firstName} {selectedRequest.user.lastName}
                  </Link>
                  </p>
                  <p>
                    <strong>Start date: </strong>
                    {selectedRequest.startDate}
                  </p>
                  <p>
                    <strong>End date: </strong>
                    {selectedRequest.endDate}
                  </p>
                  <p>
                    <strong>Status: </strong>
                    {selectedRequest.status}
                    {!isApproved && isAdmin && !isOwner && (
                      <Button
                        className="ml-1 btn-sm"
                        onClick={onEditStatusClicked}
                      >
                        Edit Status
                      </Button>
                    )}
                  </p>

                  <p>
                    <strong>Description: </strong>
                    {selectedRequest.description}
                  </p>
                  <div className="mb-3">
                    <strong>Comments ({comments.length}) </strong>
                  </div>

                  {showCommentForm && (
                    <AddCommentForm
                      setShowCommentForm={setShowCommentForm}
                      loadComments={loadComments}
                      requestId={selectedRequest.id}
                    />
                  )}
                  <div>
                    {comments.map((comment) => {
                      return (
                        <CommentCard
                          isApproved={isApproved}
                          comment={comment}
                          key={comment.id}
                          loadComments={loadComments}
                          requestId={selectedRequest.id}
                        />
                      );
                    })}
                  </div>

                  {showEditStatusModal && (
                    <EditVacationRequestStatusModal
                      request={selectedRequest}
                      showModal={showEditStatusModal}
                      setShowModal={setShowEditStatusModal}
                    />
                  )}

                  {showEditRequestForm && !isApproved && (
                    <EditVacationRequestModal
                      afterUpdate={afterUpdate}
                      showModal={showEditRequestForm}
                      setShowModal={setShowEditRequestForm}
                      request={selectedRequest}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default VacationRequestDetails;
