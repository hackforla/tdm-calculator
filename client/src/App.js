import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TdmCalculationContainer from "./components/TdmCalculationContainer";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Admin from "./components/Admin";

import "./styles/App.scss";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <NavBar />

        <Route exact path="/" component={TdmCalculationContainer} />
        <Route path="/calculation" component={TdmCalculationContainer} />
        <Route path="/about" component={About} />
        <Route path="/contactus" component={ContactUs} />
        <Route path="/admin" component={Admin} />
      </Router>
    );
  }
}

export default App;
