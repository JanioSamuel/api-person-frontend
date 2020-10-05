import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_URL_BACKEND_LOCAL : process.env.REACT_APP_URL_BACKEND,
});

export default api;