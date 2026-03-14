import styles from "./TableVisualization.module.scss";

const TABLE_DIAMETER = 60;
const CHAIR_GAP = 20; // px - gap between table edge and chairs
const CHAIR_DISTANCE = TABLE_DIAMETER / 2 + CHAIR_GAP;

interface TableVisualizationProps {
	guestCount: number;
}

export const TableVisualization = ({ guestCount }: TableVisualizationProps) => {
	const count = Math.min(Math.max(guestCount, 1), 14);

	const chairs = Array.from({ length: count }, (_, i) => {
		const angle = (i * 360) / count - 90;
		return { angle };
	});

	return (
		<div className={styles.tableVisualization}>
			<div className={styles.tableVisualization__table} />
			{chairs.map((chair, i) => (
				<div
					key={`chair-${
						// biome-ignore lint/suspicious/noArrayIndexKey: Index is stable here - chairs are never reordered, only added/removed from the end, ensuring smooth CSS transitions
						i
					}`}
					className={styles.tableVisualization__chairWrapper}
					style={{
						transform: `translate(-50%, -50%) rotate(${chair.angle}deg) translate(${CHAIR_DISTANCE}px)`,
					}}
				>
					<div className={styles.tableVisualization__chair} />
				</div>
			))}
		</div>
	);
};
