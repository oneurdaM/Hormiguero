import React, { useState } from 'react'
import Image from 'next/image'
import { Drawer, Row, Col, notification, Divider, Card, Badge, Steps, Avatar, Tooltip } from 'antd'
import { ClockCircleOutlined, TagsOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import moment from 'moment'
import 'moment/locale/es'
import Loader from '../ui/loader/loader'
import CardEvent from '../common/card'
import ButtonPrimary from '@/components/ui/primary-button'
import { getEventsSpaces } from '@/data/billboardServices'
import { EventsSelected, EventsSpacesResponse, Billboard } from '@/types/billboard'
import { getAuthCredentials } from '@/utils/auth-utils'
import BillboardSeatPicker from './billboard-seatPicker'
import BillboardPayment from './billboard-payment'

function BillboardCard({ event }: { event: Billboard }) {
    const [open, setOpen] = useState(false)
    const [widthDrawer, setWidthDrawer] = useState('80%')
    const [heightFrame, setHeightFrame] = useState('515')
    const [childrenDrawer, setChildrenDrawer] = useState(false)
    const [fetchingEventsSpaces, setFetchingEventsSpaces] = useState(false)
    const [eventSelected, setEventSelected] = useState<EventsSelected>()
    const [details, setDetails] = useState<any>()
    const [seatsSelected, setSeatsSelected] = useState<any>([])

    const [current, setCurrent] = useState(0)
    const [api, contextHolder] = notification.useNotification()
    const [eventsSpacesResponse, setEventsSpacesResponse] = useState<EventsSpacesResponse>({
        eventsSpaces: [],
        error: '',
    })
    const { token } = getAuthCredentials()

    const seatsChosen = (details: any, seatsSelected: any) => {
        console.log('values', details, seatsSelected)
        setSeatsSelected(seatsSelected)
        setDetails(details)
    }

    const fetchData = async (eventId: any, spaceId: any) => {
        try {
            setFetchingEventsSpaces(true)
            const response = await getEventsSpaces(eventId, spaceId)
            setEventsSpacesResponse(response)
            setFetchingEventsSpaces(false)
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error,
            })
            setEventsSpacesResponse({ eventsSpaces: [], error: '' })
        }
    }
    if (eventsSpacesResponse.error) {
        api.error({
            message: 'Error',
            description: eventsSpacesResponse.error,
        })
    }

    const onClickBillboard = () => {
        fetchData(event?.id, '')
        setOpen(true)
        setWidthDrawer('80%')
        setHeightFrame('515')
    }
    const onClickBillboardMobile = () => {
        fetchData(event?.id, '')
        setOpen(true)
        setWidthDrawer('100%')
        setHeightFrame('215')
    }
    const onClose = () => {
        setOpen(false)
        setWidthDrawer('80%')
        setHeightFrame('515')
    }

    const showChildrenDrawer = (value: any) => {
        console.log('value', value)
        if (token) {
            setChildrenDrawer(true)
            value.price = event?.price
            setEventSelected(value)
        } else {
            api.warning({
                message: 'Es necesario iniciar sesión',
                description: (
                    <Row justify="center">
                        <Col span={24}>
                            <p>Para continuar con la compra de los asientos es necesario iniciar sesión</p>
                        </Col>
                        <Col span={20}>
                            <br />
                            <ButtonPrimary className="mr-4 width100" href="/login">
                                Iniciar sesión
                            </ButtonPrimary>
                        </Col>
                    </Row>
                ),
            })
        }
    }

    const onChildrenDrawerClose = (showSuccess: boolean) => {
        setCurrent(0)
        if (showSuccess) {
            api.success({
                message: 'El pago se realizó de manera correcta',
                description: 'Ya cuentas con tus asientos para el evento, podrás descargarlos desde tu cuenta',
            })
        }
        setChildrenDrawer(false)
    }
    console.log('event', event)

    const steps = [
        {
            title: 'Elige tus asientos',
        },
        {
            title: 'Pagar',
        },
    ]
    const next = () => {
        setCurrent(current + 1)
    }

    const prev = () => {
        setCurrent(current - 1)
    }

    const items = steps.map((item) => ({ key: item.title, title: item.title }))

    return (
        <>
            {contextHolder}
            <Row>
                <Col xs={0} lg={24}>
                    <CardEvent className="my-4 hover:shadow-xl hover:shadow-border-400" onClick={onClickBillboard}>
                        <Image src={event.thumbnailUrl} alt={event.title} className="rounded-tl rounded-tr aspect-[500/300] object-cover" width={500} height={300} />
                        <div className="p-5">
                            <div>
                                <small className="text-dark">{event.genderList}</small>
                            </div>
                            <h5 className="text-dark line-clamp-1">{event.title}</h5>
                            <p className="text-body line-clamp-2">{event.synopsis}</p>
                            <div className="card-footer">
                                <small className="text-muted">
                                    Publicado {event.director} | Por {event.company}
                                </small>
                            </div>
                        </div>
                    </CardEvent>
                </Col>
                <Col sm={24} lg={0}>
                    <CardEvent className="my-4 hover:shadow-xl hover:shadow-border-400" onClick={onClickBillboardMobile}>
                        <Image src={event.thumbnailUrl} alt={event.title} className="rounded-tl rounded-tr aspect-[500/300] object-cover" width={500} height={300} />
                        <div className="p-5">
                            <div>
                                <small className="text-dark">{event.genderList}</small>
                            </div>
                            <h5 className="text-dark line-clamp-1">{event.title}</h5>
                            <p className="text-body line-clamp-2">{event.synopsis}</p>
                            <div className="card-footer">
                                <small className="text-muted">
                                    Publicado {event.director} | Por {event.company}
                                </small>
                            </div>
                        </div>
                    </CardEvent>
                </Col>
            </Row>
            <Drawer title={<p className="text-xl text-primary-6000 ">{event.title}</p>} width={widthDrawer} onClose={onClose} open={open} className="" classNames={{ body: 'backgroundDrawer' }}>
                {!fetchingEventsSpaces ? (
                    <Row justify={'space-around'} gutter={[8, 8]}>
                        <Col xs={22} lg={14}>
                            <iframe style={{ borderBottomLeftRadius: '2em', borderBottomRightRadius: '2em', borderTopLeftRadius: '1em', borderTopRightRadius: '1em' }} width={'100%'} height={heightFrame} src={event.video} title={event.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </Col>
                        <Col xs={22} lg={10}>
                            <Row justify="center">
                                <Col className="text-lg text-primary-6000 line-clamp-1">
                                    <p>
                                        <ClockCircleOutlined />
                                        {' ' + event.duration + ' min'}
                                    </p>
                                </Col>
                                <Col>
                                    <Divider type="vertical" className="text-lg font-black text-primary-6000 " />
                                </Col>
                                <Col className="text-lg text-primary-6000 line-clamp-1">
                                    <p>
                                        <TagsOutlined />
                                        {' ' + event.genderList}
                                    </p>
                                </Col>
                                <Col span={24}>
                                    <Divider className="text-6xl font-black text-primary-6000 " />
                                </Col>
                            </Row>
                            <Row justify="space-around">
                                <Col span={23}>
                                    <p className="text-lg text-primary-6000">Director</p>
                                    <p className="text-base">{event.director}</p>
                                    <br />
                                </Col>
                                <Col span={23}>
                                    <p className="text-lg text-primary-6000">Compañia</p>
                                    <p className="text-base">{event.company}</p>
                                    <br />
                                </Col>
                                <Col span={23}>
                                    <p className="text-lg text-primary-6000">Sinopsis</p>
                                    <p className="text-base">{event.synopsis}</p>
                                    <br />
                                </Col>
                                <div className="card-footer">
                                    <small className="text-muted">
                                        Dramaturgia {event.dramaturgy} | Tipo {event.type}
                                    </small>
                                </div>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Divider orientation="left">
                                <p className="text-xl text-primary-6000 ">Horarios</p>
                            </Divider>
                        </Col>
                        <Col span={24}>
                            <Row justify="start" gutter={[16, 16]}>
                                {eventsSpacesResponse.eventsSpaces.map((eventSpace: any) => (
                                    <Col xs={24} md={12} lg={8} key={eventSpace.id}>
                                        <Badge.Ribbon
                                            color="#0b7e8b"
                                            text={
                                                <p className="text-xl">
                                                    Horario:
                                                    {' ' + moment(eventSpace?.startDate).format('h:mm a')}
                                                </p>
                                            }
                                        >
                                            <Card className="cardEvent" bordered={false} onClick={() => showChildrenDrawer(eventSpace)} cover={<img className="coverCard" alt={eventSpace.space.name} src={eventSpace.space.image} />}>
                                                <Row justify="space-around">
                                                    <Col span={24} className="dayCard">
                                                        <p className="text-xl ">{moment(eventSpace?.startDate).format('dddd D MMMM YYYY').charAt(0).toUpperCase() + moment(eventSpace?.startDate).format('dddd D MMMM YYYY').slice(1)}</p>
                                                    </Col>
                                                    <Col span={24}>
                                                        <Divider orientation="left">
                                                            <p className="text-primary-6000 ">{eventSpace.space.name}</p>
                                                        </Divider>
                                                    </Col>

                                                    <Col span={12}>
                                                        <p>
                                                            <strong className="text-primary-6000 ">Capacidad: </strong>
                                                            {eventSpace.space.capacity + ' asientos'}
                                                        </p>
                                                    </Col>
                                                    <Col span={12}>
                                                        <p>
                                                            <strong className="text-primary-6000 ">Dimensiones: </strong>
                                                            {eventSpace.space.dimensions + 'm²'}
                                                        </p>
                                                    </Col>
                                                    <Col span={24}>
                                                        <br />
                                                        <p>
                                                            <strong className="text-primary-6000 ">Dirección: </strong>
                                                            {eventSpace.space.location}
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Badge.Ribbon>
                                    </Col>
                                ))}
                            </Row>
                        </Col>

                        <Drawer
                            destroyOnClose={true}
                            title={<p className="text-xl text-primary-6000 ">{eventSelected?.event.title + ', ' + moment(eventSelected?.startDate).format('dddd D MMMM YYYY').charAt(0).toUpperCase() + moment(eventSelected?.startDate).format('dddd D MMMM YYYY').slice(1) + ', ' + moment(eventSelected?.startDate).format('h:mm a')}</p>}
                            width={widthDrawer}
                            classNames={{ body: 'backgroundDrawer' }}
                            onClose={() => onChildrenDrawerClose(false)}
                            open={childrenDrawer}
                            footer={
                                current !== 0 ? (
                                    <Tooltip placement="top" title={'Anterior'}>
                                        <Avatar className="avatarHover" style={{ backgroundColor: '#0b7e8b' }} size={40} onClick={() => prev()}>
                                            <ArrowLeftOutlined />
                                        </Avatar>
                                    </Tooltip>
                                ) : (
                                    false
                                )
                            }
                        >
                            <Steps current={current} items={items} />
                            <Row justify="space-between">
                                <Col span={24}>
                                    {current === 0 && (
                                        <Row justify={'space-around'}>
                                            <Col xs={24} lg={22}>
                                                <BillboardSeatPicker eventSpaces={eventSelected} seatsChosen={seatsChosen} next={next} />
                                            </Col>
                                        </Row>
                                    )}
                                    {current === 1 && (
                                        <Row justify={'space-around'}>
                                            <Col xs={24} lg={22}>
                                                <BillboardPayment details={details} seatsSelected={seatsSelected} onChildrenDrawerClose={onChildrenDrawerClose} />
                                            </Col>
                                        </Row>
                                    )}
                                </Col>
                            </Row>
                            <div style={{ marginTop: 24 }}></div>
                        </Drawer>
                    </Row>
                ) : (
                    <Loader text="Cargando..." />
                )}
            </Drawer>
        </>
    )
}

export default BillboardCard
