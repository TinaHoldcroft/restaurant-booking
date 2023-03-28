import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        const lang = 'en'

        return (
            <Html lang={lang}>
                <Head>
                    <meta name='author' content='Tina Mary Holdcroft' />
                    <meta name='description' content='Booking form' />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument