import React from "react";

const NavButton = props => {
  return (
    <React.Fragment>
      {props.disabled ? (
        <div className="tdm-wizard-nav-button-disabled">{props.children}</div>
      ) : (
        <div className="tdm-wizard-nav-button" onClick={props.onClick}>
          {props.children}
        </div>
      )}
    </React.Fragment>
  );
};

export default NavButton;
