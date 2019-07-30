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
    panelDisplayOrder
  },
  onInputChange
}) => {
  return (
    <React.Fragment>
      {dataType === "number" ? (
        <div style={{ margin: "1em", display: "flex", flexDirection: "row" }}>
          <div style={{ flexBasis: "50%" }}>{name}</div>
          <input
            type="number"
            style={{ flexBasis: "20%" }}
            value={value || ""}
            onChange={onInputChange}
            name={code}
          />
          <div style={{ flexBasis: "20%", marginLeft: "1em" }}>{units}</div>
        </div>
      ) : (
        <div style={{ margin: "1em", display: "flex", flexDirection: "row" }}>
          <div style={{ flexBasis: "50%" }}>{name}</div>
          <input
            type="checkbox"
            style={{ flexBasis: "20%" }}
            value={true}
            checked={!!value}
            onChange={onInputChange}
            name={code}
          />
          <div style={{ flexBasis: "20%", marginLeft: "1em" }}>{units}</div>
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
