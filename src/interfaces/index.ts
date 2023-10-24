export interface EventInterface {
	id: number
	title: string
	synopsis: string
	company: string
	dramaturgy: string
	director: string
	video: string
	public: boolean
	isAds: boolean
	audience: string
	price: number
	schedules: string[]
	thumbnailUrl: string
	spaceId: number
	type: string
	createdAt: string
	updatedAt: string
}

export interface PaginationInterface {
	total: number,
	totalPages: number,
	currentPage: number,
	perPage: number
}

export interface EventsResponse extends PaginationInterface {
	data: EventInterface[]
}

export type QueryOptionsType = {
	id?: number
	page?: number
	search?: string
	limit?: number
}