import React from "react";
import PropTypes from "prop-types";
import PlanningIcon from "../../../images/planning.png";
import { createUseStyles, useTheme } from "react-jss";
import { MdLaunch } from "react-icons/md";
import { MdWarning } from "react-icons/md";

const useStyles = createUseStyles({
  level0NavButtons: {
    "& + div #rightNavArrow": {
      visibility: "hidden" // this hides the next nav button
    }
  },
  level0Container: {
    textAlign: "center"
  },
  level0Message: {
    marginTop: "20px",
    maxWidth: "800px",
    backgroundColor: "white",
    color: "black",
    fontSize: "22px",
    lineHeight: "38px",
    padding: "60px 48px 40px",
    textAlign: "initial",
    boxSizing: "border-box",

    "& p": {
      marginLeft: "44px"
    }
  },
  warningIcon: {
    float: "left"
  }
});

const Level0Page = ({ isLevel0 }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <>
      {isLevel0 && (
        <div className={classes.level0NavButtons}>
          <div className={classes.level0Container}>
            <img src={PlanningIcon} alt="planningIcon" />
            <h1 style={theme.typography.heading1}>Your project level is 0!</h1>
            <div className={classes.level0Message}>
              <MdWarning className={classes.warningIcon} alt="Warning" />
              <p>
                Based on the information you provided, the Transportation Demand
                Management (TDM) Ordinance <strong>may</strong> not apply to
                your project due to its smaller size. Please check LAMC Section
                12.26 J.3(c) of the{" "}
                <a
                  href="https://planning.lacity.org/odocument/bb9114b3-29e3-423f-8b91-027afb242e63/Revised_DRAFT_TDMOrdinance_June2022.pdf"
                  target="external"
                >
                  Draft Revised TDM Ordinance{" "}
                  <MdLaunch className={classes.externalLinkIcon} />
                </a>{" "}
                for applicability and exemption details.
              </p>
              <p>
                Final determination of the TDM Ordinance applicability will be
                made by the Department of Building and Safety upon review of
                your project application.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Level0Page.propTypes = {
  isLevel0: PropTypes.bool.isRequired
};

export default Level0Page;
