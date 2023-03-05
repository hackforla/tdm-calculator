import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = createUseStyles({
  categoryContainer: {
    minWidth: "60vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0f2940",
    color: "white",
    padding: ".4em",
    marginBottom: "0.6em",
    gridColumn: "h-end",
    paddingRight: "40px",
    height: "20px"
  }
});

const Item = forwardRef(({ id, ...props }, ref) => {
  const classes = useStyles();

  return (
    <div {...props} ref={ref}>
      <div className={classes.categoryContainer}>
        {id}
        <FontAwesomeIcon
          style={{
            cursor: "grab",
            fontSize: "2em",
            paddingTop: "0.11em",
            paddingRight: "0em",
            color: "white"
          }}
          icon={faGripHorizontal}
        />
      </div>
    </div>
  );
});

Item.displayName = "Item";

Item.propTypes = {
  id: PropTypes.number
};

export default Item;
