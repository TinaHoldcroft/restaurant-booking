import { useFormik } from "formik";
import type { ComponentProps } from "react";
import { useState } from "react";
import { bookingFormSchema } from "@/lib/validations";

export interface BookingFormValues {
	name: string;
	email: string;
	phoneNumber: string;
	date: string;
	arrival: string;
	amount: string;
	type: "private" | "business";
	comment: string;
}

export const useBookingForm = () => {
	const [formVisible, setFormVisible] = useState(true);

	const formik = useFormik<BookingFormValues>({
		initialValues: {
			name: "",
			email: "",
			phoneNumber: "",
			date: "",
			arrival: "",
			amount: "2",
			type: "private",
			comment: "",
		},
		validationSchema: bookingFormSchema,

		onSubmit: async (values) => {
			const JSONdata = JSON.stringify(values);
			const endpoint = "/api/booking";
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSONdata,
			};

			await fetch(endpoint, options)
				.then(async (res) => {
					if (res.ok) {
						setFormVisible(false);
					}
				})
				.catch(() => {});
		},
	});

	const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
		event.preventDefault();
		formik.handleSubmit();
	};

	const handleReset = () => {
		formik.resetForm();
	};

	return {
		formik,
		formVisible,
		handleSubmit,
		handleReset,
	};
};
