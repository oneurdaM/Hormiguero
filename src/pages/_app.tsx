// App.js

import React from 'react'
import { ConfigProvider } from 'antd'
import type { AppProps } from 'next/app'
import './globals.css'
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css'
import '@/styles/index.scss'
import 'rc-slider/assets/index.css'
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css'
import '@/styles/index.scss'
import 'rc-slider/assets/index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export default function App({ Component, pageProps }: AppProps) {
    const [client] = React.useState(new QueryClient())

    return (
        <ConfigProvider>
            <QueryClientProvider client={client}>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ConfigProvider>
    )
}
