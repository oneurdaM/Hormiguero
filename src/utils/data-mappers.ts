export interface MappedPaginatorInfo {
  data: any[]
  totalPages: number
  total: number
  currentPage: number
  perPage: number
  hasMorePages: boolean
}

export interface PaginatorInfo<T> {
  data: T[]
  totalPages: number
  total: number
  currentPage: number
  latestPage: number
  perPage: number
  hasMorePages: boolean
}

export const mapPaginatorData = (
  obj: PaginatorInfo<any> | undefined
): MappedPaginatorInfo | null => {
  if (!obj) return null
  return {
    ...obj,
  }
}
