import React, { useState } from 'react'
import Image from 'next/image'
import { Button, Drawer, Row, Col, notification, Divider } from 'antd'
import { ClockCircleOutlined, TagsOutlined } from '@ant-design/icons'

import Loader from '../ui/loader/loader'
import Card from '../common/card'
import { getEventsSpaces } from '@/data/billboardServices'
import { EventsSpacesResponse, Billboard } from '@/types/billboard'

function BillboardCard({ event }: { event: Billboard }) {
    const [open, setOpen] = useState(false)
    const [openMobile, setOpenMobile] = useState(false)
    const [childrenDrawer, setChildrenDrawer] = useState(false)
    const [fetchingEventsSpaces, setFetchingEventsSpaces] = useState(false)
    const [api, contextHolder] = notification.useNotification()
    const [eventsSpacesResponse, setEventsSpacesResponse] =
        useState<EventsSpacesResponse>({
            eventsSpaces: [],
            error: '',
        })

    const fetchData = async (eventId: any, spaceId: any) => {
        try {
            setFetchingEventsSpaces(true)
            const response = await getEventsSpaces(eventId, spaceId)
            console.log('response en index', response)
            setEventsSpacesResponse(response)
            setFetchingEventsSpaces(false)
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error,
            })
        }
    }
    if (eventsSpacesResponse.error) {
        api.error({
            message: 'Error',
            description: eventsSpacesResponse.error,
        })
    }

    const onClickBillboard = () => {
        console.log('onClickBillboard')
        fetchData(event?.id, 1)

        setOpen(true)
    }
    const onClickBillboardMobile = () => {
        console.log('onClickBillboard')
        setOpenMobile(true)
    }
    const onClose = () => {
        setOpen(false)
        setOpenMobile(false)
    }

    const showChildrenDrawer = () => {
        setChildrenDrawer(true)
    }

    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false)
    }
    console.log('event', event)
    return (
        <>
            {contextHolder}
            <Row>
                <Col xs={0} lg={24}>
                    <Card
                        className="my-4 hover:shadow-xl hover:shadow-border-400"
                        onClick={onClickBillboard}
                    >
                        <Image
                            src={event.thumbnailUrl}
                            alt={event.title}
                            className="rounded-tl rounded-tr aspect-[500/300] object-cover"
                            width={500}
                            height={300}
                        />
                        <div className="p-5">
                            <div>
                                <small className="text-dark">
                                    {event.genderList}
                                </small>
                            </div>
                            <h5 className="text-dark line-clamp-1">
                                {event.title}
                            </h5>
                            <p className="text-body line-clamp-2">
                                {event.synopsis}
                            </p>
                            <div className="card-footer">
                                <small className="text-muted">
                                    Publicado {event.director} | Por{' '}
                                    {event.company}
                                </small>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col sm={24} lg={0}>
                    <Card
                        className="my-4 hover:shadow-xl hover:shadow-border-400"
                        onClick={onClickBillboardMobile}
                    >
                        <Image
                            src={event.thumbnailUrl}
                            alt={event.title}
                            className="rounded-tl rounded-tr aspect-[500/300] object-cover"
                            width={500}
                            height={300}
                        />
                        <div className="p-5">
                            <div>
                                <small className="text-dark">
                                    {event.genderList}
                                </small>
                            </div>
                            <h5 className="text-dark line-clamp-1">
                                {event.title}
                            </h5>
                            <p className="text-body line-clamp-2">
                                {event.synopsis}
                            </p>
                            <div className="card-footer">
                                <small className="text-muted">
                                    Publicado {event.director} | Por{' '}
                                    {event.company}
                                </small>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Drawer
                title={event.title}
                width={'80%'}
                onClose={onClose}
                open={open}
            >
                {!fetchingEventsSpaces ? (
                    <Row justify={'space-around'}>
                        <Col xs={22} lg={16}>
                            <iframe
                                style={{ borderRadius: '2em' }}
                                width={'100%'}
                                height="515"
                                src={event.video}
                                title={event.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </Col>
                        <Col xs={22} lg={6}>
                            <Row justify="center">
                                <Col className="text-lg text-primary-6000 line-clamp-1">
                                    <p>
                                        <ClockCircleOutlined />
                                        {' ' + event.duration + ' min'}
                                    </p>
                                </Col>
                                <Col>
                                    <Divider
                                        type="vertical"
                                        className="text-lg font-black text-primary-6000 "
                                    />
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
                            <div className="p-5">
                                <h5 className="text-dark line-clamp-1">
                                    {event.title}
                                </h5>
                                <p className="text-body line-clamp-2">
                                    {event.synopsis}
                                </p>
                                <div className="card-footer">
                                    <small className="text-muted">
                                        Publicado {event.director} | Por{' '}
                                        {event.company}
                                    </small>
                                </div>
                            </div>
                        </Col>
                        <Button type="primary" onClick={showChildrenDrawer}>
                            Two-level drawer
                        </Button>

                        <Drawer
                            title="Two-level Drawer"
                            width={320}
                            closable={false}
                            onClose={onChildrenDrawerClose}
                            open={childrenDrawer}
                        >
                            This is two-level drawer
                        </Drawer>
                    </Row>
                ) : (
                    <Loader text="Cargando..." />
                )}
            </Drawer>
            <Drawer
                title={event.title}
                width={'100%'}
                onClose={onClose}
                open={openMobile}
            >
                {!fetchingEventsSpaces ? (
                    <Row justify={'space-around'}>
                        <Col span={22}>
                            <iframe
                                style={{ borderRadius: '2em' }}
                                width={'100%'}
                                height="315"
                                src="https://www.youtube.com/embed/fygAeAjK78Y?si=aQ1qMBz7KxzN3SjH"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </Col>
                        <Button type="primary" onClick={showChildrenDrawer}>
                            Two-level drawer
                        </Button>
                        <div className="p-5">
                            <div>
                                <small className="text-dark">
                                    {event.genderList}
                                </small>
                            </div>
                            <h5 className="text-dark line-clamp-1">
                                {event.title}
                            </h5>
                            <p className="text-body line-clamp-2">
                                {event.synopsis}
                            </p>
                            <div className="card-footer">
                                <small className="text-muted">
                                    Publicado {event.director} | Por{' '}
                                    {event.company}
                                </small>
                            </div>
                        </div>
                        <Drawer
                            title="Two-level Drawer"
                            width={320}
                            closable={false}
                            onClose={onChildrenDrawerClose}
                            open={childrenDrawer}
                        >
                            This is two-level drawer
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
