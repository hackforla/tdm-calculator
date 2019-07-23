import React from "react";
import ReactDom from "react-dom";
import TdmCalculationContainer from "./components/TdmCalculation";

class App extends React.Component {
  render() {
    return (
      <div>
        <TdmCalculationContainer />
      </div>
    );
  }
}

ReactDom.render(<App />, document.querySelector("#root"));
