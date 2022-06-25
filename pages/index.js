import Head from 'next/head'
import BookingForm from './BookingForm'

export default function Home() {

    return (
        <>
            <Head>
                <title>Finn Exercise 01</title>
            </Head>

            <h1>Book table</h1>

            <BookingForm/>
        </>
    )
}