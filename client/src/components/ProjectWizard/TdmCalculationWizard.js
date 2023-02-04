import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import ToastContext from "../../contexts/Toast/ToastContext";
import { withRouter, useLocation } from "react-router-dom";
import TermsAndConditionsModal from "../TermsAndConditions/TermsAndConditionsModal";
import ChecklistModal from "../Checklist/ChecklistModal";
import CalculationWizardRoutes from "./CalculationWizardRoutes";
import WizardFooter from "./WizardFooter";
import WizardSidebar from "./WizardSidebar/WizardSidebar";
import ContentContainer from "../Layout/ContentContainer";
import InapplicableStrategiesModal from "../InapplicableStrategiesModal";

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
    account,
    loginId,
    onSave,
    onViewChange,
    history,
    match,
    allowResidentialPackage,
    allowSchoolPackage,
    residentialPackageSelected,
    schoolPackageSelected,
    formIsDirty,
    projectIsValid,
    dateModified,
    contentContainerRef,
    checklistModalOpen,
    toggleChecklistModal,
    inapplicableStrategiesModal,
    closeStrategiesModal
  } = props;
  const context = useContext(ToastContext);
  const page = Number(match.params.page || 1);
  const projectId = Number(match.params.projectId);
  const { pathname } = useLocation();
  const [ainInputError, setAINInputError] = useState("");

  /*
    When user navigates to a different page in the wizard, scroll to the top.
    Issue #802: https://reactrouter.com/web/guides/scroll-restoration 
    Implemented per: https://reactrouter.com/web/guides/scroll-restoration
  */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!projectId) {
      history.push("/calculation/1");
    } else if (projectId && (!account || !account.id)) {
      // user not logged in, existing project -> log in
      history.push(`/login`);
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
      history.push(`/calculation/6/${projectId}`);
    }
  }, [projectId, account, loginId, history]);

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
    const loggedIn = !!account.id;
    const notASavedProject = !projectId;
    const projectBelongsToUser = account.id === loginId;
    const setDisabled = !(
      loggedIn &&
      (notASavedProject || projectBelongsToUser) &&
      formIsDirty &&
      projectIsValid()
    );
    return setDisabled;
  };

  const setDisplaySaveButton = () => {
    const loggedIn = !!account.id;
    const setDisplayed = loggedIn;
    return setDisplayed;
  };

  const handleValidate = () => {
    const { page } = match.params;
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
    const { page, projectId } = match.params;
    const projectIdParam = projectId ? `/${projectId}` : "";
    if (Number(pageNo) > Number(match.params.page)) {
      if (handleValidate()) {
        // Skip page 4 unless Packages are applicable
        const nextPage = Number(page) + 1;
        history.push(`/calculation/${nextPage}${projectIdParam}`);
      }
    } else {
      const prevPage = Number(page) - 1;
      history.push(`/calculation/${prevPage}${projectIdParam}`);
    }
  };

  const handleAINInputError = error => {
    setAINInputError(error);
  };

  return (
    <React.Fragment>
      <TermsAndConditionsModal />
      <InapplicableStrategiesModal
        inapplicableStrategiesModal={inapplicableStrategiesModal}
        closeStrategiesModal={closeStrategiesModal}
      />
      <ChecklistModal
        checklistModalOpen={checklistModalOpen}
        toggleChecklistModal={toggleChecklistModal}
      />
      <ContentContainer
        customSidebar={() => (
          <WizardSidebar
            rules={rules}
            onViewChange={onViewChange}
            resultRules={resultRules}
            strategyRules={strategyRules}
            page={page}
          />
        )}
        contentContainerRef={contentContainerRef}
        componentToTrack="TdmCalculationWizard"
      >
        <CalculationWizardRoutes
          projectDescriptionRules={projectDescriptionRules}
          onInputChange={onInputChange}
          specificationRules={specificationRules}
          onUncheckAll={onUncheckAll}
          onResetProject={onResetProject}
          filters={filters}
          targetPointRules={targetPointRules}
          isLevel0={isLevel0}
          projectLevel={projectLevel}
          strategyRules={strategyRules}
          landUseRules={landUseRules}
          allowResidentialPackage={allowResidentialPackage}
          allowSchoolPackage={allowSchoolPackage}
          onCommentChange={onCommentChange}
          initializeStrategies={initializeStrategies}
          onPkgSelect={onPkgSelect}
          onParkingProvidedChange={onParkingProvidedChange}
          residentialPackageSelected={residentialPackageSelected}
          schoolPackageSelected={schoolPackageSelected}
          rules={rules}
          account={account}
          projectId={projectId}
          loginId={loginId}
          onSave={onSave}
          dateModified={dateModified}
          onAINInputError={handleAINInputError}
        />
        <WizardFooter
          rules={rules}
          page={page}
          onPageChange={onPageChange}
          pageNumber={page}
          setDisabledForNextNavButton={setDisabledForNextNavButton}
          setDisabledSaveButton={setDisabledSaveButton}
          setDisplaySaveButton={setDisplaySaveButton}
          onSave={onSave}
        />
      </ContentContainer>
    </React.Fragment>
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
      projectId: PropTypes.string
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  onInputChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func,
  onPkgSelect: PropTypes.func.isRequired,
  onParkingProvidedChange: PropTypes.func.isRequired,
  initializeStrategies: PropTypes.func.isRequired,
  onUncheckAll: PropTypes.func.isRequired,
  onResetProject: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  resultRuleCodes: PropTypes.array.isRequired,
  account: PropTypes.object.isRequired,
  loginId: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired,
  allowResidentialPackage: PropTypes.bool.isRequired,
  allowSchoolPackage: PropTypes.bool.isRequired,
  residentialPackageSelected: PropTypes.func,
  schoolPackageSelected: PropTypes.func,
  formIsDirty: PropTypes.bool,
  projectIsValid: PropTypes.func,
  dateModified: PropTypes.string,
  checklistModalOpen: PropTypes.bool,
  toggleChecklistModal: PropTypes.func,
  inapplicableStrategiesModal: PropTypes.bool,
  closeStrategiesModal: PropTypes.func
};

export default withRouter(TdmCalculationWizard);
