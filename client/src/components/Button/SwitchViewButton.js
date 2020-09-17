import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import Button from "./Button";

const useStyles = createUseStyles({
  switchView: {
    fontSize: "16px"
  }
});

const SwitchViewButton = ({ children, onViewChange }) => {
  const theme = useTheme();
  const styles = useStyles({ theme });

  return (
    <Button className={styles.switchView} onClick={onViewChange}>
      {children}
    </Button>
  );
};

SwitchViewButton.propTypes = {
  onViewChange: PropTypes.func,
  children: PropTypes.string
};

export default SwitchViewButton;
