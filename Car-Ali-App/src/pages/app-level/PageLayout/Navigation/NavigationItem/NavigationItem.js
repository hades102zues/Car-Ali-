import React from "react";
import styles from "./NavigationItem.module.css";
import { Link } from "react-router-dom";

const navigationItem = props => {
	const classes = [styles.navItem];
	if (props.navName === "LOGIN") classes.push(styles.highlight);
	return (
		<li className={classes.join(" ")}>
			<Link to={props.to}>{props.navName}</Link>
		</li>
	);
};

export default navigationItem;
