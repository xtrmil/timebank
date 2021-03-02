import Api from "./baseUrl";
import { Cookies } from 'react-cookie'
const cookies = new Cookies();

const getAllIneligiblePeriods = () => {
    return Api.get("/ineligible",
        {
            headers:{
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        });
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
    return Api.get(`/ineligible/}${id}`,
        {
            headers:{
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        });
}

const updateIneligbilePeriod = (id, body) => {
    return Api.put(`/ineligible/${id}`,
        {body}, {
            headers:{
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        }
        );
}

const deleteIneligiblePeriodById = (id) => {
    return Api.get(`/ineligible/${id}`,
        {
            headers:{
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        });
}

export {
    getAllIneligiblePeriods,
    addIneligiblePeriod,
    getIneligiblePeriodById,
    updateIneligbilePeriod,
    deleteIneligiblePeriodById};