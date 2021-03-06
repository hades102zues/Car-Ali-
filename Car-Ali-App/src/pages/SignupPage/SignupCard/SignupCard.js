import React, { Component } from "react";
import styles from "./SignupCard.module.css";
import { connect } from "react-redux";
import { Form, Field, withFormik, ErrorMessage } from "formik";
import { Redirect } from "react-router-dom";
import * as yup from "yup";

import * as actions from "../../../redux/actions/index";

class SignupCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signupConfigs: [
				{
					type: "text",
					name: "userName",
					placeholder: "Enter A User Name"
				},
				{
					type: "text",
					name: "name",
					placeholder: "Enter Your Full Name"
				},
				{
					type: "email",
					name: "email",
					placeholder: "Enter Your Email Address"
				},
				{
					type: "password",
					name: "password",
					placeholder: "Enter Your Password"
				},
				{
					type: "password",
					name: "confirmPassword",
					placeholder: "Confirm Your Password"
				}
			],
			serverAuthMessage: null
		};
	}

	render() {
		const configList = this.state.signupConfigs;

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
			<div className={styles.signupCard}>
				{redirect}
				<p className={styles.signupText}>Sign Up For Your Account</p>
				{serverAuthMessageBox}
				<Form className={styles.form}>
					{fieldItems}
					<button type="submit" className={styles.button}>
						Submit
					</button>
				</Form>
			</div>
		);
	}
}

const formValidation = yup.object().shape({
	userName: yup.string().required("Please enter a user name"),
	name: yup.string().required(),
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
		.required("Please enter a password"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Both Passwords Must Match")
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
			userName: "",
			name: "",
			email: "",
			password: "",
			confirmPassword: ""
		};
	},
	handleSubmit: (values, { props }) => {
		const userData = {
			username: values.userName,
			name: values.name,
			email: values.email,
			password: values.password
		};
		props.signUp(userData, true);
	},
	validationSchema: formValidation
})(SignupCard);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(formikComp);
