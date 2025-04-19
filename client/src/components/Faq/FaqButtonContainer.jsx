import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import {
  MdDelete,
  MdExpandMore,
  MdExpandLess,
  MdViewModule
} from "react-icons/md";

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
  },
  deleteFaqIcon: {
    paddingRight: "28px"
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
      {admin && (
        <MdDelete
          color={theme.colorCritical}
          className={`${classes.faqIcon} ${classes.deleteFaqIcon}`}
          onClick={onDeleteFAQ}
        />
      )}
      <div className={classes.faqIcon}>
        {faq.expand ? (
          <MdExpandLess
            style={{ cursor: "pointer" }}
            onClick={() => collapseFaq(faq)}
          />
        ) : (
          <MdExpandMore
            style={{ cursor: "pointer" }}
            onClick={() => expandFaq(faq)}
          />
        )}
      </div>
      {admin && (
        <MdViewModule
          className={classes.faqGripIcon}
          color={theme.colors.secondary.gray}
        />
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
