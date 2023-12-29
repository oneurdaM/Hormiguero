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

export interface SpacesResponse {
  id?: number | string
  dimensions: string | number
  capacity: number
  price: number
  active: boolean
  location: string
  image: string
  name: string
}

export type SpacePagination = {
  data: SpacesResponse[]
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type SpaceRegistration = {
  id?: number | string
  dimensions?: string | number
  capacity?: number
  price?: number
  location?: string
  active?: boolean
}
export interface Rent {
  startDate?: string
  id: number
  name: string
  spaceId?: number
  space: Space
}
export interface RentResponse {
  rents?: Rent
  id: number
  name: string
  spaceId?: number
}
export interface AvailabilityResponse {
  isAvailable: boolean,
  error: string,
}