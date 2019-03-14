import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import styles from "./Navigation.module.css";
import { connect } from "react-redux";

const navigation = props => {
	const baseNavConfigs = [
		{ to: "/results", navName: "CATALOG" },
		{ to: "/login", navName: "LOGIN" }
	];

	const loggedInConfigs = [
		{ to: "/results", navName: "CATALOG" },
		{ to: "/user/dashboard", navName: "DASHBOARD" },
		{ to: "/logout", navName: "LOGOUT" }
	];

	const navigationItems = props.userToken
		? loggedInConfigs.map(config => (
				<NavigationItem
					key={config.navName}
					to={config.to}
					navName={config.navName}
				/>
		  ))
		: baseNavConfigs.map(config => (
				<NavigationItem
					key={config.navName}
					to={config.to}
					navName={config.navName}
				/>
		  ));

	return (
		<nav className={styles.Nav}>
			<ul style={{ listStyle: "none", display: "flex" }}>
				{navigationItems}
			</ul>
		</nav>
	);
};

const mapStateToProps = state => {
	return {
		userToken: state.login.token
	};
};

export default connect(mapStateToProps)(navigation);
