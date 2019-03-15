import React from "react";
import styles from "./SignupPage.module.css";
import SignupCard from "./SignupCard/SignupCard";

const signupPage = () => {
	return (
		<div className={styles.signupPage}>
			<div className={styles.signupCardplacer}>
				<SignupCard />
			</div>
		</div>
	);
};

export default signupPage;
