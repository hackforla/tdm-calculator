import React, { useEffect, useState } from "react";
import * as projectService from "../../services/project.service";
import { createUseStyles, useTheme } from "react-jss";
import ModalDialog from "../UI/Modal";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { MdWarning } from "react-icons/md";
import { getById } from "services/dro.service";
import { Link } from "react-router-dom";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px"
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
    textAlign: "center",
    margin: 0
  },
  heading1: theme.typography.iconHeading1,
  heading3: {
    ...theme.typography.heading3,
    marginRight: "1rem",
    lineHeight: "2rem",
    wordBreak: "break-all",
    textAlign: "left"
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    maxWidth: "560px"
  },
  subheading: {
    ...theme.typography.subHeading,
    textAlign: "left",
    width: "30rem",
    lineHeight: "1.5rem",
    marginTop: "1.6rem"
  }
}));

export default function WarningSnapshotSubmit({ mounted, onClose, project }) {
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
    try {
      await projectService.submit({ id: project.id });
    } catch (err) {
      console.error(err);
    }
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
  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      omitCloseBox={true}
      initialFocus="#cancelButton"
    >
      <div className={classes.container}>
        <MdWarning alt="Warning" className={classes.warningIcon} />
        <div className={classes.heading1}>Ready to Submit</div>
        <div className={classes.subheading} style={{ textAlign: "center" }}>
          This Snapshot will be submitted to LADOT as a TDM <br /> Plan
          application.
        </div>
        <div className={classes.userContainer}>
          <div className={classes.subheading}>
            An application fee must be paid to initiate review.See the
            <Link to="/faqs" style={{ paddingInline: "4px" }}>
              FAQ
            </Link>
            for more information about the application process.
          </div>

          <div
            className={classes.heading3}
            style={{ marginTop: "1.6rem", maxWidth: "425px" }}
          >
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
        <div className={classes.subheading} style={{ textAlign: "center" }}>
          Are you sure you want to submit this Snapshot?
        </div>
        <div className={classes.buttonFlexBox} style={{ marginTop: "1.5rem" }}>
          <Button onClick={onClose} variant="secondary" id="cancelButton">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="primary">
            SUBMIT
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
}

WarningSnapshotSubmit.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any
};
