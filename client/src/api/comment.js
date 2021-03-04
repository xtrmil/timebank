import Api from "./baseUrl";
import { Cookies } from 'react-cookie'
const cookies = new Cookies();

const addComment = (requestId, body) => {
    return Api.post(`/comment/${requestId}/comment`,
        { ...body }, {
        headers: {
            Authorization: `Bearer ${cookies.get("session_token")} `
        }
    });
}

const getAllCommentsByRequestId = (requestId) => {
    return Api.get(`/comment/${requestId}`,
        {
            headers: {
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        });
}

const updateComment = (commentId, body) => {
    return Api.put(`/comment/${commentId}`,
        { ...body },
        {
            headers: {
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        });
}

const deleteComment = (commentId) => {
    return Api.delete(`/comment/${commentId}`,
        {
            headers: {
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        }
    );
}

export {
    addComment,
    getAllCommentsByRequestId,
    updateComment,
    deleteComment
};