import React, { Component } from "react";
import styles from "./BidShowCase.module.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { base } from "../../app-level/constants";

class BidShowCase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mountReloop: 1,
			listingId: -1,
			carListings: [
				// {
				// 	imageUrl:
				// 		"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
				// 	status: 0,
				// 	year: "2005",
				// 	condition: "3.5/5",
				// 	verified: true,
				// 	cost: 500,
				// 	passengers: 5,
				// 	name: "BMW M3 COUPE",
				// 	listingId: 105
				// }
			]
		};
	}

	componentDidMount() {
		this.setState({ mountReloop: 2 });
	}

	componentDidUpdate() {
		if (!this.state.carListings.length)
			fetch(`${base}/listing-user/${this.props.match.params.listingId}`)
				.then(res => res.json())
				.then(data => {
					this.setState({ carListings: data.result });

					this.props.determineIfUserCanBid(data.result[0].closed);
				})
				.catch(err => alert("Failed to get info for showcase"));
	}

	render() {
		const { carListings } = this.state;
		let output = null;
		if (carListings.length) {
			const carListing = carListings[0];

			output = (
				<div>
					<div className={styles.BidShowCase}>
						<div className={styles.imageBox}>
							<img
								className={styles.img}
								src={`${base}/images/${carListing.image_path}`}
								alt="car_image"
							/>
						</div>
					</div>
					<div className={styles.namePlacer}>
						<p className={styles.carName}>{carListing.car_name}</p>
					</div>
					<div className={styles.infoBox}>
						<div className={styles.info}>
							<p className={styles.infoHeader}>STATUS</p>
							<p className={styles.infoText}>
								{carListing.status === 1
									? "CAR FOR SALE"
									: "CAR FOR HIRE /dy"}
							</p>
						</div>
						<div className={styles.info}>
							<p className={styles.infoHeader}>Asking Price</p>
							<p className={styles.infoText}>
								{carListing.cost
									? `$${carListing.cost}`
									: "$X.XX"}
							</p>
						</div>
						<div className={styles.info}>
							<p className={styles.infoHeader}>YEAR</p>
							<p className={styles.infoText}>{carListing.year}</p>
						</div>
						<div className={styles.info}>
							<p className={styles.infoHeader}>CONDITION</p>
							<p className={styles.infoText}>
								{carListing.condition}
							</p>
						</div>
						<div className={styles.info}>
							<p className={styles.infoHeader}>VERIFIED</p>
							<p className={styles.infoText}>
								{carListing.verified ? "YES" : "NO"}
							</p>
						</div>
					</div>
				</div>
			);
		}

		return output;
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.login.token
	};
};
export default connect(mapStateToProps)(withRouter(BidShowCase));
