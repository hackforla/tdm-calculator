import React from "react";
import ReactDom from "react-dom";
import TdmCalculationContainer from "./components/TdmCalculation";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

import "./styles/index.scss";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NavBar />
        <TdmCalculationContainer />
      </div>
    );
  }
}

ReactDom.render(<App />, document.querySelector("#root"));
