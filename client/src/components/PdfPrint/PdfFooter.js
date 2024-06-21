import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { DateTime } from "luxon";

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

const PdfFooter = ({ dateModified, dateSnapshotted }) => {
  const classes = useStyles();

  const [printedDate, setPrintedDate] = useState(DateTime.now());

  useEffect(() => {
    // You would update these dates based on your application logic
    // For instance, you might fetch them from an API when the component mounts
    const updateDates = () => {
      setPrintedDate(DateTime.now()); // replace with actual date
    };

    updateDates();

    const intervalId = setInterval(updateDates, 60 * 1000); // updates every minute

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <section className={classes.pdfFooterContainer}>
      {dateSnapshotted !== "Invalid DateTime" ? (
        <div className={classes.pdfTimeText}>
          Snapshot Submitted: {dateSnapshotted}
        </div>
      ) : (
        ""
      )}
      <div className={classes.pdfTimeText}>Date Last Saved: {dateModified}</div>
      <div
        className={classes.pdfTimeText}
        style={{
          borderBottom: "solid 3px rgb(0,69,128)",
          paddingBottom: "5px",
          marginBottom: "5px"
        }}
      >
        Date Printed:{" "}
        {printedDate
          .setZone("America/Los_Angeles")
          .toFormat("yyyy-MM-dd, HH:mm:ss 'Pacific Time'")}
      </div>
      <span className={classes.pdfTimeText}>
        Los Angeles Department of Transportation | tdm.ladot.lacity.org |
        LADOT.TDM@lacity.org
      </span>
    </section>
  );
};

PdfFooter.propTypes = {
  dateModified: PropTypes.string || null,
  dateSnapshotted: PropTypes.string || null
};

export default PdfFooter;
