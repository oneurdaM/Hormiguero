export interface BlogResponse {
  notes: Note[]
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}

export interface Note {
  id: number
  image: string
  content: string
  title: string
  createdAt: Date
  updatedAt: Date
  createdBy: number
  is_approved: boolean
  slug: string
  category_id?: number
  categoryId?: number
}
