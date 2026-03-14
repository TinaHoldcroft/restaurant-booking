import cn from "classnames";
import { useField } from "formik";
import type { ComponentProps, ReactNode } from "react";
import { useState } from "react";
import styles from "./TextField.module.scss";

interface TextFieldProps {
	id: string;
	label: string;
	name: string;
	helpText?: string;
	type?: "text" | "email" | "password" | "tel" | "search" | "time" | "number" | "date";
	suffix?: ReactNode;
	affix?: ReactNode;
	min?: string;
	max?: string;
	onInput?: ComponentProps<"input">["onInput"];
}

export const TextField = ({ id, label, name, helpText, type = "text", suffix, affix, min, max, onInput, ...props }: TextFieldProps) => {
	const [field, meta] = useField({ name, type, min, max });
	const [didFocus, setDidFocus] = useState(false);

	const handleFocus = () => setDidFocus(true);

	const showValidation = (!!didFocus && field.value?.toString().trim().length > 2) || meta.touched;
	const isInvalid = showValidation && !!meta.error;
	const hasValue = (field.value?.toString() ?? "").length > 0;

	return (
		<div
			className={cn(styles.textfield, styles[type], {
				[styles["textfield--has-value"]]: hasValue,
				[styles["textfield--is-invalid"]]: isInvalid,
			})}
		>
			<label
				className={cn(styles.textfield__label, {
					[styles["textfield__label--has-value"]]: hasValue,
					[styles["textfield__label--is-invalid"]]: isInvalid,
					[styles["textfield__label--has-affix"]]: !!affix,
					[styles["textfield__label--is-invalid-and-has-value"]]: isInvalid && hasValue,
				})}
				htmlFor={id}
			>
				{label}
			</label>
			<div className={styles.textfield__inputWrapper}>
				{affix && <div className={styles.textfield__affix}>{affix}</div>}
				<input
					id={id}
					type={type}
					className={cn(styles.textfield__input, {
						[styles["textfield__input--has-value"]]: hasValue,
						[styles["textfield__input--is-invalid"]]: isInvalid,
						[styles["textfield__input--has-affix"]]: !!affix,
					})}
					onFocus={handleFocus}
					onInput={onInput}
					aria-invalid={isInvalid}
					{...field}
					{...props}
				/>
				{suffix && <div className={styles.textfield__suffix}>{suffix}</div>}
			</div>
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
