import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import RadioButton from "../../UI/RadioButton";
import "react-datepicker/dist/react-datepicker.css";
import { MdClose, MdError } from "react-icons/md";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles(theme => ({
  warningIcon: {
    color: theme.colorCancel
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
  const classes = useStyles({ theme });
  const [newOrder, setNewOrder] = useState(
    header.id !== orderBy ? null : order
  );

  const [typeSetting, setTypeSetting] = useState(criteria.type);
  const [showDeleted, setShowDeleted] = useState(criteria.status === "all");

  // TODO More state variables for status filtering go here

  const setDefault = () => {
    setCriteria({
      ...criteria,
      status: showDeleted ? "all" : "active",
      type: "all"
    });
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
  };

  const applyChanges = () => {
    // Set Criteria for status
    setCriteria({
      ...criteria,
      status: showDeleted ? "all" : "active",
      type: typeSetting
    });
    if (newOrder) {
      setSort(header.id, newOrder);
    }
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
    close();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
          label="Sort Drafts First"
          value="asc"
          checked={newOrder == "asc"}
          onChange={() => setNewOrder("asc")}
        />
        <RadioButton
          label="Sort Snapshots First"
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginLeft: "0.5rem", marginBottom: "0.5rem" }}>
          <MdError
            className={classes.warningIcon}
            style={{
              fontSize: "large",
              verticalAlign: "top"
            }}
          />{" "}
          {typeSetting === "snapshot" ? (
            <span>Snapshots can&apos;t be deleted</span>
          ) : (
            <span
              style={{
                marginBottom: "1rem",
                marginTop: "0",
                verticalAlign: "top"
              }}
            >
              Click to show or hide deleted projects
            </span>
          )}
        </div>
        <label style={{ margin: "0.5em" }}>
          <input
            style={{ verticalAlign: "middle" }}
            type="checkbox"
            checked={showDeleted}
            value="active"
            onChange={() => setShowDeleted(!showDeleted)}
          />
          <span style={{ verticalAlign: "middle" }}> Show Deleted</span>
        </label>
      </div>
      <hr style={{ width: "100%" }} />
      <div style={{ display: "flex" }}>
        <Button onClick={setDefault} variant="text">
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
