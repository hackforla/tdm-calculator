import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

export const useStyles = createUseStyles({
  container: {
    margin: "0",
    height: "calc(100vh - 103px)",
    minHeight: "60px",
    flexBasis: "387px",
    flexGrow: 0,
    flexShrink: 1,
    backgroundImage: "url(/assets/hard-hats-silvia-brazzoduro.png)",
    backgroundPosition: "15% center",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
    //position: "relative"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%"
  },
  links: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
    color: "white",
    marginTop: "auto",
    marginBottom: 20
    //width: "100%",
    //height: "auto",
    //position: "absolute",
    //left: 5,
    //right: 5,
    //bottom: "20px"
  },
  link: {
    color: "white",
    textAlign: "center"
  },
  "@media (max-width:960px)": {
    container: {
      "flex-shrink": 5
    }
  },
  "@media (max-width:720px)": {
    container: {
      order: 2,
      height: "auto",
      flexBasis: "auto"
    }
  }
});

export function Sidebar(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.overlay} />
      <div className={classes.content}>
        {props.children}
        <div className={classes.links}>
          <Link className={classes.link} to="/">
            Terms and Conditions
          </Link>
          <div>|</div>
          <Link className={classes.link} to="/">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
Sidebar.propTypes = {
  children: PropTypes.any
};

export default Sidebar;
