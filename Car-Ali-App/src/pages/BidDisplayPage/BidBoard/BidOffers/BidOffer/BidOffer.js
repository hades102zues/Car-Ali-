import React from "react";
import styles from "./BidOffer.module.css";
import { base } from "../../../../app-level/constants";

const bidOffer = props => {
	return (
		<div
			className={styles.bidOffer}
			style={{ backgroundColor: props.won ? "green" : null }}
		>
			<p className={styles.winner}>WINNER</p>
			<div className={styles.placerAid}>
				<div className={styles.userData}>
					<div className={styles.imageBox}>
						<img
							className={styles.img}
							src={`${base}/images/${props.userImageUrl}`}
							alt="usr_image"
						/>
					</div>
					<p className={styles.userName}>{props.userName}</p>
				</div>
				<div className={styles.bidData}>
					<p className={styles.bid}>
						{props.bid ? `$${props.bid}` : "$X.XX"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default bidOffer;
