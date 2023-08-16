import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faChevronDown,
  faChevronUp,
  // faEdit,
  faGripHorizontal
} from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  buttonContainer: {
    display: "flex"
  },
  faqGripIcon: {
    cursor: "grab",
    fontSize: "1.5em",
    paddingTop: "0.25em",
    paddingRight: "0.25em"
  },
  faqIcon: {
    cursor: "pointer",
    fontSize: "1.5em",
    paddingTop: "0.25em",
    paddingRight: "0.25em"
  }
});

export const FaqButtonContainer = ({
  admin,
  isHovered,
  dragHandleProps,
  onDeleteFAQ,
  expandFaq,
  collapseFaq,
  faq
}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.buttonContainer} {...dragHandleProps}>
      {isHovered && (
        <div>
          <FontAwesomeIcon
            color={theme.colors.warning}
            className={classes.faqIcon}
            icon={faTrashAlt}
            onClick={onDeleteFAQ}
          />
        </div>
      )}
      <div className={classes.faqIcon}>
        {faq.expand ? (
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon={faChevronUp}
            onClick={() => collapseFaq(faq)}
          />
        ) : (
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon={faChevronDown}
            onClick={() => expandFaq(faq)}
          />
        )}
      </div>
      {admin && (
        <>
          <FontAwesomeIcon
            className={classes.faqGripIcon}
            color={theme.colors.secondary.gray}
            icon={faGripHorizontal}
          />
        </>
      )}
    </div>
  );
};

FaqButtonContainer.propTypes = {
  admin: PropTypes.bool,
  isHovered: PropTypes.bool,
  dragHandleProps: PropTypes.any,
  onDeleteFAQ: PropTypes.func,
  expandFaq: PropTypes.func,
  collapseFaq: PropTypes.func,
  faq: PropTypes.object
};
