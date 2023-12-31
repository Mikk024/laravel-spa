import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    },
})