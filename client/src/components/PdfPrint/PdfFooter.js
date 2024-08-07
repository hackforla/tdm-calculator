import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import UserContext from "../../contexts/UserContext";
import { DateTime } from "luxon";
import { formatDatetime } from "../../helpers/util";

const useStyles = createUseStyles({
  pdfTimeText: {
    fontSize: "14px",
    color: "rgb(53,119,163)"
  },
  pdfFooterContainer: {
    margin: "24px 0 0",
    width: "100%"
  }
});

const PdfFooter = ({ project }) => {
  const { dateModified, dateSubmitted, dateSnapshotted, loginId } = project;
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const loggedInUserId = userContext.account?.id;
  const formattedDateModified = formatDatetime(dateModified);
  const formattedDateSnapshotted = formatDatetime(dateSnapshotted);
  const formattedDateSubmitted = formatDatetime(dateSubmitted);

  const [formattedDatePrinted, setFormattedDatePrinted] = useState(
    formatDatetime(DateTime.now())
  );

  useEffect(() => {
    // You would update these dates based on your application logic
    // For instance, you might fetch them from an API when the component mounts
    const updateDates = () => {
      setFormattedDatePrinted(formatDatetime(DateTime.now())); // replace with actual date
    };

    updateDates();

    const intervalId = setInterval(updateDates, 60 * 1000); // updates every minute

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <section className={classes.pdfFooterContainer}>
      {loginId && (
        <>
          <div className={classes.pdfTimeText}>
            Status:{" "}
            {!formattedDateSnapshotted
              ? "Draft"
              : loginId === loggedInUserId
              ? "Snapshot"
              : "Shared Snapshot"}
          </div>
          {formattedDateSubmitted && (
            <div className={classes.pdfTimeText}>
              Snapshot Submitted: {formattedDateSubmitted} Pacific Time
            </div>
          )}
          {formattedDateSnapshotted && (
            <div className={classes.pdfTimeText}>
              Snapshot Created: {formattedDateSnapshotted} Pacific Time
            </div>
          )}
          {formattedDateModified && (
            <div className={classes.pdfTimeText}>
              Date Last Saved: {formattedDateModified} Pacific Time
            </div>
          )}
        </>
      )}

      <div
        className={classes.pdfTimeText}
        style={{
          borderBottom: "solid 3px rgb(0,69,128)",
          paddingBottom: "5px",
          marginBottom: "5px"
        }}
      >
        Date Printed: {formattedDatePrinted}
      </div>
      <span className={classes.pdfTimeText}>
        Los Angeles Department of Transportation | tdm.ladot.lacity.org |
        LADOT.TDM@lacity.org
      </span>
    </section>
  );
};

PdfFooter.propTypes = {
  project: PropTypes.shape
};

export default PdfFooter;
