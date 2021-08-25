import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  noDisplay: {
    display: "none !important"
  }
});

const SidebarCart = props => {
  const { strategyRules } = props;
  const classes = useStyles();
  return (
    <div width="100%">
      <div
        style={{
          flexBasis: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid black"
          }}
        >
          <div style={{ fontSize: "16pt", weight: "bold", textAlign: "left" }}>
            TDM MEASURES SELECTED
          </div>
          <div
            style={{
              fontSize: "12pt",
              weight: "500",
              textAlign: "right",
              marginBottom: "2px"
            }}
          >
            EARNED POINTS
          </div>
        </div>
        <hr />

        {strategyRules
          .filter(r => r.calcValue > 0)
          .map(rule => (
            <div
              key={rule.code}
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontFamily: "Calibri",
                  lineHeight: "18px",
                  marginTop: "5px"
                }}
                classes={strategyRules ? "" : classes.noDisplay}
              >
                {rule.name}
              </div>
              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontSize: "18px",
                    fontFamily: "Oswald"
                  }}
                >
                  {Math.round(rule.calcValue * 100) / 100}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontFamily: "Calibri",
                    marginBottom: "10px"
                  }}
                >
                  &nbsp;pts
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

SidebarCart.propTypes = {
  strategyRules: PropTypes.array
};

export default SidebarCart;
