import React, { Component } from "react";
import styles from "./Lister.module.css";
import ListItem from "./ListItem/ListItem";

class Lister extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const listItems = this.props.listItems.map(item => (
			<ListItem
				carName={item.car_name}
				condition={item.condition}
				cost={item.cost}
				userId={item.user_id}
				id={item.id}
				passengers={item.passengers}
				status={item.status}
				year={item.year}
				verified={item.verified}
				key={item.id}
				closed={item.closed}
				deleteItem={this.props.deleteItem}
				acceptItem={this.props.acceptItem}
				showListingCard={this.props.show}
			/>
		));

		return <div className={styles.Lister}>{listItems}</div>;
	}
}

export default Lister;
