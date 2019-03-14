import React from "react";
import styles from "./DashBoard.module.css";
import { Switch, Route } from "react-router-dom";

import BidsBoard from "./BidsBoard/BidsBoard";
import ListingsBoard from "./ListingsBoard/ListingsBoard";
import ProfileBoard from "./ProfileBoard/ProfileBoard";

const dashBoard = () => {
	return (
		<div className={styles.dashBoard}>
			<Switch>
				<Route exact path="/user/dashboard/" component={ProfileBoard} />
				<Route
					path="/user/dashboard/user-listings"
					component={ListingsBoard}
				/>
				<Route path="/user/dashboard/user-bids" component={BidsBoard} />
			</Switch>
		</div>
	);
};

export default dashBoard;
