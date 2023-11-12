import React, { useState } from 'react'

import Layout from '@/components/layout/layout'
import { useProductsQuery } from '@/data/product'
import ErrorMessage from '@/components/ui/error-message'
import Search from '@/components/common/search'
import ProductsList from '@/components/products/products-list'

function Products() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const { products, loading, error, paginatorInfo } = useProductsQuery({
    limit: 8,
    page,
    search: searchTerm,
  })

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText)
    setPage(1)
  }

  function handlePagination(current: number) {
    console.log(current)
    setPage(current)
  }

  if (error) {
    return (
      <div className="nc-PageHome container pt-10  h-auto min-h-screen">
        <ErrorMessage message={error.message} />
      </div>
    )
  }

  return (
    <Layout>
      <div className="h-auto min-h-screen bg-orange-50 dark:bg-black dark:bg-opacity-20">
        <div className="nc-PageHome container py-10  h-auto min-h-screen">
          <Search onSearch={handleSearch} />
          <br />
          <ProductsList
            products={products ?? []}
            paginatorInfo={paginatorInfo}
            onPagination={handlePagination}
            loading={loading}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Products
