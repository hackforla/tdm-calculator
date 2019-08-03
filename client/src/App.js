import React from "react";
import TdmCalculationContainer from "./components/TdmCalculationContainer";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

import "./styles/App.scss";

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

export default App;
