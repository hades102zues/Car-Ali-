import React from "react";
import styles from "./BidLister.module.css";
import BidItem from "./BidItem/BidItem";

const bidLister = props => {

	let bidItems = null;
	
	if(props.bidItems.length){
		bidItems = props.bidItems.map(bid => (
			<BidItem
				key={bid.id}
				listingId={bid.listing_id}
				cost={bid.bid}
				bidId={bid.id}
				deleteItem={props.deleteItem}
			/>
		));
	}


	
	

	return <div className={styles.BidLister}>{bidItems}</div>;
};

export default bidLister;
