'use client'

import React, { useEffect, useState } from 'react'
import { getBlogs } from '../../data/services/blogServices'
import Link from 'next/link'
import { Card, Row, Col, Input, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'moment'
import 'moment/locale/es'

const { Meta } = Card
interface DataBlog {
    content: string
    createdAt: string
    createdBy: number
    id: number
    image: string
    slug: string
    title: string
}

const BlogList: React.FC = () => {
    const [listBlog, setListBlog] = useState<DataBlog[]>([])
    const [listBlogFetching, setListBlogFetching] = useState(false)
    const [params, setParams] = useState({ page: 1, limit: 10, search: '' })
    const fetchData = async (params: any) => {
        setListBlogFetching(true)
        try {
            const response: any = await getBlogs(params)
            console.log('listBlog', response)
            setListBlog(response.data.notes)
            setListBlogFetching(false)
        } catch (error) {
            console.error('Error al cargar los datos', error)
            setListBlogFetching(false)
        }
    }

    useEffect(() => {
        fetchData({ page: 1, limit: 10, search: '' })
    }, [])

    const onSearchBlog = (value: any) => {
        console.log('onSearchBlog', value.target.value)
        const param = params
        param.search = value.target.value
        fetchData(param)
        setParams(param)
    }
    const getBlogSlug = (value: any) => {
        console.log('getBlogSlug', value)
    }

    return (
        <Spin spinning={listBlogFetching}>
            <Row justify="space-around" gutter={[8, 8]}>
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
                                                <img
                                                    alt="example"
                                                    src={
                                                        item.image
                                                            ? 'https://sissadigital.com/static/media/logotipo_SISSA_DIGITAL.68f9bed3b3b2d0a94e9fe742551d8e7a.svg'
                                                            : 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                                                    }
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
                                                            {moment(
                                                                item.createdAt
                                                            )
                                                                .startOf(
                                                                    'minute'
                                                                )
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
        </Spin>
    )
}

export default BlogList
