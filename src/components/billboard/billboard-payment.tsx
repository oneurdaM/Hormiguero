'use client'
import React, { useState } from 'react'
import { Row, Col, notification, Card } from 'antd'
import Loader from '../ui/loader/loader'
import { SeatResponse } from '@/types/billboard'
import { buySeat } from '@/data/billboardServices'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

const BillboardPayment = (props: any) => {
    const [fetchingPayment, setFetchingPayment] = useState(false)
    const [paymentResponse, setPaymentResponse] = useState<SeatResponse>({
        seatsResponse: [],
        error: '',
    })

    const [api, contextHolder] = notification.useNotification()
    const fetchData = async (seatsSelected: any) => {
        try {
            setFetchingPayment(true)
            for (let i in seatsSelected) {
                const response = await buySeat(seatsSelected[i].id)
                console.log('reponse', response)
                setPaymentResponse(response)
            }
            setFetchingPayment(false)
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error,
            })
            setPaymentResponse({ seatsResponse: [], error: '' })
        }
    }

    if (paymentResponse.error) {
        api.error({
            message: 'Error',
            description: 'El pago no se pudo efectuar, favor de reintentar',
        })
    }

    const paymentCanceled = () => {
        api.error({
            message: 'Error',
            description: 'El pago no se pudo efectuar, favor de reintentar',
        })
    }
    const paymentApproved = () => {
        console.log('paypal  success', props.seatsSelected)
        fetchData(props.seatsSelected)
        props.onChildrenDrawerClose(true)
    }

    return (
        <>
            {contextHolder}
            {!fetchingPayment ? (
                <Row justify="space-between">
                    <Col span={16}>
                        <Row justify="space-around">
                            <Col span={24} className="text-xl">
                                <p>
                                    <strong className="text-primary-6000 ">Elige tu método de pago</strong>
                                    <br />
                                    <br />
                                </p>
                            </Col>
                            <Col xs={24} lg={12}>
                                <PayPalScriptProvider options={{ clientId: 'AfPMP9UGMMHatFve1JsJ2VWoSK13mDnXa8EFrPOlFGLSANnFYfJ8u2mWZ5KRHVF-SgF29HgR68IZ-BGS', currency: 'MXN' }}>
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
                                            console.log(order)
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
                                </PayPalScriptProvider>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Row justify={'end'}>
                                <Col span={24} className="text-xl text-right">
                                    <p>
                                        <strong className="text-primary-6000 ">Cantidad de asientos: </strong>
                                        {props.details?.quantity ? props.details.quantity : 0}
                                    </p>
                                    <p>
                                        <strong className="text-primary-6000 ">Subtotal: </strong>${props.details?.subtotal ? props.details.subtotal : 0}
                                    </p>
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
