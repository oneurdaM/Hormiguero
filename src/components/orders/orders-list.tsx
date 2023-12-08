'use client'
import React, { useState } from 'react'

import { Button, Row, Col, notification, Divider, Card, Badge, Steps, Avatar, Tooltip } from 'antd'
import moment from 'moment'
import { Order, Seat } from '@/types/orders'
import { MappedPaginatorInfo } from '@/utils/data-mappers'

import Pagination from '../ui/pagination'
import ErrorMessage from '../ui/error-message'
import Loader from '../ui/loader/loader'

import { downloadTicket } from '@/data/ordersServices'

type OrdersListProps = {
    orders: Order[] | null | undefined
    paginatorInfo: MappedPaginatorInfo | any
    onPagination: (page: number) => void
    loading: boolean
}

const OrdersList = ({ orders, paginatorInfo, onPagination, loading }: OrdersListProps) => {
    const [fetchingDownloadTicket, setFetchingDownloadTicket] = useState(false)

    const [api, contextHolder] = notification.useNotification()

    const fetchData = async (order: Order) => {
        try {
            setFetchingDownloadTicket(true)
            const response = await downloadTicket(order.id)
            console.log('response', response)
            if (response.error) {
                console.log('error', response)
                notification.error({
                    message: response.error,
                })
            } else {
                notification.success({
                    message: 'Descarga con éxito',
                    description: 'La descarga comenzará de forma automática',
                })
                const url = window.URL.createObjectURL(new Blob([response.downloadTicket]))
                const link = document.createElement('a')
                link.href = url
                link.download = order.payment.name + '.pdf'

                document.body.appendChild(link)
                link.click()

                console.log('success')
            }
            setFetchingDownloadTicket(false)
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error,
            })
        }
    }
    if (paginatorInfo?.total === 0 && !loading) {
        return <ErrorMessage message="Aún no hay ninguna orden para mostrar" />
    }

    if (loading || fetchingDownloadTicket) {
        return <Loader text="Cargando..." />
    }
    console.log('orders', orders)

    const onDownloadTicket = (order: Order) => {
        console.log('order', order)
        fetchData(order)
    }

    return (
        <>
            {contextHolder}
            <Row justify={'space-around'} gutter={[8, 8]}>
                {orders?.map((item) => (
                    <Col span={24} key={item.id}>
                        <Card
                            title={
                                <Row justify={'space-between'} gutter={[8, 8]}>
                                    <Col xs={16} lg={7}>
                                        <Row>
                                            <Col span={24}>
                                                <p className="text-primary-6000 ">Compra realizada</p>
                                            </Col>
                                            <Col span={24}>{moment(item.payment.createdAt).format('dddd D MMMM YYYY').charAt(0).toUpperCase() + moment(item.payment.createdAt).format('dddd D MMMM YYYY').slice(1)}</Col>
                                        </Row>
                                    </Col>
                                    <Col xs={8} lg={4}>
                                        <Row>
                                            <Col span={24}>
                                                <p className="text-primary-6000 ">Total</p>
                                            </Col>
                                            <Col span={24}>${item.payment.total}</Col>
                                        </Row>
                                    </Col>

                                    <Col xs={16} lg={7}>
                                        <Row>
                                            <Col span={24}>
                                                <p className="text-primary-6000 ">Nombre</p>
                                            </Col>
                                            <Col span={24}>{item.payment.name}</Col>
                                        </Row>
                                    </Col>
                                    <Col xs={8} lg={4}>
                                        <Row>
                                            <Col span={24}>
                                                <p className="text-primary-6000 ">Método pago</p>
                                            </Col>
                                            <Col span={24}>{item.payment.method}</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            }
                            className="cardEvent dark:cardEventDark dark:bg-gray-500 dark:text-white"
                            bordered={false}
                        >
                            {item.seats.length && (
                                <Row justify={'space-between'} gutter={[8, 8]}>
                                    <Col xs={24} lg={18}>
                                        {item.seats?.map((seat: Seat) => (
                                            <Row key={seat.id}>
                                                <Col span={24}>Número de asiento: {seat.name}</Col>
                                            </Row>
                                        ))}
                                    </Col>

                                    <Col xs={24} lg={6}>
                                        <Button className="btnPrimary" onClick={() => onDownloadTicket(item)}>
                                            Descargar Boleto
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                            {item.products.length ? (
                                <Row justify={'space-between'} gutter={[8, 8]}>
                                    <Col xs={24} lg={18}>
                                        {item.seats?.map((seat: Seat) => (
                                            <Row key={seat.id}>
                                                <Col span={24}>{seat.id}</Col>
                                            </Row>
                                        ))}
                                    </Col>

                                    <Col xs={24} lg={6}>
                                        <Button className="btnPrimary">PRODUCTS</Button>
                                    </Col>
                                </Row>
                            ) : (
                                false
                            )}
                            {item.rents?.length ? (
                                <Row justify={'space-between'} gutter={[8, 8]}>
                                    <Col xs={24} lg={18}>
                                        {item.seats?.map((seat: Seat) => (
                                            <Row key={seat.id}>
                                                <Col span={24}>{seat.id}</Col>
                                            </Row>
                                        ))}
                                    </Col>

                                    <Col xs={24} lg={6}>
                                        <Button className="btnPrimary">RENTS</Button>
                                    </Col>
                                </Row>
                            ) : (
                                false
                            )}
                        </Card>
                        <br />
                    </Col>
                ))}
            </Row>

            <div className="flex items-center justify-end my-4">{!!paginatorInfo?.total && <Pagination total={parseInt(paginatorInfo.total.toString())} current={parseInt(paginatorInfo.currentPage.toString())} pageSize={parseInt(paginatorInfo.perPage.toString())} onChange={onPagination} className="text-light" />}</div>
        </>
    )
}

export default OrdersList
