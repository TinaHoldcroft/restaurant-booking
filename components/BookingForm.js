import React, { useRef, useState } from 'react'
import * as Yup from 'yup'
import { FormikProvider, useFormik } from 'formik'
import { TextInputLiveFeedback } from './InstantValidation'
import Success from './Success'
import { useLocalStorage } from '../hooks/useLocalStorage'

const validationSchema = Yup.object({

    firstName: Yup
        .string()
        .max(50, 'Maximun 50 characters')
        .required('We need your name')
        .matches(
            /^[aA-zZ\WæÆøÆåÅ]+$/,
            'Only letters in this field'
        ),
    lastName: Yup
        .string()
        .max(50, 'Maximun 50 characters')
        .required('We need your name')
        .matches(
            /^[aA-zZ\WæÆøÆåÅ]+$/,
            'Only letters in this field'
        ),
    email: Yup
        .string()
        .email('Invalid e-mail address')
        .required('We need your e-mail address'),
    phoneNumber: Yup
        .string()
        .min(8, 'Minimum 8 digits')
        .required('We need your phone number')
        .matches(
            /^[0-9]+$/,
            'Only numbers in this field'
        ),
    arrival: Yup
        .string()
        .required('We need your arrival time'),

    departure: Yup
        .string()
        .required('We need your departure time'),
    amount: Yup
        .number()
        .min(1, 'Minimum 1 guest')
        .max(20, 'Maximum 20 guest')
        .required('We need the amount of guests'),
})

function BookingForm() {
    const [firstName, setFirstName] = useLocalStorage('firstName', '')
    const [lastName, setLastName] = useLocalStorage('lastName', '')
    const [email, setEmail] = useLocalStorage('email', '')
    const [phoneNumber, setPhoneNumber] = useLocalStorage('phoneNumber', '')
    const [arrival, setArrival] = useLocalStorage('arrival', '')
    const [departure, setDeparture] = useLocalStorage('departure', '')
    const [amount, setAmount] = useLocalStorage('amount', '')
    const [type, setType] = useLocalStorage('type', 'private')
    const [comment, setComment] = useLocalStorage('comment', '')

    const formik = useFormik({
        initialValues: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            arrival: arrival,
            departure: departure,
            amount: amount,
            type: type,
            comment: comment
        },
        validationSchema: validationSchema
    })

    const inputRef = useRef()
    const [formVisible, setFormVisible] = useState(true)

    function handleReset() {
        formik.resetForm()
        localStorage.clear()
        location.reload()
    }

    async function handleSubmit(event) {
        event.preventDefault()
        formik.handleSubmit()

        const data = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            phoneNumber: event.target.phoneNumber.value,
            arrival: event.target.arrival.value,
            departure: event.target.departure.value,
            amount: event.target.amount.value,
            type: event.target.type.value,
            comment: event.target.comment.value,
        }

        const JSONdata = JSON.stringify(data)
        const endpoint = '/api/form'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        await fetch(endpoint, options)
            .then(async (res) => {
                const json = await res.json()
                if (res.ok) {
                    console.log('ok')
                    alert(json.data)
                    setFormVisible(false)
                } else {
                    console.log('error')
                    alert(json.data)
                }
            })
            .catch((err) => console.error(err))
    }

    return (
        <section className='form-wrapper'>
            {!formVisible && <>
                <Success
                    firstName={formik.values.firstName}
                    lastName={formik.values.lastName}
                    amount={formik.values.amount}
                    type={formik.values.type}
                    email={formik.values.email}
                    phone={formik.values.phoneNumber}
                    arrival={formik.values.arrival}
                    departure={formik.values.departure}
                    comment={formik.values.comment}
                />
            </>}

            {formVisible && <>
                <h1>Book Table</h1>
                <form
                    id='BookingForm'
                    className='booking-form'
                    ref={inputRef}
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                >
                    <FormikProvider value={formik}>
                        <div className='form-row'>
                            <TextInputLiveFeedback
                                label='First Name'
                                id='firstName'
                                type='text'
                                name='firstName'
                                className='input capitalize'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                onInput={function (e) {
                                    setFirstName(e.target.value)
                                }}
                                value={formik.values.firstName}
                            />
                            <TextInputLiveFeedback
                                label='Last Name'
                                id='lastName'
                                type='text'
                                name='lastName'
                                className='input capitalize'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                onInput={function (e) {
                                    setLastName(e.target.value)
                                }}
                                value={formik.values.lastName}
                            />
                        </div>
                        <div className='form-row'>
                            <TextInputLiveFeedback
                                label='E-mail'
                                id='email'
                                type='email'
                                name='email'
                                className='input'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                onInput={function (e) {
                                    setEmail(e.target.value)
                                }}
                                value={formik.values.email}
                            />
                            <TextInputLiveFeedback
                                label='Phone Number'
                                id='phoneNumber'
                                type='tel'
                                name='phoneNumber'
                                className='input'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                onInput={function (e) {
                                    setPhoneNumber(e.target.value)
                                }}
                                value={formik.values.phoneNumber}
                            />
                        </div>
                        <div className='form-row'>
                            <TextInputLiveFeedback
                                label='Arrival'
                                id='arrival'
                                type='time'
                                name='arrival'
                                min='10:00'
                                max='23:00'
                                className='input'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.arrival}
                                onInput={function (e) {
                                    setArrival(e.target.value)
                                }}
                                helptext='Opening hours between 10:00 and 23:00'
                            />
                            <TextInputLiveFeedback
                                label='Departure'
                                id='departure'
                                type='time'
                                name='departure'
                                min={formik.values.arrival}
                                max='23:00'
                                className='input'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.departure}
                                onInput={function (e) {
                                    setDeparture(e.target.value)
                                }}
                                helptext='Opening hours between 10:00 and 23:00'
                            />
                            <TextInputLiveFeedback
                                label='Number of Guests'
                                id='amount'
                                type='text'
                                name='amount'
                                className='input'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                onInput={function (e) {
                                    setAmount(e.target.value)
                                }}
                                value={formik.values.amount}
                                helptext='Maximum 20 guests per booking'
                            />
                        </div>
                        <fieldset
                            onChange={function (e) {
                                setType(e.target.value)
                                formik.handleChange(e)
                            }}
                            form='BookingForm'
                        >
                            <legend className='sr-only'>Select Type</legend>
                            <TextInputLiveFeedback
                                label='Private'
                                id='private'
                                type='radio'
                                name='type'
                                value='private'
                                className='radio'
                            />
                            <TextInputLiveFeedback
                                label='Business'
                                id='business'
                                type='radio'
                                name='type'
                                value='business'
                                className='radio'
                            />
                        </fieldset>
                        <div className='comment'>
                            <label htmlFor='comment'>Comment</label>
                            <textarea
                                id='comment'
                                name='comment'
                                onChange={formik.handleChange}
                                onInput={function (e) {
                                    setComment(e.target.value)
                                }}
                                value={formik.values.comment}
                            />
                        </div>
                        <div className='btn-wrapper'>
                            <button id='submit' type='submit'>Submit</button>
                            <button id='reset' type='reset'>Reset</button>
                        </div>
                    </FormikProvider>
                </form>
            </>}
        </section>
    )
}

export default BookingForm