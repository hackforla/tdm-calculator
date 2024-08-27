import React from "react";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import { MdFilterAlt } from "react-icons/md";
import Popup from "reactjs-popup";
import DatePopup from "./DatePopup";
import TextPopup from "./TextPopup";
import VisibilityPopup from "./VisibilityPopup";
import StatusPopup from "./StatusPopup";

const ProjectTableColumnHeader = ({
  header,
  criteria,
  setCriteria,
  order,
  orderBy,
  setSort,
  setCheckedProjectIds,
  setSelectAllChecked
}) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {header.id !== "checkAllProjects" && header.id !== "contextMenu" ? (
        <Popup
          trigger={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <span>{header.label}</span>
              <MdFilterAlt
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  marginLeft: "0.5rem"
                }}
                alt={`Show column filter and sort popup`}
              />
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
