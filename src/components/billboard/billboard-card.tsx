import React, { useState } from 'react'
import Image from 'next/image'
import { Drawer, Row, Col, notification, Divider, Card, Badge, Steps, theme, Button } from 'antd'
import { ClockCircleOutlined, TagsOutlined } from '@ant-design/icons'

import moment from 'moment'
import 'moment/locale/es'
import Loader from '../ui/loader/loader'
import CardEvent from '../common/card'

import { getEventsSpaces } from '@/data/billboardServices'
import { EventsSelected, EventsSpacesResponse, Billboard } from '@/types/billboard'

function BillboardCard({ event }: { event: Billboard }) {
    const [open, setOpen] = useState(false)
    const [widthDrawer, setWidthDrawer] = useState('80%')
    const [heightFrame, setHeightFrame] = useState('515')
    const [childrenDrawer, setChildrenDrawer] = useState(false)
    const [fetchingEventsSpaces, setFetchingEventsSpaces] = useState(false)
    const [eventSelected, setEventSelected] = useState<EventsSelected>()

    const [current, setCurrent] = useState(0)
    const [api, contextHolder] = notification.useNotification()
    const [eventsSpacesResponse, setEventsSpacesResponse] = useState<EventsSpacesResponse>({
        eventsSpaces: [],
        error: '',
    })

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
        setChildrenDrawer(true)
        setEventSelected(value)
    }

    const onChildrenDrawerClose = () => {
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
        {
            title: 'Confirmación',
        },
    ]
    const next = () => {
        setCurrent(current + 1)
    }

    const prev = () => {
        setCurrent(current - 1)
    }

    const items = steps.map((item) => ({ key: item.title, title: item.title }))
    const rows = [
        [{ id: 1, number: 1, isSelected: true, tooltip: 'Reserved by you' }, { id: 2, number: 2, tooltip: 'Cost: 15$' }, null, { id: 3, number: '3', isReserved: true, orientation: 'east', tooltip: 'Reserved by Rogger' }, { id: 4, number: '4', orientation: 'west' }, null, { id: 5, number: 5 }, { id: 6, number: 6 }],
        [{ id: 7, number: 1, isReserved: true, tooltip: 'Reserved by Matthias Nadler' }, { id: 8, number: 2, isReserved: true }, null, { id: 9, number: '3', isReserved: true, orientation: 'east' }, { id: 10, number: '4', orientation: 'west' }, null, { id: 11, number: 5 }, { id: 12, number: 6 }],
        [{ id: 13, number: 1 }, { id: 14, number: 2 }, null, { id: 15, number: 3, isReserved: true, orientation: 'east' }, { id: 16, number: '4', orientation: 'west' }, null, { id: 17, number: 5 }, { id: 18, number: 6 }],
        [{ id: 19, number: 1, tooltip: 'Cost: 25$' }, { id: 20, number: 2 }, null, { id: 21, number: 3, orientation: 'east' }, { id: 22, number: '4', orientation: 'west' }, null, { id: 23, number: 5 }, { id: 24, number: 6 }],
        [{ id: 25, number: 1, isReserved: true }, { id: 26, number: 2, orientation: 'east' }, null, { id: 27, number: '3', isReserved: true }, { id: 28, number: '4', orientation: 'west' }, null, { id: 29, number: 5, tooltip: 'Cost: 11$' }, { id: 30, number: 6, isReserved: true }],
    ]

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
                            <iframe style={{ borderRadius: '2em' }} width={'100%'} height={heightFrame} src={event.video} title={event.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
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

                        <Drawer title={<p className="text-xl text-primary-6000 ">{eventSelected?.event.title + ', ' + moment(eventSelected?.startDate).format('dddd D MMMM YYYY').charAt(0).toUpperCase() + moment(eventSelected?.startDate).format('dddd D MMMM YYYY').slice(1) + ', ' + moment(eventSelected?.startDate).format('h:mm a')}</p>} width={widthDrawer} classNames={{ body: 'backgroundDrawer' }} onClose={onChildrenDrawerClose} open={childrenDrawer}>
                            <Steps current={current} items={items} />
                            <Row justify="space-between">
                                <Col span={24}>
                                    {current === 0 && <></>}
                                    {current === 1 && (
                                        <>
                                            <p>second</p>
                                        </>
                                    )}
                                    {current === 2 && <p>ultimo</p>}
                                </Col>
                                <Col span={2}>
                                    <Button style={{ margin: '0 8px' }} type="dashed" disabled={current === 0} onClick={() => prev()}>
                                        Previous
                                    </Button>
                                </Col>
                                <Col span={2}>
                                    <Button type="dashed" disabled={current === 2} onClick={() => next()}>
                                        Next
                                    </Button>
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
