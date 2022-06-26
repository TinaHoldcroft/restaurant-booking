import React, { useState, useRef, useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik, FormikProvider, Field } from 'formik'
import { TextInputLiveFeedback } from '../components/InstantValidation'
import Success from './Success'

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

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            arrival: '12:00',
            departure: '13:00',
            amount: '',
            type: 'private',
            comment: ''
        },

        validationSchema: validationSchema,

        onSubmit: function () {
            alert('From submitted')
            setFormVisible(false)
        },
    })

    const inputRef = useRef();
    const [formVisible, setFormVisible] = useState(true);

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
                    onSubmit={formik.handleSubmit}
                    action="/submit"
                    method="POST"
                >
                    <FormikProvider
                        value={formik}
                    >
                        <div className='form-row'>
                            <TextInputLiveFeedback
                                label='First Name'
                                id='firstName'
                                type='text'
                                name='firstName'
                                className='input'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                            />
                            <TextInputLiveFeedback
                                label='Last Name'
                                id='lastName'
                                type='text'
                                name='lastName'
                                className='input'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
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
                                value={formik.values.amount}
                                helptext='Maximum 20 guests per booking'
                            />
                        </div>

                        <fieldset
                            onChange={formik.handleChange}
                            form='BookingForm'
                        >
                            <legend name='type'>Select Type</legend>
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
                                name="comment"
                                onChange={formik.handleChange}
                                value={formik.values.comment}
                            />
                        </div>

                        <div className='btn-wrapper'>
                            <button type='submit'>Submit</button>
                        </div>
                    </FormikProvider>
                </form>
            </>}
        </section>
    );
}

export default BookingForm;
