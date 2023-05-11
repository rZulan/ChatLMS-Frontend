import axios from "axios"
const MAIN_API_URL = "http://localhost:3500/api"

export const getGroup = async (id) => {
    try {
        const response = await axios.get(`${MAIN_API_URL}/group/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}