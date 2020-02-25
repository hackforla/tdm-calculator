import React from "react";
import PropTypes from "prop-types";

const NavButton = props => {
  return (
    <React.Fragment>
      {props.disabled ? (
        <div
          className="tdm-wizard-nav-button-disabled"
          data-testid={props.children}
        >
          {props.children}
        </div>
      ) : (
        <div
          className="tdm-wizard-nav-button"
          data-testid={props.children}
          onClick={props.onClick}
        >
          {props.children}
        </div>
      )}
    </React.Fragment>
  );
};

NavButton.propTypes = {
  disabled: PropTypes.boolean.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default NavButton;
