import Api from "./baseUrl";

const  login = async (body) => {
    const response = await Api.post("/auth/login",
        {...body});
    return response.data;
}
const verifyLogin  = async(body)=>{
    const response = await Api.post("/auth/verify",
    {...body})
    return response.data;
}

export {
    login,verifyLogin
}
