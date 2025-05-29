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
  }
});

const DefaultView = ({ aboutList }) => {
  if (!aboutList || aboutList?.length === 0) {
    return null;
  }
  return (
    <>
      {aboutList.map(about => (
        <div key={about.id}>
          <h3>{about.title}</h3>
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
