import React from 'react'
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'

const MyDocument = () => (
  <Html lang="en">
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache()
  const originalRenderPage = ctx.renderPage
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <html lang="en">
            <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
              <StyleProvider cache={cache}>
                <App {...props} />
              </StyleProvider>
            </body>
          </html>
        ),
    })

  const initialProps = await Document.getInitialProps(ctx)
  const style = extractStyle(cache, true)
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  }
}

export default MyDocument
