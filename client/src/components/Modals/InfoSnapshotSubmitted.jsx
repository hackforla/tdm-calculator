import React, { useEffect, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import ModalDialog from "../UI/Modal";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { MdCheckCircle } from "react-icons/md";
import { getById } from "services/dro.service";
import { Link } from "react-router-dom";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px"
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    margin: "0 4rem 0",
    maxWidth: "518px"
  },
  submittedIcon: {
    height: "80px",
    width: "80px",
    color: theme.colorPrimary,
    textAlign: "center",
    marginBottom: "1.4rem"
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.heading1,
  subheading: {
    ...theme.typography.subHeading,
    textAlign: "center",
    width: "30rem",
    lineHeight: "1.5rem",
    marginTop: "1.6rem"
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
  }
}));

export default function InfoSnapshotSubmit({ mounted, onClose, project }) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [apnDroData, setApnDroData] = useState(null);

  useEffect(() => {
    const fetchApnDro = async () => {
      if (
        !project ||
        !project.formInputs ||
        project.formInputs === "undefined"
      ) {
        return;
      }

      try {
        const formInputs = JSON.parse(project.formInputs);
        const apn = formInputs?.APN ? formInputs.APN : "N/A";
        let dro = "N/A";
        if (project.droId) {
          dro = (await getById(project.droId)).data.name;
        }

        const data = {
          apn: apn,
          dro: dro
        };
        setApnDroData(data);
      } catch (error) {
        console.error("Unable to obtain the apn and dro of project: ", error);
      }
    };
    fetchApnDro();
  }, [project]);

  const handleClose = async () => {
    onClose("ok");
  };

  const convertTimeStamp = date => {
    if (!date) {
      return;
    }
    const dataObj = new Date(date);
    return dataObj.toISOString().split("T")[0];
  };
  const dateLastSaved = convertTimeStamp(project?.dateModified);
  const dateSnapShot = convertTimeStamp(project?.dateSnapshotted);
  const date = new Date();
  const dateSubmitted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      omitCloseBox={true}
      initialFocus="#cancelButton"
    >
      <div className={classes.container}>
        <MdCheckCircle alt="Checked" className={classes.submittedIcon} />
        <div className={classes.heading1}>Submitted</div>
        <div className={classes.subheading} style={{ textAlign: "center" }}>
          Your TDM Plan submission to LADOT was successful.
        </div>
        <div className={classes.userContainer}>
          <div className={classes.subheading}></div>

          <div className={classes.subheading} style={{ fontWeight: "bold" }}>
            See the <Link to="/faqs">FAQ</Link> page for more information about
            the application process and payment.
          </div>

          <div className={classes.field} style={{ marginTop: "1.6rem" }}>
            <div className={classes.fieldName}>Name:</div>
            <div className={classes.fieldValue}>{project?.name}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Address:</div>
            <div className={classes.fieldValue}>{project?.address}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>
              Assessor Parcel Number (APN/AIN):
            </div>
            <div className={classes.fieldValue}>{apnDroData?.apn || ""}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>DRO:</div>
            <div className={classes.fieldValue}>{apnDroData?.dro}</div>
          </div>

          <div className={classes.field}>
            <div className={classes.fieldName}>Date Snapshot Created:</div>
            <div className={classes.fieldValue}>{dateSnapShot}</div>
          </div>

          <div className={classes.field} style={{ margin: "0" }}>
            <div className={classes.fieldName}>Date Last Saved:</div>
            <div className={classes.fieldValue}>{dateLastSaved}</div>
          </div>
        </div>
        <div className={classes.buttonFlexBox} style={{ marginTop: "1.5rem" }}>
          <Button onClick={handleClose} variant="primary">
            OK
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
}

InfoSnapshotSubmit.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any
};
