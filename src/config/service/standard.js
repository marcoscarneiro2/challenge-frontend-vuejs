import axios from 'axios';

const standard = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
  timeout: 100000,
  transformResponse: [
    function (data) {
      return data;
    },
  ],
});


export default standard;
