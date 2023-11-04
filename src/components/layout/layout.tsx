import React from 'react'

import SiteHeader from '@/(client-components)/(Header)/SiteHeader'
import FooterNav from '../FooterNav'
import Footer from '../Footer'

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <SiteHeader />
        {children}
        <FooterNav />
        <Footer />
      </body>
    </html>
  )
}
