import {EventInterface,EventsResponse,QueryOptionsType} from "@/interfaces"
import {API_ENDPOINTS} from "./api-endpoints"
import {HttpClient} from "./http-client"


export const eventsClient = {
	paginated: ({id,...params}: Partial<QueryOptionsType>) => {
		return HttpClient.get<EventsResponse>(`${API_ENDPOINTS.EVENTS}/${id}`,{
			...params
		})
	},
	byId: ({id}: {id: string}) => {
		return HttpClient.get<EventInterface>(`${API_ENDPOINTS.EVENT_DETAILS}/${id}`)
	}
}