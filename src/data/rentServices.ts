import axios from 'axios';
import { getAuthCredentials } from '@/utils/auth-utils'
import moment from 'moment';

const endpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
const { token, userId } = getAuthCredentials();
let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
}

export const getRents = async (month: any) => {
    try {
        console.log('month', month);
        const startDate = month ? 'startDate=' + moment(month).startOf('month').format('YYYY-MM-DD') + ' 00:00&' : ''
        const endDate = month ? 'endDate=' + moment(month).endOf('month').format('YYYY-MM-DD') + ' 23:59': ''
        
        let fetchingRents = true;
        const response = await axios.get(endpoint + '/rents/obtenerReservas?' + startDate + endDate, config)
        console.log('response get rents', response);
        if (response.status === 200) {
            fetchingRents = false;
            for(let i in response.data) {
                response.data[i].name = response.data[i].space.name
                response.data[i].startDate = response.data[i].startDate.split('T')[0]
            }
            
            return {
                rents: response.data,
                fetchingRents,
                error: '',
            }
        } else {
            fetchingRents = false;

            return {
                rents: [], 
                fetchingRents,
                error: response.data.message 
            }
        }
    } catch (error:any) {
        return {
            rents: [], 
            fetchingRents: false,
            error: error?.response.data.message,
        } 
    }
};

export const getAvailabilitySpaces = async (day: any, spaceId: number) => {
    try {
        const startDate = day ? '&startDate=' + day + ' 12:00' : ''
        const endDate = day ? '&endDate=' + day + ' 11:59' : ''
        const response = await axios.get(endpoint + '/rents/validation?spaceId=' + spaceId + startDate + endDate, config)
        console.log('response', response);
        if (response.status === 200) {
            return {
                isAvailable: true,
                error: '',
            }
        } else {
            return {
                eventsSpaces: false,
                error: response.data.message 
            }
        }
    } catch (error:any) {
        return {
            eventsSpaces: false,
            error: error?.response.data.message,
        } 
    }
};

export const rentSpace = async (spaceSelected: any, form:any) => {
    try {
        const rents = []
        for(let i in form) {
            const rent ={
                "spaceId": spaceSelected.id,
                "userId": userId,
                "startDate": form[i].day.format('YYYY-MM-DD') + ' 12:00',
                "endDate": form[i].day.format('YYYY-MM-DD') + ' 11:59'
            }
            rents.push(rent)
        }
        const body = {
            "userId": userId,
            "deliveryDate": null,
            "deliveryStatus": null,
            "products": null,
            "seats": null,
            "rents": rents,
            "payment":{
                "userId": userId,
                "name": spaceSelected.name, 
                "type": "GENERAL",
                "total": spaceSelected.price * form.length,
                "method": "PAYPAL"
            }
        }
        console.log('body', body)
        const response = await axios.post(endpoint + '/orders' , body, config)
        console.log('response', response);
        if (response.status === 200) {
            return {
                seatsResponse: response.data,
                error: '',
            }
        } else {
            console.error('error en else', response);
            return {
                seatsResponse: [],
                error: response.data.message 
            }
        }
    } catch (error: any) {
        return {
            seatsResponse: [],
            error: error?.response.data.message,
        }
    }
};