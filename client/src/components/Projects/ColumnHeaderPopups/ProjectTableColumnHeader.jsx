/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import { MdFilterAlt, MdFilterList } from "react-icons/md";
import { Popover } from "react-tiny-popover";
import DatePopup from "./DatePopup";
import TextPopup from "./TextPopup";
import VisibilityPopup from "./VisibilityPopup";
import StatusPopup from "./StatusPopup";
import { useTheme } from "react-jss";

const ColumnHeader = React.forwardRef((props, ref) => {
  const theme = useTheme();

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}
      onClick={props.onClick}
    >
      <span>{props.header.label}</span>
      {props.isFilterApplied() ? (
        <MdFilterAlt
          style={{
            backgroundColor: "transparent",
            color: "white",
            marginLeft: "0.5rem"
          }}
          alt={`Show column filter and sort popup`}
        />
      ) : (
        <MdFilterList
          style={{
            backgroundColor: "transparent",
            color: theme.colorLightGray,
            marginLeft: "0.5rem"
          }}
          alt={`Show column filter and sort popup`}
        />
      )}
    </div>
  );
});

ColumnHeader.displayName = "ColumnHeader";

ColumnHeader.propTypes = {
  onClick: PropTypes.func,
  header: PropTypes.any,
  isFilterApplied: PropTypes.bool
};

const ProjectTableColumnHeader = ({
  projects,
  filter,
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
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Filter is considered Applied if it is not set
  // to the default criteria values.
  const isFilterApplied = () => {
    let propertyName = header.accessor || header.id;
    if (header.popupType === "text") {
      const listPropertyName = propertyName + "List";
      const listValue = criteria[listPropertyName];
      const headerValue = criteria[header.id];

      const isListFilterApplied =
        Array.isArray(listValue) && listValue.length > 0;
      const isTextFilterApplied =
        typeof headerValue === "string" && headerValue.length > 0;

      return isListFilterApplied || isTextFilterApplied;
    }
    if (header.popupType === "datetime") {
      return (
        criteria[header.startDatePropertyName] ||
        criteria[header.endDatePropertyName]
      );
    }
    if (header.id === "dateHidden") {
      return criteria.visibility !== "visible";
    }
    if (header.id === "dateSnapshotted") {
      return criteria.type !== "all" || criteria.status !== "active";
    }
    if (header.id === "dro") {
      return criteria.droList?.length > 0; // Use optional chaining
    }
    if (header.id === "adminNotes") {
      return (criteria.adminNotes || "").length > 0; // Set default empty string
    }
    return false;
  };

  const handlePopoverToggle = flag => {
    setIsPopoverOpen(flag);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {header.id !== "checkAllProjects" && header.id !== "contextMenu" ? (
        <Popover
          isOpen={isPopoverOpen}
          positions={["bottom", "left", "right", "top"]} // preferred positions by priority
          align="start"
          padding={10}
          onClickOutside={() => handlePopoverToggle(false)}
          content={
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid gray",
                borderRadius: "0.2rem"
              }}
            >
              {!header.popupType ? null : header.popupType === "datetime" ? (
                <DatePopup
                  close={() => handlePopoverToggle(false)}
                  header={header}
                  criteria={criteria}
                  setCriteria={setCriteria}
                  order={order}
                  orderBy={orderBy}
                  setSort={setSort}
                  setCheckedProjectIds={setCheckedProjectIds}
                  setSelectAllChecked={setSelectAllChecked}
                />
              ) : header.popupType === "text" ? (
                <TextPopup
                  close={() => handlePopoverToggle(false)}
                  header={header}
                  criteria={criteria}
                  setCriteria={setCriteria}
                  order={order}
                  orderBy={orderBy}
                  setSort={setSort}
                  setCheckedProjectIds={setCheckedProjectIds}
                  setSelectAllChecked={setSelectAllChecked}
                  projects={projects}
                  filter={filter}
                />
              ) : header.popupType === "visibility" ? (
                <VisibilityPopup
                  close={() => handlePopoverToggle(false)}
                  header={header}
                  criteria={criteria}
                  setCriteria={setCriteria}
                  order={order}
                  orderBy={orderBy}
                  setSort={setSort}
                  setCheckedProjectIds={setCheckedProjectIds}
                  setSelectAllChecked={setSelectAllChecked}
                />
              ) : header.popupType === "status" ? (
                <StatusPopup
                  close={() => handlePopoverToggle(false)}
                  header={header}
                  criteria={criteria}
                  setCriteria={setCriteria}
                  order={order}
                  orderBy={orderBy}
                  setSort={setSort}
                  setCheckedProjectIds={setCheckedProjectIds}
                  setSelectAllChecked={setSelectAllChecked}
                />
              ) : null}
            </div>
          }
        >
          <ColumnHeader
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            header={header}
            isFilterApplied={() => isFilterApplied()}
          ></ColumnHeader>
        </Popover>
      ) : (
        <span>{header.label}</span>
      )}
    </div>
  );
};

ProjectTableColumnHeader.propTypes = {
  projects: PropTypes.any,
  filter: PropTypes.func,
  header: PropTypes.any,
  criteria: PropTypes.any,
  setCriteria: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setSort: PropTypes.func,

  setCheckedProjectIds: PropTypes.func,
  setSelectAllChecked: PropTypes.func
};

export default ProjectTableColumnHeader;
