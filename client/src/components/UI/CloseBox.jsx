import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import { MdClose } from "react-icons/md";
import clsx from "clsx";

const useStyles = createUseStyles(theme => ({
  container: {
    cursor: "pointer",
    border: "none",
    cursor: "pointer",
    height: "24px",
    width: "24px",
    padding: "0"
  }
}));

const CloseBox = props => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div {...props} className={clsx(props.className || "", classes.container)}>
      <MdClose style={{ height: "24px", width: "24px" }} />
    </div>
  );
};

CloseBox.propTypes = {
  onClick: PropTypes.func
};

export default CloseBox;
