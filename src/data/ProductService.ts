
import axios from 'axios';
import { getAuthCredentials } from '@/utils/auth-utils'
const endpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
const { token, userId } = getAuthCredentials();
let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
}


export const buyProducts = async (productosRecuperados: any, costoTotal:any, cantidadProductos:any) => {
    try {
        const products = productosRecuperados.map((item: { id: any; quantity: any; }) => ({
            productId: item.id,
            cantidad: item.quantity,
        }));

        const body = {
            "userId": userId,
            "deliveryDate": null,
            "deliveryStatus": null,
            "products": products,
            "seats":null ,
            "rents": null,
            "payment":{
                "userId": userId,
                "name": cantidadProductos  > 1 ? cantidadProductos + " productos" : cantidadProductos + " producto", 
                "type": "GENERAL",
                "total": costoTotal,
                "method": "PAYPAL"
            }
        }
        const response = await axios.post(endpoint + '/orders' , body, config)
        console.log('response', response);
        if (response.status === 200) {

     
            return {
                products: response.data,
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