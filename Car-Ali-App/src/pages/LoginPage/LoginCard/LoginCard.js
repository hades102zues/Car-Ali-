import React, { Component } from "react";
import styles from "./LoginCard.module.css";
import { Form, Field, withFormik, ErrorMessage } from "formik";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../redux/actions/index";

class LoginCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginConfigs: [
				{
					type: "email",
					name: "email",
					placeholder: "Enter Your Email Address"
				},
				{
					type: "password",
					name: "password",
					placeholder: "Enter Your Password"
				}
			],
			serverAuthMessage: null
		};
	}

	onSignUpClickHandler = () => {
		this.props.history.push("/signup");
	};

	onPasswordResetClickHandler = () => {
		this.props.history.push("/password-reset");
	};
	render() {
		const configList = this.state.loginConfigs;

		const serverAuthMessageBox = this.props.serverAuthMessage ? (
			<div className={styles.authmessagebox}>
				{this.props.serverAuthMessage}
			</div>
		) : null;

		const fieldItems = configList.map(config => (
			<React.Fragment key={config.name}>
				<ErrorMessage
					name={config.name}
					render={msg => (
						<div className={styles.authmessagebox}>{msg}</div>
					)}
				/>

				<Field
					key={config.name}
					type={config.type}
					name={config.name}
					placeholder={config.placeholder}
					className={styles.field}
				/>
			</React.Fragment>
		));

		const redirect = this.props.authToken ? <Redirect to="/" /> : null;

		return (
			<div className={styles.LoginCard}>
				{redirect}
				<p className={styles.loginText}>Log Into Your Account</p>
				{serverAuthMessageBox}
				<Form className={styles.form}>
					{fieldItems}
					<button type="submit" className={styles.button}>
						Submit
					</button>
				</Form>
				<p
					className={styles.signupText}
					onClick={this.onSignUpClickHandler}
				>
					New User? Sign Up Now!
				</p>
				<p
					className={styles.signupText2}
					onClick={this.onPasswordResetClickHandler}
				>
					Forgot your password?
				</p>
			</div>
		);
	}
}

const formValidation = yup.object().shape({
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Please enter an email address"),
	password: yup
		.string()
		.min(6, "Password Must be Atleast 6 characters")
		// .matches(
		// 	/^[a-zA-Z0-9]+$/,
		// 	"Password must be made up of numbers and letters only"
		// )
		.required()
});

const mapDispatchToProps = dispatch => {
	return {
		signUp: (user, should) => dispatch(actions.signupUser(user, should))
	};
};

const mapStateToProps = state => {
	return {
		serverAuthMessage: state.login.serverAuthMessage,
		authToken: state.login.token
	};
};

const formikComp = withFormik({
	mapPropsToValues: () => {
		return {
			email: "",
			password: ""
		};
	},
	handleSubmit: (values, { props }) => {
		const userData = {
			email: values.email,
			password: values.password
		};
		props.signUp(userData, false);
	},
	validationSchema: formValidation
})(withRouter(LoginCard));

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(formikComp);
