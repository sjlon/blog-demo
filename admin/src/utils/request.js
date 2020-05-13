import axios from 'axios'

const service = axios.create({
    baseURL: '/admin',
    timeout: 1000
})

export default service
