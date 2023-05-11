import React, { useState, useEffect } from "react";

const PdfDate = () => {
  const [lastSavedDate, setLastSavedDate] = useState(new Date());
  const [printedDate, setPrintedDate] = useState(new Date());

  useEffect(() => {
    // You would update these dates based on your application logic
    // For instance, you might fetch them from an API when the component mounts
    const updateDates = () => {
      setLastSavedDate(new Date()); // replace with actual date
      setPrintedDate(new Date()); // replace with actual date
    };

    updateDates();
    const intervalId = setInterval(updateDates, 60 * 1000); // updates every minute

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <div>
      <p>
        Date Last Saved:{" "}
        {lastSavedDate.toLocaleString("en-US", {
          timeZone: "America/Los_Angeles"
        })}
      </p>
      <p>
        Date Printed:{" "}
        {printedDate.toLocaleString("en-US", {
          timeZone: "America/Los_Angeles"
        })}
      </p>
    </div>
  );
};

export default PdfDate;
