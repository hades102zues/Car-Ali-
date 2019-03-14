import React from "react";
import styles from "./Login.module.css";
import LoginCard from "./LoginCard/LoginCard";

const loginPage = () => {
	return (
		<div className={styles.loginPage}>
			<div className={styles.loginCardplacer}>
				<LoginCard />
			</div>
		</div>
	);
};

export default loginPage;
