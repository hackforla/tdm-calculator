import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  projectInfoDetailsSubContainer: {
    display: "flex",
    alignItems: "baseline",
    width: "50%",
    paddingBottom: "1.1em"
  },
  projectInfoCategory: {
    fontFamily: "Oswald",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    color: "rgba(15, 41, 64, .5)",
    marginRight: "17px"
  },
  projectInfoDetails: {
    color: "#0F2940",
    fontFamily: "Calibri Bold",
    fontSize: "16px"
  },
  dropDownContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row"
  },
  dropDownValue: {
    minWidth: "100px"
  }
});

const ProjectInfoList = props => {
  const classes = useStyles();
  const { name, rule } = props;

  const values = rule?.value.split(",");

  return (
    <div className={classes.projectInfoDetailsSubContainer}>
      <span className={classes.projectInfoCategory}>{name}</span>
      {rule && rule.value ? (
        <span className={classes.projectInfoDetails}>
          <span className={classes.dropDownContainer}>
            {values.map(value => {
              return (
                <span key={value} className={classes.dropDownValue}>
                  {value}
                </span>
              );
            })}
          </span>
        </span>
      ) : null}
    </div>
  );
};
ProjectInfoList.propTypes = {
  name: PropTypes.string.isRequired,
  rule: PropTypes.object
};

export default ProjectInfoList;
