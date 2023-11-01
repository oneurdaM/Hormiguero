import {API_ENDPOINTS} from "./api-endpoints"
import {HttpClient} from "./http-client"
import { UsersResponse } from "@/types/users"

export const userClient = {
	  login: (variables: {identifier: string, password: string}) => {
		return HttpClient.post(API_ENDPOINTS.LOGIN, variables)
	  },
	  me: () => {
		return HttpClient.get<UsersResponse>(API_ENDPOINTS.ME)
	  },
}