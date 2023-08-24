import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  projectInfoDetailsSubContainer: {
    display: "flex",
    alignItems: "baseline",
    width: "50%"
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
    fontFamily: "Calibri",
    fontWeight: 700,
    fontSize: "16px"
  },
  AINValuesContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: ".3em"
  },
  AINValues: {
    minWidth: "100px",
    marginTop: ".2rem"
  }
});

const ProjectInfoList = props => {
  const classes = useStyles();
  const { name, rule } = props;

  const values = rule.value.split(",");

  return (
    <div className={classes.projectInfoDetailsSubContainer}>
      <span className={classes.projectInfoCategory}>{name}</span>
      {rule && rule.value ? (
        <span className={classes.projectInfoDetails}>
          <span className={classes.AINValuesContainer}>
            {values.map(value => {
              return (
                <span key={value} className={classes.AINValues}>
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
