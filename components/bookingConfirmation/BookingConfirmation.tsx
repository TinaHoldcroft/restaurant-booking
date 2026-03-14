import styles from "./BookingConfirmation.module.scss";
import { BookingConfirmationDetailItem } from "./BookingConfirmationDetailItem/BookingConfirmationDetailItem";

interface BookingConfirmationProps {
	name: string;
	guestCount: number;
	bookingType: "private" | "business";
	email: string;
	phone: string;
	date: string;
	arrivalTime: string;
	comment: string;
}

export const BookingConfirmation = ({
	name,
	guestCount,
	bookingType,
	email,
	phone,
	date,
	arrivalTime,
	comment,
}: BookingConfirmationProps) => {
	return (
		<section className={styles.bookingConfirmation} aria-labelledby="booking-confirmation-title">
			<h1 id="booking-confirmation-title" className={styles.bookingConfirmation__title}>
				Booking Confirmation
			</h1>

			<dl className={styles.bookingConfirmation__details}>
				<BookingConfirmationDetailItem term="Name" value={name} />
				<BookingConfirmationDetailItem term="Guests" value={guestCount} />
				<BookingConfirmationDetailItem term="Type" value={bookingType} />
				<BookingConfirmationDetailItem term="Email" value={email} />
				<BookingConfirmationDetailItem term="Phone" value={phone} />
				<BookingConfirmationDetailItem term="Date" value={date} />
				<BookingConfirmationDetailItem term="Arrival time" value={arrivalTime} />
				{comment && <BookingConfirmationDetailItem term="Comment" value={comment} />}
			</dl>
		</section>
	);
};
