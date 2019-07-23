import React from "react";

const ResultView = props => {
  const { rule } = props;
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          margin: "0.5em",
          padding: "0.5em",
          backgroundColor: "lightGreen",
          borderRadius: "0.5em"
        }}
      >
        <h3>{rule.name}</h3>
        <div style={{ fontSize: "2em", flexBasis: "50%" }}>{rule.value}</div>
        <div> {rule.units}</div>
      </div>
    </React.Fragment>
  );
};

export default ResultView;
