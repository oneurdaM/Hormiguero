export interface Product {
  id: number
  capacity?: number
  thumbnailUrl: string
  title: string
  description: string
  price: number
  slug: string
  catalogId: number
  catalog: {
    id: number | string
    name: string
  }
  stock?: number
}




export interface CreateProduct {
  content: string
  userId: number
  image?: string
}

export interface ProductResponse {
  data: Product[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export type ProductRegistration = {
  title: string
  description: string
  thumbnail: string
  capacity?: number | null
  stock?: number | null
  price?: number | null
  slug: string
  catalogId: number | null
}
