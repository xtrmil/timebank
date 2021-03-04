import Api from "./baseUrl";
import { Cookies } from 'react-cookie'
const cookies = new Cookies();

const addVacationRequest = (body) => {
    return Api.post("/request",
        {...body}, {
            headers: {
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        }
        );
}
const getVacationRequestById = (id) => {
    return Api.get("/request");
}

const getAllVacationRequestsByUser = (id) => {
    return Api.get(`/request/user/${id}`,
    {
        headers: {
            Authorization: `Bearer ${cookies.get("session_token")} `
        }
    })
}

const updateVacationRequest = (id, body) => {
    return Api.put(`/request/${id}`,
        {...body},
        {
            headers: {
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        });
}

const deleteVacationRequest = (id) => {
    return Api.delete(`/request/${id}`,
        );
}

const getAllVacationRequestsByStatus = (status) => {
    return Api.get(`/request/status/${status}`,
        {
            headers: {
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        })
}

const getAllVacationRequests = () => {
    return Api.get(`/request/all`,
        {
            headers: {
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        })
}

export {
    addVacationRequest,
    getVacationRequestById,
    getAllVacationRequests,
    getAllVacationRequestsByUser,
    updateVacationRequest,
    deleteVacationRequest,
    getAllVacationRequestsByStatus
};





