import React, { useState, useRef, useEffect } from 'react'

import * as Yup from 'yup'
import { useFormik, FormikProvider, Field } from 'formik'
import { TextInputLiveFeedback } from '../components/InstantValidation'

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
        .email('invalid e-mail address')
        .required('We need your e-mail address'),
    phoneNumber: Yup
        .string()
        .min(8, 'minimum 8 digits')
        .required('We need your phonenumber')
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
        .min(1)
        .max(20)
        .required('We need the amount of guests'),
    type: Yup
        .string()
})

function BookingForm() {
    const hour = new Date().getHours()
    const min = new Date().getMinutes()

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            arrival: `${hour}:${min}`,
            departure: `${hour + 1}:${min}`,
            amount: '10',
            type: 'private',
            comment: ''
        },

        validationSchema: validationSchema,

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            setFormVisible(false)
        },
    })


    const inputRef = useRef();
    const [formVisible, setFormVisible] = useState(true);

    return (
        <>
            {!formVisible &&
                <>submit</>
            }

            {formVisible &&
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
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                            />
                            <TextInputLiveFeedback
                                label='Last Name'
                                id='lastName'
                                type='text'
                                name='lastName'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                            />
                        </div>
                        <TextInputLiveFeedback
                            label='E-mail'
                            id='email'
                            type='email'
                            name='email'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <TextInputLiveFeedback
                            label='phoneNumber'
                            id='phoneNumber'
                            type='tel'
                            name='phoneNumber'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                        />
                        <TextInputLiveFeedback
                            label='arrival'
                            id='arrival'
                            type='time'
                            name='arrival'
                            min='10:00'
                            max='23:00'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.arrival}
                        />
                        <TextInputLiveFeedback
                            label='departure'
                            id='departure'
                            type='time'
                            name='departure'
                            min={formik.values.arrival}
                            max='23:00'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.departure}
                        />
                        <TextInputLiveFeedback
                            label='Number of persons (max 20)'
                            id='amount'
                            type='text'
                            inputMode='numeric' pattern='[0-9]*'
                            name='amount'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.amount}

                        />

                        <label htmlFor='type'>Type:</label>
                        <select
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            name='type'
                            id='type'
                        >
                            <option value='private'>private</option>
                            <option value='business'>business</option>
                        </select>

                        <textarea
                            id='comment'
                            name="comment"
                            rows='5'
                            onChange={formik.handleChange}
                            value={formik.values.comment}
                        />

                        <div>
                            <button type='submit'>submit</button>
                        </div>
                    </FormikProvider>
                </form>
            }

        </>
    );
}

export default BookingForm;
