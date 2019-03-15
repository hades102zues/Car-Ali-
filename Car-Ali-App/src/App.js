import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider, connect } from "react-redux";
import "./App.css";

import PageLayout from "./pages/app-level/PageLayout/PageLayout";

import HomePage from "./pages/HomePage/HomePage.js";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import LogoutPage from "./pages/LogoutPage/LogoutPage.js";
import SignupPage from "./pages/SignupPage/SignupPage.js";
import ResultsPage from "./pages/ResultsPage/ResultsPage.js";
import DashBoardPage from "./pages/DashBoardPage/DashBoardPage.js";
import BidDisplayPage from "./pages/BidDisplayPage/BidDisplayPage.js";
import ResetPasswordPage from "./pages/ResetPasswordPage/SignupPage.js";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirmPage/SignupPage.js";
import * as actions from "./redux/actions/login";

import store from "./redux/store";

class App extends Component {
  componentDidMount() {
    this.props.retrieveToken();
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <PageLayout>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/results" component={ResultsPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/logout" component={LogoutPage} />
              <Route path="/signup" component={SignupPage} />
              <Route path="/bid-view/:listingId" component={BidDisplayPage} />
              <Route path="/user/dashboard" component={DashBoardPage} />
              <Route path="/password-reset" component={ResetPasswordPage} />
              <Route
                path="/password-reset-confirm"
                component={ResetPasswordConfirmPage}
              />
              <Redirect to="/" />
            </Switch>
          </PageLayout>
        </BrowserRouter>
      </Provider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    retrieveToken: () => dispatch(actions.grabTokenFromLocal())
  };
};
export default connect(
  null,
  mapDispatchToProps
)(App);
