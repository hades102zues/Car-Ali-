import React, { Component } from "react";
import styles from "./BidOffers.module.css";
import BidOffer from "./BidOffer/BidOffer";

class BidOffers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// bids: [
			// 	{
			// 		userImageUrl:
			// 			"https://images.pexels.com/photos/556658/pexels-photo-556658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
			// 		userName: "Jackson",
			// 		bid: 500.5
			// 	},
			// 	{
			// 		userImageUrl:
			// 			"https://images.pexels.com/photos/556658/pexels-photo-556658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
			// 		userName: "Jackson",
			// 		bid: 500.5
			// 	},
			// 	{
			// 		userImageUrl:
			// 			"https://images.pexels.com/photos/556658/pexels-photo-556658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
			// 		userName: "Jackson",
			// 		bid: 500.5
			// 	},
			// 	{
			// 		userImageUrl:
			// 			"https://images.pexels.com/photos/556658/pexels-photo-556658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
			// 		userName: "Jackson",
			// 		bid: 500.5
			// 	},
			// 	{
			// 		userImageUrl:
			// 			"https://images.pexels.com/photos/556658/pexels-photo-556658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
			// 		userName: "Jackson",
			// 		bid: 500.5
			// 	}
			// ]
		};
	}

	render() {
		const bidOffers = this.props.bids.map(bid => (
			<BidOffer
				key={bid.id}
				bidId={bid.id}
				userName={bid.user_name}
				bid={bid.bid}
				userImageUrl={bid.user_path}
				won={bid.won}
			/>
		));

		return <div className={styles.BidOffers}>{bidOffers}</div>;
	}
}

export default BidOffers;
