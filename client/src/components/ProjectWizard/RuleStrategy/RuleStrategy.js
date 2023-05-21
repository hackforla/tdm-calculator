/* eslint-disable linebreak-style */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import clsx from "clsx";
import AccordionToolTip from "../../ToolTip/AccordionToolTip";
import RuleStrategyLabel from "./RuleStrategyLabel";

const useStyles = createUseStyles(theme => ({
  rowContainer: {
    minWidth: "60vw",
    margin: "0.2em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
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
    opacity: "0.6"
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
    textAlign: "right",
    marginBottom: "0.1em"
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
  }
}));

const RuleStrategy = ({
  rule: {
    id,
    code,
    name,
    dataType,
    value,
    choices,
    calcValue,
    calcUnits,
    calcMinValue,
    calcMaxValue,
    description,
    display,
    displayComment,
    comment,
    link,
    validationErrors,
    readOnly
  },
  onPropInputChange,
  onCommentChange,
  autoFocus
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [showDescription, setShowDescription] = useState(false);

  const disabledStyle = !display && classes.disabled;

  const onInputChange = e => {
    onPropInputChange(e);
  };

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
          {`${
            calcValue
              ? Math.round(calcValue * 100) / 100 + " " + calculationUnits || ""
              : ""
          } `}
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {dataType === "number" ? (
        <div className={clsx(classes.rowContainer, disabledStyle)}>
          <RuleStrategyLabel
            id={id}
            description={description}
            code={code}
            display={display}
            link={link}
            name={name}
            setShowDescription={setShowDescription}
          />
          <div>
            <input
              autoFocus={autoFocus}
              className={
                validationErrors
                  ? classes.numberInputInvalid
                  : classes.numberInput
              }
              type="text"
              value={value || ""}
              onChange={onInputChange}
              name={code}
              id={code}
              autoComplete="off"
              disabled={!display}
            />
          </div>
          {possibleAndEarnedPointsContainers()}
        </div>
      ) : dataType === "boolean" ? (
        <div className={clsx(classes.rowContainer, disabledStyle)}>
          <RuleStrategyLabel
            id={id}
            description={description}
            code={code}
            display={display}
            link={link}
            name={name}
            setShowDescription={setShowDescription}
          />
          <div>
            <input
              autoFocus={autoFocus}
              type="checkbox"
              value={true}
              checked={!!value}
              onChange={onInputChange}
              name={code}
              id={code}
              disabled={!display || !!readOnly}
            />
          </div>

          {possibleAndEarnedPointsContainers()}
        </div>
      ) : dataType === "choice" ? (
        <div className={clsx(classes.rowContainer, disabledStyle)}>
          <RuleStrategyLabel
            id={id}
            description={description}
            code={code}
            display={display}
            link={link}
            name={name}
            setShowDescription={setShowDescription}
          />
          <div className={classes.choiceSelectContainer}>
            <select
              autoFocus={autoFocus}
              className={classes.select}
              value={value || ""}
              onChange={onInputChange}
              name={code}
              id={code}
              disabled={!display || !!readOnly}
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
        <div className={clsx(classes.rowContainer, disabledStyle)}>
          <RuleStrategyLabel
            id={id}
            description={description}
            code={code}
            display={display}
            link={link}
            name={name}
            setShowDescription={setShowDescription}
          />
          <input
            autoFocus={autoFocus}
            type="text"
            className={
              validationErrors
                ? classes.stringInputInvalid
                : classes.stringInput
            }
            value={value || ""}
            onChange={onInputChange}
            name={code}
            id={code}
            autoComplete="off"
            disabled={!display}
          />
        </div>
      ) : (
        <div className={clsx(classes.rowContainer, disabledStyle)}>
          <RuleStrategyLabel
            id={id}
            description={description}
            code={code}
            display={display}
            link={link}
            name={name}
            setShowDescription={setShowDescription}
          />
          <div className={classes.allElse} name={code} />
          {possibleAndEarnedPointsContainers()}
        </div>
      )}
      {displayComment ? (
        <div className={clsx(classes.commentContainer, disabledStyle)}>
          <div>{`If applicable, please input the details about ${name}.`}</div>
          <div>
            <textarea
              type="textarea"
              value={comment || ""}
              onChange={onCommentChange}
              name={code}
              id={`${code}_COMMENTS`}
              className={classes.commentTextarea}
              autoComplete="off"
              disabled={!display}
            />
          </div>
        </div>
      ) : null}
      {validationErrors ? (
        <div className={classes.field}>
          <div className={classes.textInputLabel}></div>
          <div className={clsx(classes.textInputLabel, classes.errorLabel)}>
            {validationErrors[0]}
          </div>
        </div>
      ) : null}
      {showDescription && description ? (
        <AccordionToolTip
          description={description}
          setShowDescription={setShowDescription}
          disabledStyle={disabledStyle}
        />
      ) : null}
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
    calcValue: PropTypes.number | null, // only user-defined strategy is null
    calcUnits: PropTypes.string,
    calcMinValue: PropTypes.number,
    calcMaxValue: PropTypes.number,
    description: PropTypes.string,
    display: PropTypes.bool,
    displayComment: PropTypes.bool,
    comment: PropTypes.string,
    link: PropTypes.string,
    validationErrors: PropTypes.array,
    readOnly: PropTypes.bool
  }),
  onPropInputChange: PropTypes.func,
  onCommentChange: PropTypes.func,
  autoFocus: PropTypes.bool
};

export default RuleStrategy;
