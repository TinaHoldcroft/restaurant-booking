import React, { useState } from "react";
import { useField } from "formik";

export function TextInputLiveFeedback({
    label,
    id,
    helptext,
    className,
    ...props
}) {

    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback = (!!didFocus && field.value.trim().length > 2) || meta.touched;

    return (
        <div className={showFeedback ? (meta.error ? `${className} invalid` : `${className} valid`) : className}>
            <label htmlFor={id}>{label}</label>
            <div>
                <input
                    id={id}
                    onFocus={handleFocus}
                    {...props}
                    {...field}
                />
            </div>
            {showFeedback ? (
                <div
                    id={`${id}-feedback`}
                    aria-live="polite"
                    className="feedback"
                >
                    <p>{meta.error}</p>
                    <div className="marker-wrapper">
                        {meta.error ?
                            <span className="marker xmark">✖</span>
                            :
                            <span className="marker checkmark">✔</span>
                        }
                    </div>
                </div>
            ) : (
                <p className="helptext">{helptext}</p>
            )}
        </div>
    );
}
