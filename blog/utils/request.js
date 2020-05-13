import axios from 'axios'

const service = axios.create({
    baseURL: 'http://localhost:7002/default',
    timeout: 1000
})

export default service
