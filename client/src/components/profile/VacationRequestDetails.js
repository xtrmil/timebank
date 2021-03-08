import React, { useState } from "react";
import moment from "moment";
import CommentCard from "./CommentCard";
import AddCommentForm from "./comment/AddCommentForm";


import { Button, Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const VacationRequestDetails = (props) => {
    const { showDetails, setShowDetails, comments, selectedRequest, loadComments } = props;
    const [showForm, setShowForm] = useState(false);

    const onAddClicked = () => {
        setShowForm(true);
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
                                    <Card.Title className="mt-2">{selectedRequest.title}</Card.Title>
                                    <p><strong>Start date: </strong>{selectedRequest.startDate}</p>
                                    <p><strong>End date: </strong>{selectedRequest.endDate}</p>
                                    <p><strong>Status: </strong>{selectedRequest.status}</p>
                                    <p><strong>Description: </strong>{selectedRequest.description}</p>
                                    <div className="mb-3">
                                        <strong>Comments ({comments.length}) </strong>
                                        <Button className="btn-sm" onClick={onAddClicked}><FontAwesomeIcon icon={faPlusCircle} /></Button>
                                    </div>
                                    {showForm && <AddCommentForm
                                        setShowForm={setShowForm}
                                        loadComments={loadComments}
                                        requestId={selectedRequest.id} />}
                                    <div>{comments.map(comment => {
                                        return (
                                            <CommentCard
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