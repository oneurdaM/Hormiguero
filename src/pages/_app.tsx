// App.js

import React from 'react'
import { ConfigProvider, theme } from 'antd'
import esES from 'antd/locale/es_ES';
import type { AppProps } from 'next/app'
import './globals.css'
import '../styles/index.scss'
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css'
import '@/styles/index.scss'
import 'rc-slider/assets/index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export default function App({ Component, pageProps }: AppProps) {
    const [client] = React.useState(new QueryClient())

    return (
        <ConfigProvider locale={esES} theme={{
            token: {
              // Seed Token
            colorPrimary: '#56aec4',
            borderRadius: 30,
            
            // Alias Token
            // colorBgContainer: '#fff7ed',
            },
            // algorithm: theme.darkAlgorithm,
        }}>
            <QueryClientProvider client={client}>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ConfigProvider>
    )
}
