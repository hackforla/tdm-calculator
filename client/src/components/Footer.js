import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

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
    marginLeft: "auto"
  },
  "@media (max-width:768px)": {
    links: {
      justifyContent: "center"
    }
  }
});

const Footer = () => {
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
        <Link className={classes.linkLastChild} to="/checklist">
          Checklist
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
