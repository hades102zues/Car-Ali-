import React, { Component } from "react";
import styles from "./SignupCard.module.css";

import { Form, Field, withFormik, ErrorMessage } from "formik";
import { Redirect, withRouter } from "react-router-dom";
import { base } from "../../app-level/constants";

import * as yup from "yup";

class SignupCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signupConfigs: [
				{
					type: "email",
					name: "email",
					placeholder: "Enter Your Email Address"
				}
			]
		};
	}

	render() {
		const configList = this.state.signupConfigs;

		const serverAuthMessageBox = this.props.values.serverAuthMessage ? (
			<div className={styles.authmessagebox}>
				{this.props.values.serverAuthMessage}
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

		return (
			<div className={styles.signupCard}>
				<p className={styles.signupText}>
					Enter Email For Password Reset <br />A link will be sent to
					the email provided.
				</p>
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
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Please enter an email address")
});

const formikComp = withFormik({
	mapPropsToValues: () => {
		return {
			email: ""
		};
	},
	handleSubmit: (values, { props, setFieldValue }) => {
		fetch(`${base}/password-reset`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: values.email })
		})
			.then(res => {
				if (res.status === 400) return res.json();
				else props.history.push("/");
			})
			.then(data => {
				//only way i am allowed to dynamically add new data to be passed down
				setFieldValue("serverAuthMessage", data.message);
			})
			.catch(err => null);
	},
	validationSchema: formValidation
})(SignupCard);

export default withRouter(formikComp);
