import axios from "axios"

const api = axios.create({
    baseURL: 'https://deploy-mongo-db.vercel.app/'
})

export default api