import React from "react";
import { createUseStyles } from "react-jss";
import macbook from "../../images/mock-MacBook.png";
import planning from "../../images/planning.svg";
import checklist from "../../images/checklist.svg";
import computer from "../../images/computer.svg";
import handshake from "../../images/handshake.svg";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  image: {
    flex: "1 1 50%",
    width: "100%"
  },
  textContent: {
    flex: "1 0 50%",
    display: "flex",
    flexDirection: "column",
    marginRight: "40px"
  },
  item: {
    display: "flex",
    textAlign: "right",
    fontSize: "22px"
  },
  icon: {
    paddingTop: "0.5em",
    paddingLeft: "0.8em"
  }
});

const LandingPageSectionMockUp = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <img src={macbook} className={classes.image} alt="mock-macbook" />
      </div>
      <div className={classes.textContent}>
        <div className={classes.item}>
          <p>
            <strong>Better for the Environment</strong>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </p>
          <div className={classes.icon}>
            <img src={planning} alt="planning-icon" width="35px" />
          </div>
        </div>

        <div className={classes.item}>
          <p>
            <strong>Reduce Risks</strong>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </p>
          <div className={classes.icon}>
            <img src={checklist} alt="checklist-icon" width="35px" />
          </div>
        </div>

        <div className={classes.item}>
          <p>
            <strong>Reduce Congestion</strong>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </p>
          <div className={classes.icon}>
            <img src={computer} alt="computer-icon" width="35px" />
          </div>
        </div>

        <div className={classes.item}>
          <p>
            <strong>Improve Transportation Network</strong>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </p>
          <div className={classes.icon}>
            <img src={handshake} alt="handshake-icon" width="35px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageSectionMockUp;
