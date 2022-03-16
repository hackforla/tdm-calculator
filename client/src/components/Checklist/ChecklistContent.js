import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  title: {
    color: "#0F2940"
  },
  subTitle: {
    color: "grey"
  },
  section: {
    textShadow: "1px 0 0 currentColor"
  }
});

const ChecklistContent = () => {
  const classes = useStyles();
  return (
    <>
      <h1 className={classes.title}>Checklist</h1>
      <br />
      <p className={classes.subTitle}>
        Listed below are the documents that you may need when using Create
        Project.
      </p>
      <div>
        <p>General project information</p>
        <ul>
          <li>Name</li>
          <li>Address</li>
          <li>AIN/APN</li>
        </ul>
      </div>
      <div>
        <p>Planned floor area (sqft) for specific use types</p>
        <ul>
          <li>Retail</li>
          <li>Employment/Office</li>
          <li>Warehouse/Industrial</li>
          <li>Medical</li>
        </ul>
        <p>Planned unit types/sizes for specific use types</p>
        <ul>
          <li>Residentian (Dwelling Units)</li>
          <li>Hotel/Motel (Rooms)</li>
          <li>School (Students)</li>
          <li>Arean/Stadium/Theatre (Seats)</li>
        </ul>
      </div>
      <div>
        <p>Planned number of parking spaces provided</p>
      </div>
      <div>
        <p>PLanned TDM strategies (Optional)</p>
      </div>
    </>
  );
};

export default ChecklistContent;
