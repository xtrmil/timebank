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

const getAllUsers = () => {
    return Api.get("/user/all", {
        headers: {
            Authorization: `Bearer ${cookies.get("session_token")} `
        }
    })
}

const getUserById = (id) => {
    return Api.get(`/user/${id}`,
    {
        headers:{
            Authorization: `Bearer ${cookies.get("session_token")} `
        }
    });
}
 
const updateUser = (id, body) => {
    return Api.put(`user/${id}`,
        {...body}, {
            headers:{
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
        });
}

const deleteUser = (id) => {
    return Api.delete(`user/${id}`,
        {
            headers:{
                Authorization: `Bearer ${cookies.get("session_token")} `
            }
    });
}

const updatePassword = (body)=>{
    return Api.put("/user/password",
    {...body}, {
        headers:{
            Authorization: `Bearer ${cookies.get("session_token")} `
        }
    });

}

const uploadImage = (formdata) =>{
    return Api.post("/user/upload/image",
    formdata, {
        headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${cookies.get("session_token")} `
        },
    
    });
}

const fetchImageByUser =() =>{
    return Api.get("/user/get/image",
    {
        headers:{
            Authorization: `Bearer ${cookies.get("session_token")} `
        },
    
    });
}
export {addUser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser,
    updatePassword,
    uploadImage,
    fetchImageByUser}