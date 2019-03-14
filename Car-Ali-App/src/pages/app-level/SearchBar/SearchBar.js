import React, { Component } from "react";
import styles from "./SearchBar.module.css";
import { withRouter } from "react-router-dom";

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: "",
			indexType: "1"
		};
	}

	onInputChangeHandler = event => {
		this.setState({ input: event.target.value });
	};

	onSelectChangeHandler = event => {
		this.setState({ indexType: event.target.value });
	};

	onFormSubmitHandler = event => {
		event.preventDefault();
		const search = {
			pathname: "/results",
			search: `?inputQuery=${this.state.input}&indexQuery=${
				this.state.indexType
			}`
		};
		this.props.history.push(search);
	};

	render() {
		return (
			<div className={styles.SearchBar}>
				<form onSubmit={this.onFormSubmitHandler}>
					<select
						onChange={this.onSelectChangeHandler}
						className={styles.selector}
					>
						<option value="1">Buy</option>
						<option value="0">Hire</option>
					</select>
					<input
						type="text"
						placeholder="Search"
						className={styles.searchInput}
						value={this.state.input}
						onChange={this.onInputChangeHandler}
					/>
					<button type="submit" className={styles.button}>
						Search
					</button>
				</form>
			</div>
		);
	}
}

export default withRouter(SearchBar);
