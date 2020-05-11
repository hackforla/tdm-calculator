/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import ReactTooltip from "react-tooltip";

const useStyles = createUseStyles({
  strategyContainer: {
    minWidth: "60vw",
    margin: "0.2em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#f0e300"
    }
  },
  commentContainer: {
    minWidth: "60vw",
    margin: "0.2em",
    paddingRight: "1em"
  },
  strategyName: {
    flexGrow: "1",
    flexShrink: "1"
  },
  points: {
    flexBasis: "10%",
    marginLeft: "1em",
    marginRight: "0.5em",
    textAlign: "right",
    flexGrow: "0",
    flexShrink: "1"
  },
  numberInputContainer: {
    flexBasis: "40%",
    flexGrow: "1",
    flexShrink: "1",
    textAlign: "right"
  },
  numberInput: {
    padding: "0.1em",
    width: "auto",
    textAlign: "right"
  },
  choiceSelectContainer: {
    flexBasis: "40%",
    flexGrow: "1",
    flexShrink: "1",
    textAlign: "right"
  },
  stringInput: {
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1"
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
    padding: "10px",
    minWidth: "200px",
    maxWidth: "400px"
  }
});

const RuleStrategy = ({
  rule: {
    code,
    name,
    dataType,
    value,
    minValue,
    maxValue,
    choices,
    calcValue,
    calcUnits,
    calcMinValue,
    calcMaxValue,
    description,
    displayComment,
    comment
  },
  onInputChange,
  onCommentChange
}) => {
  const classes = useStyles();

  if (comment) {
    console.log(comment);
  }

  const possibleAndEarnedPointsContainers = () => {
    const calculationUnits = calcUnits ? calcUnits : "";

    return (
      <React.Fragment>
        <div className={classes.points}>
          {calcMinValue === calcMaxValue
            ? `${Math.round(calcMinValue).toString()} ${calculationUnits}`
            : calcMinValue < calcMaxValue
            ? `${Math.round(calcMinValue).toString()}-${Math.round(
                calcMaxValue
              ).toString()} ${calculationUnits}`
            : null}
        </div>
        <div className={classes.points}>
          {`${calcValue ? Math.round(calcValue * 100) / 100 : ""} ${
            calculationUnits || ""
          }`}
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {dataType === "number" ? (
        <div className={classes.strategyContainer}>
          <label
            htmlFor={code}
            className={classes.strategyName}
            data-for="main"
            data-tip={description}
            data-iscapture="true"
            data-html="true"
            data-class={classes.tooltip}
          >
            {" "}
            {name}{" "}
          </label>
          <div className={classes.numberInputContainer}>
            <input
              className={classes.numberInput}
              type="text"
              value={value || ""}
              onChange={onInputChange}
              name={code}
              id={code}
              min={minValue}
              max={maxValue}
              autoComplete="off"
            />
          </div>
          {possibleAndEarnedPointsContainers()}
        </div>
      ) : dataType === "boolean" ? (
        <div className={classes.strategyContainer}>
          <label
            htmlFor={code}
            className={classes.strategyName}
            data-for="main"
            data-tip={description}
            data-iscapture="true"
            data-html="true"
            data-class={classes.tooltip}
          >
            {" "}
            {name}{" "}
          </label>
          <div className={classes.booleanInputContainer}>
            <input
              type="checkbox"
              value={true}
              checked={!!value}
              onChange={onInputChange}
              name={code}
              id={code}
            />
          </div>
          {possibleAndEarnedPointsContainers()}
        </div>
      ) : dataType === "choice" ? (
        <div className={classes.strategyContainer}>
          <label
            htmlFor={code}
            className={classes.strategyName}
            data-for="main"
            data-tip={description}
            data-iscapture="true"
            data-html="true"
            data-class={classes.tooltip}
          >
            {" "}
            {name}{" "}
          </label>
          <div className={classes.choiceSelectContainer}>
            <select
              width="100%"
              value={value || ""}
              onChange={onInputChange}
              name={code}
              id={code}
            >
              {choices.map(choice => (
                <option key={choice.id} value={choice.id}>
                  {choice.name}
                </option>
              ))}
            </select>
          </div>
          {possibleAndEarnedPointsContainers()}
        </div>
      ) : dataType === "string" ? (
        <div className={classes.strategyContainer}>
          <label
            htmlFor={code}
            className={classes.strategyName}
            data-for="main"
            data-tip={description}
            data-iscapture="true"
            data-html="true"
            data-class={classes.tooltip}
          >
            {" "}
            {name}{" "}
          </label>
          <input
            type="text"
            className={classes.stringInput}
            value={value || ""}
            onChange={onInputChange}
            name={code}
            id={code}
            autoComplete="off"
          />
        </div>
      ) : (
        <div
          className={classes.strategyContainer}
          data-for="main"
          data-tip={description}
          data-iscapture="true"
          data-html="true"
          data-class={classes.tooltip}
        >
          <label htmlFor={code} className={classes.strategyName}>
            {" "}
            {name}{" "}
          </label>
          <div className={classes.allElse} name={code} />
          {possibleAndEarnedPointsContainers()}
        </div>
      )}
      {displayComment ? (
        <div className={classes.commentContainer}>
          <div>{`If applicable, please input the details about ${name}.`}</div>
          <div>
            <textarea
              type="textarea"
              value={comment || ""}
              onChange={onCommentChange}
              name={code}
              id={comment}
              className={classes.commentTextarea}
              autoComplete="off"
            />
          </div>
        </div>
      ) : null}
      <ReactTooltip
        id="main"
        place="top"
        type="info"
        effect="float"
        multiline={true}
        style={{ width: "25vw" }}
      />
    </React.Fragment>
  );
};

RuleStrategy.propTypes = {
  rule: PropTypes.shape({
    id: PropTypes.number.isRequired,
    calculationId: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    dataType: PropTypes.string.isRequired,
    value: PropTypes.any,
    units: PropTypes.string,
    functionBody: PropTypes.string,
    cssClass: PropTypes.string,
    panelDisplayOrder: PropTypes.number.isRequired,
    displayOrder: PropTypes.number.isRequired,
    calculationPanelId: PropTypes.number.isRequired,
    panelName: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    choices: PropTypes.array,
    calcValue: PropTypes.number,
    calcUnits: PropTypes.string,
    calcMinValue: PropTypes.number,
    calcMaxValue: PropTypes.number,
    description: PropTypes.string,
    displayComment: PropTypes.bool,
    comment: PropTypes.string
  }),
  onInputChange: PropTypes.func,
  onCommentChange: PropTypes.func
};

export default RuleStrategy;
