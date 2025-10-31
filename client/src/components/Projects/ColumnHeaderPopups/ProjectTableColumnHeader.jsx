import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import {
  MdOutlineFilterAlt,
  MdOutlineSwitchRight,
  MdOutlineSwitchLeft
} from "react-icons/md";
import { createUseStyles } from "react-jss";
import { Popover } from "react-tiny-popover";
import DatePopup from "./DatePopup";
import TextPopup from "./TextPopup";
import StringPopup from "./StringPopup";
import StringListPopup from "./StringListPopup";
import NumberPopup from "./NumberPopup";
import BooleanPopup from "./BooleanPopup";
import VisibilityPopup from "./VisibilityPopup";
import StatusPopup from "./StatusPopup";
import { useTheme } from "react-jss";

const useStyles = createUseStyles(theme => ({
  iconFilter: {
    color: theme.colorWhite,
    fontSize: "1.2rem",
    marginLeft: "1rem",
    "&.active": {
      borderBottom: "1px solid #fff"
    },
    "&:hover": {
      backgroundColor: theme.colorWhite,
      color: theme.colorLADOT,
      borderRadius: "12.5%",
      cursor: "pointer"
    }
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
      <MdOutlineFilterAlt
        className={`${classes.iconFilter} ${props.isFilterApplied() ? "active" : ""}`}
        alt={`Show column filter and sort popup`}
      />
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
  const columnHeaderRef = useRef(null);
  const popoverContentRef = useRef(null);
  const suppressNextOutsideClickRef = useRef(false);
  const internalInteractionTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (internalInteractionTimeoutRef.current) {
        clearTimeout(internalInteractionTimeoutRef.current);
      }
    };
  }, []);

  // Filter is considered Applied if it is not set
  // to the default criteria values.
  const isFilterApplied = () => {
    let propertyName = header.accessor || header.id;
    if (
      header.popupType === "text" ||
      header.popupType === "string" ||
      header.popupType === "number" ||
      header.popupType === "stringList"
    ) {
      const listPropertyName = propertyName + "List";
      const listValue = criteria[listPropertyName];

      const isListFilterApplied =
        Array.isArray(listValue) && listValue.length > 0;

      return isListFilterApplied;
    }
    if (header.popupType === "boolean") {
      return criteria[header.id] !== null;
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

  const handleClickOutside = event => {
    if (suppressNextOutsideClickRef.current) {
      suppressNextOutsideClickRef.current = false;
      if (internalInteractionTimeoutRef.current) {
        clearTimeout(internalInteractionTimeoutRef.current);
        internalInteractionTimeoutRef.current = null;
      }
      return;
    }

    const target = event?.target;

    if (!target) {
      handlePopoverToggle(false);
      return;
    }

    const isWithinTrigger = columnHeaderRef.current?.contains(target);
    const isWithinContent = popoverContentRef.current?.contains(target);

    if (isWithinTrigger || isWithinContent) {
      return;
    }

    if (target instanceof Element) {
      const isWithinDatepicker = target.closest(
        ".react-datepicker, .react-datepicker__portal"
      );

      if (isWithinDatepicker) {
        return;
      }
    }

    handlePopoverToggle(false);
  };

  const handleInternalInteraction = () => {
    suppressNextOutsideClickRef.current = true;

    if (internalInteractionTimeoutRef.current) {
      clearTimeout(internalInteractionTimeoutRef.current);
    }

    internalInteractionTimeoutRef.current = setTimeout(() => {
      suppressNextOutsideClickRef.current = false;
      internalInteractionTimeoutRef.current = null;
    }, 150);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {header.id !== "checkAllProjects" &&
      header.id !== "contextMenu" &&
      header.id !== "editIcon" ? (
        <Popover
          containerStyle={{ zIndex: 20 }}
          isOpen={isPopoverOpen}
          onClickOutside={handleClickOutside}
          clickOutsideCapture={true}
          positions={["bottom", "left", "right", "top"]} // preferred positions by priority
          align="start"
          padding={10}
          content={
            <div
              ref={popoverContentRef}
              className={classes.popoverContent}
              onMouseDownCapture={handleInternalInteraction}
              onTouchStartCapture={handleInternalInteraction}
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
              ) : header.popupType === "boolean" ? (
                <BooleanPopup
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
              ) : header.popupType === "string" ? (
                <StringPopup
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
              ) : header.popupType === "stringList" ? (
                <StringListPopup
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
              ) : header.popupType === "number" ? (
                <NumberPopup
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
            ref={columnHeaderRef}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            header={header}
            isFilterApplied={() => isFilterApplied()}
            order={order}
            orderBy={orderBy}
          ></ColumnHeader>
        </Popover>
      ) : header.label ? (
        <span>{header.label}</span>
      ) : (
        <span className="sr-only">{header.id}</span>
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
