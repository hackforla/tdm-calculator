import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import Button from "./Button";

const useStyles = createUseStyles({
  switchView: {
    fontSize: "16px"
  }
});

const SwitchViewButton = ({ children, onViewChange, isDisplayed = true }) => {
  const theme = useTheme();
  const styles = useStyles({ theme });

  if (!isDisplayed) return null;
  return (
    <Button className={styles.switchView} onClick={onViewChange}>
      {children}
    </Button>
  );
};

SwitchViewButton.propTypes = {
  onViewChange: PropTypes.func,
  children: PropTypes.string,
  isDisplayed: PropTypes.bool
};

export default SwitchViewButton;
