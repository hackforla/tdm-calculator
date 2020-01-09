import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { withToastProvider } from "./contexts/Toast";
import TdmCalculationContainer from "./components/TdmCalculationContainer";
import Header from "./components/Header";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Register from "./components/Register";
import ConfirmEmail from "./components/ConfirmEmail";
import Login from "./components/Login";
import Admin from "./components/Admin";
import LandingPage from "./components/LandingPage/LandingPage";
import ResetPassword from './components/ResetPassword';
import ResetPasswordRequest from "./components/ResetPasswordRequest";
import "./styles/App.scss";
import axios from "axios";

const useStyles = createUseStyles({
  root: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column"
  }
});

const setTokenInHeaders = () => {
  axios.interceptors.request.use(
    config => {
      let token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
}

setTokenInHeaders();

const App = props => {
  const classes = useStyles();
  const [account, setAccount] = useState({});

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      try {
        account = JSON.parse(currentUser);
        // TODO: remove console.log when stable.
        console.log(account);
        setAccount({ account });
      } catch (err) {
        // TODO: replace with production error logging.
        console.log(
          "Unable to parse current user from local storage.",
          currentUser
        );
      }
    }
  });

  const setLoggedInAccount = (loggedInUser) => {
    setAccount(loggedInUser);
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
  };

  return (
    <div>
      <Router>
        <Header account={account} setAccount={setAccount} />
        <div className={classes.root}>
          <Route exact path="/" component={LandingPage} />
          <Route path="/calculation" component={TdmCalculationContainer} />
          <Route path="/about" component={About} />
          <Route path="/register/:email?" component={Register} />
          <Route path="/confirm/:token">
            <ConfirmEmail />
          </Route>
          <Route
            path="/login/:email?"
            render={() => (
              <Login setLoggedInAccount={setLoggedInAccount} />
            )}
          />
          <Route path="/forgotpassword">
            <ResetPasswordRequest />
          </Route>
          <Route path="/resetPassword/:token">
              <ResetPassword />
          </Route>
          <Route path="/contactus" component={ContactUs} />
          {account && account.role === "admin" ? (
            <Route path="/admin" render={() => <Admin account={account} />} />
          ) : null}
        </div>
      </Router>
    </div>
  );
}

export default withToastProvider(App);
