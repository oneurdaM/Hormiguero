'use client'

import { Poppins } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cartelera from '@/pages/billboard'
import Head from 'next/head'
import logo from '@/assets/placeholders/logo.png'
import PageHome from './landing'
import Layout from '@/components/layout/layout'

import dayjs from 'dayjs'
import 'dayjs/locale/es-mx'
import Blog from './blog'
import Contactform from '@/components/Contact/Contactform'
import DividerTailwindcss from '@/components/DividerTailwindcss'
dayjs.locale('es-mx')
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
                    'https://hormiguero-dc8e78e18915.herokuapp.com/visits'
                    //'https://back-hormiguero-558b8cf43e32.herokuapp.com/visits'
                )
                if (response.status === 201 || response.statusText === 'Created') {
                    console.log('Visit counter incremented successfully:', response.data)
                    localStorage.setItem('visits', response.data.toString())
                } else {
                    console.error('Failed to increment visit counter:', response)
                }
            } catch (error) {
                console.error('An error occurred while incrementing the visit counter:', error)
            }
        }

        incrementVisitCounter()
    }, [])

    if (!mounted) return <></>

    return (
        <Layout>
            <Head>
                <title>Centro Cultural El Hormiguero</title>
                <meta name="description" content={'Centro Cultural El Hormiguero'} />
                <meta property="og:image" content={logo.toString()} />

                <meta name="twitter:title" content="Centro Cultural El Hormiguero" />
                <meta name="twitter:description" content={'Centro Cultural El Hormgiuero'} />
                <meta name="twitter:image" content={logo.toString()} />
                <meta name="twitter:card" content={logo.toString()} />
            </Head>
            <PageHome />
            <DividerTailwindcss />
            <Cartelera />
            <DividerTailwindcss />
            <Blog />
            <DividerTailwindcss />

            <Contactform />
            <DividerTailwindcss />
        </Layout>
    )
}
