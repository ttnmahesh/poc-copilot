const axios = require('axios');

const httpClient = axios.create({
    baseURL: 'https://reqres.in/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

module.exports = httpClient;