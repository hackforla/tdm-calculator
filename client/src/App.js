import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withToastProvider } from "./contexts/Toast";
import TdmCalculationContainer from "./components/TdmCalculationContainer";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Register from "./components/Register";
import ConfirmEmail from "./components/ConfirmEmail";
import Login from "./components/Login";
import Admin from "./components/Admin";
import LandingPage from "./components/LandingPage";
import "./styles/App.scss";
import axios from "axios";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

setTokenInHeaders();
class App extends React.Component {
  state = {
    account: {}
  };

  componentDidMount() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      try {
        const account = JSON.parse(currentUser);
        // TODO: remove console.log when stable.
        console.log(account);
        this.setState({ account });
      } catch (err) {
        // TODO: replace with production error logging.
        console.log(
          "Unable to parse current user from local storage.",
          currentUser
        );
      }
    }
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState !== this.state) {
      console.log("didUpdate");
      // checkSetToken();
    }
  }
  setLoggedInAccount = loggedInUser => {
    this.setState(
      { account: loggedInUser },
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser))
    );
  };

  setLoggedOutAccount = () => {
    localStorage.clear();
    this.setState({ account: {} }, history.push("/login"));
  };

  render() {
    const { account } = this.state;

    return (
      <div
        style={{
          height: "100%",
          margin: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch"
        }}
      >
        <Router>
          <Header account={account} />
          <NavBar
            account={account}
            setLoggedOutAccount={this.setLoggedOutAccount}
          />
          <div
            style={{
              flex: "1 0 auto",
              display: "flex",
              flexDirection: "column"
            }}
          >
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
                <Login setLoggedInAccount={this.setLoggedInAccount} />
              )}
            />
            <Route path="/contactus" component={ContactUs} />
            {account && account.role === "admin" ? (
              <Route path="/admin" render={() => <Admin account={account} />} />
            ) : null}
          </div>
        </Router>
      </div>
    );
  }
}

function setTokenInHeaders() {
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

export default withToastProvider(App);
