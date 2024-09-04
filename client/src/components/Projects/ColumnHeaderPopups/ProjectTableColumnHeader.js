import React from "react";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import { MdFilterList } from "react-icons/md";
import Popup from "reactjs-popup";
import DatePopup from "./DatePopup";
import TextPopup from "./TextPopup";
import VisibilityPopup from "./VisibilityPopup";
import StatusPopup from "./StatusPopup";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  icon: {
    backgroundColor: "transparent",
    color: "grey",
    fontSize: "1.2em",
    marginLeft: "1.2em",
    "&:hover": {
      color: "#000000"
    }
  }
});

const ProjectTableColumnHeader = ({
  header,
  toggledHeader,
  handleHeaderToggle,
  criteria,
  setCriteria,
  order,
  orderBy,
  setSort,
  setCheckedProjectIds,
  setSelectAllChecked,
  visibilitySetting,
  setVisibilitySetting,
  statusSettings,
  setStatusSettings
}) => {
  const classes = useStyles();

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {header.id !== "checkAllProjects" && header.id !== "contextMenu" ? (
        <Popup
          onOpen={() => {
            handleHeaderToggle(header.id);
          }}
          onClose={() => {
            handleHeaderToggle(header.id);
          }}
          trigger={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <span>{header.label}</span>
              <MdFilterList
                className={classes.icon}
                alt={`Show column filter and sort popup`}
              />
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
                toggledHeader={toggledHeader}
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
                toggledHeader={toggledHeader}
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
                toggledHeader={toggledHeader}
                visibilitySetting={visibilitySetting}
                setVisibilitySetting={setVisibilitySetting}
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
                toggledHeader={toggledHeader}
                statusSettings={statusSettings}
                setStatusSettings={setStatusSettings}
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
  header: PropTypes.any,
  toggledHeader: PropTypes.string,
  criteria: PropTypes.any,
  setCriteria: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  setSort: PropTypes.func,
  handleHeaderToggle: PropTypes.func,
  setCheckedProjectIds: PropTypes.func,
  setSelectAllChecked: PropTypes.func,
  visibilitySetting: PropTypes.string,
  setVisibilitySetting: PropTypes.func,
  statusSettings: PropTypes.string,
  setStatusSettings: PropTypes.func
};

export default ProjectTableColumnHeader;
