import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Button from "../../Button/Button";
import CloseBox from "../CloseBox";
import RadioButton from "../RadioButton";

import { SHARING_STATUS } from "../../Projects/projectHelpers";

const OPTIONS = [
  { value: SHARING_STATUS.NOT_SHARED, label: "Not shared" },
  { value: SHARING_STATUS.SHARED_BY_ME, label: "Shared by me" },
  { value: SHARING_STATUS.SHARED_WITH_ME, label: "Shared with me" }
];

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  closeBox: {
    position: "absolute",
    top: 0,
    right: 0
  },
  selectionControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    marginBottom: "0.5rem"
  },
  toggleButton: {
    padding: 0,
    border: 0,
    background: "transparent",
    textDecoration: "underline",
    fontWeight: "normal",
    color: theme.colorDarkNavy,
    cursor: "pointer"
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.4rem 0"
  },
  actions: {
    display: "flex",
    justifyContent: "center"
  }
}));

const SharedPopup = ({
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
  const classes = useStyles();
  const [newOrder, setNewOrder] = useState(
    header.id === orderBy ? order : null
  );
  const [selected, setSelected] = useState(criteria.sharedList || []);

  const applyChanges = () => {
    setCriteria({ ...criteria, sharedList: selected });
    setSort(header.id, newOrder);
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
    close();
  };

  return (
    <div className={classes.container}>
      <CloseBox
        onClick={close}
        aria-label="Close popup"
        className={classes.closeBox}
      />
      <RadioButton
        label="Sort Shared First"
        value="desc"
        checked={newOrder === "desc"}
        onChange={() => setNewOrder("desc")}
      />
      <RadioButton
        label="Sort Unshared First"
        value="asc"
        checked={newOrder === "asc"}
        onChange={() => setNewOrder("asc")}
      />
      <hr style={{ width: "100%" }} />
      <div className={classes.selectionControls}>
        <div>
          <button
            type="button"
            className={classes.toggleButton}
            onClick={() => setSelected(OPTIONS.map(option => option.value))}
          >
            Select all 3
          </button>
          {" | "}
          <button
            type="button"
            className={classes.toggleButton}
            onClick={() => setSelected([])}
          >
            Clear
          </button>
        </div>
        <span>{selected.length} selected</span>
      </div>
      {OPTIONS.map(option => (
        <label key={option.value} className={classes.option}>
          <input
            type="checkbox"
            checked={selected.includes(option.value)}
            onChange={event =>
              setSelected(current =>
                event.target.checked
                  ? [...current, option.value]
                  : current.filter(value => value !== option.value)
              )
            }
          />
          {option.label}
        </label>
      ))}
      <hr style={{ width: "100%" }} />
      <div className={classes.actions}>
        <Button
          variant="secondary"
          onClick={() => {
            setSelected([]);
            setNewOrder(null);
          }}
        >
          Reset
        </Button>
        <Button variant="primary" onClick={applyChanges}>
          Apply
        </Button>
      </div>
    </div>
  );
};

SharedPopup.propTypes = {
  close: PropTypes.func.isRequired,
  header: PropTypes.object.isRequired,
  criteria: PropTypes.object.isRequired,
  setCriteria: PropTypes.func.isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setSort: PropTypes.func.isRequired,
  setCheckedProjectIds: PropTypes.func.isRequired,
  setSelectAllChecked: PropTypes.func.isRequired
};

export default SharedPopup;
