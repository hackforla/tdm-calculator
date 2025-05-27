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
  submittedIcon: {
    height: "80px",
    width: "80px",
    color: theme.colorPrimary,
    textAlign: "center"
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.heading1,
  heading3: {
    ...theme.typography.heading3,
    marginRight: "1rem",
    lineHeight: "2rem"
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start"
  },
  subheading: {
    ...theme.typography.subHeading,
    textAlign: "left",
    width: "30rem",
    lineHeight: "1.5rem",
    marginTop: "1.6rem"
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
          <div className={classes.subheading}>Submitted: {dateSubmitted}</div>

          <div className={classes.subheading}>
            See the <Link to="/faqs">FAQ</Link> page for more information about
            the application process and payment.
          </div>

          <div className={classes.heading3} style={{ marginTop: "1.6rem" }}>
            {project?.name}
          </div>
          <div className={classes.heading3}>{project?.address}</div>
          <div className={classes.heading3}>{apnDroData?.apn || ""}</div>
          <div className={classes.heading3}>
            {`DRO: ${apnDroData?.dro}` || null}
          </div>
          <div className={classes.heading3}>
            {`Date Last Saved: ${dateLastSaved}` || null}
          </div>
          <div className={classes.heading3}>
            {`Date Snapshot Created: ${dateSnapShot}` || null}
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
