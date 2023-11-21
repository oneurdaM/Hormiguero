import axios from 'axios';
import { getAuthCredentials } from '@/utils/auth-utils'

const endpoint = 'https://hormiguero-dc8e78e18915.herokuapp.com/';
const { token } = getAuthCredentials();
console.log('token :>> ', token);
let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }


export const getBillboard = async (page: any, search: any) => {
    try {
        search = search ? 'search=' + search + '&' : ''
        page = 'page=' + page
        let fetchingBillboards = true;
        const response = await axios.get(endpoint + 'events?' + search + page + '&limit=10', config)
        console.log('response', response);
        const paginatorInfo = {
            total: response?.data.total ? parseInt(response.data.total.toString()) : 0,
            currentPage: response?.data.currentPage ? parseInt(response.data.currentPage.toString()) : 1,
            totalPages: response?.data.totalPages ? parseInt(response.data.totalPages.toString()) : 0,
            perPage: response?.data.perPage ? parseInt(response.data.perPage.toString()) : 0,
        }
        if (response.status === 200) {
            fetchingBillboards = false;
            for(let i in response.data.data) {
                response.data.data[i].genderList = ''
                response.data.data[i].thumbnailUrl = response.data.data[i].thumbnailUrl ? response.data.data[i].thumbnailUrl : "https://kali-connect.s3.us-west-1.amazonaws.com/_c0c46b43-d047-444c-8665-17092c17ef7b.jpeg"
                if(response.data.data[i].gender.length){
                    for(let x in response.data.data[i].gender){
                        response.data.data[i].genderList += x === '0' ? response.data.data[i].gender[x].name : ', ' + response.data.data[i].gender[x].name
                    }
                }
            }
            
            return {
                billboards: response.data.data,
                fetchingBillboards,
                paginatorInfo,
                error: '',
            }
        } else {
            fetchingBillboards = false;

            return {
                billboards: [], 
                fetchingBillboards,
                paginatorInfo,
                error: response.data.error 
            }
        }
    } catch (error) {
        console.error(error);
        throw error; 
    }
};

export const getEventsSpaces = async (eventId: any, spaceId: any) => {
    try {
        spaceId = spaceId ? 'spaceId=' + spaceId + '&' : ''
        eventId = 'eventId=' + eventId
        const response = await axios.get(endpoint + 'events-spaces?' + spaceId + eventId , config)
        console.log('response', response);
        if (response.status === 200) {

            return {
                eventsSpaces: response.data,
                error: '',
            }
        } else {

            return {
                eventsSpaces: [],
                error: response.data.error 
            }
        }
    } catch (error) {
        console.error(error);
        throw error; 
    }
};