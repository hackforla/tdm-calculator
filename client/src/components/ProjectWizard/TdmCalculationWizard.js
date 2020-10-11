import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import ToastContext from "../../contexts/Toast/ToastContext";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import ProjectSummary from "./WizardPages/ProjectSummary";
import SidebarPointsPanel from "./SidebarPoints/SidebarPointsPanel";
import Sidebar from "../Sidebar";
import { Switch, Route, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import NavButton from "../Button/NavButton";
import SwitchViewButton from "../Button/SwitchViewButton";
import Modal from "react-modal";

import {
  ProjectDescriptions,
  ProjectSpecifications,
  ProjectPackages,
  ProjectTargetPoints,
  ProjectMeasures
} from "./WizardPages";
import * as projectService from "../../services/project.service";
import moment from "moment";

const useStyles = createUseStyles({
  root: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row"
  },
  "@media (max-width:768px)": {
    root: {
      flexDirection: "column"
    }
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
    position: "sticky",
    top: 0,
    height: "calc(100vh - 103px)",
    flexDirection: "column",
    "@media (max-width:768px)": {
      height: "auto"
    }
  },
  contentContainer: {
    justifyContent: "space-around",
    boxSizing: "border-box",
    overflow: "auto"
  },
  buttonWrapper: {
    textAlign: "center"
  },
  allButtonsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "2em 0"
  },
  unSelectContainer: {
    display: "grid",
    gridTemplateColumns: "[h-start] 20% [h-mid] auto [h-end] 20%",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative"
  },
  pkgSelectContainer: {
    display: "grid",
    gridTemplateColumns: "[h-start] auto [h-end] 35%",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative"
  },
  unSelectButton: {
    marginLeft: "auto",
    marginRight: "1em",
    gridColumn: "h-end",
    backgroundColor: "transparent",
    border: "0",
    cursor: "pointer",
    textDecoration: "underline"
  },
  alignMid: {
    gridColumn: "h-mid",
    display: "flex",
    justifyContent: "center"
  },
  alignLeft: {
    gridColumn: "h-start",
    display: "flex",
    justifyContent: "flex-start",
    marginLeft: "2em"
  },
  buttonContainer: {
    marginTop: "5px"
  },
  lastSaved: {
    fontSize: "14px",
    color: "#6F6C64"
  },
  lastSavedContainer: {
    margin: "0 auto"
  },
  modal: {
    "& h2": {
      fontSize: "25px",
      lineHeight: "31px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "30px",
      "& img": {
        margin: "0 6px 0 0",
        verticalAlign: "middle"
      }
    },
    "& p": {
      fontSize: "16px",
      lineHeight: "25px",
      textAlign: "left",
      "& img": {
        margin: "4px 12px 12px 0"
      }
    },
    "& .smaller": {
      fontSize: "12px",
      lineHeight: "25px",
      textAlign: "left"
    },
    "& input": {
      boxSizing: "border-box",
      fontSize: "20px",
      lineHeight: "24px",
      padding: "16px",
      border: "1px solid #979797",
      marginTop: "8px"
    },
    "& .scroll": {
      overflowY: "scroll",
      width: "auto",
      height: "300px"
    }
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "42px",
    "& button": {
      fontFamily: "Calibri Bold",
      letterSpacing: "2px",
      height: "60px",
      display: "inline",
      marginLeft: "auto",
      marginRight: "auto",
      border: "solid",
      fontSize: "20px",
      lineHeight: "24px",
      textAlign: "center",
      cursor: "pointer",
      textTransform: "uppercase"
    }
  },
  acceptBtn: {
    width: "150px",
    height: "50px",
    marginLeft: "10px",
    marginRight: "auto",
    backgroundColor: "#A7C539",
    color: "#000000",
    boxShadow: "0px 6px 4px rgba(0, 46, 109, 0.3)"
  },
  declineBtn: {
    width: "300px",
    height: "50px",
    marginRight: "10px",
    marginLeft: "auto",
    backgroundColor: "transparent",
    color: "rgba(0, 0, 0, 0.5)"
  },
  doNotShowBtn: {
    border: "1px solid black",
    margin: "2px",
    width: "20px",
    height: "20px !important",
    position: "relative",
    marginRight: "10px !important"
  }
});

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    position: "relative",
    top: "50px",
    right: "auto",
    bottom: "auto",
    left: "200px",
    boxSizing: "border-box",
    height: "600px",
    maxHeight: "100%",
    width: "800px",
    maxWidth: "100%",
    padding: "60px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.2)",
    overflow: "scroll"
  }
};

