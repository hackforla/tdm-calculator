/* eslint-disable linebreak-style */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import clsx from "clsx";
import AccordionToolTip from "../../ToolTip/AccordionToolTip";
import RuleLabel from "../Common/RuleLabel";
import UniversalSelect from "../../UI/UniversalSelect";
import AffordableEdgeCaseModal from "../../Modals/WarningWizardAffordableEdgeCase";

const useStyles = createUseStyles(theme => ({
  rowContainer: {
    minWidth: "60vw",
    margin: "0.2em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    opacity: "0.6"
  },
  points: {
    flexBasis: "10%",
    marginLeft: "1em",
    marginRight: "0.5em",
    textAlign: "right",
    flexGrow: "0",
    flexShrink: "1"
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
    width: "200px",
    textAlign: "left",
    padding: 0,
    maring: 0
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
    color: theme.colorCritical,
    flexBasis: "50%",
    flexGrow: "1",
    flexShrink: "1"
  }
}));

const RuleStrategy = ({
  projectLevel,
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
  const [affordableEdgeCaseModalOpen, setAffordableEdgeCaseModalOpen] =
    useState(false);
  const [inputEvent, setInputEvent] = useState({});
  const [previousValue, setPreviousValue] = useState(value);
  const [localDescription, setLocalDescription] = useState(description);
  const [isEditing, setIsEditing] = useState(false);

  const closeAffordableEdgeCaseModal = () => {
    // Need to modify event to change value back to previous value and
    // pass change to parent - this will re-render child control with previous value.
    const target = { ...inputEvent.target, value: previousValue };
    onPropInputChange({ ...inputEvent, target });
    // Need to reset value to previous
    setAffordableEdgeCaseModalOpen(false);
  };

  const handleAffordableEdgeCaseModalProceed = () => {
    // Pass phony event to parent to re-do the calc.
    onPropInputChange(inputEvent);
    // Close the save confirmation modal
    setAffordableEdgeCaseModalOpen(false);
  };

  const handleDescriptionUpdate = newDescription => {
    setLocalDescription(newDescription);
    setIsEditing(false);
  };

  const onInputChangeIfAllowed = e => {
    // If user changes affordable housing strategy to 100% for a Level 1
    // project, we want to prompt them to confirm the change before
    // passing the change to parent object and re-calculating.
    const ruleCode = (e.target && e.target.name) || e.detail.name;
    if (
      ruleCode === "STRATEGY_AFFORDABLE" &&
      e.target.value == "4" &&
      projectLevel <= 1
    ) {
      /* Need to stash the event object to pass to parent if user chooses to proceed.
      However, React only stores part of the event (specifically excludes e.target.value)
      when stored in a state variable, so we need to phony up and event object that
      can be passed to the parent while retaining the essential properties.
      */

      const target = {
        type: e.target.type,
        name: e.target.name,
        value: e.target.value,
        checked: e.checked
      };
      const phonyEvent = { target };
      setInputEvent(phonyEvent);
      setAffordableEdgeCaseModalOpen(true);
    } else {
      const value = (e.target && e.target.value) || e.target.checked;
      setPreviousValue(value);
      onPropInputChange(e);
    }
  };

  const disabledStyle = !display && classes.disabled;

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
          <RuleLabel
            id={id}
            description={localDescription}
            code={code}
            display={display}
            link={link}
            name={name}
            setShowDescription={setShowDescription}
            setIsEditing={setIsEditing}
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
              onChange={onInputChangeIfAllowed}
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
          <RuleLabel
            id={id}
            description={localDescription}
            code={code}
            display={display}
            link={link}
            name={name}
            setShowDescription={setShowDescription}
            setIsEditing={setIsEditing}
          />
          <div>
            <input
              autoFocus={autoFocus}
              type="checkbox"
              value={true}
              checked={!!value}
              onChange={onInputChangeIfAllowed}
              name={code}
              id={code}
              disabled={!display || !!readOnly}
            />
          </div>

          {possibleAndEarnedPointsContainers()}
        </div>
      ) : dataType === "choice" ? (
        <div className={clsx(classes.rowContainer, disabledStyle)}>
          <RuleLabel
            id={id}
            description={localDescription}
            code={code}
            display={display}
            link={link}
            name={name}
            setShowDescription={setShowDescription}
            setIsEditing={setIsEditing}
          />
          <div className={classes.choiceSelectContainer}>
            <UniversalSelect
              autoFocus={autoFocus}
              className={classes.select}
              value={value || "0"}
              onChange={onInputChangeIfAllowed}
              name={code}
              id={code}
              disabled={!display || !!readOnly}
              options={choices.map(choice => ({
                value: choice.id,
                label: choice.name
              }))}
            />
          </div>
          {possibleAndEarnedPointsContainers()}
        </div>
      ) : dataType === "string" ? (
        <div className={clsx(classes.rowContainer, disabledStyle)}>
          <RuleLabel
            id={id}
            description={localDescription}
            code={code}
            display={display}
            link={link}
            name={name}
            setShowDescription={setShowDescription}
            setIsEditing={setIsEditing}
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
            onChange={onInputChangeIfAllowed}
            name={code}
            id={code}
            autoComplete="off"
            disabled={!display}
          />
        </div>
      ) : (
        <div className={clsx(classes.rowContainer, disabledStyle)}>
          <RuleLabel
            id={id}
            description={localDescription}
            code={code}
            display={display}
            link={link}
            name={name}
            setShowDescription={setShowDescription}
            setIsEditing={setIsEditing}
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
      {(showDescription && localDescription) || isEditing ? (
        <AccordionToolTip
          description={localDescription || ""}
          setShowDescription={setShowDescription}
          disabledStyle={disabledStyle}
          id={id}
          forceEditMode={isEditing}
          onEditDescription={handleDescriptionUpdate}
        />
      ) : null}

      <AffordableEdgeCaseModal
        isOpen={affordableEdgeCaseModalOpen}
        onClose={closeAffordableEdgeCaseModal}
        onYes={handleAffordableEdgeCaseModalProceed}
      />
    </React.Fragment>
  );
};

RuleStrategy.propTypes = {
  projectLevel: PropTypes.number,
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
    calcValue: PropTypes.any, // PropTypes.number | null, // only user-defined strategy is null
    calcUnits: PropTypes.string,
    calcMinValue: PropTypes.number,
    calcMaxValue: PropTypes.number,
    description: PropTypes.any,
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
