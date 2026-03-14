import * as Yup from "yup";

export const bookingFormSchema = Yup.object({
	name: Yup.string()
		.max(100, "Maximun 100 characters")
		.required("We need your name")
		.matches(/^[aA-zZ\WæÆøÆåÅ\s]+$/, "Only letters in this field"),
	email: Yup.string().email("Invalid e-mail address").required("We need your e-mail address"),
	phoneNumber: Yup.string()
		.min(8, "Minimum 8 digits")
		.required("We need your phone number")
		.matches(/^[0-9]+$/, "Only numbers in this field"),
	date: Yup.string()
		.required("We need your booking date")
		.test("min-date", "Booking date cannot be in the past", (value) => {
			if (!value) return true;
			return value >= new Date().toISOString().split("T")[0];
		}),
	arrival: Yup.string().required("We need your arrival time"),
	amount: Yup.number().min(1, "Minimum 1 guest").max(8, "Maximum 8 guests").required("We need the amount of guests"),
});
