import React from "react";

const WizardNavButton = props => {
  const { disabled } = props;
  return (
    <React.Fragment>
      {props.disabled ? (
        <div
          style={{
            paddingLeft: "0.7em",
            paddingRight: "0.7em",
            paddingTop: "0.35em",
            paddingBottom: "0.35em",
            display: "inline",
            margin: "0.5em",
            fontWeight: "bold",
            fontSize: "2em",
            textShadow: "0px 6px 4px rgba(0, 46, 109, 0.3)",
            textAlign: "center"
          }}
        >
          {props.children}
        </div>
      ) : (
        <div
          style={{
            paddingLeft: "0.7em",
            paddingRight: "0.7em",
            paddingTop: "0.35em",
            paddingBottom: "0.35em",
            backgroundColor: "#A7C539",
            display: "inline",
            margin: "0.5em",
            fontWeight: "bold",
            fontSize: "2em",
            boxShadow: "0px 6px 4px rgba(0,46,109,0.3)",
            textAlign: "center"
          }}
          onClick={props.onClick}
        >
          {props.children}
        </div>
      )}
    </React.Fragment>
  );
};

export default WizardNavButton;
