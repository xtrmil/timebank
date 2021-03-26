import axios from "axios";

const Api = axios.create({
    baseURL:"http://localhost:8080/api/v1/"
    // baseURL:"https://timebank-2021.herokuapp.com/api/v1/"
});

export default Api;