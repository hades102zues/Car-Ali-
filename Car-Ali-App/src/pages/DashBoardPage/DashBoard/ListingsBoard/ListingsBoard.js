import React, { Component } from "react";
import styles from "./ListingsBoard.module.css";
import Lister from "./Lister/Lister";
import ListerCard from "./ListerCard/ListerCard";
import { connect } from "react-redux";
import { base } from "../../../app-level/constants";

class listingsBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showListCard: false,
			listItems: [],
			fetchDidOccur: false,
			initiateReloop: 1,
			editPackage: null,
			isEditMode: false
		};
	}

	componentDidMount() {
		//redux only delivers the authToken after the component mounts
		// I used this to trigger a rerender so that i might call the fetch
		//in componentDidupdate
		this.setState({ initiateReloop: 2 });
	}

	componentDidUpdate() {

		if(!this.state.fetchDidOccur){
			this.fetchData();
		}
	
	}

	onListCardPopUp = () => {
		this.toggleListCard();
	};

	onListCardPopUpEdit = editPackage => {
		//if i already went for an edit
		if (this.state.editPackage !== null) {
			//flip the edit mode to false
			this.flipEditMode(() => {
				//clear the edit package and then close the popup
				this.setState({ editPackage: null }, () => {
					this.toggleListCard();
				});
			});
			return;
		}

		//now in edit mode
		this.setState({ editPackage }, () => {
			this.flipEditMode(this.toggleListCard);
		});
	};

	toggleListCard = cb => {
		this.setState(currState => {
			return { showListCard: !currState.showListCard };
		}, cb);
	};

	flipEditMode = cb => {
		this.setState(
			currState => this.setState({ isEditMode: !currState.isEditMode }),
			cb
		);
	};
	uploadDidHappen = () => {
		this.fetchData();
	};

	fetchData = () => {
		fetch(`${base}/listings-user`, {
			headers: { Authorization: "Bearer " + this.props.authToken },
			method: "GET"
		})
			.then(res =>{

				this.setState({fetchDidOccur: true});
				 if(res.status === 200){
					return res.json();
				 }
			})
			.then(data => this.setState({ listItems: data.results }))
			.catch(err => {
				
				this.setState({fetchDidOccur: true});
				console.log("Error Retrieving Listing Data")
		
			});
	};

	onDeleteItemHandler = listId => {
		fetch(`${base}/listing-user`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + this.props.authToken
			},
			method: "DELETE",
			body: JSON.stringify({ listingId: listId })
		})
			.then(res => this.fetchData())

			.catch(err => console.log("Error Deleting Listing"));
	};

	onAcceptItemHandler = listId => {
		fetch(`${base}/listing-user-accept-bid`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + this.props.authToken
			},
			method: "POST",
			body: JSON.stringify({ listingId: listId })
		})
			.then(res => {
				alert("Bidding Closed");
				this.fetchData();
			})

			.catch(err => alert("Error Closing Bidding"));
	};

	render() {
		const listCard = this.state.showListCard ? (
			<ListerCard
				didUpload={this.uploadDidHappen}
				show={this.state.showListCard}
				hide={this.onListCardPopUp}
				afterEdit={this.onListCardPopUpEdit}
				editPackage={this.state.editPackage}
				isEditMode={this.state.isEditMode}
				resetEditMode={this.flipEditMode}
			/>
		) : null;
		return (
			<div className={styles.listtingBoard}>
				<div className={styles.boardHeading}>
					<p className={styles.boardName}>All Listings</p>
					<div
						className={styles.addButton}
						onClick={this.onListCardPopUp}
					>
						<p className={styles.plus}>+</p>
					</div>
				</div>
				<div className={styles.listingHeading}>
					<div className={styles.left}>
						<p className={styles.number}>Car</p>
						<p className={styles.push}>List Status</p>
						<p className={styles.car}>Asking Price</p>
					</div>
					<div className={styles.modify}>
						<p className={styles.modify}>Operations</p>
					</div>
				</div>
				<Lister
					listItems={this.state.listItems}
					acceptItem={this.onAcceptItemHandler}
					deleteItem={this.onDeleteItemHandler}
					show={this.onListCardPopUpEdit}
				/>
				{listCard}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		authToken: state.login.token
	};
};

export default connect(mapStateToProps)(listingsBoard);
