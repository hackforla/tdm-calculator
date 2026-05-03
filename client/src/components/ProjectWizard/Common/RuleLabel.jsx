import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MdLink } from "react-icons/md";
import { createUseStyles, useTheme } from "react-jss";
import clsx from "clsx";
import { MdInfo, MdAddCircle } from "react-icons/md";
import UserContext from "contexts/UserContext";

const useStyles = createUseStyles(theme => ({
  labelWrapper: {
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "50%",
    "&:hover $iconContainer": {
      visibility: "visible"
    },
    cursor: props =>
      props.isAdmin || props.description ? "pointer" : "default"
    // "&:hover": {
    //   cursor: "pointer"
    // }
  },
  labelWrapperWithoutDesc: {
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "50%",
    "&:hover $iconContainer": {
      visibility: "visible"
    },
    cursor: props =>
      props.isAdmin || props.description ? "pointer" : "default"
  },
  tooltipLabel: {
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "50%"
  },
  accordionLabel: {
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "50%",
    "&:hover": {
      cursor: "pointer"
    }
  },
  accordionLabelClicked: {
    color: theme.colorLADOT,
    fontWeight: "bold",
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "50%",
    "&:hover": {
      cursor: "pointer"
    },
    fontSmoothing: "antialiased"
  },
  tooltip: {
    backgroundColor: "blue",
    color: "rgb(30, 36, 63) !important",
    padding: "15px",
    minWidth: "200px",
    maxWidth: "400px",
    fontFamily: "Arial",
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: "bold",
    boxShadow: "0px 0px 8px rgba(0, 46, 109, 0.2)",
    borderRadius: 2
  },
  requiredInputLabel: {
    "&:after": {
      content: '" *"',
      color: theme.colorCritical
    }
  },
  infoIcon: {
    color: "#002E6D"
  },
  iconContainer: {
    visibility: "hidden"
  }
}));

const RuleLabel = ({
  description,
  code,
  display,
  required,
  link,
  name,
  setShowDescription,
  showDescription,
  dataType,
  setIsEditing
}) => {
  const theme = useTheme();
  const userContext = useContext(UserContext);
  const isAdmin = !!userContext?.account?.isAdmin;
  const classes = useStyles({ theme, description, isAdmin });
  const requiredStyle = required && classes.requiredInputLabel;
  const disabledStyle = !display;
  // const labelWithoutFormControlSet = new Set([
  //   "STRATEGY_BIKE_BONUS",
  //   "STRATEGY_CAR_SHARE_BONUS"
  // ]);

  const descriptionHandler = e => {
    e.preventDefault();
    setShowDescription(prev => !prev);
  };

  const addDescriptionHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    if (setIsEditing) {
      setIsEditing(prev => !prev);
    }
  };

  /**
   * dataType === "none" indicates that the rule does not have an input, and thereform no htmlFor target for the label.
   * In this case, return null to avoid WAVE error about label without associated form control.
   * For rules with inputs, return the code to associate the label with the input.
   * @param code string
   * @returns code (string) or null
   */
  const getLabelTarget = code => {
    return dataType === "none" ? null : code;
  };

  // use a span for labels without associated form controls to avoid WAVE error
  const LabelTag = getLabelTarget(code) ? "label" : "span";

  return (
    <div
      className={
        description
          ? clsx(classes.labelWrapper)
          : clsx(classes.labelWrapperWithoutDesc)
      }
      onClick={descriptionHandler}
    >
      <LabelTag
        htmlFor={getLabelTarget(code)}
        className={
          showDescription
            ? description
              ? clsx(
                  classes.accordionLabelClicked,
                  requiredStyle,
                  disabledStyle
                )
              : clsx(classes.tooltipLabel, requiredStyle, disabledStyle)
            : description
              ? clsx(classes.accordionLabel, requiredStyle, disabledStyle)
              : clsx(classes.tooltipLabel, requiredStyle, disabledStyle)
        }
      >
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex="-1"
          >
            {name}
            <MdLink color="black" transform="shrink-5" />
          </a>
        ) : (
          name
        )}
      </LabelTag>
      {description ? (
        <span
          className={clsx("fa-layers fa-fw", classes.iconContainer)}
          style={showDescription ? { visibility: "visible" } : {}}
        >
          <MdInfo className={classes.infoIcon} />
        </span>
      ) : (
        isAdmin && (
          <span
            className={clsx("fa-layers fa-fw", classes.iconContainer)}
            onClick={addDescriptionHandler}
          >
            <MdAddCircle className={classes.infoIcon} />
          </span>
        )
      )}
    </div>
  );
};

RuleLabel.propTypes = {
  id: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  display: PropTypes.bool,
  required: PropTypes.bool,
  link: PropTypes.string,
  setShowDescription: PropTypes.func,
  showDescription: PropTypes.bool,
  dataType: PropTypes.string,
  setIsEditing: PropTypes.func
};
export default RuleLabel;
