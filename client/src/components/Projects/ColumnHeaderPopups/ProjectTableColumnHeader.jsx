/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import {
  MdFilterAlt,
  MdOutlineFilterAlt,
  MdOutlineSwitchRight,
  MdOutlineSwitchLeft
} from "react-icons/md";
import { createUseStyles } from "react-jss";
import { Popover } from "react-tiny-popover";
import DatePopup from "./DatePopup";
import TextPopup from "./TextPopup";
import VisibilityPopup from "./VisibilityPopup";
import StatusPopup from "./StatusPopup";
import { useTheme } from "react-jss";

const useStyles = createUseStyles(theme => ({
  iconNoFilter: {
    color: theme.colorWhite,
    fontSize: "1.2rem",
    "&:hover": {
      backgroundColor: theme.colorWhite,
      color: theme.colorLADOT,
      borderRadius: "12.5%",
      cursor: "pointer"
    }
  },
  iconFilter: {
    fontSize: "1.2rem",
    backgroundColor: "transparent",
    color: "theme.colorWhite",
    marginLeft: "0.5rem"
  },
  sortIcon: {
    fontSize: "1.2rem",
    transform: "rotate(90deg)"
  },
  reactTinyPopoverContainer: {
    color: "orange"
  },
  popoverContent: {
    ...theme.typography.paragraph1,
    color: theme.colorBlack,
    textAlign: "left",
    backgroundColor: theme.colorWhite,
    borderWidth: "1px",
    borderColor: theme.colors.secondary.gray,
    borderRadius: "5px",
    padding: "20px",
    boxShadow:
      "0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px 0px rgba(0,0,0,0.3)"
  }
}));

const ColumnHeader = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const classes = useStyles(theme);

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
      {props.orderBy === props.header.id ? (
        props.order === "asc" ? (
          <MdOutlineSwitchRight className={classes.sortIcon} />
        ) : (
          <MdOutlineSwitchLeft className={classes.sortIcon} />
        )
      ) : null}
      {props.isFilterApplied() ? (
        <MdFilterAlt
          className={classes.iconFilter}
          alt={`Show column filter and sort popup`}
        />
      ) : (
        <MdOutlineFilterAlt
          className={classes.iconNoFilter}
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
  isFilterApplied: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string
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
  setSelectAllChecked,
  droOptions
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Filter is considered Applied if it is not set
  // to the default criteria values.
  const isFilterApplied = () => {
    let propertyName = header.accessor || header.id;
    if (header.popupType === "text") {
      const listPropertyName = propertyName + "List";
      const listValue = criteria[listPropertyName];

      if (propertyName === "droName") {
        return Array.isArray(listValue) && listValue.length > 0;
      }

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
          containerStyle={{ zIndex: 2 }}
          isOpen={isPopoverOpen}
          positions={["bottom", "left", "right", "top"]} // preferred positions by priority
          align="start"
          padding={10}
          onClickOutside={() => handlePopoverToggle(false)}
          content={
            <div
              className={classes.popoverContent}
              // style={{
              //   backgroundColor: "white",
              //   border: "1px solid gray",
              //   borderRadius: "5px",
              //   padding: "20px",
              //   boxShadow:
              //     "0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px 0px rgba(0,0,0,0.3)"
              // }}
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
                  droOptions={droOptions}
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
            order={order}
            orderBy={orderBy}
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
  setSelectAllChecked: PropTypes.func,
  droOptions: PropTypes.array
};

export default ProjectTableColumnHeader;
