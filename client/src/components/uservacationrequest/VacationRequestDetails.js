import React, { useState } from "react";
import CommentCard from "../userprofile/comment/CommentCard";
import AddCommentForm from "../userprofile/comment/AddCommentForm";
import EditVacationRequestModal from "../calendar/calendarvacationrequest/EditVacationRequestModal";
import EditVacationRequestStatusModal from "../calendar/calendarvacationrequest/EditVacationRequestStatusModal";
import { useAuth } from "../../context/Context";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const VacationRequestDetails = (props) => {
    const { showDetails, setShowDetails, comments, selectedRequest,
        loadComments, updateVacationRequestList, setSelectedRequest } = props;
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [showEditRequestForm, setShowEditRequestForm] = useState(false);
    const [showEditStatusModal, setShowEditStatusModal] = useState(false);
    const isApproved = selectedRequest.status === "APPROVED" ? true : false;
    const { isAdmin } = useAuth();

    const onAddCommentClicked = () => {
        setShowCommentForm(true);
    }

    const onEditRequestClicked = () => {
        setShowEditRequestForm(true);
    }

    const onEditStatusClicked = () =>{
        console.log(showEditRequestForm);
        setShowEditStatusModal(true);
    }
    const afterUpdate = (updatedRequest) => {
        console.log(updatedRequest);
        updateVacationRequestList();
        setSelectedRequest(updatedRequest);

        setShowEditRequestForm(false);
    }

    return (
        <>
            {showDetails && selectedRequest && (
                <>
                    <Button onClick={() => setShowDetails(false)}>Back</Button>
                    <Row noGutters>
                        <Col xs={12}>
                            <Card>
                                <Card.Body>
                                    {!isApproved &&
                                        <Button className="btn btn-info btn-sm float-right mt-2" onClick={onEditRequestClicked}>Edit Request</Button>
                                    }

                                    <Card.Title className="mt-2">{selectedRequest.title}</Card.Title>
                                    <p><strong>Start date: </strong>{selectedRequest.startDate}</p>
                                    <p><strong>End date: </strong>{selectedRequest.endDate}</p>
                                    <p><strong>Status: </strong>{selectedRequest.status}
                                        {!isApproved && isAdmin && <Button className="ml-1 btn-sm" onClick={onEditStatusClicked}>Edit Status</Button>
                                        }</p>

                                    <p><strong>Description: </strong>{selectedRequest.description}</p>
                                    <div className="mb-3">
                                        <strong>Comments ({comments.length}) </strong>
                                        {!isApproved &&
                                            <Button className="btn-sm" onClick={onAddCommentClicked}><FontAwesomeIcon icon={faPlusCircle} /></Button>
                                        }

                                    </div>

                                    {showEditStatusModal && <EditVacationRequestStatusModal
                                    request={selectedRequest}
                                    showModal={showEditStatusModal}
                                    setShowModal={setShowEditStatusModal}
                                    />}

                                    {showEditRequestForm && !isApproved &&
                                        <EditVacationRequestModal
                                            afterUpdate={afterUpdate}
                                            showModal={showEditRequestForm}
                                            setShowModal={setShowEditRequestForm}
                                            request={selectedRequest} />}

                                    {showCommentForm &&
                                        <AddCommentForm
                                            setShowCommentForm={setShowCommentForm}
                                            loadComments={loadComments}
                                            requestId={selectedRequest.id} />}
                                    <div>{comments.map(comment => {
                                        return (
                                            <CommentCard
                                                isApproved={isApproved}
                                                comment={comment}
                                                key={comment.id}
                                                loadComments={loadComments}
                                                requestId={selectedRequest.id} />
                                        )
                                    })}</div>
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