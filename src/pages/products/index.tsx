import React, { useState } from 'react'
import Head from 'next/head'

import Layout from '@/components/layout/layout'
import { useProductsQuery } from '@/data/product'
import ErrorMessage from '@/components/ui/error-message'
import Search from '@/components/common/search'
import ProductsList from '@/components/products/products-list'
import logo from '@/assets/placeholders/logo.png'

function Products() {
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const { products, loading, error, paginatorInfo } = useProductsQuery({
        limit: 8,
        page,
        search: searchTerm,
    })
    console.log('paginatorInfo', paginatorInfo)
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
                <title>Productos | CCH</title>
                <meta name="description" content={'Centro Cultural El Hormiguero'} />
                <meta property="og:image" content={logo.toString()} />

                <meta name="twitter:title" content="Centro Cultural El Hormiguero" />
                <meta name="twitter:description" content={'Centro Cultural El Hormgiuero'} />
                <meta name="twitter:image" content={logo.toString()} />
                <meta name="twitter:card" content={logo.toString()} />
            </Head>
            <div className="h-auto min-h-screen  bg-[#014154] dark:bg-black dark:bg-opacity-20">
                <div className="nc-PageHome container py-10  h-auto min-h-screen">
                    <h1 className="text-4xl font-bold mt-2  text-[#5bf1fa] text-center dark:text-white ">Productos el Hormgiuero</h1>
                    <div className="w-full border-[#5bf1fa] border-solid dark:border-white border-[1px] my-5" />
                    <Search onSearch={handleSearch} />
                    <br />
                    <ProductsList products={products ?? []} paginatorInfo={paginatorInfo} onPagination={handlePagination} loading={loading} />
                </div>
            </div>
        </Layout>
    )
}

export default Products
