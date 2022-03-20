import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";

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
    margin: "0 10px"
  },
  linkLastChild: {
    color: "white",
    marginLeft: "auto",
    textDecoration: "underline",
    cursor: "pointer"
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
