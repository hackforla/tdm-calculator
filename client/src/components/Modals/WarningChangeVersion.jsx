import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/Modal";
import Button from "../Button/Button";
import { MdWarning, MdCheckCircle } from "react-icons/md";
import { createUseStyles, useTheme } from "react-jss";
import UniversalSelect from "../UI/UniversalSelect";
import ToggleCheckbox from "components/UI/ToggleCheckbox";
import ConfigContext from "../../contexts/ConfigContext";
import CalculationsContext from "../../contexts/CalculationsContext";
import { formatDate } from "../../helpers/util";
import * as projectService from "../../services/project.service";
import useCalculator from "../../hooks/useCalculator";
import { formatCalculation } from "../../helpers/Calculations";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  warningIcon: {
    height: "80px",
    width: "80px",
    color: theme.colorCritical,
    textAlign: "center",
    margin: "1rem"
  },
  checkCircleIcon: {
    height: "80px",
    width: "80px",
    color: theme.colorPrimary,
    textAlign: "center",
    margin: "1rem"
  },
  modalHeader: { ...theme.typography.iconHeading1, marginBottom: "2rem" },
  modalSubHeader: {
    ...theme.typography.subHeading
  },
  modalContentSection: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    maxWidth: "80%"
  },
  modalDescriptionList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  descriptionContainer: {
    display: "flex",
    alignItems: "center"
  },
  mainActionButtonSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "1rem",
    marginBottom: "1rem"
  },
  labelText: {
    ...theme.typography.paragraph1,
    fontWeight: 700,
    marginRight: "0.5rem"
  },
  buttonText: {
    fontSize: "16px !important",
    fontWeight: "bold",
    width: "118px"
  },
  selectContainer: {
    display: "flex",
    gap: ".5rem",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  toggleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "90%"
  },
  toggleText: {
    ...theme.typography.subHeading,
    marginLeft: "10px",
    textAlign: "left"
  }
}));

const modalStyleDefaultOverrides = {
  overlay: {
    zIndex: "999",
    position: "fixed",
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    fontSize: "1rem",
    fontWeight: "normal"
  },
  content: {
    width: "min(700px, 90%)",
    inset: "auto",
    padding: "1rem",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    border: "1px solid #d8dce3",
    borderRadius: "0",
    boxSizing: "border-box",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 1)"
  }
};

