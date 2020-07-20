import axios from 'axios';

const standard = axios.create({
  timeout: 100000,
  transformResponse: [
    function (data) {
      return data;
    },
  ],
});


export default standard;
