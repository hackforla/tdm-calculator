import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";

import Button from "../../Button/Button";
import RadioButton from "../../UI/RadioButton";
import CloseBox from "../../UI/CloseBox";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  closeBox: {
    position: "absolute",
    top: "0",
    right: "0"
  }
}));

const BooleanPopup = ({
  close,
  header,
  criteria,
  setCriteria,
  order,
  orderBy,
  setSort,
  setCheckedProjectIds,
  setSelectAllChecked
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [newOrder, setNewOrder] = useState(
    header.id !== orderBy ? null : order
  );

  const [criterionSetting, setCriterionSetting] = useState(criteria[header.id]);

  const setDefault = () => {
    setCriterionSetting(null);
    setCriteria({
      ...criteria,
      [header.id]: null
    });
    if (setCheckedProjectIds) setCheckedProjectIds([]);
    if (setSelectAllChecked) setSelectAllChecked(false);
  };

  const applyChanges = () => {
    setCriteria({
      ...criteria,
      [header.id]: criterionSetting
    });
    if (newOrder) {
      setSort(header.id, newOrder);
    }
    if (setCheckedProjectIds) setCheckedProjectIds([]);
    if (setSelectAllChecked) setSelectAllChecked(false);
    close();
  };

  return (
    <div className={classes.container}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CloseBox
          onClick={close}
          aria-label="Close popup"
          className={classes.closeBox}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <RadioButton
          label={"Sort " + (header.trueLabel || header.label) + " First"}
          value="desc"
          checked={newOrder === "desc"}
          onChange={() => setNewOrder("desc")}
        />
        <RadioButton
          label={
            "Sort " + (header.falseLabel || " Not " + header.label) + " First"
          }
          value="asc"
          checked={newOrder === "asc"}
          onChange={() => setNewOrder("asc")}
        />
        <hr style={{ width: "100%" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* If there is a dateSnapshotted (i.e., project is snapshot), property value is 1 */}
        <RadioButton
          label={header.trueLabel || header.label}
          value={true}
          checked={criterionSetting == true}
          onChange={() => {
            setCriterionSetting(true);
          }}
        />
        <RadioButton
          label={header.falseLabel || "Not " + header.label}
          value={false}
          checked={criterionSetting === false}
          onChange={() => setCriterionSetting(false)}
        />
        <RadioButton
          label="All"
          value={null}
          checked={criterionSetting === null}
          onChange={() => setCriterionSetting(null)}
        />
      </div>

      <hr style={{ width: "100%" }} />
      <div style={{ display: "flex" }}>
        <Button onClick={setDefault} variant="outlined">
          Reset
        </Button>
        <Button
          onClick={applyChanges}
          variant="contained"
          color={"colorPrimary"}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

BooleanPopup.propTypes = {
  close: PropTypes.func,
  header: PropTypes.any,
  criteria: PropTypes.any,
  setCriteria: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setSort: PropTypes.func,
  setCheckedProjectIds: PropTypes.func,
  setSelectAllChecked: PropTypes.func
};

export default BooleanPopup;
