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
  field: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "1rem"
  },
  fieldName: {
    ...theme.typography.heading4,
    textAlign: "left",
    marginRight: ".5rem"
  },
  fieldValue: {
    ...theme.typography.paragraph1,
    overflowWrap: "break-word"
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

function PreviousPlanField() {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [prevPlanId, setPrevPlanId] = useState("");

  const errors = [
    "Unable to find withdrawn submission for that project ID",
    "Unable to find TDM Plan ID",
    "TDM Plan ID must have 10 digits",
    "Previous TDM Plan ID field is empty"
  ];

  return (
    <div className={classes.container}>
      <div className={classes.heading4}>Previous TDM Plan ID</div>
      <div className={classes.paragraph}>
        Previous TDM Plan must have been withdrawn by LADOT.
      </div>
      <div style={{ width: "75%" }}>
        <input
          placeholder="00000-00000"
          type="text"
          name="prevPlanId"
          value={prevPlanId}
          onChange={e => setPrevPlanId(e.target.value)}
        />
      </div>
    </div>
  );
}

export default function SpecifySubmissionType({ mounted, onClose, project }) {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [apnDroData, setApnDroData] = useState(null);

  const NEW_PLAN_SUBMISSION = "NEW_PLAN_SUBMISSION";
  const REPLACEMENT_SUBMISSION = "REPLACEMENT_SUBMISSION";

  const submissionTypes = {
    [NEW_PLAN_SUBMISSION]: "New TDM Plan",
    [REPLACEMENT_SUBMISSION]: "Replacement for previously submitted TDM Plan"
  };

  useEffect(() => {
    console.log(JSON.stringify(submissionTypes, null, 2));
  }, []);

  const [submissionType, setSubmissionType] = useState("");

  const onSelectSubmissionType = e => {
    // const newDroId = Number(e.target.value);
    setSubmissionType(e.target.value);
    // handleDroChange(project.id, newDroId);
  };

  const convertTimeStamp = date => {
    if (!date) {
      return;
    }
    const dateObj = new Date(date);
    return dateObj.toISOString().split("T")[0];
  };

  const dateLastSaved = convertTimeStamp(project?.dateModified);
  const dateSnapshot = convertTimeStamp(project?.dateSnapshotted);

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      onCloseBox={true}
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
                onChange={onSelectSubmissionType}
              />
            </div>
          ))}
          {submissionType === REPLACEMENT_SUBMISSION && <PreviousPlanField />}
        </div>

        <div className={classes.buttonFlexBox}>
          <Button onClick={onClose} variant="secondary" id="cancelButton">
            CANCEL
          </Button>
          <Button
            onClick={() => {
              alert("Not yet implemented");
            }}
            variant="primary"
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
