import React, { Component } from "react";
import styles from "./ResultsLister.module.css";
import Result from "./Result/Result";
import { withRouter } from "react-router-dom";
import { base } from "../../app-level/constants";

class ResultsLister extends Component {
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
			],
			initiateReloop: 1,
			searchResults: null,
			searchMode: false
		};
	}

	resultClickHandler = listingId => {
		const search = `/bid-view/${listingId}`;
		this.props.history.push(search);
	};

	componentDidMount() {
		this.setState({ initiateReloop: 2 });
	}

	componentDidUpdate() {
		const queryString = this.props.location.search; //is a string
		//if no search query was done then queryString will be ''
		if (queryString.length) {
			//inputQuery represents the car name
			//indexQuery represents the listing status

			const searchItems = new URLSearchParams(queryString);
			let searchResults = {};
			//p is an array of strings with index 0 being the key and index 1 being the value
			for (let p of searchItems) {
				searchResults[p[0]] = p[1];
			}

			//if results have not already been set then go ahead and fetch
			if (this.state.searchResults === null)
				return this.setState(
					{ searchResults, searchMode: true },
					this.fetchData
				);
			//if the user got to the page by search searchMode and hit the search button
			//with some new options
			if (
				this.state.searchMode &&
				(searchResults.inputQuery !==
					this.state.searchResults.inputQuery ||
					searchResults.indexQuery !==
						this.state.searchResults.indexQuery)
			)
				this.setState(
					{ searchResults, searchMode: true },
					this.fetchData
				);
		} else {
			if (
				this.state.searchResults === null &&
				!this.state.carListings.length
			) {
				this.fetchData();
			}
			//this.setState({ searchResults: null, searchMode: false });
		}
	}

	fetchData = () => {
		if (this.state.searchMode) {
			fetch(`${base}/catalog-query`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					searchResults: this.state.searchResults
				})
			})
				.then(res => res.json())
				.then(data => this.setState({ carListings: data.results }))
				.catch(err => console.log(err));
		} else {
			fetch(`${base}/catalog`)
				.then(res => res.json())
				.then(data => this.setState({ carListings: data.results }))
				.catch(err => console.log(err));
		}
	};

	render() {
		const resultList = this.state.carListings.map((listing, i) => (
			<Result
				key={i}
				listingId={listing.id}
				cardWidth={this.props.cardWidth}
				imageUrl={listing.image_path}
				status={listing.status}
				cost={listing.cost}
				year={listing.year}
				condition={listing.condition}
				verified={listing.verified}
				name={listing.car_name}
				passengers={listing.passengers}
				resultClicked={this.resultClickHandler}
			/>
		));
		return <div className={styles.ResultsLister}>{resultList}</div>;
	}
}

export default withRouter(ResultsLister);
