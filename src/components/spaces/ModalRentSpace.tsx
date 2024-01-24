'use client'
//@ts-nocheck

import React, { useState } from 'react'
import { Modal, Row, Col, DatePicker, Form, Button, Card, Divider, notification, Spin, Tooltip, Avatar, Input, InputNumber } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'
import { MinusCircleOutlined, PlusOutlined, FullscreenOutlined, UsergroupAddOutlined, EnvironmentOutlined, DollarOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import moment, { Moment } from 'moment'
import 'moment/locale/es'
import { getAvailabilitySpaces, rentSpace } from '@/data/rentServices'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Loader from '../ui/loader/loader'

function ModalRentSpaces(props: any) {
    const [api, contextHolder] = notification.useNotification()
    const [fetchingPayment, setFetchingPayment] = useState(false)
    const [{ isPending }] = usePayPalScriptReducer()

    const [rentDays, setRentDays] = useState([])
    const [fetchingRents, setFetchingAvailability] = useState(false)
    const [form, setForm] = useState()

    const disableSchedule = (current: Moment | null) => {
        if (!current) {
            return {}
        }

        const day = current?.day()
        let hourFalse: number[] = []
        switch (day) {
            case 0:
                hourFalse = [11, 12, 13, 14, 15, 16, 17, 18, 19]

                break
            case 1:
                hourFalse = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

                break
            case 2:
                hourFalse = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]

                break
            case 3:
                hourFalse = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]

                break
            case 4:
                hourFalse = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]

                break
            case 5:
                hourFalse = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]

                break
            case 6:
                hourFalse = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

                break

            default:
                break
        }

        let hoursToAdd: number[] = []
        let minutesAdd: number[] = []
        for (let i = 0; i < 60; i++) {
            if (!hourFalse.includes(i)) {
                hoursToAdd.push(i)
            }
            if(i !== 0){
                minutesAdd.push(i)

            }

        }

        // Deshabilita todos los minutos
        return {
            disabledHours: () => hoursToAdd,
            disabledMinutes: ()=>minutesAdd
        }
    }
    const fetchData = async (days: any) => {
       
        try {
            setFetchingAvailability(true)
            let response: any = {}
            let isAvailable: boolean = false
            for (let i in days) {
                response = await getAvailabilitySpaces(days[i].day.format('YYYY-MM-DD HH:00'), props.spaceSelected.id, days[i].duration)
                console.log('response', response)
                setFetchingAvailability(false)
                if (response.error) {
                    api.error({
                        message: response.error + ' para el día y la hora ' + days[i].day.format('DD-MM-YYYY HH:00'),
                    })
                    return
                } else {
                    isAvailable = response.isAvailable
                }
            }
            if (isAvailable) {
                api.success({
                    message: days.length > 1 ? 'Las fechas seleccionadas están disponibles' : 'La fecha seleccionada está disponible',
                })
                setForm(days)
            }
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error,
            })
        }
    }

    const fetchPayment = async (spaceSelected: any) => {
        try {
            setFetchingPayment(true)
            let response: any = {}
            response = await rentSpace(spaceSelected, form)
            console.log('response', response)
            setFetchingPayment(false)
            if (response.error) {
                api.error({
                    message: response.error,
                })
            } else {
                notification.success({
                    message: 'La compra se realizó de forma correcta',
                    description: 'Se hizo la reserva del espacio "' + spaceSelected.name + '"',
                })
                setRentDays([])
                setForm(undefined)
                props.fetchDataCalendar(moment())
                props.showRent(props.showModalMobile)
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
        console.log('paypal  success', props.spaceSelected)
        fetchPayment(props.spaceSelected)
    }

    const modalStyles = {
        header: {
            borderLeft: `5px solid #56aec4`,
            borderRadius: 0,
            paddingInlineStart: 5,
        },
        body: {
            // boxShadow: 'inset 0 0 5px #999',
            borderRadius: 5,
        },
        mask: {
            backdropFilter: 'blur(10px)',
        },
        footer: {
            borderTop: '0px solid #333',
        },
        content: {
            boxShadow: '0 0 30px #999',
        },
    }

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf('day')
    }

    const onChangeDate = (fields: any, selected: any) => {
        console.log('fields', fields, selected)
        if (selected) {
            const resultado = fields.filter((rent: any) => rent.key != selected.fieldKey)
            console.log('resultado', resultado)
            fields = resultado
        }
        setRentDays(fields)
    }
    const onFinish = (values: any) => {
        console.log('Received values of form:', values)
         fetchData(values.rent)
    }
    return (
        <>
            <Modal destroyOnClose width={props.showModalMobile ? '100%' : '70%'} title={<p className="text-xl text-primary-6000 dark:text-white">{'Renta de Espacio: ' + props.spaceSelected?.name}</p>} onCancel={() => (props.showRent(props.showModalMobile), setRentDays([]), setForm(undefined))} open={props.showModalRentSpace} footer={false} styles={modalStyles} classNames={{ body: 'dark:backgroundDrawerNigth backgroundDrawerModal', header: 'dark:backgroundDrawerNigthHeader' }}>
                {contextHolder}
                <Spin spinning={fetchingRents || fetchingPayment}>
                    {!form ? (
                        <Form name="form" onFinish={onFinish} autoComplete="off" initialValues={{ rent: [{}] }}>
                            <Row justify="space-between" gutter={[12, 12]} style={{ padding: '1em' }}>
                                <Col xs={24}>
                                    {' '}
                                    <Row justify="center">
                                        <Col className="text-lg text-primary-6000 line-clamp-1">
                                            <p>
                                                <FullscreenOutlined />
                                                {' ' + props.spaceSelected?.dimensions + 'm²'}
                                            </p>
                                        </Col>
                                        <Col>
                                            <Divider type="vertical" className="dark:text-white text-lg font-black text-primary-6000 " />
                                        </Col>
                                        <Col className="text-lg text-primary-6000 line-clamp-1">
                                            <p>
                                                <UsergroupAddOutlined />
                                                {' ' + props.spaceSelected?.capacity + ' capacidad'}
                                            </p>
                                        </Col>
                                        <Col>
                                            <Divider type="vertical" className="dark:text-white text-lg font-black text-primary-6000 " />
                                        </Col>
                                        <Col className="text-lg text-primary-6000 line-clamp-1">
                                            <p>
                                                <EnvironmentOutlined />
                                                {' ' + props.spaceSelected?.location}
                                            </p>
                                        </Col>
                                        <Col>
                                            <Divider type="vertical" className="dark:text-white text-lg font-black text-primary-6000 " />
                                        </Col>
                                        <Col className="text-lg text-primary-6000 line-clamp-1">
                                            <p>
                                                <DollarOutlined />
                                                {' $' + props.spaceSelected?.price + ' por día'}
                                            </p>
                                        </Col>
                                        <Col span={24}>
                                            <Divider className="dark:text-white text-6xl font-black " />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={24} lg={16}>
                                    <Col span={24}>
                                        <img src={props.spaceSelected?.image} alt={props.spaceSelected?.name} style={{ width: '100%', maxHeight: '16em', borderRadius: ' 1.5em' }} className="object-cover" />
                                    </Col>
                                    <Col span={24}>
                                        <Divider orientation="left">
                                            <p className="text-xl text-primary-6000 ">Reservar</p>
                                        </Divider>
                                    </Col>{' '}
                                    <Form.List name="rent">
                                        {(fields, { add, remove }) => (
                                            <Row justify="space-between" gutter={[8, 8]}>
                                                <Col span={24}>
                                                    {fields.map(({ key, name, ...restField }) => (
                                                        <Row key={key} justify="space-between" gutter={[8, 8]}>
                                                            <Col span={15}>
                                                                <Form.Item {...restField} name={[name, 'day']} rules={[{ required: true, message: 'Selecciona una fecha' }]}>
                                                                    <DatePicker disabledTime={(current: any) => disableSchedule(current)} showTime={{ format: 'HH:mm'}} format="YYYY-MM-DD HH:mm" onChange={() => onChangeDate(fields, false)} showToday={false} disabledDate={disabledDate} style={{ width: '100%' }} />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={7}>
                                                                <Form.Item {...restField} name={[name, 'duration']} rules={[{ required: true, message: 'Escribe una duración' }]}>
                                                                    <InputNumber placeholder='Escribe una duración'  className='w-full'/>
                                                                </Form.Item>
                                                            </Col>

                                                            <Col span={2}>
                                                                <MinusCircleOutlined onClick={() => (remove(name), onChangeDate(fields, restField))} />
                                                            </Col>
                                                        </Row>
                                                    ))}
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item>
                                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                            Nueva fecha para reservar
                                                        </Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        )}
                                    </Form.List>
                                </Col>
                                <Col xs={24} lg={8}>
                                    <Card className="cardEvent dark:cardEventDark dark:bg-gray-500 dark:text-white" bordered={false}>
                                        <Row justify={'end'}>
                                            <Col span={16} className="text-xl text-left">
                                                <p>
                                                    <strong className="text-primary-6000">Cantidad de días: </strong>
                                                </p>
                                                <p>
                                                    <strong className="text-primary-6000">Subtotal: </strong>
                                                </p>
                                                <br />
                                            </Col>
                                            <Col span={8} className="text-xl text-right">
                                                <p>{rentDays?.length ? rentDays?.length : 0}</p>
                                                <p>${rentDays?.length ? rentDays?.length * props.spaceSelected?.price : 0}</p>
                                                <br />
                                            </Col>
                                            <Col span={24}>
                                                <Button className="btnPrimary" htmlType="submit">
                                                    Validar fechas y proceder al pago
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        </Form>
                    ) : (
                        <Row justify="space-between" gutter={[12, 12]} style={{ padding: '1em' }}>
                            <Col xs={24}>
                                {' '}
                                <Row justify="center">
                                    <Col className="text-lg text-primary-6000 line-clamp-1">
                                        <p>
                                            <FullscreenOutlined />
                                            {' ' + props.spaceSelected?.dimensions + 'm²'}
                                        </p>
                                    </Col>
                                    <Col>
                                        <Divider type="vertical" className="dark:text-white text-lg font-black text-primary-6000 " />
                                    </Col>
                                    <Col className="text-lg text-primary-6000 line-clamp-1">
                                        <p>
                                            <UsergroupAddOutlined />
                                            {' ' + props.spaceSelected?.capacity + ' capacidad'}
                                        </p>
                                    </Col>
                                    <Col>
                                        <Divider type="vertical" className="dark:text-white text-lg font-black text-primary-6000 " />
                                    </Col>
                                    <Col className="text-lg text-primary-6000 line-clamp-1">
                                        <p>
                                            <EnvironmentOutlined />
                                            {' ' + props.spaceSelected?.location}
                                        </p>
                                    </Col>
                                    <Col>
                                        <Divider type="vertical" className="dark:text-white text-lg font-black text-primary-6000 " />
                                    </Col>
                                    <Col className="text-lg text-primary-6000 line-clamp-1">
                                        <p>
                                            <DollarOutlined />
                                            {' $' + props.spaceSelected?.price + ' por día'}
                                        </p>
                                    </Col>
                                    <Col span={24}>
                                        <Divider className="dark:text-white text-6xl font-black " />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={24} lg={16}>
                                <Col span={24}>
                                    <img src={props.spaceSelected?.image} alt={props.spaceSelected?.name} style={{ width: '100%', maxHeight: '16em', borderRadius: ' 1.5em' }} className="object-cover" />
                                </Col>
                                <Col span={24}>
                                    <Divider orientation="left">
                                        <p className="text-xl text-primary-6000 ">Reservar</p>
                                    </Divider>
                                </Col>{' '}
                                <Row justify="space-around">
                                    <Col span={24} className="text-xl">
                                        <p>
                                            <strong className="text-primary-6000 ">Elige tu método de pago</strong>
                                            <br />
                                            <br />
                                        </p>
                                    </Col>
                                    <Col xs={24}>
                                        {/* {isPending ? (
                                            <Loader text="Cargando..." />
                                        ) : ( */}
                                        <PayPalButtons
                                            style={{ color: 'blue', layout: 'vertical', shape: 'pill', tagline: false }}
                                            createOrder={async () => {
                                                const res = await fetch('/api/paypalRent', {
                                                    method: 'POST',
                                                    body: JSON.stringify({
                                                        details: props.spaceSelected,
                                                        daysRent: form,
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
                                        {/* )} */}
                                    </Col>
                                    <Col>
                                        <Tooltip placement="top" title={'Anterior'}>
                                            <Avatar className="avatarHover" style={{ backgroundColor: '#0b7e8b' }} size={40} onClick={() => (setRentDays([]), setForm(undefined))}>
                                                <ArrowLeftOutlined />
                                            </Avatar>
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={24} lg={8}>
                                <Card className="cardEvent dark:cardEventDark dark:bg-gray-500 dark:text-white" bordered={false}>
                                    <Row justify={'end'}>
                                        <Col span={16} className="text-xl text-left">
                                            <p>
                                                <strong className="text-primary-6000">Cantidad de días: </strong>
                                            </p>
                                            <p>
                                                <strong className="text-primary-6000">Subtotal: </strong>
                                            </p>
                                            <br />
                                        </Col>
                                        <Col span={8} className="text-xl text-right">
                                            <p>{rentDays?.length ? rentDays?.length : 0}</p>
                                            <p>${rentDays?.length ? rentDays?.length * props.spaceSelected?.price : 0}</p>
                                            <br />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Spin>
            </Modal>
        </>
    )
}

export default ModalRentSpaces
