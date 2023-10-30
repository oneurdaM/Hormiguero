// services/apiService.js
import axios from 'axios'

const endpoint = 'https://hormiguero1-ff8b257ea498.herokuapp.com/'

export const registerVisit = async () => {
    try {
        const response = await axios.post(endpoint + 'visits')
        console.log('response :>> ', response)
        if (response.status === 201) {
            // return response.data.users; // Devolver los datos de la respuesta
            return response
        } else {
            return response
            throw new Error(
                `La solicitud no fue exitosa. Código de estado: ${response.status}`
            )
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getBlogs = async (page, limit, search, type) => {
    try {
        const response = await axios.get(
            endpoint + 'notes?' + page + limit + search + type
        )

        if (response.status === 200) {
            // return response.data.users; // Devolver los datos de la respuesta
            return response
        } else {
            return response
            throw new Error(
                `La solicitud no fue exitosa. Código de estado: ${response.status}`
            )
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const SearchSlug = async (slug) => {
    try {
        const response = await axios.get(endpoint + slug)

        if (response.status === 200) {
            return response.data
        } else {
            return []
            throw new Error(
                `La solicitud no fue exitosa. Código de estado: ${response.status}`
            )
        }
    } catch (error) {
        console.error(error)
        throw error // Propagar el error para que pueda ser manejado en el nivel superior
    }
}
