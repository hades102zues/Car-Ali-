import React, { Component } from "react";
import Container from "../app-level/UI/Container/Container";
import { connect } from "react-redux";
import styles from "./BidDisplayPage.module.css";
import BidShowCase from "./BidShowCase/BidShowCase";
import BidBoard from "./BidBoard/BidBoard";
import BidStrip from "./BidStrip/BidStrip";

class BidDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mountReloop: 1,
			listingId: -1,
			uploadDidHappen: false,
			allowUserToBid: null
			//startingPrice: 0
		};
	}

	componentDidMount() {
		this.setState({ mountReloop: 2 });
	}

	determineIfUserCanBid = bidStatus => {
		this.setState({ allowUserToBid: !bidStatus ? true : false });
	};

	bidWasUploaded = () => {
		this.setState({ uploadDidHappen: true });
	};

	resetUploaded = () => {
		this.setState({ uploadDidHappen: false });
	};

	componentDidUpdate() {
		//in future make a request with the user id and listing id
		//if listing id occurs along side the userid then
		//do not mount the <BidStrip />
		//also pass down the starting value for the bidstrip bidvalue

		if (this.state.listingId < 0)
			this.setState({ listingId: this.props.match.params.listingId });
	}

	render() {
		return (
			<div>
				<BidShowCase
					determineIfUserCanBid={this.determineIfUserCanBid}
				/>
				<Container>
					<div className={styles.bidPlacer}>
						<BidBoard
							listingId={this.state.listingId}
							uploadReset={this.resetUploaded}
							uploadHappened={this.state.uploadDidHappen}
						/>
						<BidStrip
							listingId={this.state.listingId}
							uploaded={this.bidWasUploaded}
							allowBidding={this.state.allowUserToBid}
						/>
					</div>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.login.token
	};
};
export default connect(mapStateToProps)(BidDisplay);
