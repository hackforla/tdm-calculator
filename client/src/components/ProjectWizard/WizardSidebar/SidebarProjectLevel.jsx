import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import ToolTipIcon from "../../ToolTip/ToolTipIcon";
import clsx from "clsx";
import Popup from "reactjs-popup";
import { MdClose } from "react-icons/md";
import { sanitizeHtml } from "helpers/SanitizeRichText";

const useStyles = createUseStyles({
  projectLevelHeader: {
    color: "white",
    fontSize: 18,
    fontFamily: "Oswald, Calibri",
    fontWeight: 500,
    textAlign: "center",
    transition: "opacity 1s"
  },
  projectLevelValue: {
    color: "white",
    fontSize: 80,
    fontFamily: "Oswald, Calibri",
    fontWeight: "bold",
    marginBottom: "-12px",
    textAlign: "center",
    lineHeight: "1.1em"
  },
  projectLevelContainer: {
    flex: 1
  },
  lowOpacity: {
    opacity: 0.4
  }
});

const SidebarProjectLevel = ({ level, rules }) => {
  const theme = useTheme();
  const classes = useStyles();
  const tipText = `<p>${rules[0]?.description}</p>`;
  // Sanitize DangerouslySetInnerHtml with DomPurify
  const sanitizeTipText = sanitizeHtml(tipText);

  return (
    <div
      className={clsx(
        classes.projectLevelContainer,
        level === 0 && classes.lowOpacity
      )}
    >
      <p id="PROJECT_LEVEL" className={classes.projectLevelValue}>
        {level}
      </p>
      <h3 className={classes.projectLevelHeader}>
        PROJECT LEVEL
        {level > 0 && (
          <Popup
            trigger={
              <span style={{ cursor: "pointer" }}>
                <ToolTipIcon />
              </span>
            }
            position="right center"
            arrow={true}
            contentStyle={{ width: "30%" }}
          >
            {close => {
              return (
                <div style={{ margin: "1rem" }}>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      color: theme.colors.secondary.gray,
                      border: "none",
                      position: "absolute",
                      top: "0",
                      right: "0",
                      cursor: "pointer"
                    }}
                    onClick={close}
                  >
                    <MdClose style={{ height: "20px", width: "20px" }} />
                  </button>
                  {/* DangerouslySetInnerHtml was clean here with DomPurify.  
                  Please reference Decision Records for more details: 
                  https://github.com/hackforla/tdm-calculator/wiki/Decision-Records */}
                  <div dangerouslySetInnerHTML={{ __html: sanitizeTipText }} />
                </div>
              );
            }}
          </Popup>
        )}
      </h3>
    </div>
  );
};

SidebarProjectLevel.propTypes = {
  level: PropTypes.number.isRequired,
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  ).isRequired
};

export default SidebarProjectLevel;
