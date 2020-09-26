/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
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
  textInputLabelAnchor: {
    textDecoration: "underline"
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
  disabled: {
    opacity: 0.5
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
    padding: "15px",
    minWidth: "200px",
    maxWidth: "400px",
    fontFamily: "Arial",
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: "bold",
    "-webkit-box-shadow": "0px 0px 8px rgba(0, 46, 109, 0.2)",
    "-moz-box-shadow": "0px 0px 8px rgba(0, 46, 109, 0.2)",
    boxShadow: "0px 0px 8px rgba(0, 46, 109, 0.2)",
    "-webkit-border-radius": 2,
    "-moz-border-radius": 2,
    borderRadius: 2,
    "&.show": {
      visibility: "visible !important",
      opacity: "1 !important"
    }
  }
});

const RuleStrategy = ({
  rule: {
    id,
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
    display,
    displayComment,
    comment,
    link
  },
  onInputChange,
  onCommentChange
}) => {
  const classes = useStyles();
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
        <div
          className={
            display
              ? classes.strategyContainer
              : clsx(classes.strategyContainer, classes.disabled)
          }
        >
          <label
            htmlFor={code}
            className={classes.strategyName}
            data-for={"main" + id}
            data-tip={description}
            data-iscapture="true"
            data-html="true"
            data-class={classes.tooltip}
          >
            {" "}
            {link ? (
              <a
                href={link}
                className={classes.textInputLabelAnchor}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </a>
            ) : (
              name
            )}{" "}
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
              disabled={!display}
            />
          </div>
          {possibleAndEarnedPointsContainers()}
        </div>
      ) : dataType === "boolean" ? (
        <div
          className={
            display
              ? classes.strategyContainer
              : clsx(classes.strategyContainer, classes.disabled)
          }
        >
          <label
            htmlFor={code}
            className={classes.strategyName}
            data-for={"main" + id}
            data-tip={description}
            data-iscapture="true"
            data-html="true"
            data-class={classes.tooltip}
          >
            {" "}
            {link ? (
              <a
                href={link}
                className={classes.textInputLabelAnchor}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </a>
            ) : (
              name
            )}{" "}
          </label>
          <div className={classes.booleanInputContainer}>
            <input
              type="checkbox"
              value={true}
              checked={!!value}
              onChange={onInputChange}
              name={code}
              id={code}
              disabled={!display}
            />
          </div>
          {possibleAndEarnedPointsContainers()}
        </div>
      ) : dataType === "choice" ? (
        <div
          className={
            display
              ? classes.strategyContainer
              : clsx(classes.strategyContainer, classes.disabled)
          }
        >
          <label
            htmlFor={code}
            className={classes.strategyName}
            data-for={"main" + id}
            data-tip={description}
            data-iscapture="true"
            data-html="true"
            data-class={classes.tooltip}
          >
            {" "}
            {link ? (
              <a
                href={link}
                className={classes.textInputLabelAnchor}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </a>
            ) : (
              name
            )}{" "}
          </label>
          <div className={classes.choiceSelectContainer}>
            <select
              width="100%"
              value={value || ""}
              onChange={onInputChange}
              name={code}
              id={code}
              disabled={!display}
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
        <div
          className={
            display
              ? classes.strategyContainer
              : clsx(classes.strategyContainer, classes.disabled)
          }
        >
          <label
            htmlFor={code}
            className={classes.strategyName}
            data-for={"main" + id}
            data-tip={description}
            data-iscapture="true"
            data-html="true"
            data-class={classes.tooltip}
          >
            {" "}
            {link ? (
              <a
                href={link}
                className={classes.textInputLabelAnchor}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </a>
            ) : (
              name
            )}{" "}
          </label>
          <input
            type="text"
            className={classes.stringInput}
            value={value || ""}
            onChange={onInputChange}
            name={code}
            id={code}
            autoComplete="off"
            disabled={!display}
          />
        </div>
      ) : (
        <div
          className={
            display
              ? classes.strategyContainer
              : clsx(classes.strategyContainer, classes.disabled)
          }
          data-for={"main" + id}
          data-tip={description}
          data-iscapture="true"
          data-html="true"
          data-class={classes.tooltip}
        >
          <label htmlFor={code} className={classes.strategyName}>
            {" "}
            {link ? (
              <a
                href={link}
                className={classes.textInputLabelAnchor}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </a>
            ) : (
              name
            )}{" "}
          </label>
          <div className={classes.allElse} name={code} />
          {possibleAndEarnedPointsContainers()}
        </div>
      )}
      {displayComment ? (
        <div
          className={
            display
              ? classes.commentContainer
              : clsx(classes.commentContainer, classes.disabled)
          }
        >
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
              disabled={!display}
            />
          </div>
        </div>
      ) : null}
      <ReactTooltip
        id={"main" + id}
        place="right"
        type="info"
        effect="float"
        multiline={true}
        style={{
          width: "25vw"
        }}
        textColor="#32578A"
        backgroundColor="#F7F9FA"
        border={true}
        borderColor="#B2C0D3"
        offset={{ right: 20 }}
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
    display: PropTypes.bool,
    displayComment: PropTypes.bool,
    comment: PropTypes.string,
    link: PropTypes.string
  }),
  onInputChange: PropTypes.func,
  onCommentChange: PropTypes.func
};

export default RuleStrategy;
