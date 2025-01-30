import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5019', // URL do backend
});

export default api;