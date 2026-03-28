import React from "react";
import { QuillEditor } from "../UI/QuillEditor";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import { Interweave } from "interweave";
import { MdLaunch } from "react-icons/md";

const useStyles = createUseStyles(theme => ({
  answerContainer: {
    width: "100%"
  },
  answerInput: {
    width: "100%",
    display: "flex",
    fontSize: "16px",
    flexDirection: "column",
    "& .ql-editor ol, & .ql-editor ul": {
      fontSize: "16px"
    },
    "& .ql-editor li": {
      fontSize: "16px"
    }
  },
  answerText: {
    ...theme.typography.subHeading,
    textAlign: "inherit",
    padding: 8,
    fontWeight: 22,
    fontSize: "16px",
    margin: 0,
    cursor: admin => (admin ? "pointer" : "default"),
    "&:hover": {
      textDecoration: admin => admin && "underline"
    },
    "& .ql-editor p": {
      margin: "0",
      padding: "0"
    },
    "& .ql-indent-1": {
      marginLeft: "3em"
    },
    "& .ql-indent-2": {
      marginLeft: "6em"
    },
    "& .ql-editor ol, & .ql-editor ul": {
      fontSize: "16px",
      margin: "0 !important",
      padding: "0",
      listStylePosition: "inside"
    },
    "& .ql-editor li": {
      margin: "0 !important",
      padding: "0"
    }
  },
  externalLinkIcon: {
    fontSize: "14px",
    padding: " 0 0.4em",
    color: "#00F"
  }
}));

export const Answer = ({
  admin,
  answer,
  handleAnswerChange,
  isEditAnswer,
  setIsEditAnswer,
  onSetFaq
}) => {
  const classes = useStyles(admin);

  const handleSetFAQ = event => {
    // TODO: the early returns look like hackery.
    // not sure what it's trying to do, but handleSetFAQ is called on blur,
    // which means it's called when opening links in a new tab.
    // this is a problem because,
    // we really don't need to call it all the time (thus the hackery).

    // Check if the relatedTarget is within the Answer component
    const tooltip = document.getElementsByClassName("ql-tooltip");
    if (
      tooltip &&
      tooltip.length > 1 &&
      !tooltip[0].className.includes("hidden")
    ) {
      return;
    }
    if (
      event.relatedTarget &&
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return; // Skip calling onSetFaq
    }

    onSetFaq();
  };

  return (
    <div onBlur={handleSetFAQ} className={classes.answerContainer}>
      {isEditAnswer ? (
        <div style={{ display: "flex", width: "100%" }}>
          <QuillEditor
            value={answer}
            placeholder="Answer..."
            onChange={handleAnswerChange}
            className={classes.answerInput}
          />
        </div>
      ) : (
        <div
          onClick={() => admin && setIsEditAnswer(!isEditAnswer)}
          style={{ display: "flex" }}
        >
          <div className={classes.answerText}>
            <Interweave transform={TransformExternalLink} content={answer} />
          </div>
        </div>
      )}
    </div>
  );
};

Answer.propTypes = {
  admin: PropTypes.bool,
  answer: PropTypes.string,
  handleAnswerChange: PropTypes.func,
  isEditAnswer: PropTypes.bool,
  setIsEditAnswer: PropTypes.func,
  onSetFaq: PropTypes.func
};

function TransformExternalLink(node, children) {
  const classes = useStyles();
  if (node.tagName == "A" && !node.getAttribute("href").startsWith("/")) {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
    return (
      <span>
        <a href={node.getAttribute("href")} target="external">
          {children}
          <MdLaunch className={classes.externalLinkIcon} />
        </a>
      </span>
    );
  } else {
    node.removeAttribute("target");
    node.removeAttribute("rel");
  }
}
