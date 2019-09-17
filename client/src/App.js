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

class App extends React.Component {
  state = {
    account: {}
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
        <Route path="/login" component={Login} />
        <Route path="/contactus" component={ContactUs} />
        <Route path="/admin" render={() => <Admin account={account} />} />
      </Router>
    );
  }
}

export default App;
