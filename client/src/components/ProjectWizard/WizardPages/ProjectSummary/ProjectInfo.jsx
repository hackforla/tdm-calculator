import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  projectInfoDetailsSubContainer: {
    display: "flex",
    alignItems: "baseline",
    maxHeight: "20px",
    width: "50%"
  },
  projectInfoCategory: {
    fontFamily: "Oswald",
    fontSize: "12px",
    textTransform: "uppercase",
    textAlign: "right",
    color: "rgba(6, 16, 25, 0.5)",
    minWidth: "100px",
    marginRight: "17px"
  },
  projectInfoDetails: {
    color: "#0F2940",
    fontFamily: "Calibri Bold",
    fontSize: "16px"
  }
});

const ProjectInfo = props => {
  const classes = useStyles();
  const { name, rule } = props;

  return (
    <div className={classes.projectInfoDetailsSubContainer}>
      <span className={classes.projectInfoCategory}>{name}</span>
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
