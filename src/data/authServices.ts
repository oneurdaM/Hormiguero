import axios from 'axios';

const endpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

export const resetPassword = async (data: any) => {
    try {
        const response = await axios.post(endpoint + 'auth/reset-password', data)
        console.log('response', response);
        if (response.status === 200) {
            return {
                success: response.data,
                error: '',
            }
        } else {

            return {
                success: [],
                error: response.data.error 
            }
        }
    } catch (error) {
        console.error(error);
        throw error; 
    }
};