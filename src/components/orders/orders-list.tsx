'use client'
import React from 'react'

import { Order } from '@/types/orders'
import { MappedPaginatorInfo } from '@/utils/data-mappers'

import Pagination from '../ui/pagination'
import ErrorMessage from '../ui/error-message'
import Loader from '../ui/loader/loader'

type OrdersListProps = {
    orders: Order[] | null | undefined
    paginatorInfo: MappedPaginatorInfo | any
    onPagination: (page: number) => void
    loading: boolean
}

const OrdersList = ({ orders, paginatorInfo, onPagination, loading }: OrdersListProps) => {
    if (paginatorInfo?.total === 0 && !loading) {
        return <ErrorMessage message="Aún no hay ninguna orden para mostrar" />
    }

    if (loading) {
        return <Loader text="Cargando..." />
    }
    console.log('orders', orders)

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* {billboards?.map((item) => (
                     <BillboardCard event={item} key={item.id} />
                ))} */}
            </div>

            <div className="flex items-center justify-end my-4">{!!paginatorInfo?.total && <Pagination total={parseInt(paginatorInfo.total.toString())} current={parseInt(paginatorInfo.currentPage.toString())} pageSize={parseInt(paginatorInfo.perPage.toString())} onChange={onPagination} className="text-light" />}</div>
        </>
    )
}

export default OrdersList
