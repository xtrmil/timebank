import Api from "./baseUrl";
import { Cookies } from 'react-cookie'
const cookies = new Cookies();

const addUser = (body) => {
    return Api.post("/user",
        {...body}, {
            headers:{
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        });
}

const updateUser = (id, body) => {
    return Api.put(`/user/${id}`,
        {body}, {
            headers:{
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        });
}

export {addUser, updateUser}