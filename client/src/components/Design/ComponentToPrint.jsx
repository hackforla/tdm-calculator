import * as React from "react";
import PropTypes from "prop-types";
import About from "../About/About";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <About />
    </div>
  );
});

ComponentToPrint.propTypes = {
  text: PropTypes.string
};

ComponentToPrint.displayName = "ComponentToPrint";
