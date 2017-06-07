import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

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
          <style>{`
            
            body {
              background-color: #73CF5D;
              font-family: sans-serif;
              margin: 0;
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