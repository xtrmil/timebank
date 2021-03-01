import Api from "./baseUrl";
import { Cookies } from 'react-cookie'
const cookies = new Cookies();
const token = cookies.get("session_token");

const addVacationRequest = (body) => {
    return Api.post("/request",
        {...body}, {
            headers: {
                Authorization: `Bearer ${token} `
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
            Authorization: `Bearer ${token} `
        }
    })
}

const updateVacationRequest = (id, body) => {
    return Api.put(`/request/${id}`,
        {...body}
        );
}

const deleteVacationRequest = (id) => {
    return Api.delete(`/request/${id}`,
        );
}

const getAllVacationRequestsByStatus = (status) => {
    return Api.get(`/request/status/${status}`,
        {
            headers: {
                Authorization: `Bearer ${token} `
            }
        })
}

const getAllVacationRequests = () => {
    return Api.get(`/request/all`,
        {
            headers: {
                Authorization: `Bearer ${token} `
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





