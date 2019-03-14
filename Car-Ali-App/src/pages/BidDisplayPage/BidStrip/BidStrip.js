import React, { Component } from "react";
import styles from "./BidStrip.module.css";
import { connect } from "react-redux";
import { base } from "../../app-level/constants";

class BidStrip extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bidValue: 0
		};
	}

	onInputChangeHandler = event => {
		this.setState({ bidValue: event.target.value });
	};

	onBidSubmitHandler = event => {
		if (!this.props.allowBidding) {
			event.preventDefault();
			return alert("Bidding For This Item Has Concluded");
		}
		if (this.state.bidValue > 0)
			fetch(`${base}/bid-upload`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + this.props.authToken
				},
				body: JSON.stringify({
					bid: this.state.bidValue,
					listingId: this.props.listingId
				})
			})
				.then(res => res.json())
				.then(data => {
					// alert("Bid Submitted");
					this.props.uploaded();
				})
				.catch(err => alert("Error Submitting Bid"));
		//setup a post call with authToken, listingId, bidvalue

		//make call to server
		event.preventDefault();
	};

	render() {
		return (
			<div className={styles.BidStrip}>
				<div className={styles.bidValue}>
					<p className={styles.bidText}>
						{this.state.bidValue
							? `$${parseFloat(this.state.bidValue).toFixed(2)}`
							: "$0"}
					</p>
				</div>
				<form
					onSubmit={this.onBidSubmitHandler}
					className={styles.form}
				>
					<div className={styles.bidBox}>
						<input
							type="number"
							placeholder="Enter your bid"
							className={styles.bidInput}
							value={this.state.bidValue}
							onChange={this.onInputChangeHandler}
						/>
					</div>
					<button
						type="submit"
						className={styles.bidButton}
						// disabled={!this.props.allowBidding}
					>
						PLACE YOUR BID
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.login.token
	};
};
export default connect(mapStateToProps)(BidStrip);
