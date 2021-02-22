import Api from "./baseUrl";

const addUser = (body) => {
    return Api.post("/user",
        {...body});
}
