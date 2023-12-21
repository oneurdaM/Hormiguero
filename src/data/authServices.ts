import axios from 'axios';

//const endpoint = 'https://hormiguero-dc8e78e18915.herokuapp.com/';
const endpoint = 'https://back-hormiguero-558b8cf43e32.herokuapp.com/';



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