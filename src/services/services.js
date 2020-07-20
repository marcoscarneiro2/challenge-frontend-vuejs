import axios from "axios";

const axiosinstance = axios.create({
    baseURL: "https://vue-flix-backend.herokuapp.com/media"
});

export const api = {
    get(endpoint) {
        return axiosinstance.get(endpoint);
    }
}