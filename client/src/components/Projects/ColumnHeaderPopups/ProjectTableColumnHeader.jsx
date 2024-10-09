import React from "react";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import { MdFilterAlt, MdFilterList } from "react-icons/md";
import Popup from "reactjs-popup";
import DatePopup from "./DatePopup";
import TextPopup from "./TextPopup";
import VisibilityPopup from "./VisibilityPopup";
import StatusPopup from "./StatusPopup";
import { useTheme } from "react-jss";

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

  // Filter is considered Applied if it is not set
  // to the default criteria values.
  const isFilterApplied = () => {
    let propertyName = header.id;
    if (header.popupType === "text") {
      propertyName += "List";
      return criteria[propertyName].length > 0;
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
    return false;
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {header.id !== "checkAllProjects" && header.id !== "contextMenu" ? (
        <Popup
          lockScroll={true}
          trigger={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <span>{header.label}</span>
              {isFilterApplied() ? (
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
              {/* <FontAwesomeIcon
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  marginLeft: "0.5rem"
                }}
                icon={faFilter}
                alt={`Show column filter and sort popup`}
              /> */}
            </div>
          }
          position="bottom center"
          offsetY={10}
          arrow={false}
          contentStyle={{ width: "auto" }}
        >
          {close => {
            return !header.popupType ? null : header.popupType ===
              "datetime" ? (
              <DatePopup
                close={close}
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
                close={close}
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
                close={close}
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
                close={close}
                header={header}
                criteria={criteria}
                setCriteria={setCriteria}
                order={order}
                orderBy={orderBy}
                setSort={setSort}
                setCheckedProjectIds={setCheckedProjectIds}
                setSelectAllChecked={setSelectAllChecked}
              />
            ) : null;
          }}
        </Popup>
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
