import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import UserContext from "../../contexts/UserContext";
import { useToast } from "../../contexts/Toast";
import ToastContext from "../../contexts/Toast/ToastContext";
import {
  useParams,
  useNavigate,
  useLocation,
  unstable_useBlocker as useBlocker
} from "react-router-dom";
import WizardFooter from "./WizardFooter";
import WizardSidebar from "./WizardSidebar/WizardSidebar";
import ContentContainerWithTables from "../Layout/ContentContainerWithTables";
import InapplicableStrategiesModal from "../Modals/InfoWizardInapplicableStrategies";
import WarningSnapshotSubmit from "../Modals/WarningSnapshotSubmit";
import NavConfirmDialog from "../Modals/WarningWizardLeave";
import {
  ProjectDescriptions,
  ProjectSpecifications,
  ProjectTargetPoints,
  ProjectMeasures
} from "./WizardPages";
import { ProjectSummary } from "./WizardPages/ProjectSummary";
import { createUseStyles } from "react-jss";
import { matchPath } from "react-router-dom";
import CopyAndEditSnapshotModal from "../Modals/ActionCopyAndEditSnapshot";
import * as projectService from "../../services/project.service";
import WarningProjectReset from "../Modals/WarningProjectReset";
import InfoTargetNotReached from "../Modals/InfoTargetNotReached";
import InfoSnapshotSubmit from "components/Modals/InfoSnapshotSubmitted";
import CsvModal from "../Modals/ActionProjectsCsv";
import WarningProjectDelete from "../Modals/WarningProjectDelete";
import WarningProjectHide from "../Modals/WarningProjectHide";
import SnapshotProjectModal from "../Modals/ActionProjectSnapshot";
import RenameSnapshotModal from "../Modals/ActionSnapshotRename";
import ShareSnapshotModal from "../Modals/ActionSnapshotShare";
import useErrorHandler from "../../hooks/useErrorHandler";

const useStyles = createUseStyles({
  wizard: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column"
  }
});

