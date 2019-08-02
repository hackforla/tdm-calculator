import React from "react";
import ReactDom from "react-dom";
import TdmCalculationContainer from "./components/TdmCalculation";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Admin from "./components/Admin";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./styles/index.scss";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NavBar />

        <Route exact path="/" component={TdmCalculationContainer} />
        <Route path="/calculation" component={TdmCalculationContainer} />
        <Route path="/about" component={About} />
        <Route path="/contactus" component={ContactUs} />
        <Route path="/admin" component={Admin} />
      </div>
    );
  }
}

ReactDom.render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#root")
);
