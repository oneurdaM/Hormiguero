import {API_ENDPOINTS} from "./api-endpoints"
import {HttpClient} from "./http-client"
import { UsersResponse, UserRegistration, ResetPasswordInput, ContactUser } from "@/types/users"

export const userClient = {
	  login: (variables: {identifier: string, password: string}) => {
		return HttpClient.post(API_ENDPOINTS.LOGIN, variables)
	  },
	  register: (variables: UserRegistration) => {
		return HttpClient.post(API_ENDPOINTS.REGISTER, variables)
	  },
	  resetPassword: (variables: ResetPasswordInput) => {
		return HttpClient.post<any>(API_ENDPOINTS.RESET_PASSWORD, variables)
	  },
	  changePassword: (variables: { newPassword: string }) => {
		return HttpClient.post(`${API_ENDPOINTS.UPDATE_PASSWORD}`, variables)
	  },
	  forgetPassword: (values: {email: string}) => {
		return HttpClient.post(
		  `${API_ENDPOINTS.FORGET_PASSWORD}/${values.email}`,
		  values
		)
	  },
	  verifyForgetPasswordToken: (variables: {email: string, token: string}) => {
		return HttpClient.post<any>(
		  API_ENDPOINTS.VERIFY_FORGET_PASSWORD_TOKEN,
		  variables
		)
	  },
	  me: () => {
		return HttpClient.get<UsersResponse>(API_ENDPOINTS.ME)
	  },

	  contact: (variables: ContactUser) => {
		return HttpClient.post(API_ENDPOINTS.CONTACT, variables)
	  },
}