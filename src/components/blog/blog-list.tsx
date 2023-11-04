'use client'
import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
import Image from 'next/image'

import { Note } from '@/types/blog'
import { MappedPaginatorInfo } from '@/utils/data-mappers'
import 'moment/locale/es'
import moment from 'moment'

import Card from '../common/card'
import Pagination from '../ui/pagination'
// import { Card, Row, Col, Input, Spin } from 'antd'
// import { SearchOutlined } from '@ant-design/icons'

// import { getBlogs } from '../../data/services/blogServices'

// const { Meta } = Card
// interface DataBlog {
//   content: string
//   createdAt: string
//   createdBy: number
//   id: number
//   image: string
//   slug: string
//   title: string
// }

type NotesListProps = {
  notes: Note[] | null | undefined
  paginatorInfo: MappedPaginatorInfo | null
  onPagination: (page: number) => void
}

const BlogList = ({ notes, paginatorInfo, onPagination }: NotesListProps) => {
  // const [listBlog, setListBlog] = useState<DataBlog[]>([])
  // const [listBlogFetching, setListBlogFetching] = useState(false)
  // const [params, setParams] = useState({ page: 1, limit: 10, search: '' })

  // const fetchData = async (params: any) => {
  //   setListBlogFetching(true)
  //   try {
  //     const response: any = await getBlogs(params)
  //     console.log('listBlog', response)
  //     setListBlog(response.data.notes)
  //     setListBlogFetching(false)
  //   } catch (error) {
  //     console.error('Error al cargar los datos', error)
  //     setListBlogFetching(false)
  //   }
  // }

  // useEffect(() => {
  //   fetchData({ page: 1, limit: 10, search: '' })
  // }, [])

  // const onSearchBlog = (value: any) => {
  //   const param = params
  //   param.search = value.target.value
  //   fetchData(param)
  //   setParams(param)
  // }

  // const getBlogSlug = (value: any) => {
  //   console.log('getBlogSlug', value)
  // }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes?.map((item) => (
          <Card key={`note-id-${item.id}`} className="my-4">
            <Image
              src={item.image}
              alt={item.title}
              className="rounded-tl rounded-tr aspect-[500/300] object-cover"
              width={500}
              height={300}
            />
            <div className="p-5">
              <div>
                <small className="text-dark">{item.category_id}</small>
              </div>
              <h5 className="text-dark line-clamp-1">{item.title}</h5>
              <p className="text-body line-clamp-2">{item.content}</p>
              <div className="card-footer">
                <small className="text-muted">
                  Públicado {moment(item.createdAt).startOf('minute').fromNow()}{' '}
                  | Por {item.createdBy}
                </small>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {/* <Spin spinning={listBlogFetching}>
      <Row
        justify="space-around"
        className="h-auto min-h-screen"
        gutter={[8, 8]}
      >
        <Col span={23}>
          <Input
            className="buscarModulos"
            placeholder="Ingresa nota a buscar"
            onPressEnter={onSearchBlog}
            style={{ width: '100%' }}
            suffix={<SearchOutlined />}
          />
        </Col>
        <Col span={23}>
          <br />
          {listBlog.length > 0 && listBlog ? (
            <Row justify="start" gutter={[8, 8]}>
              {listBlog.map((item, index) => (
                <Col key={index} xs={24} md={12} lg={6}>
                  <Link href={`/blog/${item.slug}`}>
                    <Card
                      loading={listBlogFetching}
                      hoverable
                      style={{ width: 240 }}
                      cover={
                        <Image
                          alt="blog-image"
                          src={
                            item.image
                              ? 'https://sissadigital.com/static/media/logotipo_SISSA_DIGITAL.68f9bed3b3b2d0a94e9fe742551d8e7a.svg'
                              : 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                          }
                        //   sizes="(max-width: 400px) 100vw, 400px"
                        width={100}
                        height={100}
                        />
                      }
                      onClick={() => getBlogSlug(item)}
                    >
                      <Meta
                        title={item.title}
                        description={
                          <>
                            <p>{item.content}</p>
                            <br />
                            <span className="flex justify-end">
                              {' '}
                              {moment(item.createdAt)
                                .startOf('minute')
                                .fromNow()}
                            </span>
                          </>
                        }
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          ) : (
            <Row justify="space-around" gutter={[8, 8]}>
              <Col xs={24} md={12} lg={6}>
                <Card hoverable loading />
              </Col>
              <Col xs={24} md={12} lg={6}>
                <Card hoverable loading />
              </Col>
              <Col xs={24} md={12} lg={6}>
                <Card hoverable loading />
              </Col>
              <Col xs={24} md={12} lg={6}>
                <Card hoverable loading />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Spin> */}
      <div className="flex items-center justify-end my-4">
        <Pagination
          total={paginatorInfo?.total}
          current={paginatorInfo?.currentPage}
          pageSize={paginatorInfo?.perPage}
          onChange={onPagination}
          className="text-light"
        />
      </div>
    </div>
  )
}

export default BlogList
