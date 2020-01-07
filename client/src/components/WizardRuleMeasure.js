import React from "react";
import PropTypes from "prop-types";

const WizardRuleMeasure = ({
  rule: {
    id,
    calculationId,
    code,
    name,
    category,
    dataType,
    value,
    units,
    minValue,
    maxValue,
    functionBody,
    displayOrder,
    cssClass,
    calculationPanelId,
    panelName,
    panelDisplayOrder,
    choices,
    calcValue,
    calcUnits,
    calcMinValue,
    calcMaxValue
  },
  onInputChange
}) => {
  return (
    <React.Fragment>
      {dataType === "number" ? (
        <div
          style={{
            minWidth: "60vw",
            margin: "0.2em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div
            style={{
              flexBasis: "60%",
              flexGrow: "1",
              flexShrink: "1"
            }}
          >
            {name}
          </div>
          <div
            style={{
              flexBasis: "40%",
              flexGrow: "1",
              flexShrink: "1",
              textAlign: "right"
            }}
          >
            <input
              style={{ padding: "0.1em", width: "auto", textAlign: "right" }}
              type="number"
              value={value || ""}
              onChange={onInputChange}
              name={code}
              min={minValue}
              max={maxValue}
            />
          </div>
          <div
            style={{
              flexBasis: "10%",
              marginLeft: "1em",
              marginRight: "0.5em",
              textAlign: "right",
              flexGrow: "0",
              flexShrink: "0"
            }}
          >
            {calcMinValue === calcMaxValue
              ? `${Math.round(calcMinValue).toString()}`
              : calcMinValue < calcMaxValue
              ? `${Math.round(calcMinValue).toString()}-${Math.round(
                  calcMaxValue
                ).toString()}`
              : null}
          </div>
          <div
            style={{
              flexBasis: "10%",
              marginLeft: "1em",
              marginRight: "0.5em",
              textAlign: "right",
              flexGrow: "0",
              flexShrink: "0"
            }}
          >
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div>
        </div>
      ) : dataType === "boolean" ? (
        <div
          style={{
            minWidth: "60vw",
            margin: "0.2em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div
            style={{
              flexBasis: "70%",
              flexGrow: "1",
              flexShrink: "1"
            }}
          >
            {name}
          </div>
          <div
            style={{
              flexBasis: "10%",
              flexGrow: "0",
              flexShrink: "0",
              marginRight: "0",
              padding: "0",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            <input
              type="checkbox"
              value={true}
              checked={!!value}
              onChange={onInputChange}
              name={code}
            />
          </div>
          <div
            style={{
              flexBasis: "10%",
              marginLeft: "1em",
              marginRight: "0.5em",
              textAlign: "right",
              flexGrow: "0",
              flexShrink: "0"
            }}
          >
            {calcMinValue === calcMaxValue
              ? `${Math.round(calcMinValue).toString()}`
              : calcMinValue < calcMaxValue
              ? `${Math.round(calcMinValue).toString()}-${Math.round(
                  calcMaxValue
                ).toString()}`
              : null}
          </div>
          <div
            style={{
              flexBasis: "10%",
              marginLeft: "1em",
              marginRight: "0.5em",
              textAlign: "right",
              flexGrow: "0",
              flexShrink: "0"
            }}
          >
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div>
        </div>
      ) : dataType === "choice" ? (
        <div
          style={{
            minWidth: "60vw",
            margin: "0.2em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline"
          }}
        >
          <div
            style={{
              flexBasis: "40%",
              flexGrow: "1",
              flexShrink: "1"
            }}
          >
            {name}
          </div>
          <div
            style={{
              flexBasis: "40%",
              flexGrow: "1",
              flexShrink: "1",
              textAlign: "right"
            }}
          >
            <select
              width="100%"
              value={value || ""}
              onChange={onInputChange}
              name={code}
            >
              {choices.map(choice => (
                <option key={choice.id} value={choice.id}>
                  {choice.name}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              flexBasis: "10%",
              marginLeft: "1em",
              marginRight: "0.5em",
              textAlign: "right",
              flexGrow: "0",
              flexShrink: "0"
            }}
          >
            {calcMinValue === calcMaxValue
              ? `${Math.round(calcMinValue).toString()}`
              : calcMinValue < calcMaxValue
              ? `${Math.round(calcMinValue).toString()}-${Math.round(
                  calcMaxValue
                ).toString()}`
              : null}
          </div>
          <div
            style={{
              flexBasis: "10%",
              marginLeft: "1em",
              marginRight: "0.5em",
              textAlign: "right",
              flexGrow: "0",
              flexShrink: "0"
            }}
          >
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div>
        </div>
      ) : dataType === "string" ? (
        <div
          style={{
            minWidth: "60vw",
            margin: "0.2em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div
            style={{
              flexBasis: "50%",
              flexGrow: "1",
              flexShrink: "1"
            }}
          >
            {name}
          </div>
          <input
            type="text"
            style={{
              flexBasis: "50%",
              flexGrow: "1",
              flexShrink: "1"
            }}
            value={value || ""}
            onChange={onInputChange}
            name={code}
          />
        </div>
      ) : (
        <div
          style={{
            minWidth: "60vw",
            margin: "0.2em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline"
          }}
        >
          <div
            style={{
              flexBasis: "70%",
              flexGrow: "1",
              flexShrink: "1"
            }}
          >
            {name}
          </div>
          <div
            style={{ flexBasis: "10%", flexGrow: "0", flexShrink: "1" }}
            name={code}
          ></div>

          <div
            style={{
              flexBasis: "10%",
              marginLeft: "1em",
              marginRight: "0.5em",
              textAlign: "right",
              flexGrow: "0",
              flexShrink: "1"
            }}
          >
            {calcMinValue === calcMaxValue
              ? `${Math.round(calcMinValue).toString()}`
              : calcMinValue < calcMaxValue
              ? `${Math.round(calcMinValue).toString()}-${Math.round(
                  calcMaxValue
                ).toString()}`
              : null}
          </div>
          <div
            style={{
              flexBasis: "10%",
              marginLeft: "1em",
              marginRight: "0.5em",
              textAlign: "right",
              flexGrow: "0",
              flexShrink: "1"
            }}
          >
            {`${
              calcValue ? Math.round(calcValue * 100) / 100 : ""
            } ${calcUnits || ""}`}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

WizardRuleMeasure.propTypes = {
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
    panelName: PropTypes.string
  }),
  onInputChange: PropTypes.func
};

export default WizardRuleMeasure;
