import Api from "./baseUrl";

const addVacationRequest = (body) => {
    return Api.post("/request",
        {...body}
        );
}

const getVacationRequestById = (id) => {
    return Api.get("/request");
}

const getAllVacationRequestsByUser = (id) => {
    return Api.get(`/request/user/${id}`);
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

export {
    addVacationRequest,
    getVacationRequestById,
    getAllVacationRequestsByUser,
    updateVacationRequest,
    deleteVacationRequest
};





