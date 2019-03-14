import React, { Component } from "react";
import styles from "./DashBoardNavigaiton.module.css";
import DashNavItem from "./DashNavItem/DashNavItem";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { base } from "../../app-level/constants";

class DashBoardNavigaiton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: null
		};
	}
	componentDidMount() {
		//redux only delivers the authToken after the component mounts
		// I used this to trigger a rerender so that i might call the fetch
		//in componentDidupdate
		this.setState({ initiateReloop: 2 });
	}

	componentDidUpdate() {
		if (this.state.image === null) this.fetchData();
	}

	fetchData = () => {
		fetch(`${base}/user-image`, {
			headers: { Authorization: "Bearer " + this.props.authToken },
			method: "GET"
		})
			.then(res => res.json())
			.then(data => {
				if (data.filename === null) this.setState({ image: "" });
				else this.setState({ image: data.filename });
			})
			.catch(err => null);
	};

	render() {
		const imageSrc = this.state.image === null ? "" : this.state.image;

		const navItemList = [
			{ navName: "PROFILE", to: `${this.props.match.path}` },
			{
				navName: "LISTINGS",
				to: `${this.props.match.path}/user-listings`
			},
			{ navName: "BIDS", to: `${this.props.match.path}/user-bids` }
		];
		const navItems = navItemList.map(config => (
			<DashNavItem
				key={config.navName}
				navName={config.navName}
				exact
				to={config.to}
			/>
		));
		return (
			<div className={styles.dashBoardNavigaiton}>
				<div className={styles.imageBox}>
					<img
						className={styles.img}
						src={`${base}/images/${imageSrc}`}
						alt="usr_image"
					/>
				</div>
				<div className={styles.navigationItems}>{navItems}</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.login.token
	};
};

export default connect(mapStateToProps)(withRouter(DashBoardNavigaiton));
