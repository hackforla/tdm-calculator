import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  projectInfoDetailsSubContainer: {
    display: "flex",
    alignItems: "baseline",
    maxHeight: "20px",
    width: "50%",
    fontSize: "0.875rem"
  },
  projectInfoCategory: {
    fontWeight: "600",
    textTransform: "uppercase",
    color: "rgba(0, 0, 0, 1)",
    marginRight: "2px"
  },
  projectInfoDetails: {
    color: "rgba(0, 5, 30, 1)",
    fontFamily: "Calibri",
    fontWeight: 400
  }
});

const ProjectInfo = props => {
  const classes = useStyles();
  const { name, rule } = props;

  return (
    <div className={classes.projectInfoDetailsSubContainer}>
      <span className={classes.projectInfoCategory}>{name + ":"}</span>
      {rule && rule.value ? (
        <span className={classes.projectInfoDetails}>{rule.value}</span>
      ) : null}
    </div>
  );
};
ProjectInfo.propTypes = {
  name: PropTypes.string.isRequired,
  rule: PropTypes.object
};

export default ProjectInfo;
