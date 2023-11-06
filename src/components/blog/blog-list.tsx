'use client'
import React from 'react'

import { Note } from '@/types/blog'
import { MappedPaginatorInfo } from '@/utils/data-mappers'

import NoteCard from './note-card'
import Pagination from '../ui/pagination'

type NotesListProps = {
  notes: Note[] | null | undefined
  paginatorInfo: MappedPaginatorInfo | any
  onPagination: (page: number) => void
}

const BlogList = ({ notes, paginatorInfo, onPagination }: NotesListProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes?.map((item) => (
          <NoteCard
            key={item.slug}
            title={item.title}
            href={`/blog/${item.slug}`}
            image={item.image}
            content={item.content}
            createdAt={item.createdAt}
            author={item.createdBy}
            category={item.category_id ?? 'No category'}
          />
        ))}
      </div>

      <div className="flex items-center justify-end my-4">
        <Pagination
          total={parseInt(paginatorInfo.total.toString())}
          current={parseInt(paginatorInfo.currentPage.toString())}
          pageSize={parseInt(paginatorInfo.perPage.toString())}
          onChange={onPagination}
          className="text-light"
        />
      </div>
    </>
  )
}

export default BlogList
