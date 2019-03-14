import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../redux/actions/index";

const logoutPage = props => {
	props.logout();
	return (
		<div>
			<Redirect to="/" />
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(actions.clearLogin())
	};
};

export default connect(
	null,
	mapDispatchToProps
)(logoutPage);
