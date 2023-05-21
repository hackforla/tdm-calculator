import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  pdfTimeText: {
    fontSize: "14px",
    color: "rgb(53,119,163)"
  },
  pdfFooterContainer: {
    margin: "24px 0 0"
  }
});

const PdfFooter = props => {
  const classes = useStyles();
  const { dateModified } = props;
  const [printedDate, setPrintedDate] = useState(new Date());

  useEffect(() => {
    // You would update these dates based on your application logic
    // For instance, you might fetch them from an API when the component mounts
    const updateDates = () => {
      setPrintedDate(new Date()); // replace with actual date
    };

    updateDates();
    const intervalId = setInterval(updateDates, 60 * 1000); // updates every minute

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <section className={classes.pdfFooterContainer}>
      <div className={classes.pdfTimeText}>
        Date Last Saved: {dateModified} Pacific Time
      </div>
      <div
        className={classes.pdfTimeText}
        style={{
          borderBottom: "solid 3px rgb(0,69,128)",
          paddingBottom: "5px",
          marginBottom: "5px"
        }}
      >
        Date Printed:{" "}
        {printedDate.toLocaleString("en-US", {
          timeZone: "America/Los_Angeles"
        })}{" "}
        Pacific Time
      </div>
      <span className={classes.pdfTimeText}>
        Los Angeles Department of Transportation | tdm.ladot.lacity.org |
        LADOT.TDM@lacity.org
      </span>
      <span
        className={classes.pdfTimeText}
        style={{
          float: "right"
        }}
      >
        Page 1 of 1
      </span>
    </section>
  );
};
PdfFooter.propTypes = {
  dateModified: PropTypes.string || null
};

export default PdfFooter;
