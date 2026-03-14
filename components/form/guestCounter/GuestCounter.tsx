import cn from "classnames";
import { useField } from "formik";
import { type ChangeEvent, useState } from "react";
import styles from "./GuestCounter.module.scss";

interface GuestCounterProps {
	id: string;
	label: string;
	name: string;
	min?: number;
	max?: number;
}

export const GuestCounter = ({ id, label, name, min = 1, max = 14 }: GuestCounterProps) => {
	const [field, meta, helpers] = useField({ name, type: "number" });
	const [didFocus, setDidFocus] = useState(false);

	const handleFocus = () => setDidFocus(true);

	const showValidation = (!!didFocus && field.value?.toString().trim().length > 0) || meta.touched;
	const isInvalid = showValidation && !!meta.error;
	const hasValue = (field.value?.toString() ?? "").length > 0;

	const currentValue = Number(field.value) || min;

	const increment = () => {
		const newValue = Math.min(currentValue + 1, max);
		helpers.setValue(newValue.toString());
	};

	const decrement = () => {
		const newValue = Math.max(currentValue - 1, min);
		helpers.setValue(newValue.toString());
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === "") {
			helpers.setValue("");
			return;
		}
		const numValue = Number(value);
		if (!Number.isNaN(numValue) && numValue >= min && numValue <= max) {
			helpers.setValue(value);
		}
	};

	return (
		<div
			className={cn(styles.guestCounter, {
				[styles["guestCounter--has-value"]]: hasValue,
				[styles["guestCounter--is-invalid"]]: isInvalid,
			})}
		>
			<label className={styles.guestCounter__label} htmlFor={id}>
				{label}
			</label>
			<div className={styles.guestCounter__controls}>
				<button
					type="button"
					className={styles.guestCounter__button}
					onClick={decrement}
					disabled={currentValue <= min}
					aria-label="Decrease guest count"
				>
					<i className="fa-solid fa-minus" />
				</button>
				<input
					id={id}
					type="number"
					className={cn(styles.guestCounter__input, {
						[styles["guestCounter__input--has-value"]]: hasValue,
						[styles["guestCounter__input--is-invalid"]]: isInvalid,
					})}
					value={field.value}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={field.onBlur}
					aria-invalid={isInvalid}
					min={min}
					max={max}
				/>
				<button
					type="button"
					className={styles.guestCounter__button}
					onClick={increment}
					disabled={currentValue >= max}
					aria-label="Increase guest count"
				>
					<i className="fa-solid fa-plus" />
				</button>
			</div>
			{currentValue >= max && <p className={styles["help-text"]}>Maximum {max} guests per booking</p>}
		</div>
	);
};
