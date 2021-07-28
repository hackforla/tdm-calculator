import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import {
  ProjectDescriptions,
  ProjectSpecifications,
  ProjectPackages,
  ProjectTargetPoints,
  ProjectMeasures
} from "./WizardPages";
import ProjectSummary from "./WizardPages/ProjectSummary";

const CalculationWizardRoutes = ({
  projectDescriptionRules,
  onInputChange,
  specificationRules,
  onUncheckAll,
  onResetProject,
  filters,
  targetPointRules,
  isLevel0,
  projectLevel,
  strategyRules,
  landUseRules,
  allowResidentialPackage,
  allowEmploymentPackage,
  onCommentChange,
  initializeStrategies,
  onPkgSelect,
  residentialPackageSelected,
  employmentPackageSelected,
  rules,
  account,
  projectId,
  loginId,
  onSave,
  dateModified
}) => {
  return (
    <Switch>
      <Route path="/calculation/1/:projectId?">
        <ProjectDescriptions
          rules={projectDescriptionRules}
          onInputChange={onInputChange}
        />
      </Route>
      <Route path="/calculation/2/:projectId?">
        <ProjectSpecifications
          rules={specificationRules}
          onInputChange={onInputChange}
          uncheckAll={() => onUncheckAll(filters.specificationRules)}
          resetProject={() => onResetProject(filters.specificationRules)}
        />
      </Route>
      <Route path="/calculation/3/:projectId?">
        <ProjectTargetPoints
          rules={targetPointRules}
          onInputChange={onInputChange}
          isLevel0={isLevel0}
        />
      </Route>
      <Route path="/calculation/4/:projectId?">
        <ProjectPackages
          allowResidentialPackage={allowResidentialPackage}
          allowEmploymentPackage={allowEmploymentPackage}
        />
      </Route>
      <Route path="/calculation/5/:projectId?">
        <ProjectMeasures
          projectLevel={projectLevel}
          rules={strategyRules}
          landUseRules={landUseRules}
          onInputChange={onInputChange}
          onCommentChange={onCommentChange}
          initializeStrategies={initializeStrategies}
          onPkgSelect={onPkgSelect}
          uncheckAll={() => onUncheckAll(filters.strategyRules)}
          resetProject={() => onResetProject()}
          allowResidentialPackage={allowResidentialPackage}
          allowEmploymentPackage={allowEmploymentPackage}
          residentialPackageSelected={residentialPackageSelected}
          employmentPackageSelected={employmentPackageSelected}
        />
      </Route>
      <Route path="/calculation/6/:projectId?">
        <ProjectSummary
          rules={rules}
          account={account}
          projectId={projectId}
          loginId={loginId}
          onSave={onSave}
          dateModified={dateModified}
        />
      </Route>
    </Switch>
  );
};

// TODO:
CalculationWizardRoutes.propTypes = {
  projectDescriptionRules: PropTypes.any,
  onInputChange: PropTypes.any,
  specificationRules: PropTypes.any,
  onUncheckAll: PropTypes.any,
  onResetProject: PropTypes.any,
  filters: PropTypes.any,
  targetPointRules: PropTypes.any,
  isLevel0: PropTypes.any,
  projectLevel: PropTypes.any,
  strategyRules: PropTypes.any,
  landUseRules: PropTypes.any,
  allowResidentialPackage: PropTypes.any,
  allowEmploymentPackage: PropTypes.any,
  onCommentChange: PropTypes.any,
  initializeStrategies: PropTypes.any,
  onPkgSelect: PropTypes.any,
  residentialPackageSelected: PropTypes.any,
  employmentPackageSelected: PropTypes.any,
  rules: PropTypes.any,
  account: PropTypes.any,
  projectId: PropTypes.any,
  loginId: PropTypes.any,
  onSave: PropTypes.any,
  dateModified: PropTypes.any
};

export default CalculationWizardRoutes;
