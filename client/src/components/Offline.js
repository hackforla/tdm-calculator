import React from "react";
import { createUseStyles } from "react-jss";
import { MdError } from "react-icons/md";
import wave from "../images/wave.svg";

const useStyles = createUseStyles(() => ({
  failure: {
    color: "#E46247",
    fontSize: "3.5em"
  },
  offlineContainer: {
    backgroundImage: `url(${wave})`,
    boxSizing: "border-box",
    overflow: "auto",
    flexBasis: "auto",
    flexGrow: "1",
    flexShrink: "1",
    alignItems: "center",
    padding: "8em 2em 2em 2em",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(100vh - 103px - 48px)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100vw",
    backgroundPosition: "bottom"
  },
  offlineText: {
    paddingTop: "2em",
    paddingBottom: "0.5em",
    fontSize: "1.2em",
    color: "#C35302",
    fontWeight: "700"
  }
}));

const OfflinePage = () => {
  // const location = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.offlineContainer}>
      <div>
        <MdError className={classes.failure} />
      </div>
      <br></br>
      <div className={classes.offlineText}>
        The Los Angeles TDM Calculator is unavailable at this time.
      </div>
      <br></br>
      <div>
        Please email <a>ladot.tdm@lacity.org</a> for assistance
      </div>
    </div>
  );
};

export default OfflinePage;
