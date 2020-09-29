import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-my-burger-8c774.firebaseio.com'
})

export default instance
