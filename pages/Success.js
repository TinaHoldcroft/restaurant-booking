import React from 'react';

export const Success = (props) => (
    <div className='success-page'>
        <h1>Order Confirmation</h1>
        <ul>
            <li><b>Name:</b> {props.firstName} {props.lastName}</li>
            <li><b>Amount:</b> {props.amount}</li>
            <li><b>Type: </b>{props.type}</li>
            <li><b>Email: </b>{props.email}</li>
            <li><b>Phone:</b> {props.phone}</li>
            <li><b>Time:</b> {props.arrival} - {props.departure}</li>
            <li><b>Comment: </b>{props.comment}</li>
        </ul>
    </div>
)

export default Success;