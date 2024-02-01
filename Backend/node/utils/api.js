const axios = require('axios');

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Replace this with your desired base URL
  headers: {
    'Content-Type': 'application/json',
  }
});


module.exports = api