import { type FormikProps, FormikProvider } from "formik";
import { type ComponentProps, useRef } from "react";
import { Button } from "@/components/button/Button";
import { GuestCounter } from "@/components/form/guestCounter/GuestCounter";
import { TableVisualization } from "@/components/form/guestCounter/TableVisualization";
import { TextArea } from "@/components/form/TextArea";
import { TextField } from "@/components/form/TextField";
import type { BookingFormValues } from "@/hooks/useBookingForm";
import styles from "./BookingForm.module.scss";

interface BookingFormProps {
	formik: FormikProps<BookingFormValues>;
	onSubmit: ComponentProps<"form">["onSubmit"];
	onReset: ComponentProps<"form">["onReset"];
}

export const BookingForm = ({ formik, onSubmit, onReset }: BookingFormProps) => {
	const inputRef = useRef<HTMLFormElement>(null);

	return (
		<form id="BookingForm" ref={inputRef} className={styles.form} onSubmit={onSubmit} onReset={onReset}>
			<FormikProvider value={formik}>
				<div className={styles.form__container}>
					<div className={styles.col}>
						<div className={styles.row}>
							<TextField id="name" label="Name" name="name" type="text" />
						</div>
						<div className={styles.row}>
							<TextField id="email" label="Email" name="email" type="email" />
							<TextField id="phoneNumber" label="Phone number" name="phoneNumber" type="tel" />
						</div>
						<div className={styles.row}>
							<TextField id="date" label="Date for booking" name="date" type="date" min={new Date().toISOString().split("T")[0]} />
						</div>
						<div className={styles.row}>
							<TextField
								id="arrival"
								label="Arrival time"
								name="arrival"
								type="time"
								min="10:00"
								max="23:00"
								helpText="Opening hours between 10:00 and 23:00"
							/>
						</div>
					</div>
					<div className={styles.col}>
						<div className={styles.guestRow}>
							<GuestCounter id="amount" label="Number of guests" name="amount" min={1} max={8} />
							<TableVisualization guestCount={Number(formik.values.amount) || 2} />
						</div>
						<TextArea id="comment" label="" name="comment" />
					</div>
				</div>
				<div className={styles.form__actions}>
					<Button type="submit" style="primary">
						Submit
					</Button>
					<Button type="reset" style="secondary">
						Reset
					</Button>
				</div>
			</FormikProvider>
		</form>
	);
};
