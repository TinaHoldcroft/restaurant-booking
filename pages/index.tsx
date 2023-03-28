import Head from 'next/head'
import BookingForm from '../components/BookingForm'

export default function Home() {

    return (
        <>
            <Head>
                <title>Booking Form</title>
            </Head>

            <BookingForm />
        </>
    )
}