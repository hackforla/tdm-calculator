import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "react-jss";
import { MdWarning } from "react-icons/md";
import CloseBox from "../UI/CloseBox";

const UnregisteredUserWarning = ({ onClose }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        margin: "0",
        padding: "0"
      }}
    >
      <div
        style={{
          margin: "1rem",
          fontSize: "20px",
          lineHeight: "1.15",
          position: "absolute",
          padding: "1.5rem 1rem 1rem 1rem",

          top: "-2rem",
          right: "-3rem",
          width: "20rem",
          borderRadius: "5px",
          border: "1px solid " + theme.colorCritical,
          backgroundColor: theme.colorTooltipBackground,
          boxShadow:
            "0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px 0px rgba(0,0,0,0.3)"
        }}
      >
        <CloseBox
          style={{
            backgroundColor: "transparent",
            color: theme.colorGray,
            border: "none",
            position: "absolute",
            top: "0.25rem",
            right: "0.25rem",
            cursor: "pointer"
          }}
          onClick={onClose}
        />
        <div style={{ display: "flex", margin: "0" }}>
          <MdWarning
            style={{
              color: theme.colorCritical,
              width: "40px",
              height: "40px",
              margin: "0.5rem"
            }}
          />
          <div style={{ marginLeft: "0.5rem" }}>
            Only TDM Plans created after logging in can be saved
          </div>
        </div>
      </div>
    </div>
  );
};

UnregisteredUserWarning.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default UnregisteredUserWarning;
