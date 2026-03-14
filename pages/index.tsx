import { BookingConfirmation } from "@/components/bookingConfirmation/BookingConfirmation";
import { BookingForm } from "@/components/bookingForm/BookingForm";
import { Layout } from "@/components/layout/Layout";
import { useBookingForm } from "@/hooks/useBookingForm";
import type { NextPageWithLayout } from "./_app";
import styles from "./index.module.scss";

const HomePage: NextPageWithLayout = () => {
	const { formik, formVisible, handleSubmit, handleReset } = useBookingForm();

	return (
		<>
			{formVisible ? (
				<section className={styles.homepage}>
					<h1 className={styles.homepage__title}>Book a Table</h1>
					<BookingForm formik={formik} onSubmit={handleSubmit} onReset={handleReset} />
				</section>
			) : (
				<BookingConfirmation
					name={formik.values.name}
					guestCount={Number(formik.values.amount)}
					bookingType={formik.values.type}
					email={formik.values.email}
					phone={formik.values.phoneNumber}
					date={formik.values.date}
					arrivalTime={formik.values.arrival}
					comment={formik.values.comment}
				/>
			)}
		</>
	);
};

HomePage.getLayout = function getLayout(page) {
	return (
		<Layout className="homepage" title="Home">
			{page}
		</Layout>
	);
};

export default HomePage;
