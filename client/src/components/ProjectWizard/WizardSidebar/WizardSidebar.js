import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import SwitchViewButton from "../../Button/SwitchViewButton";
import SidebarPointsPanel from "./SidebarPointsPanel";
import Sidebar from "../../Sidebar";

const useStyles = createUseStyles({
  sidebarContent: {
    zIndex: 1,
    display: "flex",
    position: "sticky",
    top: 0,
    // height: "calc(100vh - 103px - 48px)",
    height: "calc(100vh)",
    flexDirection: "column",
    "@media (max-width:768px)": {
      height: "auto"
    }
  }
});

const WizardSidebar = ({
  rules,
  onViewChange,
  resultRules,
  strategyRules,
  page
}) => {
  const classes = useStyles();

  return (
    <Sidebar>
      {rules && rules.length > 0 && (
        <div className={classes.sidebarContent}>
          <SwitchViewButton onViewChange={onViewChange} isDisplayed={false}>
            Switch to Single Page View
          </SwitchViewButton>
          <SidebarPointsPanel
            rules={resultRules}
            strategyRules={strategyRules}
            page={page}
          />
        </div>
      )}
    </Sidebar>
  );
};

WizardSidebar.propTypes = {
  rules: PropTypes.any,
  onViewChange: PropTypes.any,
  resultRules: PropTypes.any,
  strategyRules: PropTypes.array,
  page: PropTypes.number
};

export default WizardSidebar;
