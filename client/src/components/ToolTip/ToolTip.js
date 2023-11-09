import React from "react";
import PropTypes from "prop-types";

import { Tooltip } from "react-tooltip";

const ToolTip = ({ id }) => {
  return (
    <Tooltip
      id={id}
      place="right"
      type="info"
      effect="float"
      multiline={true}
      style={{
        width: "25vw",
        textAlign: "left"
      }}
      textColor="#32578A"
      backgroundColor="#F7F9FA"
      borderColor="rgb(30, 36, 63)"
      border={true}
      offset={{ right: 20 }}
      clickable
    />
  );
};

ToolTip.propTypes = {
  id: PropTypes.string
};

export default ToolTip;
