import React, { useEffect, useState } from "react";
import moment from "moment";
import UpdateCommentForm from "./UpdateCommentForm";
import { Button } from "react-bootstrap";

const CommentCard = (props) => {
    const { loadComments, requestId, comment } = props;
    const [isEditable, setEditable] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (moment().isBefore(moment(comment.createdAt).add(1, "day"))) {
            setEditable(true);

        } else {
            console.log("nej");
        }
    }, []);

    const onEditClicked = () => {
        setShowForm(true);
    }

    return (
        <div className=" border-top mb-2">
            { isEditable &&
                <Button className="btn btn-info btn-sm float-right mt-2" onClick={onEditClicked}>Edit Comment</Button>
            }
            <p className="mt-2"><strong>Last edited: </strong>
                {moment(comment.lastEditedAt).format("YYYY-MM-DD HH:mm")}
            </p>
            <p><strong>Created at: </strong>
                {moment(comment.createdAt).format("YYYY-MM-DD HH:mm")}
            </p>
            <p><strong>Written by: </strong>
                {comment.user.firstName} {comment.user.lastName}
            </p>
            <p><strong>Message: </strong>{comment.message}</p>

            {showForm &&
                <UpdateCommentForm
                    setShowForm={setShowForm}
                    comment={comment}
                    loadComments={loadComments}
                    requestId={requestId}
                />
            }

        </div>
    )
}

export default CommentCard;
