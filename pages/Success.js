import React from 'react';

export const Success = (props) => (
    <div>
        <h1>Submitted</h1>
        <ul>
            <li>Name: {props.firstName} {props.lastName}</li>
            <li>Amount: {props.amount}</li>
            <li>Type: {props.type}</li>
            <li>Email: {props.email}</li>
            <li>Phone: {props.phone}</li>
            <li>Time: {props.arrival} - {props.departure}</li>
            <li>Comment: {props.comment}</li>
        </ul>
    </div>
)

export default Success;