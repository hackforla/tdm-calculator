import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import Button from "../Button/Button";
import { MdWarning } from "react-icons/md";
// import { createUseStyles, useTheme } from "react-jss";
import { createUseStyles } from "react-jss";
import ModalDialog from "../UI/Modal";
import ToggleCheckbox from "components/UI/ToggleCheckbox";

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
  checkboxStatement: {
    display: "flex",
    alignItems: "center",
    gap: ".25rem",
    marginBottom: "1.5rem"
  },
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: 0
  },
  heading1: theme.typography.iconHeading1,
  subheading: {
    ...theme.typography.subHeading,
    width: "30rem",
    lineHeight: "1.5rem"
  }
}));

const DeleteArchivedAccountModal = ({ mounted, onClose, user }) => {
  // const theme = useTheme();
  const classes = useStyles();
  const [isBoxChecked, setIsBoxChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsBoxChecked(!isBoxChecked);
  };

  useEffect(() => {
    if (!mounted) {
      setIsBoxChecked(false);
    }
  }, [mounted]);

  return (
    <ModalDialog
      mounted={mounted}
      onClose={onClose}
      omitCloseBox={true}
      initialFocus="#cancelButton"
    >
      <div className={classes.container}>
        <MdWarning alt="Warning" className={classes.warningIcon} />
        <div className={classes.heading1} style={{ marginBottom: "1.5rem" }}>
          Delete archived account?
        </div>
        <div className={classes.subheading} style={{ marginBottom: "1.5rem" }}>
          Deleting the archived account {user.firstName} {user.lastName} will
          remove all associated data, including projects created by the account.
        </div>
        <div className={classes.checkboxStatement}>
          <ToggleCheckbox
            id="checkbox"
            name="checkbox"
            label="delete account confirmation"
            checked={isBoxChecked}
            onChange={handleCheckboxChange}
          />
          I understand this account and its data will be permanently deleted.
        </div>
      </div>

      <div className={classes.buttonFlexBox}>
        <Button onClick={onClose} variant="secondary" id="cancelButton">
          Cancel
        </Button>
        <Button
          onClick={() => onClose("ok")}
          variant="warning"
          disabled={!isBoxChecked}
        >
          Delete Permanently
        </Button>
      </div>
    </ModalDialog>
  );
};

DeleteArchivedAccountModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  user: PropTypes.obj
};

export default DeleteArchivedAccountModal;
