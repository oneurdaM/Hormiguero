'use client'

import { Poppins } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cartelera from "@/pages/billboard"

import PageHome from './landing'
import Layout from '@/components/layout/layout'

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
    title: 'Centro Cultural El Hormiguero',
    description: 'Centro cultural El Hormiguero',
}

export default function RootLayout() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        const incrementVisitCounter = async () => {
            try {
                const response = await axios.post(
                    // 'https://hormiguero-dc8e78e18915.herokuapp.com/visits'
                     'https://back-hormiguero-558b8cf43e32.herokuapp.com/visits'

                )
                if (
                    response.status === 201 ||
                    response.statusText === 'Created'
                ) {
                    console.log(
                        'Visit counter incremented successfully:',
                        response.data
                    )
                    localStorage.setItem('visits', response.data.toString())
                } else {
                    console.error(
                        'Failed to increment visit counter:',
                        response
                    )
                }
            } catch (error) {
                console.error(
                    'An error occurred while incrementing the visit counter:',
                    error
                )
            }
        }

        incrementVisitCounter()
    }, [])

    if (!mounted) return <></>

    return (
        <Layout>
            <PageHome />
            <Cartelera />

        </Layout>
    )
}
