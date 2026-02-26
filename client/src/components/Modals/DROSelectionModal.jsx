import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import { MdLaunch, MdLocationCity } from "react-icons/md";
import ModalDialog from "../UI/Modal";
import RadioButton from "../UI/RadioButton";
import Button from "../Button/Button";

const useStyles = createUseStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40rem",
    gap: "1rem",
    padding: "1rem"
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.heading1,
  heading2: theme.typography.heading2,
  subheading: {
    ...theme.typography.subHeading,
    width: "85%"
  },
  externalLinkIcon: {
    fontSize: "20px",
    padding: " 0 0.4em",
    color: "#00F",
    verticalAlign: "middle"
  },
  icon: {
    height: "40px",
    width: "40px",
    color: theme.colorBlack,
    marginBottom: "0",
    verticalAlign: "middle",
    marginRight: "1rem"
  }
}));

export default function DROSelectionModal({
  mounted,
  onClose,
  onConfirm,
  selectedDro,
  droOptions,
  onChange
}) {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      onConfirm={onConfirm}
      onChange={onChange}
    >
      <div className={classes.container}>
        <div className={classes.heading1}>
          <MdLocationCity className={classes.icon} />
          Select Development Review Office
        </div>
        <div className={classes.subheading}>
          To submit your snapshot, select a Development Review Office based on
          the location of your project
        </div>
        <div className={classes.heading2}>
          Map of Development Review Offices
          <a
            href="https://ladot.lacity.gov/sites/default/files/documents/ladot-development-review-counter-info.pdf"
            target="_blank"
            className={classes.glossaryLink}
            rel="noreferrer"
          >
            <MdLaunch className={classes.externalLinkIcon} />
          </a>
        </div>
        {droOptions.map(dro => (
          <div
            key={dro.id}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100px",
              margin: "auto"
            }}
          >
            <RadioButton
              label={dro.name}
              value={dro.id}
              checked={selectedDro === dro.id}
              onChange={onChange}
            />
          </div>
        ))}
        <div className={classes.buttonFlexBox}>
          <Button onClick={onClose} variant="secondary">
            CANCEL
          </Button>
          <Button onClick={onConfirm} variant="primary">
            CONFIRM
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
}

DROSelectionModal.propTypes = {
  mounted: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  selectedDro: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  droOptions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};
