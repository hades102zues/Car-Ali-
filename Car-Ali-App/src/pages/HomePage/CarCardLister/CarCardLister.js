import React, { Component } from "react";
import styles from "./CarCardLister.module.css";
import CarCard from "./CarCard/CarCard";
import { withRouter } from "react-router-dom";
import { base } from "../../app-level/constants";

class CarCardLister extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carListings: [
				// {
				// 	imageUrl:
				// 		"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
				// 	status: 0,
				// 	year: "2005",
				// 	condition: "3.5/5",
				// 	verified: true,
				// 	cost: 500,
				// 	passengers: 5,
				// 	name: "BMW M3 COUPE",
				// 	listingId: 105
				// },
				// {
				// 	imageUrl:
				// 		"https://parkers-images.bauersecure.com/pagefiles/190699/cut-out/600x400/suzuki_swift10.jpg",
				// 	status: 1,
				// 	year: "2000",
				// 	condition: "",
				// 	verified: true,
				// 	name: "SUZUKI Swift"
				// },
				// {
				// 	imageUrl:
				// 		"https://icdn2.digitaltrends.com/image/2018-subaru-crosstrek-front-left-640x640.jpg",
				// 	status: 1,
				// 	year: "",
				// 	condition: "",
				// 	verified: true,
				// 	name: "SUBARU Crosstrek"
				// },
				// {
				// 	imageUrl:
				// 		"https://upload.wikimedia.org/wikipedia/commons/6/66/2015_Toyota_Fortuner_%28New_Zealand%29.jpg",
				// 	status: 1,
				// 	year: "",
				// 	condition: "",
				// 	verified: true,
				// 	name: "TOYOTA Fortuner"
				// }
			]
		};
	}

	componentDidMount() {
		this.fetchData();
	}
	cardClickHandler = listingId => {
		const search = `/bid-view/${listingId}`;
		this.props.history.push(search);
	};

	fetchData = () => {
		const url = this.props.featured ? "/featured-results" : "/some-results";
		fetch(`${base}${url}`)
			.then(res => res.json())
			.then(data => this.setState({ carListings: data.results }))
			.catch(err => console.log(err));
	};
	render() {
		let cardList = null;
		if (this.state.carListings.length) {
			cardList = this.state.carListings.map((listing, i) => (
				<CarCard
					key={i}
					listingId={listing.id}
					cardWidth={this.props.cardWidth}
					imageUrl={listing.image_path}
					status={listing.status}
					cost={listing.cost}
					year={listing.year}
					condition={listing.condition}
					verified={listing.verified}
					cardClicked={this.cardClickHandler}
				/>
			));
		}
		return <div className={styles.CarCardLister}>{cardList}</div>;
	}
}

export default withRouter(CarCardLister);
