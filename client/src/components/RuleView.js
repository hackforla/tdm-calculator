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
          width: "97%",
          margin: "0.5em",
          padding: "0.5em",
          backgroundColor: "lightBlue",
          borderRadius: "0.5em"
        }}
      >
        <h3>{rule.name}</h3>
        <div style={{ display: "flex" }}>
          <h4>Rule Code: {rule.code}</h4>
          <a href="">edit</a>
        </div>
        <textarea
          style={{ width: "70%", height: "10em" }}
          value={rule.functionBody}
          readOnly
        />
      </div>
    </React.Fragment>
  );
};

export default ResultView;
