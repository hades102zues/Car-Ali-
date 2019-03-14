import React, { Component } from "react";
import styles from "./BidBoard.module.css";
import BidOffers from "./BidOffers/BidOffers";
import { base } from "../../app-level/constants";

class BidBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bidList: [],
			allowPeriodicFunction: true
		};
	}

	componentDidUpdate() {
		if (!this.state.bidList.length) this.fetchData(this.periodicUpdate);
		if (this.props.uploadHappened) {
			this.fetchData(this.props.uploadReset);
		}
	}

	periodicUpdate = () => {
		if (this.state.allowPeriodicFunction) {
			const interval = setInterval(this.fetchData, 1000);
			this.setState({ interval, allowPeriodicFunction: false });
		}
	};

	componentWillUnmount() {
		clearInterval(this.state.interval);
	}

	fetchData = cb => {
		fetch(`${base}/listing-bids/${this.props.listingId}`)
			.then(res => res.json())
			//
			.then(data => this.setState({ bidList: data.results }, cb))
			.catch(err => console.log(err));
	};
	render() {
		return (
			<div className={styles.BidBoard}>
				<div className={styles.header}>
					<p className={styles.headerText}>TOP BIDS</p>
				</div>
				<div className={styles.columns}>
					<p className={styles.leftColumnName}>User</p>
					<p className={styles.rightColumnName}>BID</p>
				</div>
				<BidOffers bids={this.state.bidList} />
			</div>
		);
	}
}

export default BidBoard;
