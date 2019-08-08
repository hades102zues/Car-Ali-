import { STORE_TOKEN_REDUX } from "./actionTypes";
import { base } from "../constants";

const storeTokenBrowser = token => {
	localStorage.setItem("userToken", token);
};

const getTokenBrowser = () => {
	return localStorage.getItem("userToken");
};

const removeTokenBrowser = () => {
	localStorage.removeItem("userToken");
};

export const clearLogin = () => {
	removeTokenBrowser();
	return storeTokenRedux(null, null);
};

export const storeTokenRedux = (token, message) => {
	return {
		type: STORE_TOKEN_REDUX,
		token,
		message
	};
};

export const grabTokenFromLocal = () => {
	const token = getTokenBrowser();

	return storeTokenRedux(token, null);
};

export const signupUser = (userData, shouldSignUp) => dispatch => {
	const path = shouldSignUp ? "/signup" : "/login";


	let success = false;

	fetch(`${base}${path}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(userData)
	})
		.then(res => {
			console.log(res);
			if (res.status===200) {
				success = true;
			}

			return res.json();
			
		} )
		.then(data => {
			
			
			if  (success) {
				storeTokenBrowser(data.token);
				dispatch(storeTokenRedux(data.token, data.message));
			}
			else{
				dispatch(storeTokenRedux(null, data.message));
			}
			
		})
		.catch(err => console.log("signupuser", err));
};
