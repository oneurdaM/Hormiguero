'use client'
import React, { useState, useEffect } from 'react'
import { Row, Col, notification } from 'antd'
import Loader from '../ui/loader/loader'
import { EventsSelected, SeatResponse, Billboard } from '@/types/billboard'
import { getSeats } from '@/data/billboardServices'

type BillboardListProps = {
    eventSpaces: any
}

const BillboardSeatPicker = ({ eventSpaces }: BillboardListProps) => {
    useEffect(() => {
        fetchData(eventSpaces)
    }, [])
    const [fetchingSeat, setFetchingSeat] = useState(false)
    const [eventsSpacesResponse, setSeatResponse] = useState<SeatResponse>({
        seatsResponse: [],
        error: '',
    })

    const [api, contextHolder] = notification.useNotification()
    const fetchData = async (eventSpacesId: any) => {
        try {
            setFetchingSeat(true)
            const response = await getSeats(eventSpacesId.id)
            console.log('reponse', response)
            setSeatResponse(response)
            setFetchingSeat(false)
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error,
            })
            setSeatResponse({ seatsResponse: [], error: '' })
        }
    }
    if (eventsSpacesResponse.error) {
        api.error({
            message: 'Error',
            description: eventsSpacesResponse.error,
        })
    }
    return (
        <>
            {contextHolder}
            {!fetchingSeat ? (
                <Row justify="start">
                    {eventsSpacesResponse.seatsResponse?.map((item: any) => (
                        <Col span={3} key={item.id}>
                            {item.name}
                        </Col>
                    ))}
                </Row>
            ) : (
                <Loader text="Cargando..." />
            )}
        </>
    )
}

export default BillboardSeatPicker
