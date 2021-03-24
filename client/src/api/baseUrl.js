import axios from "axios";

const Api = axios.create({
    baseURL:"https://timebank-2021-backend.herokuapp.com/api/v1/"
});

export default Api;