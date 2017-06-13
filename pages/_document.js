import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import globalStylesheet from 'styles/global.css'

export default class Doc extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head, errorHtml, chunks} = renderPage()
    const styles = flush()
    return {html, head, errorHtml, chunks, styles}
  }

  render () {
    return (
      <html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: globalStylesheet }} />
          <style>{`
            
            body {
              background-color: #73CF5D;
              font-family: sans-serif;
            }
            
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
