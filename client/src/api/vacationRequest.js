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
            Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTYxNDI4MDEwMSwidXNlciI6eyJpZCI6MTIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJQYXJpYSIsImxhc3ROYW1lIjoiS2FyaW0iLCJzZWNyZXQiOiJaRUYzM0dENVNPQ09TUDQyIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifV0sInZlcmlmaWVkIjp0cnVlLCJ1c2VybmFtZSI6bnVsbH0sImlhdCI6MTYxNDI0NDEwMX0.x-AFria2pMoWwGCl-Kfe73HG0IlnQ7c2vhvlnGSijqg"
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
                Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTYxNDI4MDEwMSwidXNlciI6eyJpZCI6MTIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJQYXJpYSIsImxhc3ROYW1lIjoiS2FyaW0iLCJzZWNyZXQiOiJaRUYzM0dENVNPQ09TUDQyIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifV0sInZlcmlmaWVkIjp0cnVlLCJ1c2VybmFtZSI6bnVsbH0sImlhdCI6MTYxNDI0NDEwMX0.x-AFria2pMoWwGCl-Kfe73HG0IlnQ7c2vhvlnGSijqg"
            }
        })
}

const getAllVacationRequests = () => {
    return Api.get(`/request/all`,
        {
            headers: {
                Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImV4cCI6MTYxNDI4MDEwMSwidXNlciI6eyJpZCI6MTIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJQYXJpYSIsImxhc3ROYW1lIjoiS2FyaW0iLCJzZWNyZXQiOiJaRUYzM0dENVNPQ09TUDQyIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifV0sInZlcmlmaWVkIjp0cnVlLCJ1c2VybmFtZSI6bnVsbH0sImlhdCI6MTYxNDI0NDEwMX0.x-AFria2pMoWwGCl-Kfe73HG0IlnQ7c2vhvlnGSijqg"
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





