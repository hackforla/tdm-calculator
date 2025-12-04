import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import RadioButton from "../../UI/RadioButton";
import "react-datepicker/dist/react-datepicker.css";
import { MdClose } from "react-icons/md";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    color: theme.colors.secondary.darkNavy
  }
}));

const StatusPopup = ({
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

  const [typeSetting, setTypeSetting] = useState(criteria.type);

  const setDefault = () => {
    setTypeSetting("all");
    setCriteria({
      ...criteria,
      type: "all"
    });
    if (setCheckedProjectIds) setCheckedProjectIds([]);
    if (setSelectAllChecked) setSelectAllChecked(false);
  };

  const applyChanges = () => {
    // Set Criteria for status
    setCriteria({
      ...criteria,
      type: typeSetting
    });
    if (newOrder) {
      setSort("dateSnapshotted", newOrder, true);
    }
    if (setCheckedProjectIds) setCheckedProjectIds([]);
    if (setSelectAllChecked) setSelectAllChecked(false);
    close();
  };

  return (
    <div className={classes.container}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <MdClose
          style={{
            backgroundColor: "transparent",
            color: "black",
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem"
          }}
          alt={`Close popup`}
          onClick={close}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* If there is a dateSnapshotted (i.e., project is snapshot), property value is 1 */}
        <RadioButton
          label="Show Drafts First"
          value="asc"
          checked={newOrder == "asc"}
          onChange={() => setNewOrder("asc")}
        />
        <RadioButton
          label="Show Snapshots First"
          value="desc"
          checked={newOrder === "desc"}
          onChange={() => setNewOrder("desc")}
        />
        <hr style={{ width: "100%" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* If there is a dateSnapshotted (i.e., project is snapshot), property value is 1 */}
        <RadioButton
          label="Drafts"
          value="draft"
          checked={typeSetting == "draft"}
          onChange={() => setTypeSetting("draft")}
        />
        <RadioButton
          label="Snapshots"
          value="snapshot"
          checked={typeSetting === "snapshot"}
          onChange={() => setTypeSetting("snapshot")}
        />
        <RadioButton
          label="Drafts and Snapshots"
          value="all"
          checked={typeSetting === "all"}
          onChange={() => setTypeSetting("all")}
        />
        <hr style={{ width: "100%" }} />
      </div>
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

StatusPopup.propTypes = {
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

export default StatusPopup;
