import React from "react";
import styles from "./CarCard.module.css";
import { base } from "../../../app-level/constants";

const carCard = props => {
	return (
		<div
			className={styles.carCard}
			style={{ width: props.cardWidth }}
			onClick={() => props.cardClicked(props.listingId)}
		>
			<div className={styles.imageBox}>
				<img
					src={`${base}/images/${props.imageUrl}`}
					className={styles.carImage}
					alt="car_image"
				/>
			</div>
			<div className={styles.infoBox}>
				<div className={styles.info}>
					<p className={styles.infoHeader}>
						{props.status === 1
							? "CAR FOR SALE"
							: "CAR FOR HIRE /dy"}
					</p>
					<p className={styles.infoText}>{`$${props.cost}`}</p>
				</div>
				<div className={styles.info}>
					<p className={styles.infoHeader}>YEAR</p>
					<p className={styles.infoText}>{props.year}</p>
				</div>
				<div className={styles.info}>
					<p className={styles.infoHeader}>CONDITION</p>
					<p className={styles.infoText}>{props.condition}</p>
				</div>
				<div className={styles.info}>
					<p className={styles.infoHeader}>VERIFIED</p>
					<p className={styles.infoText}>
						{props.verified ? "YES" : "NO"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default carCard;
