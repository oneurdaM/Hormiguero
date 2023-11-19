'use client'
import React, { useState } from 'react'
import Head from 'next/head'

import logo from '@/assets/placeholders/logo.png'
import Layout from '@/components/layout/layout'
import ErrorMessage from '@/components/ui/error-message'
import Search from '@/components/common/search'
import { useSpacesQuery } from '@/data/spaces'

function Spaces() {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const { spaces, loading, error, paginatorInfo } = useSpacesQuery({
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
      <Head>
        <title>Espacios | CCH</title>
        <meta name="description" content={'Centro Cultural El Hormiguero'} />
        <meta property="og:image" content={logo.toString()} />

        <meta name="twitter:title" content="Centro Cultural El Hormiguero" />
        <meta
          name="twitter:description"
          content={'Centro Cultural El Hormgiuero'}
        />
        <meta name="twitter:image" content={logo.toString()} />
        <meta name="twitter:card" content={logo.toString()} />
      </Head>
      <div className="h-auto min-h-screen bg-orange-50 dark:bg-black dark:bg-opacity-20">
        <div className="nc-PageHome container py-10  h-auto min-h-screen">
          <h1 className="text-3xl mt-2">Espacios para rentar</h1>
          <div className="w-full border-slate-300 border-solid border-[1px] my-5" />
          <Search onSearch={handleSearch} />
          <br />
          {/* <ProductsList
            products={products ?? []}
            paginatorInfo={paginatorInfo}
            onPagination={handlePagination}
            loading={loading}
          /> */}
        </div>
      </div>
    </Layout>
  )
}

export default Spaces
