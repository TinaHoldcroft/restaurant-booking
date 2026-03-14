import cn from "classnames";
import { useField } from "formik";
import type { ComponentProps } from "react";
import { useState } from "react";
import styles from "./TextField.module.scss";

interface TextAreaProps {
	id: string;
	label: string;
	name: string;
	helpText?: string;
	onInput?: ComponentProps<"textarea">["onInput"];
}

export const TextArea = ({ id, label, name, helpText, onInput, ...props }: TextAreaProps) => {
	const [field, meta] = useField({ name });
	const [didFocus, setDidFocus] = useState(false);

	const handleFocus = () => setDidFocus(true);

	const showValidation = (!!didFocus && field.value?.toString().trim().length > 2) || meta.touched;
	const isInvalid = showValidation && !!meta.error;
	const hasValue = (field.value?.toString() ?? "").length > 0;

	return (
		<div
			className={cn(styles.textfield, {
				[styles["textfield--has-value"]]: hasValue,
				[styles["textfield--is-invalid"]]: isInvalid,
			})}
		>
			<label
				className={cn(styles.textfield__label, {
					[styles["textfield__label--has-value"]]: hasValue,
					[styles["textfield__label--is-invalid"]]: isInvalid,
				})}
				htmlFor={id}
			>
				{label}
			</label>

			<textarea
				id={id}
				className={cn(styles.textfield__input, styles.textarea__input, {
					[styles["textfield__input--has-value"]]: hasValue,
					[styles["textfield__input--is-invalid"]]: isInvalid,
				})}
				onFocus={handleFocus}
				onInput={onInput}
				aria-invalid={isInvalid}
				{...field}
				{...props}
			/>

			<p className={cn(styles["help-text"], isInvalid && styles["help-text--error"])}>
				{!isInvalid && helpText}
				{isInvalid && (
					<>
						<i className="fa-solid fa-circle-exclamation" /> {meta.error}
					</>
				)}
			</p>
		</div>
	);
};
