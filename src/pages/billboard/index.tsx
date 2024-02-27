import React, { useEffect, useState } from 'react'
// import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import Search from '@/components/common/search'
import { getBillboard, getBillboardSocial } from '@/data/billboardServices'
import { BillboardResponse } from '@/types/billboard'
import BillboardList from '@/components/billboard/billboard-list'

function Billboard2() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const [fetchingBillboards, setFetchingBillboards] = useState(false)
    const [billboardsResponse, setBillboardsResponse] = useState<BillboardResponse>({
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


    const [pageSocial, setPageSocial] = useState(1)
    const [fetchingBillboardsSocial, setFetchingBillboardsSocial] = useState(false)
    const [billboardsResponseSocial, setBillboardsResponseSocial] = useState<BillboardResponse>({
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

    const fetchDataSocial = async (pageLocal: any, searchLocal: any) => {
        try {
            setFetchingBillboardsSocial(true)
            const response = await getBillboardSocial(pageLocal, searchLocal)
            console.log('response en index', response)
            setBillboardsResponseSocial(response)
            setFetchingBillboardsSocial(false)
        } catch (error) {
            console.error('Error al cargar los datos', error)
        }
    }

    useEffect(() => {
        fetchData(page, searchTerm)
        fetchDataSocial(pageSocial, searchTerm)
    }, [])

    console.log(billboardsResponse.paginatorInfo)
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


    function handlePaginationSocial(current: number) {
        console.log(current)
        setPageSocial(current)
        fetchDataSocial(current, searchTerm)
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
                <>
                    <div className="h-auto min-h-screen bg-[#014154] dark:bg-black dark:bg-opacity-20 py-5">
                        <div className="nc-PageHome container pt-10  h-auto min-h-screen">
                            <h1 className="text-4xl mt-2 font-bold text-[#5bf1fa] dark:text-neutral-100 text-center">Cartelera</h1>
                            <div className="w-full border-[#5bf1fa] dark:border-white border-solid border-[1px] my-5" />
                            {/* <Search onSearch={handleSearch} /> */}
                            <br />
                            <BillboardList  billboardsSocial={billboardsResponseSocial.billboards} paginatorInfoSocial={billboardsResponseSocial.paginatorInfo}  onPaginationSocial={handlePaginationSocial} loadingSocial={fetchingBillboardsSocial}   billboards={billboardsResponse?.billboards} paginatorInfo={billboardsResponse?.paginatorInfo} onPagination={handlePagination} loading={fetchingBillboards}       />
                            
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Billboard2
