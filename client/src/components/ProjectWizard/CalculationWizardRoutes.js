import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import {
  ProjectDescriptions,
  ProjectSpecifications,
  ProjectTargetPoints,
  ProjectMeasures
} from "./WizardPages";
import { ProjectSummary } from "./WizardPages/ProjectSummary";

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
  allowSchoolPackage,
  onCommentChange,
  initializeStrategies,
  onPkgSelect,
  onParkingProvidedChange,
  residentialPackageSelected,
  schoolPackageSelected,
  rules,
  account,
  projectId,
  loginId,
  onSave,
  dateModified,
  onAINInputError
}) => {
  const params = useParams();
  const page = params.page;

  const pageContents = page => {
    switch (Number(page)) {
      case 1:
        return (
          <ProjectDescriptions
            rules={projectDescriptionRules}
            onInputChange={onInputChange}
            onAINInputError={onAINInputError}
          />
        );
      case 2:
        return (
          <ProjectSpecifications
            rules={specificationRules}
            onInputChange={onInputChange}
            uncheckAll={() => onUncheckAll(filters.specificationRules)}
            resetProject={() => onResetProject()}
          />
        );
      case 3:
        return (
          <ProjectTargetPoints
            rules={targetPointRules}
            onParkingProvidedChange={onParkingProvidedChange}
            onInputChange={onInputChange}
            isLevel0={isLevel0}
          />
        );

      case 4:
        return (
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
            allowSchoolPackage={allowSchoolPackage}
            residentialPackageSelected={residentialPackageSelected}
            schoolPackageSelected={schoolPackageSelected}
          />
        );
      case 5:
        return (
          <ProjectSummary
            rules={rules}
            account={account}
            projectId={projectId}
            loginId={loginId}
            onSave={onSave}
            dateModified={dateModified}
          />
        );
      default:
        return null;
    }
  };

  return <>{pageContents(page)}</>;
};

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
  allowSchoolPackage: PropTypes.any,
  onCommentChange: PropTypes.any,
  initializeStrategies: PropTypes.any,
  onPkgSelect: PropTypes.any,
  onParkingProvidedChange: PropTypes.func.isRequired,
  residentialPackageSelected: PropTypes.any,
  schoolPackageSelected: PropTypes.any,
  rules: PropTypes.any,
  account: PropTypes.any,
  projectId: PropTypes.any,
  loginId: PropTypes.any,
  onSave: PropTypes.any,
  dateModified: PropTypes.any,
  onAINInputError: PropTypes.func.isRequired
};

export default CalculationWizardRoutes;
