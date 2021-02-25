import Api from "./baseUrl";

const getAllIneligiblePeriods = () => {
    return Api.get("/ineligible");
}

const addIneligiblePeriod = (body) => {
    return Api.post("/ineligible",
        {...body}
        );
}

const getIneligiblePeriodById = (id) => {
    return Api.get(`/ineligible/}${id}`);
}

const updateIneligbilePeriod = (id, body) => {
    return Api.put(`/ineligible/${id}`,
        {body}
        );
}

const deleteIneligiblePeriodById = (id) => {
    return Api.get(`/ineligible/${id}`);
}

export {
    getAllIneligiblePeriods,
    addIneligiblePeriod,
    getIneligiblePeriodById,
    updateIneligbilePeriod,
    deleteIneligiblePeriodById};