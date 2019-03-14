import React from "react";
import styles from "./Result.module.css";
import { base } from "../../../app-level/constants";

const result = props => {
	return (
		<div
			className={styles.result}
			onClick={() => props.resultClicked(props.listingId)}
		>
			<div className={styles.headerStatus}>
				<p className={styles.headerText}>
					{props.status === 1 ? "CAR FOR SALE" : "CAR FOR HIRE /dy"}
				</p>
			</div>
			<div className={styles.imageBox}>
				<img
					className={styles.img}
					src={`${base}/images/${props.imageUrl}`}
					alt="car"
				/>
			</div>
			<p className={styles.nameText}>{props.name}</p>

			<div className={styles.infoBox}>
				<div className={styles.info}>
					<p className={styles.infoHeader}>YEAR</p>
					<p className={styles.infoText}>{props.year}</p>
				</div>
				<div className={styles.info}>
					<p className={styles.infoHeader}>PASSENGERS</p>
					<p className={styles.infoText}>{props.passengers}</p>
				</div>
				<div className={styles.info}>
					<p className={styles.infoHeader}>CONDITION</p>
					<p className={styles.infoText}>{props.condition}/5</p>
				</div>
				<div className={styles.info}>
					<p className={styles.infoHeader}>VERIFIED</p>
					<p className={styles.infoText}>
						{props.verified ? "YES" : "NO"}
					</p>
				</div>
			</div>
			<div className={styles.bidHighlight}>
				<p className={styles.bidText}>ASKING PRICE</p>
				<p className={styles.bidPrice}>
					{props.cost ? `$${props.cost}` : "$X.XX"}
				</p>
			</div>
		</div>
	);
};

export default result;
