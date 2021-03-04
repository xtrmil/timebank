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

const getUserById = () => {
    return Api.get("/user",
    {
        headers:{
            Authorization: `Bearer ${cookies.get("session_token")} `
        }
    });
}
 
const updateUser = (body) => {
    return Api.put("/user",
        {...body}, {
            headers:{
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        });
}

export {addUser, updateUser, getUserById}