import Document, { type DocumentContext, Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		const lang = "en";

		return (
			<Html lang={lang}>
				<Head>
					<meta name="author" content="Tina Mary Holdcroft" />
					<meta name="description" content="Booking form" />
					<script async src="https://kit.fontawesome.com/a83d77d417.js" crossOrigin="anonymous" />
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
