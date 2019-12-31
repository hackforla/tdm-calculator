import React from "react";

const WizardNavButton = props => {
  const { disabled } = props;
  return (
    <React.Fragment>
      {props.disabled ? (
        <div
          style={{
            paddingLeft: "1.5em",
            paddingRight: "1.5em",
            paddingTop: "1em",
            paddingBottom: "1em",
            display: "inline",
            margin: "0.5em",
            fontWeight: "bold",
            textShadow: "0px 8px 2px #80808080",
            textAlign: "center"
          }}
          onClick={props.onClick}
        >
          {props.children}
        </div>
      ) : (
        <div
          style={{
            paddingLeft: "1.5em",
            paddingRight: "1.5em",
            paddingTop: "1em",
            paddingBottom: "1em",
            backgroundColor: "orange",
            display: "inline",
            margin: "0.5em",
            fontWeight: "bold",
            textShadow: "0px 8px 2px #80808080",
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
