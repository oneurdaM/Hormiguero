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
    products: [Rent]
    rents: [Rent]
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
    EventsSpaces: {
        endDate: string
        startDate: string
        event: {
            director: string
            dramaturgy: string
            duration: number
            thumbnailUrl: string
            title: string
            type: string
        }
    }
}
export interface Rent {
    startDate?: string
    id: number
    name: string
    spaceId?: number
    space: Space
  }
  export interface Space {
    id?: number | string
    dimensions: string | number
    capacity: number
    price: number
    active: boolean
    location: string
    image: string
    name: string
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