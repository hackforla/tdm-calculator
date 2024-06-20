import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import UserContext from "../../contexts/UserContext";
import ToastContext from "../../contexts/Toast/ToastContext";
import {
  useParams,
  useNavigate,
  useLocation,
  unstable_useBlocker as useBlocker
} from "react-router-dom";
import WizardFooter from "./WizardFooter";
import WizardSidebar from "./WizardSidebar/WizardSidebar";
import ContentContainer from "../Layout/ContentContainer";
import InapplicableStrategiesModal from "./InapplicableStrategiesModal";
import NavConfirmDialog from "./NavConfirmDialog";
import {
  ProjectDescriptions,
  ProjectSpecifications,
  ProjectTargetPoints,
  ProjectMeasures
} from "./WizardPages";
import { ProjectSummary } from "./WizardPages/ProjectSummary";
import { createUseStyles } from "react-jss";
import { matchPath } from "react-router-dom";

const useStyles = createUseStyles({
  wizard: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    border: "2px solid blue"
  }
});

const TdmCalculationWizard = props => {
  const {
    projectLevel,
    rules,
    onInputChange,
    onCommentChange,
    onUncheckAll,
    onResetProject,
    initializeStrategies,
    filters,
    onPkgSelect,
    onParkingProvidedChange,
    resultRuleCodes,
    loginId,
    onSave,
    allowResidentialPackage,
    allowSchoolPackage,
    residentialPackageSelected,
    schoolPackageSelected,
    formIsDirty,
    projectIsValid,
    dateModified,
    dateSnapshotted,
    dateSubmitted,
    contentContainerRef,
    inapplicableStrategiesModal,
    closeStrategiesModal
  } = props;
  const classes = useStyles();
  const context = useContext(ToastContext);
  const userContext = useContext(UserContext);
  const account = userContext ? userContext.account : null;
  const params = useParams();
  const navigate = useNavigate();
  const page = Number(params.page || 1);
  const projectId = Number(params.projectId);
  const { pathname } = useLocation();
  const [ainInputError, setAINInputError] = useState("");
  /*
    shouldBlock determines if user should be blocked from navigating away
    from wizard.  Note that navigation from /calculation/a/x to 
    /calculation/b/x is just going to a different step of the wizard, and is allowed. 
  */
  const calculationPath = "/calculation/:page/:projectId?/*";

  const shouldBlock = React.useCallback(
    ({ currentLocation, nextLocation }) => {
      const isSameProject = (currentLocation, nextLocation) => {
        const currentMatch = matchPath(
          {
            path: calculationPath,
            exact: true
          },
          currentLocation.pathname
        );
        const nextMatch = matchPath(
          {
            path: calculationPath,
            exact: true
          },
          nextLocation.pathname
        );

        return (
          currentMatch &&
          nextMatch &&
          (currentMatch.params.projectId === nextMatch.params.projectId ||
            !projectId)
        );
      };

      return formIsDirty && !isSameProject(currentLocation, nextLocation);
    },
    [formIsDirty, projectId]
  );
  const blocker = useBlocker(shouldBlock);

  /*
    When user navigates to a different page in the wizard, scroll to the top.
    Issue #802: https://reactrouter.com/web/guides/scroll-restoration 
    Implemented per: https://reactrouter.com/web/guides/scroll-restoration
  */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (projectId && (!account || !account.id)) {
      // user not logged in, existing project -> log in
      navigate(`/login`);
    } else if (
      // Redirect to Summary Page if project exists,
      // but does not belong to logged-in user
      // Note: For an existing project, this effect
      // gets called once with loginId = 0 before the
      // component is re-created with the correct loginId,
      // so we only want to re-direct after the loginId
      // is properly set.
      projectId &&
      loginId &&
      !(account.isAdmin || account.id === loginId)
    ) {
      navigate(`/calculation/6/${projectId}`);
    }
  }, [projectId, account, loginId, navigate]);

  const projectDescriptionRules =
    rules && rules.filter(filters.projectDescriptionRules);
  const landUseRules = rules && rules.filter(filters.landUseRules);
  const specificationRules = rules && rules.filter(filters.specificationRules);
  const targetPointRules = rules && rules.filter(filters.targetPointRules);
  const strategyRules = rules && rules.filter(filters.strategyRules);
  const resultRules =
    rules &&
    rules.filter(rule => resultRuleCodes.includes(rule.code) && rule.display);

  const isLevel0 = projectLevel === 0;

  const setDisabledForNextNavButton = () => {
    const isPage1AndHasErrors =
      page === 1 &&
      (projectDescriptionRules.find(rule => !!rule.validationErrors) ||
        ainInputError);
    const isPage2AndHasErrors =
      page === 2 && specificationRules.find(rule => !!rule.validationErrors);
    const isPage3AndHasErrors =
      page === 3 && targetPointRules.find(rule => !!rule.validationErrors);
    const isPage4AndHasErrors =
      page === 4 && strategyRules.find(rule => !!rule.validationErrors);
    const isPage5 = Number(page) === 5;

    return !!(
      isPage1AndHasErrors ||
      isPage2AndHasErrors ||
      isPage3AndHasErrors ||
      isPage4AndHasErrors ||
      isPage5
    );
  };

  const setDisabledSaveButton = () => {
    const loggedIn = !!account && !!account.id;
    const notASavedProject = !projectId;
    const projectBelongsToUser = account && account.id === loginId;
    const setDisabled = !(
      loggedIn &&
      (notASavedProject || projectBelongsToUser) &&
      formIsDirty &&
      projectIsValid()
    );
    return setDisabled;
  };

  const setDisplaySaveButton = () => {
    const loggedIn = !!account && !!account.id;
    const setDisplayed = loggedIn;
    return setDisplayed;
  };

  const setDisplayPrintButton = () => {
    if (page === 5) {
      return true;
    }
    return false;
  };

  const setDisplaySubmitButton = () => {
    if (page === 5) {
      return true;
    }
    return false;
  };

  const handleValidate = () => {
    const { page } = params;
    const validations = {
      1: {
        function: () => {
          return !projectDescriptionRules.find(rule => !!rule.validationErrors);
        },
        toast: "Please fill out all required fields"
      }
    };
    const result = validations[page] ? validations[page].function() : true;
    if (result === false) {
      context.add(validations[page].toast);
      return false;
    } else {
      return true;
    }
  };

  const onPageChange = pageNo => {
    const { page, projectId } = params;
    const projectIdParam = projectId ? `/${projectId}` : "/0";
    if (Number(pageNo) > Number(page)) {
      if (handleValidate()) {
        // Skip page 4 unless Packages are applicable
        const nextPage = Number(page) + 1;
        navigate(`/calculation/${nextPage}${projectIdParam}`);
      }
    } else {
      const prevPage = Number(page) - 1;
      navigate(`/calculation/${prevPage}${projectIdParam}`);
    }
  };

  const handleAINInputError = error => {
    setAINInputError(error);
  };

  const pageContents = page => {
    switch (Number(page)) {
      case 1:
        return (
          <ProjectDescriptions
            rules={projectDescriptionRules}
            onInputChange={onInputChange}
            onAINInputError={handleAINInputError}
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
  return (
    <div className={classes.wizard}>
      <InapplicableStrategiesModal
        inapplicableStrategiesModal={inapplicableStrategiesModal}
        closeStrategiesModal={closeStrategiesModal}
      />
      {blocker ? <NavConfirmDialog blocker={blocker} /> : null}
      <ContentContainer
        customSidebar={() => (
          <WizardSidebar
            rules={rules}
            resultRules={resultRules}
            strategyRules={strategyRules}
            page={page}
          />
        )}
        contentContainerRef={contentContainerRef}
      >
        {pageContents(page)}
        <WizardFooter
          rules={rules}
          page={page}
          onPageChange={onPageChange}
          pageNumber={page}
          setDisabledForNextNavButton={setDisabledForNextNavButton}
          setDisabledSaveButton={setDisabledSaveButton}
          setDisplaySaveButton={setDisplaySaveButton}
          setDisplayPrintButton={setDisplayPrintButton}
          setDisplaySubmitButton={setDisplaySubmitButton}
          onSave={onSave}
          dateModified={dateModified}
          dateSnapshotted={dateSnapshotted}
          dateSubmitted={dateSubmitted}
        />
      </ContentContainer>
    </div>
  );
};

TdmCalculationWizard.propTypes = {
  contentContainerRef: PropTypes.object,
  projectLevel: PropTypes.number,
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dataType: PropTypes.string.isRequired,
      value: PropTypes.any,
      units: PropTypes.string,
      minValue: PropTypes.number,
      maxValue: PropTypes.number,
      choices: PropTypes.array,
      calcValue: PropTypes.any,
      calcUnits: PropTypes.string,
      required: PropTypes.bool,
      minStringLength: PropTypes.number,
      maxStringLength: PropTypes.number,
      validationErrors: PropTypes.array
    })
  ).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func,
  onPkgSelect: PropTypes.func.isRequired,
  onParkingProvidedChange: PropTypes.func.isRequired,
  initializeStrategies: PropTypes.func.isRequired,
  onUncheckAll: PropTypes.func.isRequired,
  onResetProject: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  resultRuleCodes: PropTypes.array.isRequired,
  loginId: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  allowResidentialPackage: PropTypes.bool.isRequired,
  allowSchoolPackage: PropTypes.bool.isRequired,
  residentialPackageSelected: PropTypes.func,
  schoolPackageSelected: PropTypes.func,
  formIsDirty: PropTypes.bool,
  projectIsValid: PropTypes.func,
  dateModified: PropTypes.string,
  dateSnapshotted: PropTypes.string,
  dateSubmitted: PropTypes.string,
  inapplicableStrategiesModal: PropTypes.bool,
  closeStrategiesModal: PropTypes.func
};

export default TdmCalculationWizard;
