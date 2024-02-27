'use client'
import React from 'react'

import { Billboard } from '@/types/billboard'
import { MappedPaginatorInfo } from '@/utils/data-mappers'

import BillboardCard from './billboard-card'
import Pagination from '../ui/pagination'
import ErrorMessage from '../ui/error-message'
import Loader from '../ui/loader/loader'

type BillboardListProps = {
    billboardsSocial: Billboard[] | null | undefined
    paginatorInfoSocial: MappedPaginatorInfo | any
    onPaginationSocial: (page: number) => void
    loadingSocial: boolean

    billboards: Billboard[] | null | undefined
    paginatorInfo: MappedPaginatorInfo | any
    onPagination: (page: number) => void
    loading: boolean
}

const BillboardList = ({ billboardsSocial, paginatorInfoSocial, onPaginationSocial, loadingSocial, billboards, paginatorInfo, onPagination, loading }: BillboardListProps) => {
    if (paginatorInfo?.total === 0 && !loading) {
        return <ErrorMessage message="Aún no hay ningún evento para mostrar" />
    }

    if (loading) {
        return <Loader text="Cargando..." />
    }

    return (
        <>
            <div>
                <span className="text-white text-xl font-bold">Eventos</span>
                <div className="w-full border-white dark:border-white border-solid border-[1px] " />

                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    {billboards?.map((item) => (
                        <BillboardCard event={item} key={item.id} />
                    ))}
                </div>

                <div className="flex items-center justify-end my-4">{!!paginatorInfo?.total && <Pagination total={paginatorInfo.total} current={paginatorInfo.currentPage} pageSize={paginatorInfo.perPage} onChange={onPagination} className="text-light" />}</div>
            </div>



{/* social */}

            <div>
                <span className="text-white text-xl font-bold">Eventos sociales</span>
                <div className="w-full border-white dark:border-white border-solid border-[1px] " />

                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    {billboardsSocial?.map((item) => (
                        <BillboardCard event={item} key={item.id} />
                    ))}
                </div>

                <div className="flex items-center justify-end my-4">{!!paginatorInfoSocial?.total && <Pagination total={paginatorInfoSocial.total} current={paginatorInfoSocial.currentPage} pageSize={paginatorInfoSocial.perPage} onChange={onPaginationSocial} className="text-light" />}</div>
            </div>
        </>
    )
}

export default BillboardList
