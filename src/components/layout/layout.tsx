import React from 'react'

import SiteHeader from '@/(client-components)/(Header)/SiteHeader'
import FooterNav from '../FooterNav'
import Footer from '../Footer'

export default function Layout({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <>
      <SiteHeader />
      {children}
      <FooterNav />
      <Footer />
    </>
  )
}
