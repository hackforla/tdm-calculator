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
          backgroundColor: "lightGray",
          borderRadius: "0.5em"
        }}
      >
        <h3>{rule.name}</h3>
        <h4>Rule Code: {rule.code}</h4>
        <textarea
          style={{ width: "70%", height: "10em" }}
          value={rule.functionBody}
          readOnly
        />
        <div style={{ display: "flex" }}>
          <button>Validate</button>
          <button>Update</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResultView;
