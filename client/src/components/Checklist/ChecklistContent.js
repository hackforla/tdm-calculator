import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  title: {
    color: "#0F2940"
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
      <p>
        Listed below are the documents that you may need when using Create
        Project.
      </p>
      <div>
        <ul>
          <span>p.1</span>General project information
          <li>Name</li>
          <li>Address</li>
          <li>AIN/APN</li>
        </ul>
      </div>
      <div>
        <ul>
          <span>p.2</span>Planned floor area (sqft) for specific use types
          <li>Retail</li>
          <li>Employment/Office</li>
          <li>Warehouse/Industrial</li>
          <li>Medical</li>
        </ul>
        <ul>
          Planned unit types/sizes for specific use types
          <li>Residentian (Dwelling Units)</li>
          <li>Hotel/Motel (Rooms)</li>
          <li>School (Students)</li>
          <li>Arean/Stadium/Theatre (Seats)</li>
        </ul>
      </div>
      <div>
        <span>p.3</span>Planned number of parking spaces provided
      </div>
      <div>
        <span>p.4</span>Planned TDM strategies (Optional)
      </div>
    </>
  );
};

export default ChecklistContent;
