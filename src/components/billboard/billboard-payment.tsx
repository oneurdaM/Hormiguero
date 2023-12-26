'use client'
import React, { useState } from 'react'
import { Row, Col, notification, Card } from 'antd'
import Loader from '../ui/loader/loader'
import { buySeat } from '@/data/billboardServices'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

const BillboardPayment = (props: any) => {
    const [fetchingPayment, setFetchingPayment] = useState(false)

    const [{ isPending }] = usePayPalScriptReducer()

    console.log('props :>> ', props)
    const [api, contextHolder] = notification.useNotification()
    const fetchData = async (seatsSelected: any) => {
        try {
            setFetchingPayment(true)
            let response: any = {}
            response = await buySeat(seatsSelected, props.details)
            console.log('response', response)
            setFetchingPayment(false)
            if (response.error) {
                api.error({
                    message: response.error,
                })
            } else {
                props.onChildrenDrawerClose(true)
            }
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error,
            })
        }
    }

    const paymentCanceled = () => {
        api.warning({
            message: 'Pago cancelado',
            description: 'El pago no se pudo efectuar, favor de reintentar',
        })
    }
    const paymentApproved = () => {
        console.log('paypal  success', props.seatsSelected)
        fetchData(props.seatsSelected)
    }
    console.log('isPending', isPending)
    return (
        <>
            {contextHolder}
            {!fetchingPayment || isPending ? (
                <Row justify="space-between">
                    <Col xs={24} lg={16}>
                        <Row justify="space-around">
                            <Col span={24} className="text-xl">
                                <p>
                                    <strong className="text-primary-6000 ">Elige tu método de pago</strong>
                                    <br />
                                    <br />
                                </p>
                            </Col>
                            <Col xs={24} lg={12}>
                                <PayPalButtons
                                    style={{ color: 'blue', layout: 'vertical', shape: 'pill', tagline: false }}
                                    createOrder={async () => {
                                        const res = await fetch('/api/paypal', {
                                            method: 'POST',
                                            body: JSON.stringify({
                                                details: props.details,
                                                seatsSelected: props.seatsSelected,
                                            }),
                                        })
                                        const order = await res.json()
                                        return order.id
                                    }}
                                    onApprove={async (data, actions) => {
                                        console.log(data)
                                        await actions.order?.capture()
                                        paymentApproved()
                                    }}
                                    onCancel={() => {
                                        paymentCanceled()
                                    }}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} lg={8}>
                        <br />
                        <br />
                        <Card className="cardEvent dark:cardEventDark dark:bg-gray-500 dark:text-white" bordered={false}>
                            <Row justify={'end'}>
                                <Col span={16} className="text-xl text-left">
                                    <p>
                                        <strong className="text-primary-6000">Cantidad de asientos: </strong>
                                    </p>
                                    <p>
                                        <strong className="text-primary-6000">Subtotal: </strong>
                                    </p>
                                    <br />
                                </Col>
                                <Col span={8} className="text-xl text-right">
                                    <p>{props.details?.quantity ? props.details.quantity : 0}</p>
                                    <p>${props.details?.subtotal ? props.details.subtotal : 0}</p>
                                    <br />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Loader text="Cargando..." />
            )}
        </>
    )
}

export default BillboardPayment
