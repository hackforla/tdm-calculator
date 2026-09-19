import React from "react";
import { Interweave } from "interweave";
import { MdLaunch } from "react-icons/md";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  externalLinkIcon: {
    fontSize: "14px",
    padding: " 0 0.4em",
    color: "#00F"
  },
  subheading: {
    fontSize: "20px",
    margin: "1em 0"
  }
});

const DefaultView = ({ aboutList }) => {
  const classes = useStyles();
  if (!aboutList || aboutList?.length === 0) {
    return null;
  }
  return (
    <>
      {aboutList.map(about => (
        <div key={about.id}>
          <h2 className={classes.subheading}>{about.title}</h2>
          <Interweave
            transform={TransformExternalLink}
            content={about.content}
          />
        </div>
      ))}
    </>
  );
};

export default DefaultView;

DefaultView.propTypes = {
  aboutList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  )
};

function TransformExternalLink(node, children) {
  const classes = useStyles();
  const href = node.getAttribute("href") || "";
  if (
    node.tagName == "A" &&
    !href.startsWith("/") &&
    !href.toLowerCase().startsWith("mailto:")
  ) {
    return (
      <span>
        <a href={href} target="_blank" rel="noopener noreferrer">
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
