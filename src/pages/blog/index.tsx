'use client'
import React, { useState } from 'react'

import BlogList from '@/components/blog/blog-list'
import Layout from '@/components/layout/layout'
import { useNotesQuery } from '@/data/blog-notes'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import Search from '@/components/common/search'

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('halloween')
  const [page, setPage] = useState(1)
  const { notes, error, loading, paginatorInfo } = useNotesQuery({
    limit: 8,
    page: page,
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

  const Blog = () => {
    if (loading) {
      return <Loader text="Cargando blog de notas..." />
    }
    if (error) {
      return (
        <div className="nc-PageHome container pt-10  h-auto min-h-screen">
          <ErrorMessage message={error.message} />
        </div>
      )
    }

    return (
      <div className="nc-PageHome container pt-10  h-auto min-h-screen">
        <Search onSearch={handleSearch} />
        <br />
        <BlogList
          notes={notes ?? []}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
        />
      </div>
    )
  }

  return (
    <Layout>
      <Blog />
    </Layout>
  )
}

export default Blog
