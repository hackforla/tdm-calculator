import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import PackageToolTip from "./PackageToolTip";
import RuleStrategyLabel from "../RuleStrategy/RuleStrategyLabel";

const useStyles = createUseStyles(theme => ({
  container: {
    margin: "0.3em 0.75em 0 0.75em"
  },
  rowContainer: {
    width: "100%",
    margin: "0em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "27px"
  },
  commentContainer: {
    minWidth: "60vw",
    margin: "0.2em",
    paddingRight: "1em"
  },
  strategyName: {
    flexGrow: "1",
    flexShrink: "1",
    margin: "0"
  },
  disabled: {
    opacity: "0.5"
  },
  points: {
    marginLeft: "0.5em",
    marginRight: "0.5em",
    textAlign: "right",
    minWidth: "65px"
  },
  numberInput: {
    padding: "0.1em",
    textAlign: "right",
    width: "195px"
  },
  numberInputInvalid: {
    padding: "0.1em",
    width: "5.5em",
    textAlign: "right",
    border: theme.border.dashedWarning
  },
  choiceSelectContainer: {
    textAlign: "right"
  },
  select: {
    width: "200px"
  },
  stringInput: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1"
  },
  stringInputInvalid: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1",
    border: theme.border.dashedWarning
  },
  allElse: {
    flexBasis: "10%",
    flexGrow: "0",
    flexShrink: "1"
  },
  commentTextarea: {
    marginTop: "4px"
  },
  tooltip: {
    color: "rgb(30, 36, 63) !important",
    padding: "15px",
    minWidth: "200px",
    maxWidth: "400px",
    fontFamily: "Arial",
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: "bold",
    boxShadow: "0px 0px 8px rgba(0, 46, 109, 0.2)",
    borderRadius: 2,
    "&.show": {
      visibility: "visible !important",
      opacity: "1 !important"
    }
  },
  field: {
    minWidth: "60vw",
    margin: "0.2em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  errorLabel: {
    color: "red",
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1"
  },
  checkboxContainer: {
    width: "200px",
    display: "flex",
    justifyContent: "center"
  }
}));

const RulePackage = ({ name, checked, onPkgSelect, packageTooltip }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [showDescription, setShowDescription] = useState(false);

  const handlePkgSelect = e => {
    onPkgSelect(e.target.checked);
  };

  return (
    <div className={classes.container}>
      <div className={classes.rowContainer}>
        <RuleStrategyLabel
          id={Number("778875")}
          code="sss"
          description={packageTooltip}
          display={true}
          name={name}
          setShowDescription={setShowDescription}
        />
        <div className={classes.checkboxContainer}>
          <input
            type="checkbox"
            value={true}
            checked={checked}
            onChange={handlePkgSelect}
          />
        </div>
        <div className={classes.points}></div>
        <div className={classes.points}></div>
      </div>

      {showDescription && packageTooltip ? (
        <PackageToolTip setShowDescription={setShowDescription}>
          {packageTooltip}
        </PackageToolTip>
      ) : null}
    </div>
  );
};

RulePackage.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onPkgSelect: PropTypes.func,
  packageTooltip: PropTypes.any
};

export default RulePackage;
