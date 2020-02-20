import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import ProjectSummary from "./WizardPages/ProjectSummary";
import SidebarPointsPanel from "./SidebarPoints/SidebarPointsPanel";
import NavButton from "./NavButton";
import SwitchViewButton from "../SwitchViewButton";
import Sidebar from "../Sidebar";
import RequiredFieldContext from "../../contexts/RequiredFieldContext";
import {
  ProjectDescriptions,
  ProjectUse,
  ProjectSpecifications,
  ProjectTargetPoints,
  ProjectMeasures
} from "./WizardPages";

const useStyles = createUseStyles({
  root: {
    height: "calc(100vh - 103px)",
    overflow: "hidden",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row"
  },
  sidebarOverlay: {
    position: "absolute",
    background: "rgba(0, 46, 109, 0.65)",
    height: "100%",
    width: "100%",
    zIndex: 0
  },
  sidebarContent: {
    zIndex: 1,
    display: "flex",
    flexDirection: "column"
  },
  contentContainer: {
    justifyContent: "space-between",
    boxSizing: "border-box",
    height: "calc(100vh - 103px)",
    overflow: "auto"
  },
  buttonWrapper: {
    textAlign: "center"
  },
  navButtonsWrapper: {
    marginBottom: "3em",
    marginTop: "2em"
  },
  unSelectContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "32px"
  },
  unSelectButton: {
    position: "absolute",
    right: "24px",
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline"
  }
});

const isEmptyObject = obj => {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
};

const hasUnfilledRequired = unfilledRequired => {
  const hasUnfilled = !isEmptyObject(unfilledRequired)
    ? Object.values(unfilledRequired).reduce(
      (hasUnfilled, input) => hasUnfilled || input,
      false
    )
    : false;
  return hasUnfilled;
};

const TdmCalculationWizard = props => {
  const classes = useStyles();
  const {
    rules,
    onInputChange,
    onUncheckAll,
    filters,
    onPkgSelect,
    resultRuleCodes,
    account,
    projectId,
    loginId,
    onSave,
    onPageChange,
    onViewChange,
    pageNo
  } = props;
  const [page, setPage] = useState(0);
  const [unfilledRequired] = useContext(RequiredFieldContext);
  const [disableForward, setDisableForward] = useState(false);

  useEffect(() => {
    if (
      !projectId ||
      (account && (account.isAdmin || account.id === loginId))
    ) {
      // Project Calculation is editable if it is not saved
      // or the project was created by the current logged in
      // user, or the logged in user is admin.
      setPage(pageNo || 1);
    } else {
      // read-only users can only see the summary page.
      setPage(6);
    }
    setDisableForward(hasUnfilledRequired(unfilledRequired));
  }, [projectId, account, loginId, pageNo, unfilledRequired]);

  const projectDescriptionRules =
    rules && rules.filter(filters.projectDescriptionRules);
  const landUseRules = rules && rules.filter(filters.landUseRules);
  const specificationRules = rules && rules.filter(filters.specificationRules);
  const targetPointRules = rules && rules.filter(filters.targetPointRules);
  const strategyRules = rules && rules.filter(filters.strategyRules);
  const resultRules =
    rules &&
    rules.filter(rule => resultRuleCodes.includes(rule.code) && rule.display);

  const renderSwitch = () => {
    switch (page) {
    case 2:
      return (
        <ProjectUse
          rules={landUseRules}
          onInputChange={onInputChange}
          classes={classes}
          uncheckAll={() => onUncheckAll(filters.landUseRules)}
        />
      );
    case 3:
      return (
        <ProjectSpecifications
          rules={specificationRules}
          onInputChange={onInputChange}
          classes={classes}
          uncheckAll={() => onUncheckAll(filters.specificationRules)}
        />
      );
    case 4:
      return (
        <ProjectTargetPoints
          rules={targetPointRules}
          onInputChange={onInputChange}
          classes={classes}
        />
      );
    case 5:
      return (
        <ProjectMeasures
          rules={strategyRules}
          onInputChange={onInputChange}
          classes={classes}
          onPkgSelect={onPkgSelect}
          uncheckAll={() => onUncheckAll(filters.strategyRules)}
        />
      );
    case 6:
      return (
        <ProjectSummary
          rules={rules}
          account={account}
          projectId={projectId}
          loginId={loginId}
          onSave={onSave}
        />
      );
    case 1:
    default:
      return (
        <ProjectDescriptions
          rules={projectDescriptionRules}
          onInputChange={onInputChange}
          classes={classes}
        />
      );
    }
  };

  return (
    <React.Fragment>
      <div className={clsx("tdm-wizard", classes.root)}>
        <Sidebar>
          {rules && rules.length > 0 && (
            <div className={classes.sidebarContent}>
              <SwitchViewButton onClick={onViewChange}>
                Switch to Default View
              </SwitchViewButton>
              <SidebarPointsPanel rules={resultRules} />
            </div>
          )}
        </Sidebar>
        <div
          className={clsx(
            "tdm-wizard-content-container",
            classes.contentContainer
          )}
        >
          <div>{renderSwitch()}</div>
          {!projectId || (account && account.id && account.id === loginId) ? (
            <div className={classes.navButtonsWrapper}>
              <NavButton
                disabled={page === 1}
                onClick={() => {
                  onPageChange(page - 1);
                }}
              >
                &lt;
              </NavButton>
              <NavButton
                disabled={page === 6 || disableForward}
                onClick={() => {
                  onPageChange(page + 1);
                }}
              >
                &gt;
              </NavButton>
            </div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};
TdmCalculationWizard.propTypes = {
  rules: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onPkgSelect: PropTypes.func.isRequired,
  onUncheckAll: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  resultRuleCodes: PropTypes.array.isRequired,
  account: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
  loginId: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired,
  pageNo: PropTypes.func.isRequired
};

export default TdmCalculationWizard;