const ChangeVersionModal = ({
  isModalOpen,
  close,
  cancel,
  project,
  droOptions
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const configContext = useContext(ConfigContext);
  const [calculate] = useCalculator();
  const [page, setPage] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [newCalculationId, setNewCalculationId] = useState(
    project?.calculationId
  );
  const defaultCalculationId = Number(configContext.CURRENT_CALCULATION_ID);
  const calculations = useContext(CalculationsContext);
  const formInputs = JSON.parse(project.formInputs);
  const alternateNumber = formInputs.VERSION_NO;

  const handleUpdate = async () => {
    const isCalculationIdOverride =
      Number(newCalculationId) === defaultCalculationId ? false : true;
    let proj = {
      ...project,
      calculationId: Number(newCalculationId),
      isCalculationIdOverride
    };
    // Re-calculate points and project level based on new calculationId
    const rules = await calculate(proj);
    proj.targetPoints = rules.find(r => r.code === "TARGET_POINTS_PARK")?.value;
    proj.earnedPoints = rules.find(r => r.code === "PTS_EARNED")?.value;
    proj.projectLevel = rules.find(r => r.code === "PROJECT_LEVEL")?.value;

    // Save result to database
    await projectService.updateCalculationId(
      proj.id,
      proj.calculationId,
      proj.isCalculationIdOverride,
      proj.targetPoints,
      proj.earnedPoints,
      proj.projectLevel
    );
    setPage(2);
  };

  const calculationList = Object.values(calculations)
    .filter(c => c.deprecated === false)
    .sort((a, b) => {
      const aid = a.id == 0 ? Number.MIN_SAFE_INTEGER : a.id;
      const bid = b.id == 0 ? Number.MIN_SAFE_INTEGER : b.id;
      return bid - aid;
    })
    .map(val => {
      return {
        value: val.id.toString(),
        label: formatCalculation(val)
      };
    });

  const handleCheckboxChange = () => {
    setConfirm(prevValue => !prevValue);
  };

  return (
    <ModalDialog
      mounted={isModalOpen}
      onClose={cancel}
      omitCloseBox={true}
      style={modalStyleDefaultOverrides}
    >
      {page === 0 ? (
        <div className={classes.container}>
          <MdWarning alt="Warning" className={classes.warningIcon} />
          <header className={classes.modalHeader}>
            {` Change Program Guidelines Version`}
          </header>

          <section className={classes.modalContentSection}>
            <dl className={classes.modalDescriptionList}>
              <div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>Date Draft Created:</dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {formatDate(project.dateCreated)}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>
                  Date Program Guidelines Last Updated:
                </dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {formatDate(calculations[defaultCalculationId].dateStart)}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>
                  This Project's Current Program Guidelines Version:
                </dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {calculations[newCalculationId]?.version}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>
                  Current Published Program Guidelines Version:
                </dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {calculations[defaultCalculationId].version}
                </dd>
              </div>
            </dl>

            <p className={classes.modalSubHeader}>
              Select a Program Guidelines Version from the dropdown below. The
              selected version&apos;s rules will be applied to this draft.
            </p>

            <div className={classes.selectContainer}>
              <label
                htmlFor="guideline-select"
                className={classes.labelText}
                style={{
                  flex: 1,
                  textAlign: "left",
                  height: "2.5rem",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                Change This Project's Program Guidelines Version To:
              </label>
              <div
                style={{
                  flex: 1.3
                }}
              >
                <UniversalSelect
                  id="guideline-select"
                  onChange={e => setNewCalculationId(Number(e.target.value))}
                  className={classes.select}
                  options={calculationList}
                  value={newCalculationId}
                  name={"Rule"}
                />
              </div>
            </div>

            <div className={classes.toggleContainer}>
              <ToggleCheckbox
                id="checkbox"
                name="checkbox"
                label="delete account confirmation"
                checked={confirm}
                onChange={handleCheckboxChange}
              />
              <div className={classes.toggleText}>
                I want to proceed with changing the applicable Program
                Guidelines version.
              </div>
            </div>
          </section>

          <section className={classes.mainActionButtonSection}>
            <Button
              onClick={() => {
                setConfirm(false);
                setNewCalculationId(project.calculationId);
                setPage(0);
                cancel();
              }}
              variant="secondary"
              id="cancelButton"
              className={classes.buttonText}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setPage(1)}
              variant="primary"
              disabled={!confirm || project.calculationId == newCalculationId}
              className={classes.buttonText}
            >
              Submit
            </Button>
          </section>
        </div>
      ) : null}

      {page === 1 ? (
        <div className={classes.container}>
          <MdWarning alt="Warning" className={classes.warningIcon} />
          <header className={classes.modalHeader}>
            {` Change Program Guidelines Version`}
          </header>

          <section className={classes.modalContentSection}>
            <header className={classes.modalSubHeader}>
              You are about to change the Program Guidelines version for this
              project.
            </header>

            <dl className={classes.modalDescriptionList}>
              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>Name:</dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {project.name}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>Address:</dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {project.address}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>Alternative Number:</dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {alternateNumber ? alternateNumber : "(none)"}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>DRO:</dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {project.droId
                    ? droOptions.find(d => d.id === project.droId)?.name
                    : "(unassigned)"}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}> Date Draft Created:</dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {formatDate(project.dateCreated)}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>
                  Change Program Guidelines Version From:
                </dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {calculations[project.calculationId]?.version}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>
                  Change Program Guidelines Version To:
                </dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {calculations[newCalculationId]?.version}
                </dd>
              </div>
            </dl>

            <p className={classes.modalSubHeader}>
              The selected version&apos;s rules will be applied to this draft
              after you confirm. This will affect project compliance
              requirements.
            </p>
            <p className={classes.modalSubHeader}>
              Are you sure you want to proceed?
            </p>
          </section>

          <div className={classes.mainActionButtonSection}>
            <Button
              onClick={() => {
                setPage(0);
                setConfirm(false);
                setNewCalculationId(project.calculationId);
                cancel();
              }}
              variant="secondary"
              id="cancelButton"
              className={classes.buttonText}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              variant="primary"
              disabled={!confirm}
              className={classes.buttonText}
            >
              Confirm
            </Button>
          </div>
        </div>
      ) : null}
      {page === 2 ? (
        <div className={classes.container}>
          <MdCheckCircle alt="Check" className={classes.checkCircleIcon} />
          <header className={classes.modalHeader}>
            {` Program Guidelines Version Updated`}
          </header>

          <section className={classes.modalContentSection}>
            <header className={classes.modalSubHeader}>
              The Program Guidelines version for the project has been updated.
              The rules corresponding to the selected version will now apply to
              the project.
            </header>

            <dl className={classes.modalDescriptionList}>
              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>Name:</dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {project.name}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>Address:</dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {project.address}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>Alternative Number:</dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {alternateNumber ? alternateNumber : "(none)"}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>DRO:</dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {project.droId
                    ? droOptions.find(d => d.id === project.droId)?.name
                    : "(unassigned)"}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}> Date Draft Created:</dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {formatDate(project.dateCreated)}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>
                  Changed Program Guidelines Version From:
                </dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {calculations[project.calculationId]?.version}
                </dd>
              </div>

              <div div className={classes.descriptionContainer}>
                <dt className={classes.labelText}>
                  Changed Program Guidelines Version To:
                </dt>
                <dd style={{ ...theme.typography.paragraph1 }}>
                  {calculations[newCalculationId]?.version}
                </dd>
              </div>
            </dl>

            <p className={classes.modalSubHeader}>
              Please notify the applicant that the Program Guidelines version
              that applies to this project has been changed.
            </p>
          </section>

          <div className={classes.mainActionButtonSection}>
            <Button
              onClick={() => {
                setPage(0);
                setConfirm(false);
                close();
              }}
              variant="primary"
              id="closeButton"
              className={classes.buttonText}
            >
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </ModalDialog>
  );
};

ChangeVersionModal.propTypes = {
  isModalOpen: PropTypes.bool,
  cancel: PropTypes.func,
  close: PropTypes.func,
  project: PropTypes.object,
  droOptions: PropTypes.array
};

export default ChangeVersionModal;
