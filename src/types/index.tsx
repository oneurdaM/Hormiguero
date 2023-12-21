export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export interface QueryOptions {
  limit?: number
  page?: number
  orderBy?: string
  sortedBy?: SortOrder
  search?: string
}

export type QueryOptionsType = {
  page?: number
  search?: string
  limit?: number
  orderBy?: string
  sortedBy?: SortOrder
}

export interface GenericQueryOptions extends QueryOptions {
  search: string
}
