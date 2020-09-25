import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:1024',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

export default Api;