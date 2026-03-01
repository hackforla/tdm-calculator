import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import ModalDialog from "../UI/Modal";
import Button from "../Button/Button";
import { MdWarning } from "react-icons/md";
import { createUseStyles, useTheme } from "react-jss";
import UniversalSelect from "../UI/UniversalSelect";
import ToggleCheckbox from "components/UI/ToggleCheckbox";
import ConfigContext from "../../contexts/ConfigContext";
import CalculationsContext from "../../contexts/CalculationsContext";
import { formatDate } from "../../helpers/util";
import * as projectService from "../../services/project.service";
import useCalculator from "../../hooks/useCalculator";

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
    textAlign: "center"
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "1rem"
  },
  modalHeader: { ...theme.typography.iconHeading1, marginBottom: "2rem" },
  modalSubHeader: {
    ...theme.typography.subHeading,
    marginTop: "1rem",
    marginBottom: "1rem"
  },
  labelText: {
    ...theme.typography.paragraph1,
    fontWeight: 700,
    marginRight: "0.5rem"
  }
}));

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

  const formatCalculation = calculation => {
    const dateStart = calculation.dateStart
      ? formatDate(calculation.dateStart)
      : "";
    const dateEnd = calculation.dateEnd
      ? formatDate(calculation.dateEnd)
      : "Present";
    const dateRange = calculation.dateStart
      ? `(${dateStart} - ${dateEnd})`
      : "";
    return `Version ${calculation.version} ${dateRange}`;
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
    <ModalDialog mounted={isModalOpen} onClose={cancel} omitCloseBox={true}>
      {page === 0 ? (
        <div className={classes.container}>
          <MdWarning alt="Warning" className={classes.warningIcon} />
          <div
            className={classes.modalHeader}
          >{` Change Program Guidelines Version`}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "1rem",
              maxWidth: "80%"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <div className={classes.labelText}>Date Draft Created:</div>
              <div style={{ ...theme.typography.paragraph1 }}>
                {formatDate(project.dateCreated)}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <div className={classes.labelText}>
                Date Program Guidelines Last Updated:
              </div>
              <div style={{ ...theme.typography.paragraph1 }}>
                {formatDate(calculations[defaultCalculationId].dateStart)}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <div className={classes.labelText}>
                Current Program Guidelines Version:
              </div>
              <div style={{ ...theme.typography.paragraph1 }}>
                {calculations[defaultCalculationId].version}
              </div>
            </div>

            <div>
              <p>
                Select a Program Guidelines Version from the dropdown below. The
                selected version&apos;s rules will be applied to this draft
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <div className={classes.labelText}>
                Program Guidelines Version:
              </div>
              <div style={{ minWidth: "20rem" }}>
                <UniversalSelect
                  onChange={e => setNewCalculationId(Number(e.target.value))}
                  className={classes.select}
                  options={calculationList}
                  value={newCalculationId}
                  name={"Rule"}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <ToggleCheckbox
                id="checkbox"
                name="checkbox"
                label="delete account confirmation"
                checked={confirm}
                onChange={handleCheckboxChange}
              />
              <div>
                I want to proceed with changing the applicable Program
                Guidelines version.
              </div>
            </div>
          </div>
          <div className={classes.buttonFlexBox}>
            <Button
              onClick={() => {
                setConfirm(false);
                setNewCalculationId(project.calculationId);
                setPage(0);
                cancel();
              }}
              variant="secondary"
              id="cancelButton"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setPage(1)}
              variant="primary"
              disabled={!confirm || project.calculationId == newCalculationId}
            >
              Submit
            </Button>
          </div>
        </div>
      ) : null}

      {page === 1 ? (
        <div className={classes.container}>
          <MdWarning alt="Warning" className={classes.warningIcon} />
          <div
            className={classes.modalHeader}
          >{` Change Program Guidelines Version`}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.75rem",
              width: "80%"
            }}
          >
            <div className={classes.labelText}>{project.name}</div>
            <div className={classes.labelText}>{project.address}</div>
            <div className={classes.labelText}>
              {"Alternate Number: " +
                (alternateNumber ? alternateNumber : "(none)")}
            </div>
            <div className={classes.labelText}>
              {"DRO: " +
                (project.droId
                  ? droOptions.find(d => d.id === project.droId)?.name
                  : "(unassigned)")}
            </div>
            <div className={classes.labelText}>
              Date Draft Created: &nbsp;
              {formatDate(project.dateCreated)}
            </div>

            <div className={classes.labelText}>
              Previous Program Guidelines Version: &nbsp;
              {calculations[project.calculationId]?.version}
            </div>
            <div className={classes.labelText}>
              New Program Guidelines Version: &nbsp;
              {calculations[newCalculationId]?.version}
            </div>
          </div>
          <div style={{ width: "80%", marginTop: "1rem" }}>
            <p>
              The selected version&apos;s rules will be applied to this draft
              after you confirm. This will affect project compliance
              requirements.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Are you sure you want to proceed?
            </p>
          </div>

          <div className={classes.buttonFlexBox}>
            <Button
              onClick={() => {
                setPage(0);
                setConfirm(false);
                setNewCalculationId(project.calculationId);
                cancel();
              }}
              variant="secondary"
              id="cancelButton"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              variant="primary"
              disabled={!confirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      ) : null}
      {page === 2 ? (
        <div className={classes.container}>
          <MdWarning alt="Warning" className={classes.warningIcon} />
          <div
            className={classes.modalHeader}
          >{` Program Guidelines Version Updated`}</div>
          <div style={{ width: "80%", marginTop: "1rem" }}>
            <p>
              The Program Guidelines version for the project has been updated.
              The rules corresponding to the selected version will now apply to
              the project.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.75rem",
              width: "80%"
            }}
          >
            <div className={classes.labelText}>{project.name}</div>
            <div className={classes.labelText}>{project.address}</div>
            <div className={classes.labelText}>
              {"Alternate Number: " +
                (alternateNumber ? alternateNumber : "(none)")}
            </div>
            <div className={classes.labelText}>
              {"DRO: " +
                (project.droId
                  ? droOptions.find(d => d.id === project.droId)?.name
                  : "(unassigned)")}
            </div>
            <div className={classes.labelText}>
              Date Draft Created: &nbsp;
              {formatDate(project.dateCreated)}
            </div>

            <div className={classes.labelText}>
              Previous Program Guidelines Version: &nbsp;
              {calculations[project.calculationId]?.version}
            </div>
            <div className={classes.labelText}>
              New Program Guidelines Version: &nbsp;
              {calculations[newCalculationId]?.version}
            </div>
          </div>
          <div style={{ width: "80%", marginTop: "1rem" }}>
            <p>
              Please notify the applicant that the Program Guidelines version
              that applies to this project has been changed.
            </p>
          </div>

          <div className={classes.buttonFlexBox}>
            <Button
              onClick={() => {
                setPage(0);
                setConfirm(false);
                close();
              }}
              variant="primary"
              id="closeButton"
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
