import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Logo from '@/components/ui/logo'
import logo from '../../assets/placeholders/logo-bw.png'
import SiteHeader from '@/(client-components)/(Header)/SiteHeader'
import FooterNav from '../FooterNav'

export default function AuthPageLayout({ children }: React.PropsWithChildren<{}>) {
    return (
        <>
            <Head>
                <title>Login | CCH</title>
                <meta name="description" content={'Centro Cultural El Hormiguero'} />
                <meta property="og:image" content={logo.toString()} />

                <meta name="twitter:title" content="Centro Cultural El Hormiguero" />
                <meta name="twitter:description" content={'Centro Cultural El Hormgiuero'} />
                <meta name="twitter:image" content={logo.toString()} />
                <meta name="twitter:card" content={logo.toString()} />
            </Head>
            <SiteHeader />
            <div className="flex h-auto min-h-screen flex-row" dir="ltr">
                <div className="hidden flex-1 items-center justify-center bg-dark text-white md:flex ">
                    <div className="w-auto max-w-[700px]">
                        <Image src={logo} alt="logo-bw" loading="eager" />
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center bg-gray-100">
                    <div className="m-auto w-full max-w-[420px] rounded bg-gray-100 p-5 sm:p-8 sm:shadow md:bg-light">
                        <div className="flex h-[30px] items-center justify-center">
                            <Logo />
                        </div>
                        {children}
                    </div>
                </div>
            </div>
            <FooterNav />
        </>
    )
}
