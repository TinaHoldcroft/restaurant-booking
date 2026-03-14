import styles from "./BookingConfirmationDetailItem.module.scss";

interface BookingConfirmationDetailItemProps {
	term: string;
	value: string | number;
}

export const BookingConfirmationDetailItem = ({ term, value }: BookingConfirmationDetailItemProps) => (
	<div className={styles.bookingConfirmationDetailItem}>
		<dt className={styles.bookingConfirmationDetailItem__term}>{term}</dt>
		<dd className={styles.bookingConfirmationDetailItem__value}>{value}</dd>
	</div>
);
