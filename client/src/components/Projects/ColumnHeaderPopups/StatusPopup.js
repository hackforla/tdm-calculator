import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../Button/Button";
import RadioButton from "../../UI/RadioButton";
import "react-datepicker/dist/react-datepicker.css";
import { MdClose } from "react-icons/md";
import UniversalSelect from "../../UI/UniversalSelect";

const StatusPopup = ({
  close,
  header,
  criteria,
  setCriteria,
  order,
  orderBy,
  setSort,
  setCheckedProjectIds,
  setSelectAllChecked,
  statusSettings,
  setStatusSettings
}) => {
  const [newOrder, setNewOrder] = useState(
    header.id !== orderBy ? null : order
  );

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "snapshot", label: "Snapshot" },
    { value: "draftsnapshot", label: "Draft and Snapshot" },
    { value: "deleted", label: "Deleted" },
    { value: "all", label: "All" }
  ];

  const setDefault = () => {
    setStatusSettings(null);
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
  };

  const applyChanges = () => {
    switch (statusSettings) {
      case "draft":
        setCriteria({
          ...criteria,
          type: statusSettings
        });
        break;
      case "snapshot":
        setCriteria({
          ...criteria,
          type: statusSettings,
          status: "active"
        });
        break;
      case "draftsnapshot":
        setCriteria({
          ...criteria,
          type: statusSettings,
          status: "active"
        });
        break;
      case "deleted":
        setCriteria({
          ...criteria,
          type: "all",
          status: statusSettings
        });
        break;
      case "all":
        setCriteria({
          ...criteria,
          type: "all",
          status: "all"
        });
        break;
    }

    if (newOrder) {
      setSort(header.id, newOrder);
    }
    setCheckedProjectIds([]);
    setSelectAllChecked(false);
    close();
  };

  const handleChangeStatus = statusValue => {
    setStatusSettings(statusValue);
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
      <UniversalSelect
        options={statusOptions}
        onChange={e => handleChangeStatus(e.target.value)}
      ></UniversalSelect>

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
  setSelectAllChecked: PropTypes.func,
  statusSettings: PropTypes.string,
  setStatusSettings: PropTypes.func
};

export default StatusPopup;