const TdmCalculationWizard = props => {
  const {
    projectLevel,
    rules,
    partialAINInput,
    onInputChange,
    onPartialAINChange,
    onCommentChange,
    onUncheckAll,
    onResetProject,
    initializeStrategies,
    filters,
    onPkgSelect,
    onParkingProvidedChange,
    resultRuleCodes,
    onSave,
    allowResidentialPackage,
    allowSchoolPackage,
    residentialPackageSelected,
    schoolPackageSelected,
    formIsDirty,
    projectIsValid,
    contentContainerRef,
    inapplicableStrategiesModal,
    closeStrategiesModal,
    project,
    shareView,
    initializeEngine
  } = props;
  const classes = useStyles();
  const context = useContext(ToastContext);
  const toast = useToast();
  const userContext = useContext(UserContext);
  const account = userContext ? userContext.account : null;
  const params = useParams();
  const navigate = useNavigate();
  const page = Number(params.page || 1);
  const projectId = Number(params.projectId);
  const { pathname } = useLocation();
  const [ainInputError, setAINInputError] = useState("");
  const loginId = project.loginId;
  const [copyAndEditSnapshotModalOpen, setCopyAndEditSnapshotModalOpen] =
    useState(false);
  const [resetProjectWarningModalOpen, setResetProjectWarningModalOpen] =
    useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [successModelOpen, setSuccessModelOpen] = useState(false);
  const [targetNotReachedModalOpen, setTargetNotReachedModalOpen] =
    useState(false);
  const isSnapshotOwner = project?.loginId === account?.id;
  const email = userContext.account ? userContext.account.email : "";
  const handleError = useErrorHandler(email, navigate);
  const [snapshotModalOpen, setSnapshotModalOpen] = useState(false);
  const [renameSnapshotModalOpen, setRenameSnapshotModalOpen] = useState(false);
  const [hideModalOpen, setHideModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [shareSnapshotModalOpen, setShareSnapshotModalOpen] = useState(false);

  const showSubmitModal = () => {
    if (project.earnedPoints >= project.targetPoints) {
      setSubmitModalOpen(true);
    } else {
      setTargetNotReachedModalOpen(true);
    }
  };

  const handleSubmitModalClose = async action => {
    if (action === "ok") {
      initializeEngine();
      setSuccessModelOpen(true);
    }
    setSubmitModalOpen(false);
  };

  const handleSuccessModalClose = () => {
    setSuccessModelOpen(false);
  };

  const copyAndEditSnapshot = async nameOfCopy => {
    if (!projectIsValid) {
      toast.add("Some project inputs are missing or invalid. Save failed.");
      return;
    }

    let formInputs = JSON.parse(project.formInputs);
    formInputs.PROJECT_NAME = nameOfCopy;
    const inputsToSave = { ...formInputs, PROJECT_NAME: nameOfCopy };
    const description = project.description || "";

    const requestBody = {
      ...project,
      name: nameOfCopy,
      loginId: account.id,
      formInputs: JSON.stringify(inputsToSave),
      description
    };

    try {
      const postResponse = await projectService.post(requestBody);

      return postResponse.data.id;
    } catch (error) {
      console.error(error);
    }
  };

  const handleRenameSnapshotModalOpen = () => {
    setRenameSnapshotModalOpen(true);
  };

  const handleRenameSnapshotModalClose = async (action, newProjectName) => {
    if (action === "ok") {
      try {
        await projectService.renameSnapshot({
          id: project.id,
          name: newProjectName
        });
      } catch (err) {
        handleError(err);
      }
      initializeEngine();
    }
    setRenameSnapshotModalOpen(false);
  };

  const handleShareSnapshotModalOpen = () => {
    setShareSnapshotModalOpen(true);
  };

  const handleShareSnapshotModalClose = async () => {
    setShareSnapshotModalOpen(false);
  };

  const handleSubmitModalOpen = () => {
    if (project.earnedPoints >= project.targetPoints) {
      setSubmitModalOpen(true);
    } else {
      setTargetNotReachedModalOpen(true);
    }
  };

  const handleCsvModalOpen = () => {
    setCsvModalOpen(true);
  };

  const handleCsvModalClose = async () => {
    setCsvModalOpen(false);
  };

  const handleSnapshotModalOpen = () => {
    setSnapshotModalOpen(true);
  };

  const handleSnapshotModalClose = async (action, newProjectName) => {
    if (action === "ok") {
      try {
        await projectService.snapshot({
          id: project.id,
          name: newProjectName
        });
      } catch (err) {
        handleError(err);
      }
      initializeEngine();
    }
    setSnapshotModalOpen(false);
  };

  const handleHideModalOpen = () => {
    setHideModalOpen(true);
  };

  const handleHideModalClose = async action => {
    if (action === "ok") {
      try {
        const projectIDs = [project.id];
        const dateHidden = !project.dateHidden;

        await projectService.hide(projectIDs, dateHidden);
      } catch (err) {
        handleError(err);
      }
      initializeEngine();
    }
    setHideModalOpen(false);
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = async action => {
    if (action === "ok") {
      const projectIDs = [project.id];
      const dateTrashed = !project.dateTrashed;
      try {
        await projectService.trash(projectIDs, dateTrashed);
      } catch (err) {
        handleError(err);
      }
      initializeEngine();
    }
    setDeleteModalOpen(false);
  };

  /*
    shouldBlock determines if user should be blocked from navigating away
    from wizard.  Note that navigation from /calculation/a/x to 
    /calculation/b/x is just going to a different step of the wizard, and is allowed. 
  */
  const calculationPath = "/calculation/:page/:projectId?/*";

  const onInputChangeMeasure = e => {
    return onInputChange(e);
  };

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
      return (
        !shareView &&
        formIsDirty &&
        !isSameProject(currentLocation, nextLocation)
      );
    },
    [formIsDirty, projectId, shareView]
  );
  const blocker = useBlocker(shouldBlock);

  /*
    When user navigates to a different page in the wizard, scroll to the top.
    Issue #802: https://reactrouter.com/web/guides/scroll-restoration 
    Implemented per: https://reactrouter.com/web/guides/scroll-restoration
  */
  useEffect(() => {
    const scrollableElement = document.querySelector("#body");
    scrollableElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    if (projectId && (!account || !account.id)) {
      // user not logged in, existing project -> log in
      let locationPath = location.pathname.split("/");
      if (locationPath[1] == "projects" && locationPath[2]) {
        navigate(`/login?url=${locationPath[1]}/${locationPath[2]}`);
      } else {
        navigate(`/login`);
      }
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
      (!(account.isAdmin || account.id === loginId) ||
        !!project.dateSnapshotted)
    ) {
      navigate(`/calculation/5/${projectId}`);
    } // eslint-disable-next-line
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
    return loggedIn;
  };

  const isFinalPage = page === 5;

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
            partialAINInput={partialAINInput}
            onInputChange={onInputChange}
            onPartialAINChange={onPartialAINChange}
            onAINInputError={handleAINInputError}
            uncheckAll={() => onUncheckAll(filters.projectDescriptionRules)}
            resetProject={() => setResetProjectWarningModalOpen(true)}
            page={Number(page)}
          />
        );
      case 2:
        return (
          <ProjectSpecifications
            rules={specificationRules}
            onInputChange={onInputChange}
            uncheckAll={() => onUncheckAll(filters.specificationRules)}
            resetProject={() => setResetProjectWarningModalOpen(true)}
            page={Number(page)}
          />
        );
      case 3:
        return (
          <ProjectTargetPoints
            rules={targetPointRules}
            onParkingProvidedChange={onParkingProvidedChange}
            onInputChange={onInputChange}
            isLevel0={isLevel0}
            uncheckAll={onUncheckAll}
            resetProject={() => setResetProjectWarningModalOpen(true)}
          />
        );

      case 4:
        return (
          <ProjectMeasures
            projectLevel={projectLevel}
            rules={strategyRules}
            landUseRules={landUseRules}
            onInputChange={onInputChangeMeasure}
            onCommentChange={onCommentChange}
            initializeStrategies={initializeStrategies}
            onPkgSelect={onPkgSelect}
            uncheckAll={() => onUncheckAll(filters.strategyRules)}
            resetProject={() => setResetProjectWarningModalOpen(true)}
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
            loginId={!shareView ? loginId : account?.id}
            onSave={!shareView ? onSave : null}
            dateModified={project.dateModified}
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
      <ContentContainerWithTables
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
          isFinalPage={isFinalPage}
          setDisabledForNextNavButton={setDisabledForNextNavButton}
          setDisabledSaveButton={setDisabledSaveButton}
          setDisplaySaveButton={setDisplaySaveButton}
          showCopyAndEditSnapshot={() => setCopyAndEditSnapshotModalOpen(true)}
          showSubmitModal={showSubmitModal}
          handleCsvModalOpen={ev => handleCsvModalOpen(ev, project)}
          handleHideModalOpen={handleHideModalOpen}
          handleDeleteModalOpen={handleDeleteModalOpen}
          handleSnapshotModalOpen={handleSnapshotModalOpen}
          handleRenameSnapshotModalOpen={handleRenameSnapshotModalOpen}
          handleShareSnapshotModalOpen={handleShareSnapshotModalOpen}
          handleSubmitModalOpen={handleSubmitModalOpen}
          onSave={onSave}
          project={project}
          shareView={shareView}
        />
      </ContentContainerWithTables>
      <CopyAndEditSnapshotModal
        mounted={copyAndEditSnapshotModalOpen}
        onClose={() => setCopyAndEditSnapshotModalOpen(false)}
        isSnapshotOwner={isSnapshotOwner}
        copyAndEditSnapshot={copyAndEditSnapshot}
        projectName={project.name}
      />
      <WarningProjectReset
        mounted={resetProjectWarningModalOpen}
        project={project}
        resetProject={() => onResetProject()}
        onClose={() => setResetProjectWarningModalOpen(false)}
      />
      <WarningSnapshotSubmit
        mounted={submitModalOpen}
        onClose={handleSubmitModalClose}
        project={project}
      />
      <InfoTargetNotReached
        mounted={targetNotReachedModalOpen}
        onClose={() => setTargetNotReachedModalOpen(false)}
        project={project}
      />
      <InfoSnapshotSubmit
        mounted={successModelOpen}
        onClose={handleSuccessModalClose}
        project={project}
      />
      <CsvModal
        mounted={csvModalOpen}
        onClose={handleCsvModalClose}
        project={project}
      />
      <WarningProjectDelete
        mounted={deleteModalOpen}
        onClose={handleDeleteModalClose}
        project={project}
      />
      <WarningProjectHide
        mounted={hideModalOpen}
        onClose={handleHideModalClose}
        project={project}
      />
      <SnapshotProjectModal
        mounted={snapshotModalOpen}
        onClose={handleSnapshotModalClose}
        selectedProjectName={project.name}
      />
      <RenameSnapshotModal
        mounted={renameSnapshotModalOpen}
        onClose={handleRenameSnapshotModalClose}
        selectedProjectName={project.name}
      />
      <ShareSnapshotModal
        mounted={shareSnapshotModalOpen}
        onClose={handleShareSnapshotModalClose}
        project={project}
      />
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
  partialAINInput: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPartialAINChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func,
  onPkgSelect: PropTypes.func.isRequired,
  onParkingProvidedChange: PropTypes.func.isRequired,
  initializeStrategies: PropTypes.func.isRequired,
  onUncheckAll: PropTypes.func.isRequired,
  onResetProject: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  resultRuleCodes: PropTypes.array.isRequired,
  // loginId: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  allowResidentialPackage: PropTypes.bool.isRequired,
  allowSchoolPackage: PropTypes.bool.isRequired,
  residentialPackageSelected: PropTypes.func,
  schoolPackageSelected: PropTypes.func,
  formIsDirty: PropTypes.bool,
  projectIsValid: PropTypes.func,
  inapplicableStrategiesModal: PropTypes.bool,
  closeStrategiesModal: PropTypes.func,
  project: PropTypes.any,
  shareView: PropTypes.bool,
  initializeEngine: PropTypes.func
};

export default TdmCalculationWizard;
