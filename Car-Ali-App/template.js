import React,{ Component } from "react";
import styles from './funct.module.css';

const funct = () =>{
	return(<div className={styles.funct}><p>I am funct</p></div>);
}

export default funct;

class Funct extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}


	render(){
		
	return(<div className={styles.funct}><p>I am funct</p></div>);
	}
}

export default Funct

console.log(queryString);
		const params = new URLSearchParams(queryString);
		console.log(params);