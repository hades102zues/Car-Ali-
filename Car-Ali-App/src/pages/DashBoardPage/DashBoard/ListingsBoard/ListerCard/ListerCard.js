import React, { Component } from "react";
import styles from "./ListerCard.module.css";
import { connect } from "react-redux";
//import * as yup from "yup";
import { base } from "../../../../app-level/constants";

import { Form, Field, withFormik, ErrorMessage } from "formik";

class ListerCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			configs: [
				{
					type: "select",
					name: "status",
					placeholder: "Enter Your Email Address",
					optionsConfigs: [
						{ value: "1", text: "Sale" },
						{ value: "0", text: "Hire" }
					]
				},
				{
					type: "text",
					name: "carName",
					placeholder: "Brand and Name of The Car"
				},
				{
					type: "number",
					name: "year",
					placeholder: "Enter The Car's Year"
				},
				{
					type: "number",
					min: 1,
					max: 5,
					name: "condition",
					placeholder: "Rate The Car's Condition out of 5"
				},
				{
					type: "select",
					name: "verified",
					placeholder: "Is the car verified?",
					optionsConfigs: [
						{ value: "1", text: "Car is verified" },
						{ value: "0", text: "Car is not verified" }
					]
				},
				{
					type: "number",
					name: "cost",
					placeholder: "Asking value in BBDS"
				},
				{
					type: "number",
					name: "passengers",
					min: 1,
					max: 10,
					placeholder: "Enter Passenger Capacity"
				}
			]
		};
	}

	render() {
		const configList = this.state.configs;
		const fieldItems = configList.map(config => {
			let field = null;
			if (config.type === "select") {
				const options = config.optionsConfigs.map((option, i) => {
					let selected = "";

					if (this.props.isEditMode) {
						selected =
							option.value === this.props.editPackage[config.name]
								? "selected"
								: "";
					}

					return (
						<option
							key={config.name + i}
							value={option.value}
							selected={selected}
						>
							{option.text}
						</option>
					);
				});
				field = (
					<Field
						component={config.type}
						name={config.name}
						className={styles.fieldSelect}
					>
						{options}
					</Field>
				);
			} else if (config.type === "number") {
				field = (
					<Field
						key={config.name}
						type={config.type}
						name={config.name}
						placeholder={config.placeholder}
						className={styles.field}
						min={config.min}
						max={config.max}
					/>
				);
			} else {
				field = (
					<Field
						key={config.name}
						type={config.type}
						name={config.name}
						placeholder={config.placeholder}
						className={styles.field}
					/>
				);
			}
			return (
				<React.Fragment key={config.name}>
					<ErrorMessage
						name={config.name}
						render={msg => (
							<div className={styles.authmessagebox}>{msg}</div>
						)}
					/>
					{field}
				</React.Fragment>
			);
		});

		const render = ( //this.props.show ? (
			<div className={styles.ListerCard}>
				<Form>
					{fieldItems}

					<ErrorMessage
						name="imageUrl"
						render={msg => (
							<div className={styles.authmessagebox}>{msg}</div>
						)}
					/>
					<input
						type="file"
						name="image"
						onChange={event => {
							//necessary inorder to capture the FILE object
							this.props.setFieldValue(
								"image",
								event.target.files["0"]
							);
						}}
						value={this.props.values.email}
					/>
					<button type="submit" className={styles.button}>
						Submit
					</button>
				</Form>
				<button
					className={styles.button}
					style={{ backgroundColor: "green" }}
					onClick={() => {
						if (this.props.isEditMode) {
							this.props.afterEdit();
						} else {
							this.props.hide();
						}
					}}
				>
					Close
				</button>
			</div>
		);
		return render;
	}
}

// const formValidation = yup.object().shape({
// 	status: yup.required("This field is required"),
// 	carName: yup.required("This field is required"),
// 	year: yup.required("This field is required"),
// 	condition: yup.required("This field is required"),
// 	verified: yup.required("This field is required"),
// 	cost: yup.required("This field is required"),
// 	passengers: yup.required("This field is required"),
// 	image: yup.required("This field is required")
// });

const formikComp = withFormik({
	mapPropsToValues: props => {
		let itemToTreturn = {};
		if (props.isEditMode) {
			itemToTreturn = {
				status: props.editPackage.status,
				carName: props.editPackage.carName,
				year: props.editPackage.year,
				condition: props.editPackage.condition,
				verified: props.editPackage.verified,
				cost: props.editPackage.cost,
				passengers: props.editPackage.passengers
			};
		} else {
			itemToTreturn = {
				status: 1,
				carName: "",
				year: "",
				condition: "",
				verified: 1,
				cost: "",
				passengers: ""
			};
		}
		return itemToTreturn;
	},
	handleSubmit: (values, { props }) => {
		//to submit we need to use formdata
		let formData = new FormData();
		for (let item in values) formData.append(item, values[item]);

		const url = props.isEditMode ? "/listing-user" : "/listing";
		const method = props.isEditMode ? "PATCH" : "POST";

		if (props.isEditMode) {
			formData.append("listingId", props.editPackage.id);
		}

		fetch(`${base}${url}`, {
			headers: {
				Authorization: "Bearer " + props.authToken
			},
			method: method,
			body: formData
		})
			.then(res => {
				props.hide();
				props.didUpload();
			})
			.catch(err => alert("Error Uploading Listing", err));
	}
	//validationSchema: formValidation
})(ListerCard);

const mapStateToProps = state => {
	return {
		authToken: state.login.token
	};
};
export default connect(mapStateToProps)(formikComp);
