export interface Banner {
    thumbnailUrl: string
    title: string
    description: string
    url: string
}



export interface BannerResponse {
    data: Banner[]
    total: number
    totalPages: number
    currentPage: number
    perPage: number
}
