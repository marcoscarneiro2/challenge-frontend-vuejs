import axios from 'axios'

const http = axios.create({
  baseURL: 'https://vue-flix-backend.herokuapp.com/media'
})

export default http
