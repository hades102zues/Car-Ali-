import React, { Component } from "react";
import Header from "./Header/Header";
import DropDown from "./DropDown/DropDown";

class PageLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayDropDown: false
		};
	}

	hamburgerClickedHandler = () => {
		this.setState(prevState => {
			return {
				displayDropDown: !prevState.displayDropDown
			};
		});
	};

	render() {
		return (
			<div>
				<Header hamburgerClicked={this.hamburgerClickedHandler} />
				<DropDown display={this.state.displayDropDown} />
				{this.props.children}
			</div>
		);
	}
}

export default PageLayout;
