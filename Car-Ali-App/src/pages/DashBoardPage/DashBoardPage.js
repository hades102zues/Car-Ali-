import React from "react";
import DashBoardNavigaiton from "./DashBoardNavigaiton/DashBoardNavigaiton";
import DashBoard from "./DashBoard/DashBoard";
import styles from "./DashBoardPage.module.css";

const dashBoardPage = () => {
	return (
		<div className={styles.dashBoardPage}>
			<DashBoardNavigaiton />
			<DashBoard />
		</div>
	);
};

export default dashBoardPage;
