//@ts-nocheck
import React, { useState } from 'react'

import { Button, Row, Col, notification, Divider, Card, Badge, Steps, Avatar, Tooltip } from 'antd'
import moment from 'moment'
import { Order, Seat } from '@/types/orders'
import { Rent } from '@/types/spaces'
import { MappedPaginatorInfo } from '@/utils/data-mappers'

import Pagination from '../ui/pagination'
import ErrorMessage from '../ui/error-message'
import Loader from '../ui/loader/loader'

import { downloadTicket } from '@/data/ordersServices'

import 'moment/locale/es'

// Configura moment para usar el idioma español
moment.locale('es')
type OrdersListProps = {
    orders: Order[] | null | undefined
    paginatorInfo: MappedPaginatorInfo | any
    onPagination: (page: number) => void
    loading: boolean
}

const OrdersList = ({ orders, paginatorInfo, onPagination, loading }: OrdersListProps) => {
    const [fetchingDownloadTicket, setFetchingDownloadTicket] = useState(false)

    console.log(orders)

    const fetchData = async (order: Order) => {
        try {
            setFetchingDownloadTicket(true)
            const response = await downloadTicket(order.id)
            console.log('response', response)
            if (response.error) {
                console.log('error', response)
                notification.error({
                    message: response.error,
                    duration: 5,
                })
            } else {
                notification.success({
                    message: 'Descarga con éxito',
                    description: 'La descarga comenzará de forma automática',
                    duration: 5,
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
                duration: 5,
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
                            {item.seats.length ? (
                                <Row justify={'space-between'} gutter={[8, 8]}>
                                    <Col xs={24} lg={18}>
                                        {item.seats?.map((seat: Seat, index: number) => (
                                            <Row key={seat.id} gutter={[8, 8]}>
                                                <Col xs={24} lg={2}>
                                                    <img className="orderImg" src={seat.EventsSpaces.event.thumbnailUrl} />
                                                </Col>
                                                <Col xs={24} lg={22}>
                                                    <Row justify={'space-between'} gutter={[8, 8]}>
                                                        <Col span={12} className="text-primary-6000 ">
                                                            <strong>Número de asiento:</strong> {seat.name}
                                                        </Col>
                                                        <Col xs={24} lg={12}>
                                                            <strong>Título del evento:</strong> {seat.EventsSpaces.event.title}
                                                        </Col>
                                                        <Col xs={24} lg={12}>
                                                            <strong>Fecha y hora del evento:</strong> {moment(seat.EventsSpaces.startDate).format('dddd D MMMM YYYY').charAt(0).toUpperCase() + moment(seat.EventsSpaces.startDate).format('dddd D MMMM YYYY').slice(1)}
                                                        </Col>
                                                        <Col xs={24} lg={12}>
                                                            <strong>Duración del evento:</strong> {seat.EventsSpaces.event.duration} min
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                {index + 1 < item.seats.length && <Divider />}
                                            </Row>
                                        ))}
                                    </Col>

                                    <Col xs={24} lg={6}>
                                        <Button className="btnPrimary" onClick={() => onDownloadTicket(item)}>
                                            Descargar Boleto
                                        </Button>
                                    </Col>
                                </Row>
                            ) : (
                                false
                            )}
                            
                                    
                                  
                               
                           
                            {item.rents?.length ? (
                                <Row justify={'space-between'} gutter={[8, 8]}>
                                    <Col xs={24} lg={24}>
                                        {item.rents?.map((rent: Rent, index: number) => (
                                            <Row key={rent.id} gutter={[8, 8]}>
                                                <Col xs={24} lg={2}>
                                                    <img className="orderImg" src={rent.space.image} />
                                                </Col>
                                                <Col xs={24} lg={22}>
                                                    <Row justify={'space-between'} gutter={[8, 8]}>
                                                        <Col span={12} className="text-primary-6000 ">
                                                            <strong>Fecha de la renta:</strong> {moment(rent.startDate).format('dddd D MMMM YYYY').charAt(0).toUpperCase() + moment(rent.startDate).format('dddd D MMMM YYYY').slice(1)}
                                                        </Col>
                                                        <Col xs={24} lg={12}>
                                                            <strong>Sala:</strong> {rent.space.name}
                                                        </Col>
                                                        <Col xs={24} lg={12}>
                                                            <strong>Ubicación de la sala:</strong> {rent.space.location}
                                                        </Col>
                                                        <Col xs={24} lg={12}>
                                                            <strong>Capacidad de la sala:</strong> {rent.space.capacity}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                {index + 1 < item.rents.length && <Divider />}
                                            </Row>
                                        ))}
                                    </Col>

                                    {/* <Col xs={24} lg={6}>
                                        <Button className="btnPrimary" onClick={() => onDownloadTicket(item)}>
                                            Descargar Boleto
                                        </Button>
                                    </Col> */}
                                </Row>
                            ) : (
                                false
                            )}
                            {item.products?.length ? (
                                <Row justify={'space-between'} gutter={[8, 8]}>
                                    <Col xs={24} lg={24}>
                                        {item.products?.map((product: Rent, index: number) => (
                                            <Row key={product.id} gutter={[8, 8]}>
                                                <Col xs={24} lg={2}>
                                                    <img className="orderImg" src={product.product.thumbnailUrl} />
                                                </Col>
                                                <Col xs={24} lg={22}>
                                                    <Row className='lg:flex lg:justify-center lg:items-center '>
                                                        <Col span={12} className="text-primary-6000 lg:text-2xl">
                                                            <strong>Fecha de compra:</strong> {moment(product.startDate).format('dddd D MMMM YYYY').charAt(0).toUpperCase() + moment(product.startDate).format('dddd D MMMM YYYY').slice(1)}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                {index + 1 < item.products.length && <Divider />}
                                            </Row>
                                        ))}
                                    </Col>

                                    {/* <Col xs={24} lg={6}>
                                        <Button className="btnPrimary" onClick={() => onDownloadTicket(item)}>
                                            Descargar Boleto
                                        </Button>
                                    </Col> */}
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
