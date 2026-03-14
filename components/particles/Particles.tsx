import styles from "./Particles.module.scss";

export const Particles = () => {
	const n = 10;

	return (
		<div className={styles["particle-container"]}>
			{[...Array(n)].map((_e, i) => {
				return <div key={i} className={styles.particle} />;
			})}
		</div>
	);
};
