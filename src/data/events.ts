import {useQuery} from "@tanstack/react-query";
import {API_ENDPOINTS} from "./client/api-endpoints"
import {eventsClient} from "./client/events"
import {EventInterface, EventsResponse, QueryOptionsType} from "@/interfaces";

export const useEventsQuery = ({search,...options}: Partial<QueryOptionsType>) => {
	const {data,isLoading,error} = useQuery<EventsResponse,Error>(
		[API_ENDPOINTS.EVENTS],
		() => eventsClient.paginated(options),
		{
			keepPreviousData: true,
		}
	);
	

	return {
		data: data?.data ?? [],
		isLoading,
		error
	}
}


export const useEventQuery = ({id}: {id: string}) => {
	return useQuery<EventInterface,Error>([`${API_ENDPOINTS.EVENT_DETAILS}/${id}`],() =>
		eventsClient.byId({id})
	)
}

export const useRegistrerVisit = () => {
	const {data,isLoading,error} = useQuery(
		[API_ENDPOINTS.VISITS],() => eventsClient.visits(),
	);
	

	return {
		data: data ?? [],
		isLoading,
		error
	}
}