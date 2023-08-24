import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export const useStyles = createUseStyles({
  footer: {
    backgroundColor: "#002E6D"
  },
  links: {
    display: "flex",
    flexDirection: "row",
    color: "white",
    padding: "1em 1em 1em 1em"
  },
  link: {
    color: "white",
    textAlign: "center",
    margin: "0 10px",
    flex: "0 1 auto"
  },
  spacer: {
    flex: "1 0"
  },
  glossaryDiv: {
    marginRight: "0.5em",
    flex: "0 1 auto",
    margin: "0 10px"
  },
  glossaryLink: {
    color: "white"
  },
  externalLinkIcon: {
    fontSize: "14px",
    padding: " 0 0.5em",
    color: "white"
  },
  linkLastChild: {
    color: "white",
    textDecoration: "underline",
    cursor: "pointer",
    flex: "0 1 auto",
    margin: "0 10px"
  },
  "@media (max-width:768px)": {
    links: {
      justifyContent: "center"
    }
  }
});

const Footer = ({ toggleChecklistModal }) => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.links}>
        <Link className={classes.link} to="/termsandconditions">
          Terms and Conditions
        </Link>
        <div>|</div>
        <Link className={classes.link} to="/privacypolicy">
          Privacy Policy
        </Link>
        <div className={classes.spacer}></div>
        <div className={classes.glossaryDiv} onClick={toggleChecklistModal}>
          <a
            href="https://planning.lacity.org/odocument/c3c9b320-4431-49ff-99d2-15b479c06074/Revised_DRAFT_TDMProgramGuidelines_June2022.pdf/#page=48"
            target="external"
            className={classes.glossaryLink}
          >
            Glossary
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              className={classes.externalLinkIcon}
            />
          </a>
        </div>
        <div>|</div>
        <div className={classes.linkLastChild} onClick={toggleChecklistModal}>
          Checklist
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  toggleChecklistModal: PropTypes.func
};

export default Footer;
