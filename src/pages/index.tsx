'use client'

import { Poppins } from 'next/font/google'
import React, { useEffect, useState } from 'react'

import SiteHeader from '@/(client-components)/(Header)/SiteHeader'
import FooterNav from '@/components/FooterNav'
import Footer from '@/components/Footer'
import { ReactQueryProvider } from './react-query-provider'
import PageHome from './landing'

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
    }, [])

    if (!mounted) return <></>

    return (
        <html lang="en" className={poppins.className}>
            <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
                {/* <ReactQueryProvider> */}
                {/* <ClientCommons />*/}
                <SiteHeader />
                <PageHome />
                <FooterNav />
                <Footer />
                {/* </ReactQueryProvider> */}
            </body>
        </html>
    )
}
