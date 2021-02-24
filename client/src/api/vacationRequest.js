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
    return Api.get(`/request/user/${id}`,
    {
        headers: {
            Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmbGFrYW4xMjNAZ21haWwuY29tIiwiZXhwIjoxNjE0MjEzNDU0LCJ1c2VyIjp7ImlkIjoxMSwiZW1haWwiOiJmbGFrYW4xMjNAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiSm9obm55IiwibGFzdE5hbWUiOiJIb2FuZyIsInNlY3JldCI6IlhYVlhESEtMWFlaT1E0R0QiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJ2ZXJpZmllZCI6dHJ1ZSwidXNlcm5hbWUiOm51bGx9LCJpYXQiOjE2MTQxNzc0NTR9.dZ0AY5fpSSlpa5TL2ThIROjQxTyVIBX9caQ-VCca_2M"
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
                Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmbGFrYW4xMjNAZ21haWwuY29tIiwiZXhwIjoxNjE0MjEzNDU0LCJ1c2VyIjp7ImlkIjoxMSwiZW1haWwiOiJmbGFrYW4xMjNAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiSm9obm55IiwibGFzdE5hbWUiOiJIb2FuZyIsInNlY3JldCI6IlhYVlhESEtMWFlaT1E0R0QiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJ2ZXJpZmllZCI6dHJ1ZSwidXNlcm5hbWUiOm51bGx9LCJpYXQiOjE2MTQxNzc0NTR9.dZ0AY5fpSSlpa5TL2ThIROjQxTyVIBX9caQ-VCca_2M"
            }
        })
}

export {
    addVacationRequest,
    getVacationRequestById,
    getAllVacationRequestsByUser,
    updateVacationRequest,
    deleteVacationRequest,
    getAllVacationRequestsByStatus
};





