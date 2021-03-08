import React from "react";
import moment from "moment";
import CommentCard from "./CommentCard";

import {Button, Card, Col, Row} from "react-bootstrap";

const VacationRequestDetails = (props) => {
   const {showDetails, setShowDetails, comments, selectedRequest} = props;

    return(
        <>
            {showDetails && selectedRequest && (
                <>
                    <Button onClick={() => setShowDetails(false)}>Back</Button>
                    <Row noGutters>
                        <Col xs={12}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{selectedRequest.title}</Card.Title>
                                    <p><strong>Start date: </strong>{selectedRequest.startDate}</p>
                                    <p><strong>End date: </strong>{selectedRequest.endDate}</p>
                                    <p><strong>Status: </strong>{selectedRequest.status}</p>
                                    <p><strong>Description: </strong>{selectedRequest.description}</p>
                                    <div className="mb-3">
                                        <strong>Comments ({comments.length}) </strong></div>

                                        <div>{comments.map(comment =>{
                                            return(
                                                <CommentCard comment={comment} key={comment.id}/>
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