import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5212",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});