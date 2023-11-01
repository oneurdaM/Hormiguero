'use client'

import { Poppins } from 'next/font/google'
import React, { useEffect, useState } from 'react'

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
  }, [])

  if (!mounted) return <></>

  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Layout>
          <PageHome />
        </Layout>
      </body>
    </html>
  )
}