const TdmCalculationWizard = props => {
  const {
    projectLevel,
    rules,
    onInputChange,
    onCommentChange,
    onUncheckAll,
    initializeStrategies,
    filters,
    onPkgSelect,
    resultRuleCodes,
    account,
    loginId,
    onSave,
    onViewChange,
    history,
    match,
    allowResidentialPackage,
    allowEmploymentPackage,
    residentialPackageSelected,
    employmentPackageSelected
  } = props;
  const [dateModified, setDateModified] = useState("");
  const [
    termsAndConditionsModalOpen,
    setTermsAndConditionsModalOpen
  ] = useState(true);

  useEffect(() => {
    const getDateModified = async () => {
      try {
        const result = await projectService.get();
        const currentProject = result.data.filter(
          project => project.id === projectId
        );
        let lastSaved = currentProject[0].dateModified;
        lastSaved = moment(lastSaved).format("MM/DD/YYYY h:mm A");
        setDateModified(lastSaved);
      } catch (err) {
        console.error(err);
      }
    };

    if (projectId) getDateModified();
  });

  const context = useContext(ToastContext);
  const classes = useStyles();
  const page = Number(match.params.page);
  const projectId = Number(match.params.projectId);

  useEffect(() => {
    if (!projectId) {
      history.push("/calculation/1/");
    } else if (
      projectId &&
      account &&
      (account.isAdmin || account.id === loginId)
    ) {
      // Project Calculation is editable if it is not saved
      // or the project was created by the current logged in
      // user, or the logged in user is admin.
      history.push(`/calculation/1/${projectId ? projectId : ""}`);
    } else {
      // read-only users can only see the summary page.
      history.push(`/calculation/6/${projectId}`);
      // setPage(6);
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
      projectDescriptionRules.find(rule => !!rule.validationErrors);
    const isPage2AndHasErrors =
      page === 2 && specificationRules.find(rule => !!rule.validationErrors);
    const isPage5AndHasErrors =
      page === 5 && strategyRules.find(rule => !!rule.validationErrors);
    const isPage6 = Number(page) === 6;

    return isPage1AndHasErrors ||
      isPage2AndHasErrors ||
      isPage5AndHasErrors ||
      isPage6
      ? true
      : false;
  };

  const routes = (
    <Switch>
      <Route path="/calculation/1/:projectId?">
        <ProjectDescriptions
          rules={projectDescriptionRules}
          onInputChange={onInputChange}
          classes={classes}
        />
      </Route>
      <Route path="/calculation/2/:projectId?">
        <ProjectSpecifications
          rules={specificationRules}
          onInputChange={onInputChange}
          classes={classes}
          uncheckAll={() => onUncheckAll(filters.specificationRules)}
        />
      </Route>
      <Route path="/calculation/3/:projectId?">
        <ProjectTargetPoints
          rules={targetPointRules}
          onInputChange={onInputChange}
          classes={classes}
          isLevel0={isLevel0}
        />
      </Route>
      <Route path="/calculation/4/:projectId?">
        <ProjectPackages
          projectLevel={projectLevel}
          rules={strategyRules}
          landUseRules={landUseRules}
          classes={classes}
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
          classes={classes}
          onPkgSelect={onPkgSelect}
          uncheckAll={() => onUncheckAll(filters.strategyRules)}
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
        const nextPage =
          Number(page) === 3 &&
          !allowResidentialPackage &&
          !allowEmploymentPackage
            ? 5
            : Number(page) + 1;
        history.push(`/calculation/${nextPage}${projectIdParam}`);
      }
    } else {
      // Skip page 4 unless Packages are applicable
      const prevPage =
        Number(page) === 5 &&
        !allowResidentialPackage &&
        !allowEmploymentPackage
          ? 3
          : Number(page) - 1;
      history.push(`/calculation/${prevPage}${projectIdParam}`);
    }
  };

  const toggleTermsAndConditionsModal = () => {
    setTermsAndConditionsModalOpen(!termsAndConditionsModalOpen);
  };

  if (localStorage.getItem("termsAndConditions"))
    return (
      <React.Fragment>
        <div className={clsx("tdm-wizard", classes.root)}>
          <Sidebar>
            {rules && rules.length > 0 && (
              <div className={classes.sidebarContent}>
                <SwitchViewButton onViewChange={onViewChange}>
                  Switch to Single Page View
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
            {routes}
            {!projectId ||
            (account &&
              account.id &&
              (account.id === loginId || account.isAdmin)) ||
            (account && account.isAdmin) ? (
              <div
                id="all-buttons-wrapper"
                className={classes.allButtonsWrapper}
              >
                {rules && rules.length ? ( //navigation disabled until rules have loaded
                  <>
                    <div id="nav-container" className="space-between">
                      <NavButton
                        id="leftNavArrow"
                        navDirection="previous"
                        isVisible={page !== 1}
                        isDisabled={Number(page) === 1}
                        onClick={() => {
                          onPageChange(Number(page) - 1);
                        }}
                      />
                      <NavButton
                        id="rightNavArrow"
                        navDirection="next"
                        isVisible={page !== 5}
                        isDisabled={setDisabledForNextNavButton()}
                        onClick={() => {
                          onPageChange(Number(page) + 1);
                        }}
                      />
                    </div>
                    <div id="save-and-startover-buttons-container">
                      <Button
                        isDisplayed={
                          !!(
                            account.id &&
                            (!projectId || account.id === loginId) &&
                            page === 5
                          )
                        }
                        onClick={onSave}
                        color="colorPrimary"
                        variant="contained"
                      >
                        {projectId ? "Save Project" : "Save As New Project"}
                      </Button>
                      <Button
                        isDisplayed={page !== 1}
                        onClick={() => window.location.assign("/calculation")}
                        variant="outlined"
                      >
                        Start Over
                      </Button>
                    </div>
                  </>
                ) : null}
              </div>
            ) : null}
            {page === 5 ? (
              <div className={classes.lastSavedContainer}>
                {dateModified && (
                  <span className={classes.lastSaved}>
                    <FontAwesomeIcon icon={faClock} /> &nbsp;Last saved:{" "}
                    {dateModified}
                  </span>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );

  return (
    <React.Fragment>
      <Modal
        isOpen={termsAndConditionsModalOpen}
        onRequestClose={toggleTermsAndConditionsModal}
        shouldCloseOnOverlayClick={false}
        contentLabel="Terms and Conditions Modal"
        style={modalStyles}
        className={classes.modal}
      >
        <h2>TDM Calculator User Terms and Conditions</h2>
        <div className="scroll">
          <p>
            PLEASE READ THIS AGREEMENT CAREFULLY BEFORE USING THIS WEB SITE. BY
            USING THIS WEB SITE, YOU ARE CONSENTING TO BE OBLIGATED AND BECOME A
            PARTY TO THIS AGREEMENT. IF YOU DO NOT AGREE TO THE TERMS AND
            CONDITIONS BEFLOW YOU SHOULD NOT ACCESS OR USE THIS WEB SITE
          </p>

          <p className="smaller">
            The Los Angeles Department of Transportation (LADOT), in partnership
            with the Department of City Planning and Hack for LA, has developed
            the City of Los Angeles Transportation Demand Management (TDM)
            Calculator (TDM Calculator) to provide the public with an
            understanding of the TDM Ordinance that is currently available for
            review: link to (CF XX-XXXX / CPC Case). The TDM Ordinance proposes
            to revise regulations that require eligible land use development
            projects to adopt TDM strategies with the goal to reduce the
            reliance on drive-alone trips in the City of Los Angeles. The term
            “City” as used below shall refer to the City of Los Angeles. The
            terms “City” and “Hack for LA” as used below shall include their
            respective affiliates, subconsultants, employees, volunteers, and
            representatives.
          </p>

          <p className="smaller">
            This application, the TDM Calculator, has been provided to You, the
            User, as a public service to assess different scenarios that
            development would need to comply with if the City were to adopt the
            TDM Ordinance. LADOT is pleased to be able to provide this
            information to the public. LADOT believes that the public is most
            effectively served when they are provided access to the technical
            tools that inform the public policy-making process that govern
            private and public land use investments. However, in using the TDM
            Calculator, You agree to be bound by this TDM Calculator User
            Agreement (this Agreement).
          </p>

          <p className="smaller">
            <strong>Limited License to Use.</strong> This Agreement gives You a
            limited, non-transferrable, non-assignable, and non-exclusive
            license to use the TDM Calculator on a computer system owned, leased
            or otherwise controlled by You in Your own facilities, as set out
            below, and provided that You know and follow the terms of this
            Agreement. Your failure to follow the terms of this Agreement shall
            automatically terminate this license and Your right to use the TDM
            Calculator.
          </p>

          <p className="smaller">
            <strong>Warranty Disclaimer.</strong> LADOT worked with{" "}
            <a href="https://ladot.lacity.org/" style={{ color: "blue" }}>
              the Department of City Planning
            </a>{" "}
            and Hack for LA to develop the TDM Calculator’s parameters,
            including potential TDM strategies, and program point targets that
            could apply to land use development. However, since the TDM
            Ordinance is a draft regulation and not current law, it could
            further change, or be adopted in whole, or in part, denied, or
            abandoned, the information herein should not be interpreted to be
            binding on development regulation outcomes that inform investment
            decisions. Due to the dynamic nature of the information contained
            within the TDM Calculator and the reliance upon information from
            outside sources, the City does not guarantee the accuracy or
            reliability of the information transmitted from this web site. The
            TDM Calculator, OUTPUTS AND ASSOCIATED DATA ARE PROVIDED “as is”
            WITHOUT WARRANTY OF ANY KIND, whether expressed, implied, statutory,
            or otherwise including but not limited to, warranties of title or
            the implied warranties of merchantability and fitness for a
            particular purpose. The City nor Hack for LA are not responsible for
            any special, indirect, incidental, or consequential damages that may
            arise from the use of, or the inability to use, the data and/or the
            materials contained on the data whether the materials contained on
            the data are provided by the City, or a third party.
          </p>

          <p className="smaller">
            <strong>Limitation of Liability.</strong> It is understood that the
            TDM Calculator is provided without charge. Neither the City nor Hack
            for LA can be responsible or liable for any information derived from
            its use, or for any delays, inaccuracies, incompleteness, errors or
            omissions arising out of your use of the TDM Calculator or with
            respect to the material contained in the TDM Calculator. You
            understand and agree that Your sole remedy against the City or Hack
            for LA for loss or damage caused by any defect or failure of the TDM
            Calculator, regardless of the form of action, whether in contract,
            tort, including negligence, strict liability or otherwise, shall be
            the repair or replacement of the TDM Calculator to the extent
            feasible as determined solely by the City. In no event shall the
            City or Hack for LA be responsible to You or anyone else for, or
            have liability for any special, indirect, incidental or
            consequential damages (including, without limitation, damages for
            loss of business profits or changes to businesses costs) or lost
            data or downtime, however caused, and on any theory of liability
            from the use of, or the inability to use, the TDM Calculator,
            whether the data, and/or formulas contained in the TDM Calculator
            are provided by the City or Hack for LA, or another third party,
            even if the City has been advised of the possibility of such
            damages.
          </p>

          <p className="smaller">
            This Agreement and License shall be governed by the laws of the
            State of California without regard to their conflicts of law
            provisions, and shall be effective as of the date set forth below
            and, unless terminated in accordance with the above or extended by
            written amendment to this Agreement, shall terminate on the earlier
            of the date that You are not making use of the TDM Calculator or one
            year after the beginning of Your use of the TDM Calculator.
          </p>

          <p className="smaller">
            By using the TDM Calculator, You hereby waive and release all
            claims, responsibilities, liabilities, actions, damages, costs, and
            losses, known and unknown, against the City and Hack for LA for Your
            use of the TDM Calculator.
          </p>

          <p className="smaller">
            Before making decisions using the information provided in this
            application, contact City LADOT staff at ladot.tdm@lacity.org to
            confirm the validity of the data provided.
          </p>
        </div>

        <div className={classes.modalActions}>
          <button
            className={classes.declineBtn}
            onClick={e => {
              e.preventDefault();
              window.location.href = "https://ladot.lacity.org/";
            }}
          >
            Decline and exit site
          </button>

          <button
            className={classes.acceptBtn}
            onClick={e => {
              e.preventDefault();
              window.localStorage.clear();
              window.localStorage.setItem("termsAndConditions", "Accepted");
              window.location.reload();
            }}
          >
            Accept
          </button>
        </div>
      </Modal>
      <div className={clsx("tdm-wizard", classes.root)}>
        <Sidebar>
          {rules && rules.length > 0 && (
            <div className={classes.sidebarContent}>
              <SwitchViewButton onViewChange={onViewChange}>
                Switch to Single Page View
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
          {routes}
          {!projectId ||
          (account &&
            account.id &&
            (account.id === loginId || account.isAdmin)) ||
          (account && account.isAdmin) ? (
            <div id="all-buttons-wrapper" className={classes.allButtonsWrapper}>
              {rules && rules.length ? ( //navigation disabled until rules have loaded
                <>
                  <div id="nav-container" className="space-between">
                    <NavButton
                      id="leftNavArrow"
                      navDirection="previous"
                      isVisible={page !== 1}
                      isDisabled={Number(page) === 1}
                      onClick={() => {
                        onPageChange(Number(page) - 1);
                      }}
                    />
                    <NavButton
                      id="rightNavArrow"
                      navDirection="next"
                      isVisible={page !== 6}
                      isDisabled={setDisabledForNextNavButton()}
                      onClick={() => {
                        onPageChange(Number(page) + 1);
                      }}
                    />
                  </div>
                  <div id="save-and-startover-buttons-container">
                    <Button
                      isDisplayed={
                        !!(
                          account.id &&
                          (!projectId || account.id === loginId) &&
                          page === 6
                        )
                      }
                      onClick={onSave}
                      color="colorPrimary"
                      variant="contained"
                    >
                      {projectId ? "Save Project" : "Save As New Project"}
                    </Button>
                    <Button
                      isDisplayed={page !== 1}
                      onClick={() => window.location.assign("/calculation")}
                      variant="outlined"
                    >
                      Start Over
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
          ) : null}
          {page === 6 ? (
            <div className={classes.lastSavedContainer}>
              {dateModified && (
                <span className={classes.lastSaved}>
                  <FontAwesomeIcon icon={faClock} /> &nbsp;Last saved:{" "}
                  {dateModified}
                </span>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

TdmCalculationWizard.propTypes = {
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
      calcValue: PropTypes.number,
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
  initializeStrategies: PropTypes.func.isRequired,
  onUncheckAll: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  resultRuleCodes: PropTypes.array.isRequired,
  account: PropTypes.object.isRequired,
  loginId: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired,
  allowResidentialPackage: PropTypes.bool.isRequired,
  allowEmploymentPackage: PropTypes.bool.isRequired,
  residentialPackageSelected: PropTypes.func,
  employmentPackageSelected: PropTypes.func
};

export default withRouter(TdmCalculationWizard);
