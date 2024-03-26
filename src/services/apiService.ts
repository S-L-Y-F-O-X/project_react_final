import axios from "axios";

import {baseURL} from "../constants";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjdhYmM2MThmZTJmYWYwNjE5NjA0Zjc1YjQ0MGM1ZCIsInN1YiI6IjY1NGIyYzhjZmQ0ZjgwMDExZWQzMTljMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Im4IohYkpSJmhqw7Y5qGSIGqnVhOwGrU4iCpPDOBz24";
const apiService = axios.create({baseURL});

apiService.interceptors.request.use((request) => {
    request.headers.Authorization = `Bearer ${API_KEY}`;
    return request;
});

export {
    apiService,
    API_KEY
};