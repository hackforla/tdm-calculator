import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TdmCalculationContainer from "./components/TdmCalculationContainer";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Register from "./components/Register";
import Login from "./components/Login";
import Admin from "./components/Admin";
import "./styles/App.scss";
import axios from "axios";

setTokenInHeaders();
class App extends React.Component {
  state = {
    account: {}
  };

  componentDidMount() {}

  componentDidUpdate(prevState, prevProps) {
    if (prevState !== this.state) {
      console.log("didUpdate");
      // checkSetToken();
    }
  }
  loginAccount = loggedInUser => {
    this.setState({ account: loggedInUser });
  };

  logoutAccount = () => {
    localStorage.clear();
    this.setState({ account: {} });
  };

  render() {
    const { account } = this.state;

    return (
      <Router>
        <Header />
        <NavBar account={account} />
        <Route exact path="/" component={TdmCalculationContainer} />
        <Route path="/calculation" component={TdmCalculationContainer} />
        <Route path="/about" component={About} />
        <Route path="/register" component={Register} />
        <Route
          path="/login"
          render={() => <Login loginAccount={this.loginAccount} />}
        />
        <Route path="/contactus" component={ContactUs} />
        {account.role === "admin" ? (
          <Route path="/admin" render={() => <Admin account={account} />} />
        ) : null}
      </Router>
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

export default App;
