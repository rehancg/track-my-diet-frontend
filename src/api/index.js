import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://15.207.231.160:1024',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

export default Api;