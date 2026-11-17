import React, { useEffect, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import ModalDialog from "../UI/Modal";
import RadioButton from "../UI/RadioButton";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { MdOutlineDescription } from "react-icons/md";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px"
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    marginTop: "1.5rem"
  },
  submissionTypeIcon: {
    height: "34px",
    width: "34px",
    textAlign: "center",
    marginRight: "1rem"
  },
  heading1: {
    ...theme.typography.iconHeading1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "center"
  },
  heading4: {
    ...theme.typography.heading4,
    marginTop: ".2rem"
  },
  subheading: {
    ...theme.typography.subHeading,
    textAlign: "center",
    lineHeight: "1.5rem",
    marginTop: "2rem"
  },
  paragraph: {
    ...theme.typography.paragraph1,
    margin: ".7rem 0"
  },
  inputField: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "1rem"
  },
  input: {
    ...theme.typography.paragraph1,
    width: "180px",
    height: "20px",
    padding: "10px",
    marginBottom: "10px"
  },
  inputError: {
    ...theme.typography.paragraph1,
    color: "red",
    width: "380px"
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "1.5rem",
    padding: 0
  }
}));

export default function SpecifySubmissionType({ mounted, onClose, project }) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const NEW_PLAN_SUBMISSION = "NEW_PLAN_SUBMISSION";
  const REPLACEMENT_SUBMISSION = "REPLACEMENT_SUBMISSION";

  const submissionTypes = {
    [NEW_PLAN_SUBMISSION]: "New TDM Plan",
    [REPLACEMENT_SUBMISSION]: "Replacement for previously submitted TDM Plan"
  };

  const [submissionType, setSubmissionType] = useState("");
  const [prevPlanId, setPrevPlanId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [prevPlanIdError, setPrevPlanIdError] = useState("");

  const resetFormState = () => {
    setSubmitting(false);
    setPrevPlanId("");
  };

  const resetAllInputState = () => {
    setSubmissionType("");
    setPrevPlanIdError("");
    resetFormState();
  };

  const handleCloseModal = () => {
    resetAllInputState();
    onClose();
  };

  const handleChangeSubmissionType = e => {
    resetFormState();
    if (submissionType === REPLACEMENT_SUBMISSION) setPrevPlanId("");
    setSubmissionType(e.target.value);
  };

  const handleChangePrevPlanId = e => {
    resetFormState();
    setPrevPlanId(prevVal => {
      if (!e.target.validity.patternMismatch) {
        const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
        const formatted =
          digits.length > 5
            ? `${digits.slice(0, 5)}-${digits.slice(5)}`
            : digits;

        return formatted;
      } else {
        return prevVal;
      }
    });
  };

  const validatePrevPlanId = () => {
    let errMsg = "";
    const digits = prevPlanId.replace(/\D/g, "").slice(0, 10);

    if (digits.length < 10) {
      errMsg = "TDM Plan ID must have 10 digits";
    } else {
      errMsg = "";
    }

    setPrevPlanIdError(errMsg);
    return errMsg === "" ? true : false;
  };

  const handleSubmit = () => {
    setSubmitting(true);
    if (validatePrevPlanId()) {
      console.log(`Previous Plan ID is Valid:\t ${prevPlanId}`);
    } else {
      console.log(`Previous Plan ID NOT Valid:\t ${prevPlanId}`);
    }
  };

  const submissionDisabled =
    submissionType === "" || submitting || prevPlanIdError !== "";

  return (
    <ModalDialog
      mounted={mounted}
      onClose={handleCloseModal}
      omitCloseBox={true}
      escapeExits={false}
      initialFocus="#cancelButton"
    >
      <div className={classes.container}>
        <div className={classes.heading1}>
          <MdOutlineDescription
            alt="Specify Submission Type"
            className={classes.submissionTypeIcon}
          />
          Select Submission Type
        </div>
        <div className={classes.subheading}>Is this TDM Plan Submission a:</div>
        <div className={classes.userContainer}>
          {Object.entries(submissionTypes).map(([key, label]) => (
            <div key={key} style={{ margin: ".3rem 0" }}>
              <RadioButton
                name={key}
                label={label}
                value={key}
                checked={submissionType === key}
                onChange={handleChangeSubmissionType}
              />
            </div>
          ))}
          {submissionType === REPLACEMENT_SUBMISSION && (
            <div className={classes.container}>
              <div className={classes.heading4}>Previous TDM Plan ID</div>
              <div className={classes.paragraph}>
                Previous TDM Plan must have been withdrawn by LADOT.
              </div>
              <div className={classes.inputField}>
                <input
                  className={classes.input}
                  name="prevPlanId"
                  type="text"
                  aria-label="Number"
                  inputMode="numeric"
                  pattern="[0-9]+(-|-[0-9]+)*"
                  placeholder="00000-00000"
                  value={prevPlanId}
                  onChange={handleChangePrevPlanId}
                  required
                />
                {prevPlanIdError && (
                  <span className={classes.inputError}>{prevPlanIdError}</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={classes.buttonFlexBox}>
          <Button
            onClick={() => {
              resetAllInputState();
            }}
            variant="secondary"
            id="cancelButton"
          >
            CANCEL
          </Button>
          <Button
            onClick={handleSubmit}
            variant="primary"
            disabled={submissionDisabled}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
}

SpecifySubmissionType.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any
};
