import React from "react";
import PropTypes from "prop-types";

const RuleInput = ({
  rule: {
    id,
    calculationId,
    code,
    name,
    category,
    dataType,
    value,
    units,
    functionBody,
    displayOrder,
    cssClass,
    calculationPanelId,
    panelName,
    panelDisplayOrder,
    choices,
    calcValue
  },
  onInputChange
}) => {
  return (
    <React.Fragment>
      {dataType === "number" ? (
        <div
          style={{
            margin: "0.2em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div
            style={{
              flexBasis: "75%",
              flexGrow: "1",
              flexShrink: "1"
            }}
          >
            {name}
          </div>
          <input
            type="number"
            style={{
              flexBasis: "10%",
              flexGrow: "0",
              flexShrink: "1"
            }}
            value={value || ""}
            onChange={onInputChange}
            name={code}
          />
          <div
            style={{
              flexBasis: "10%",
              marginLeft: "1em",
              flexGrow: "0",
              flexShrink: "1"
            }}
          >
            {units}
          </div>
          <div
            style={{
              flexBasis: "5%",
              marginLeft: "1em",
              marginRight: "0.5em",
              textAlign: "right",
              flexGrow: "0",
              flexShrink: "1"
            }}
          >
            {calcValue}
          </div>
        </div>
      ) : dataType === "boolean" ? (
        <div
          style={{
            margin: "0.2em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline"
          }}
        >
          <div
            style={{
              flexBasis: "75%",
              flexGrow: "1",
              flexShrink: "1"
            }}
          >
            {name}
          </div>
          <input
            type="checkbox"
            style={{
              flexBasis: "5%",
              flexGrow: "0",
              flexShrink: "1"
            }}
            value={true}
            checked={!!value}
            onChange={onInputChange}
            name={code}
          />
          <div
            style={{
              flexBasis: "10%",
              marginLeft: "1em",
              flexGrow: "0",
              flexShrink: "1"
            }}
          >
            {units}
          </div>
          <div
            style={{
              flexBasis: "5%",
              marginLeft: "1em",
              marginRight: "0.5em",
              flexGrow: "0",
              flexShrink: "1"
            }}
          >
            {calcValue}
          </div>
        </div>
      ) : dataType === "choice" ? (
        <div
          style={{
            margin: "0.2em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline"
          }}
        >
          <div
            style={{
              flexBasis: "45%",
              flexGrow: "1",
              flexShrink: "1"
            }}
          >
            {name}
          </div>
          <select
            style={{ flexBasis: "40%", flexGrow: "1", flexShrink: "1" }}
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
          <div
            style={{
              flexBasis: "10%",
              marginLeft: "1em",
              flexGrow: "0",
              flexShrink: "1"
            }}
          >
            {units}
          </div>
          <div
            style={{
              flexBasis: "5%",
              marginLeft: "1em",
              marginRight: "0.5em",
              flexGrow: "0",
              flexShrink: "1"
            }}
          >
            {calcValue}
          </div>
        </div>
      ) : (
        <div
          style={{
            margin: "0.2em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline"
          }}
        >
          <div
            style={{
              flexBasis: "75%",
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
              flexGrow: "0",
              flexShrink: "1"
            }}
          >
            {units}
          </div>
          <div
            style={{
              flexBasis: "5%",
              marginLeft: "1em",
              marginRight: "0.5em",
              flexGrow: "0",
              flexShrink: "1"
            }}
          >
            {calcValue}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

RuleInput.propTypes = {
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

export default RuleInput;
