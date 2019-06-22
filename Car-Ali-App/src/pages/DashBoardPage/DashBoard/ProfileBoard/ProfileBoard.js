import React, { Component } from "react";
import styles from "./ProfileBoard.module.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { base } from "../../../app-level/constants";

class ProfileBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userDetails: null,
			initiateReloop: 1
		};
	}

	componentDidMount() {
		//redux only delivers the authToken after the component mounts
		// I used this to trigger a rerender so that i might call the fetch
		//in componentDidupdate
		this.setState({ initiateReloop: 2 });
	}

	componentDidUpdate() {
		if (this.state.userDetails === null) this.fetchData();
	}

	onImageChange = event => {
		this.submitImage(event.target.files["0"]);
	};

	submitImage = file => {
		const formData = new FormData();

		formData.append("image", file);
		fetch(`${base}/upload-user-image`, {
			headers: { Authorization: "Bearer " + this.props.authToken },
			method: "POST",
			body: formData
		})
			.then(res => this.props.history.push("/user/dashboard"))
			.catch(err => alert("Error Uploading Image"));
	};

	fetchData = () => {
		fetch(`${base}/user-details`, {
			headers: { Authorization: "Bearer " + this.props.authToken },
			method: "GET"
		})
			.then(res => res.json())
			.then(data => this.setState({ userDetails: data.userInfo }))
			.catch(err => console.log("No Network Available"));
	};

	render() {
		let output = null;

		if (this.state.userDetails) {
			output = (
				<div className={styles.profileBoard}>
					<p className={styles.item}>
						Username: {this.state.userDetails.username}
					</p>
					<p className={styles.item}>
						FullName: {this.state.userDetails.name}
					</p>
					<p className={styles.item}>
						Email: {this.state.userDetails.email}
					</p>

					<input
						type="file"
						onChange={event => this.onImageChange(event)}
					/>
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

export default connect(mapStateToProps)(withRouter(ProfileBoard));
