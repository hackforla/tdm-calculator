import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const ToggleCheckbox = ({
    checked,
    onChange,
    label,
    color = "#1967d2",
    fontSize = "1.4rem",
    ariaLabel
}) => {
    return (
        <button
            onClick={onChange}
            style={{
                background: "transparent",
                border: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                outline: "none",

            }}
            aria-label={ariaLabel || `Toggle ${label}`}
            title={label}
        >
            {checked ? (
                <MdCheckBox style={{ color, fontSize }} />
            ) : (
                <MdCheckBoxOutlineBlank style={{ fontSize }} />
            )}
        </button>
    );
};

export default ToggleCheckbox;