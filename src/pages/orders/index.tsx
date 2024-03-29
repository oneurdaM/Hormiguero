import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/layout/layout'
// import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import Search from '@/components/common/search'
import logo from '@/assets/placeholders/logo.png'
import { getOrders } from '@/data/ordersServices'
import { OrdersResponse } from '@/types/orders'
import BillboardList from '@/components/billboard/billboard-list'
import OrdersList from '@/components/orders/orders-list'

function Orders() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const [fetchingOrders, setFetchingOrders] = useState(false)
    const [ordersResponse, setOrdersResponse] = useState<OrdersResponse>({
        orders: [],
        fetchingOrders: false,
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
            setFetchingOrders(true)
            const response = await getOrders(pageLocal, searchLocal)
            console.log('response en index', response)
            setOrdersResponse(response)
            setFetchingOrders(false)
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

    if (ordersResponse?.error) {
        return (
            <div className="nc-PageHome container pt-10  h-auto min-h-screen">
                <ErrorMessage message={ordersResponse?.error} />
            </div>
        )
    }

    return (
        <>
            {isClient && (
                <Layout>
                    <Head>
                        <title>Ordenes | CCH</title>
                        <meta name="description" content={'Centro Cultural El Hormiguero'} />
                        <meta property="og:image" content={logo.toString()} />

                        <meta name="twitter:title" content="Centro Cultural El Hormiguero" />
                        <meta name="twitter:description" content={'Centro Cultural El Hormgiuero'} />
                        <meta name="twitter:image" content={logo.toString()} />
                        <meta name="twitter:card" content={logo.toString()} />
                    </Head>
                    <div className="h-auto min-h-screen  bg-[#014154] dark:bg-black dark:bg-opacity-20 py-10">
                        <div className="nc-PageHome container pt-10  h-auto min-h-screen">
                            <h1 className="text-4xl font-bold mt-2  text-[#5bf1fa] text-center dark:text-white">Mis ordenes</h1>
                            <div className="w-full border-[#5bf1fa] border-solid dark:border-white border-[1px] my-5" />
                            <Search onSearch={handleSearch} />
                            <br />
                            <OrdersList orders={ordersResponse?.orders} paginatorInfo={ordersResponse?.paginatorInfo} onPagination={handlePagination} loading={fetchingOrders} />
                        </div>
                    </div>
                </Layout>
            )}
        </>
    )
}

export default Orders
