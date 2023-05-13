import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  lastSaved: {
    fontSize: "14px",
    color: "#6F6C64"
  },
  lastSavedContainer: {
    margin: "24px auto 0"
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
    <section className={classes.lastSavedContainer}>
      <p>Last saved: {dateModified}</p>
      <p>
        Date Printed:{" "}
        {printedDate.toLocaleString("en-US", {
          timeZone: "America/Los_Angeles"
        })}
      </p>
    </section>
  );
};
PdfFooter.propTypes = {
  dateModified: PropTypes.string || null
};

export default PdfFooter;
