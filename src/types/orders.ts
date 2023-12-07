export interface OrdersResponse {
    orders: any
    fetchingOrders: boolean
    paginatorInfo: {
        total: number
        currentPage: number
        totalPages: number
        perPage: number
    }
    error: string
}

export interface Order {
    id: number
    fetchingOrders: boolean
    error: string
}