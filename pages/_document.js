import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import Link from 'next/link'
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
          <style jsx>{`

            html, body {
              display: flex;
            }

          `}</style>
        </Head>
        <body>
          <nav className='pt-navbar pt-dark'>
            <div className='pt-navbar-group pt-align-left'>
              <div className='pt-navbar-heading'><span style={{color: '#ffc107'}}>&#x26A1;</span>Serverless Next Notes</div>
            </div>
            <div className='pt-navbar-group pt-align-right'>
              <Link href='/login'><a className='pt-button pt-minimal pt-icon-standard pt-icon-log-in' role='button' tabIndex='0'>Login</a></Link>
            </div>
          </nav>

          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
