import React from "react";
import PropTypes from "prop-types";

const NavButton = ({ disabled, dataTestId, children, onClick }) => {
  return (
    <React.Fragment>
      {disabled ? (
        <button
          className="tdm-wizard-nav-button-disabled"
          data-testid={dataTestId}
        >
          {children}
        </button>
      ) : (
        <button
          className="tdm-wizard-nav-button"
          data-testid={dataTestId}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </React.Fragment>
  );
};

NavButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired
};

export default NavButton;
