'use client'
import React, { useState } from 'react'
import Head from 'next/head'

import BlogList from '@/components/blog/blog-list'
import Layout from '@/components/layout/layout'
import { useNotesQuery } from '@/data/blog-notes'
// import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import Search from '@/components/common/search'
import logo from '@/assets/placeholders/logo.png'

const Blog: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
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

    if (error) {
        return (
            <div className="nc-PageHome container pt-10  h-auto min-h-screen">
                <ErrorMessage message={error.message} />
            </div>
        )
    }

    return (
        // <Layout>
        <>
            <Head>
                <title>Notas | CCH</title>
                <meta name="description" content={'Centro Cultural El Hormiguero'} />
                <meta property="og:image" content={logo.toString()} />

                <meta name="twitter:title" content="Centro Cultural El Hormiguero" />
                <meta name="twitter:description" content={'Centro Cultural El Hormgiuero'} />
                <meta name="twitter:image" content={logo.toString()} />
                <meta name="twitter:card" content={logo.toString()} />
            </Head>
            <div className="h-auto  bg-[#014154] dark:bg-black dark:bg-opacity-20">
                <div className="nc-PageHome container pt-10  h-auto min-h-screen">
                    <h1 className="text-4xl font-bold mt-2 text-[#5bf1fa] text-center">Notas Destacadas</h1>
                    <div className="w-full border-[#5bf1fa] border-solid border-[1px] my-5" />
                    {/* <Search onSearch={handleSearch} /> */}
                    <br />
                    <BlogList notes={notes} paginatorInfo={paginatorInfo} onPagination={handlePagination} loading={loading} />
                </div>
            </div>
        </>
        // </Layout>
    )
}

export default Blog
