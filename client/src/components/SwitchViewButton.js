import React from "react";

const SwitchViewButton = props => {
  const { disabled } = props;
  return (
    <React.Fragment>
      {props.disabled ? (
        <div
          style={{
            paddingLeft: "1em",
            paddingRight: "1em",
            paddingTop: "0.5em",
            paddingBottom: "0.5em",
            display: "inline",
            margin: "0.5em",
            fontWeight: "bold",
            fontSize: "1em",
            textShadow: "0px 6px 4px rgba(0, 46, 109, 0.3)",
            textAlign: "center"
          }}
        >
          {props.children}
        </div>
      ) : (
        <div
          style={{
            paddingLeft: "1em",
            paddingRight: "1em",
            paddingTop: "0.5em",
            paddingBottom: "0.5em",
            backgroundColor: "#A7C539",
            display: "inline",
            margin: "0.5em",
            fontWeight: "bold",
            fontSize: "1em",
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

export default SwitchViewButton;
