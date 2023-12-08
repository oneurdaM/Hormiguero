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
    payment: Payment
    seats: [Seat]
    products: [Seat]
    rents: [Seat]
    user: User
}

export interface Payment {
    id: number
    method: string
    total: number
    type: string
    name: string
    createdAt: string
    orderId: number
}

export interface Seat {
    id: number
    name: string
    createdAt: string
    is_available: boolean
    eventSpacesId: number
    is_selected: boolean
}

export interface User {
    id: number
    email: string
    firstName: string
    lastName: string
    middleName: string
    role: string
    usernmae: string
}