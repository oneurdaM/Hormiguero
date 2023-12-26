import axios from 'axios';
import { getAuthCredentials } from '@/utils/auth-utils'

const endpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
const { token, userId } = getAuthCredentials();
let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    },
}

export const getOrders = async (page: any, search: any) => {
    try {
        search = search ? 'search=' + search + '&' : 'search=&'
        page = 'page=' + page
        let fetchingOrders = true;
        const response = await axios.get(endpoint + '/orders/ByUser?'+ search + page + '&limit=10', config)
        console.log('response', response);
        const paginatorInfo = {
            total: response?.data.total ? parseInt(response.data.total.toString()) : 0,
            currentPage: response?.data.currentPage ? parseInt(response.data.currentPage.toString()) : 1,
            totalPages: response?.data.totalPages ? parseInt(response.data.totalPages.toString()) : 0,
            perPage: response?.data.perPage ? parseInt(response.data.perPage.toString()) : 0,
        }
        if (response.status === 200) {
            fetchingOrders = false;
            return {
                orders: response.data.data,
                fetchingOrders,
                paginatorInfo,
                error: '',
            }
        } else {
            fetchingOrders = false;

            return {
                orders: [], 
                fetchingOrders,
                paginatorInfo,
                error: response.data.message 
            }
        }
    } catch (error:any) {
        const paginatorInfo = {
            total: 0,
            currentPage: 1,
            totalPages: 0,
            perPage: 0,
        }
        return {
            orders: [], 
            fetchingOrders: false,
            paginatorInfo,
            error: error?.response.data.message,
        } 
    }
};

export const downloadTicket = async (orderId: number) => {
    try {
        console.log('config', config)
        const response = await axios.post(endpoint + '/orders/file/' + orderId, {}, {headers: {
            'Authorization': 'Bearer ' + token
          },
          responseType: 'blob'})
        console.log('response', response);
        if (response.status === 200) {
            return {
                downloadTicket: response.data,
                error: '',
            }
        } else {
            return {
                downloadTicket: null,
                error: response.data.message 
            }
        }
    } catch (error:any) {
        return {
            downloadTicket: null,
            error: error?.response.data.message,
        } 
    }
};