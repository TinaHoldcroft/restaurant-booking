import React, { useState } from "react";
import { useField } from "formik";

export function TextInputLiveFeedback({
    label,
    id,
    children,
    ...props
}) {

    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback = (!!didFocus && field.value.trim().length > 2) || meta.touched;

    return (
        <div
            className={showFeedback ? (
                meta.error ?
                    'input invalid' : 'input valid'
            ) : null}
        >
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                onFocus={handleFocus}
                aria-describedby='feedback'
                {...props}
                {...field}
            />
            {children}
            {showFeedback ? (
                <div
                    id={`${id}-feedback`}
                    aria-live="polite"
                    className="feedback"
                >
                    {meta.error ? meta.error :
                        <span>✓</span>
                    }
                </div>
            ) : null}
        </div>
    );
}
