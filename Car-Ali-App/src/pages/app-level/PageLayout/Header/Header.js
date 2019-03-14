import React from "react";
import styles from "./Header.module.css";

import Container from "../../UI/Container/Container";
import Navigation from "../Navigation/Navigation";
import SearchBar from "../../SearchBar/SearchBar";
import { withRouter } from "react-router-dom";

const header = props => {
	return (
		<div className={styles.Header}>
			<Container>
				<div style={{ height: 50 }}>
					<h2
						className={styles.logo}
						onClick={() => props.history.push("/")}
					>
						CAR-ALI
					</h2>
					<div className={styles.positionNav}>
						<Navigation />
						<div
							className={styles.hamburger}
							onClick={props.hamburgerClicked}
						>
							<div className={styles.hamburger__slice} />
							<div className={styles.hamburger__slice} />
							<div className={styles.hamburger__slice} />
						</div>
					</div>
				</div>
				<div className={styles.positionSearch}>
					<SearchBar />
				</div>
			</Container>
		</div>
	);
};

export default withRouter(header);
