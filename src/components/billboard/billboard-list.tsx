'use client'
import React from 'react'

import { Billboard } from '@/types/billboard'
import { MappedPaginatorInfo } from '@/utils/data-mappers'

import BillboardCard from './billboard-card'
import Pagination from '../ui/pagination'
import ErrorMessage from '../ui/error-message'
import Loader from '../ui/loader/loader'

type BillboardListProps = {
    billboards: Billboard[] | null | undefined
    paginatorInfo: MappedPaginatorInfo | any
    onPagination: (page: number) => void
    loading: boolean
}

const BillboardList = ({ billboards, paginatorInfo, onPagination, loading }: BillboardListProps) => {
    if (paginatorInfo?.total === 0 && !loading) {
        return <ErrorMessage message="Aún no hay ningún evento para mostrar" />
    }

    if (loading) {
        return <Loader text="Cargando..." />
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {billboards?.map((item) => (
                    <BillboardCard event={item} key={item.id} />
                ))}
            </div>

            <div className="flex items-center justify-end my-4">{!!paginatorInfo?.total && <Pagination total={parseInt(paginatorInfo.total.toString())} current={parseInt(paginatorInfo.currentPage.toString())} pageSize={parseInt(paginatorInfo.perPage.toString())} onChange={onPagination} className="text-light" />}</div>
        </>
    )
}

export default BillboardList
