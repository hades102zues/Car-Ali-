import React from "react";
import Showcase from "./Showcase/Showcase";
import ResultsLister from "./ResultsLister/ResultsLister";
import Container from "../app-level/UI/Container/Container";

const resultsPage = () => {
	return (
		<div>
			<Showcase />
			<Container>
				<ResultsLister />
			</Container>
		</div>
	);
};

export default resultsPage;
