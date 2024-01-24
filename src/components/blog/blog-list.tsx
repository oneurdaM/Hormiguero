'use client'
import React from 'react'

import { Note } from '@/types/blog'
import { MappedPaginatorInfo } from '@/utils/data-mappers'

import NoteCard from './note-card'
import Pagination from '../ui/pagination'
import ErrorMessage from '../ui/error-message'
import Loader from '../ui/loader/loader'

type NotesListProps = {
  notes: Note[] | null | undefined
  paginatorInfo: MappedPaginatorInfo | any
  onPagination: (page: number) => void
  loading: boolean
}

const BlogList = ({
  notes,
  paginatorInfo,
  onPagination,
  loading,
}: NotesListProps) => {

  if (paginatorInfo?.total === 0 && !loading) {
    return (
      <ErrorMessage message="Aún no hay ninguna nota o artículo para mostrar" />
    )
  }
  
  if (loading) {
    return <Loader text="Cargando..." />
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notes?.map((item) => (
          <NoteCard
            key={item.slug}
            title={item.title}
            href={`/blog/${item.slug}`}
            image={item.image}
            content={item.content}
            createdAt={item.createdAt}
            author={`${item?.user?.firstName} ${item?.user?.lastName}`}
            category={item?.category?.name ?? 'No category'}
          />
        ))}
      </div>

      <div className="flex items-center justify-end my-4">
        {!!paginatorInfo?.total && (
          <Pagination
            total={parseInt(paginatorInfo.total.toString())}
            current={parseInt(paginatorInfo.currentPage.toString())}
            pageSize={parseInt(paginatorInfo.perPage.toString())}
            onChange={onPagination}
            className="text-light"
          />
        )}
      </div>
    </>
  )
}

export default BlogList
