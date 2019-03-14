import React from "react";
import Container from "../app-level/UI/Container/Container";
import CarCardLister from "./CarCardLister/CarCardLister";
import styles from "./HomePage.module.css";

const homePage = () => {
	return (
		<div>
			<Container>
				<h2 className={styles.h2}>Featured</h2>
				<div className={styles.featuredLister}>
					<CarCardLister cardWidth="75vw" featured />
				</div>
				<h4 className={styles.h4}>Listings</h4>
				<div className={styles.lister}>
					<CarCardLister cardWidth="55vw" />
				</div>
			</Container>
		</div>
	);
};

export default homePage;
