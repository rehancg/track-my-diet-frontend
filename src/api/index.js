import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://143.110.186.112',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

export default Api;