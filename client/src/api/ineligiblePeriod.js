import Api from "./baseUrl";
import { Cookies } from 'react-cookie'
const cookies = new Cookies();

const getAllIneligiblePeriods = () => {
    return Api.get("/ineligible");
}

const addIneligiblePeriod = (body) => {
    console.log(body);
    return Api.post("/ineligible",
        {...body},{
            headers:{
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        }
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