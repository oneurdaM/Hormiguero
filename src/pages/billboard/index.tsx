import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/layout/layout'
// import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import Search from '@/components/common/search'
import logo from '@/assets/placeholders/logo.png'
import { getBillboard } from '@/data/billboardServices'
import { BillboardResponse } from '@/types/billboard'
import BillboardList from '@/components/billboard/billboard-list'

function Billboard() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const [fetchingBillboards, setFetchingBillboards] = useState(false)
    const [billboardsResponse, setBillboardsResponse] =
        useState<BillboardResponse>({
            billboards: [],
            fetchingBillboards: false,
            paginatorInfo: {
                total: 0,
                currentPage: 0,
                totalPages: 0,
                perPage: 0,
            },
            error: '',
        })

    const fetchData = async (pageLocal: any, searchLocal: any) => {
        try {
            setFetchingBillboards(true)
            const response = await getBillboard(pageLocal, searchLocal)
            console.log('response en index', response)
            setBillboardsResponse(response)
            setFetchingBillboards(false)
        } catch (error) {
            console.error('Error al cargar los datos', error)
        }
    }

    useEffect(() => {
        fetchData(page, searchTerm)
    }, [])

    function handleSearch({ searchText }: { searchText: string }) {
        console.log('searchText', searchText)
        setSearchTerm(searchText)
        setPage(1)
        fetchData(1, searchText)
    }

    function handlePagination(current: number) {
        console.log(current)
        setPage(current)
        fetchData(current, searchTerm)
    }

    if (billboardsResponse?.error) {
        return (
            <div className="nc-PageHome container pt-10  h-auto min-h-screen">
                <ErrorMessage message={billboardsResponse?.error} />
            </div>
        )
    }

    return (
        <>
            {isClient && (
                <Layout>
                    <Head>
                        <title>Cartelera | CCH</title>
                        <meta
                            name="description"
                            content={'Centro Cultural El Hormiguero'}
                        />
                        <meta property="og:image" content={logo.toString()} />

                        <meta
                            name="twitter:title"
                            content="Centro Cultural El Hormiguero"
                        />
                        <meta
                            name="twitter:description"
                            content={'Centro Cultural El Hormgiuero'}
                        />
                        <meta name="twitter:image" content={logo.toString()} />
                        <meta name="twitter:card" content={logo.toString()} />
                    </Head>
                    <div className="h-auto min-h-screen bg-orange-50 dark:bg-black dark:bg-opacity-20">
                        <div className="nc-PageHome container pt-10  h-auto min-h-screen">
                            <h1 className="text-3xl mt-2">Cartelera</h1>
                            <div className="w-full border-slate-300 border-solid border-[1px] my-5" />
                            <Search onSearch={handleSearch} />
                            <br />
                            <BillboardList
                                billboards={billboardsResponse?.billboards}
                                paginatorInfo={
                                    billboardsResponse?.paginatorInfo
                                }
                                onPagination={handlePagination}
                                loading={fetchingBillboards}
                            />
                        </div>
                    </div>
                </Layout>
            )}
        </>
    )
}

export default Billboard
