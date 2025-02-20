import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import Button from "../Button/Button";
import ModalDialog from "../UI/AriaModal/ModalDialog";
import * as projectShareService from "../../services/projectShare.service";

const useStyles = createUseStyles(theme => ({
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    padding: "1em"
  },
  heading1: theme.typography.heading1,
  heading2: theme.typography.heading2,
  buttonDisabled: {
    cursor: "default"
  },
  modal: {
    width: "40em",
    margin: "0 auto"
  },
  input: {
    padding: "0 5em",
    margin: "1.5rem 2.5rem 1.5rem 0.75rem"
  },
  emailList: {
    height: "15em",
    overflowY: "scroll",
    lineHeight: "3em",
    padding: "10px"
  },
  emptyList: {
    display: "flex",
    height: "15em",
    border: "solid black 2px",
    margin: "1em",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "0em 2em"
  },
  viewPermissionsList: {
    padding: "0em 4em"
  },
  email: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "0px 12px",
    fontSize: "18px",
    "&:hover": {
      backgroundColor: "#f2f2f2"
    }
  },
  copyMessageBox: {
    border: "solid 2px",
    margin: "1em",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column"
  },
  copyButton: {
    backgroundColor: "darkBlue",
    color: "white",
    width: "100%",
    margin: "0",
    borderRadius: "0 0 6px 6px",
    border: "none",
    fontSize: "20px"
  },
  remove: {
    border: "none",
    background: "none",
    color: "red",
    fontSize: "18px",
    fontWeight: "normal",
    cursor: "pointer"
  },
  lineBreak: {
    textAlign: "center",
    borderBottom: "1px solid #000",
    lineHeight: "0em",
    margin: "10px 0 20px",
    color: "black"
  },
  popupMessage: {
    position: "absolute",
    bottom: "-10%",
    borderRadius: "10px",
    padding: "14px",
    fontWeight: "bold",
    fontSize: "18px",
    border: "1px solid #d8dce3",
    boxSizing: "border-box",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.5)"
  }
}));

export default function ShareSnapshotModal({ mounted, onClose, project }) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [page, setPage] = useState(1);
  const [sharedEmails, setSharedEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const maybeDisabled = !sharedEmails.length && classes.buttonDisabled;
  const tdmLink = "https://tdm-dev.azurewebsites.net";
  const copyLink = `${tdmLink}/projects/${project ? project.id : -1}`;
  const copyMessage = `Here's a snapshot of the current TDM Calculator plan for: [${
    project ? project.name : ""
  }](${copyLink}). \
If you don't already have a [TDM Calculator](${tdmLink}) account, please set one up to see the above snapshot link.`;

  const fetchProjectShareList = async () => {
    const response = await projectShareService.getByProjectId(project.id);
    setSharedEmails(response.data);
  };

  useEffect(() => {
    if (project) {
      fetchProjectShareList().catch(console.error);
    }
  }, [project, setSharedEmails]); // eslint-disable-line react-hooks/exhaustive-deps

  const shareProject = async (email, project) => {
    if (email && project) {
      let newProjectShare = {
        email: email,
        projectId: project.id
      };
      await projectShareService.post(newProjectShare).catch(console.error);
      await fetchProjectShareList().catch(console.error);
    }
  };

  const deleteProjectShare = async projectShare => {
    if (projectShare) {
      await projectShareService.del(projectShare.id).catch(console.error);
      await fetchProjectShareList().catch(console.error);
    }
  };

  const handleSubmitEmail = e => {
    switch (e.key) {
      case "Enter":
        shareProject(e.target.value, project);
    }
  };

  const closeProject = () => {
    onClose();
    setPage(1);
    setSelectedEmail(null);
    setIsCopied(false);
  };

  const modalContents = page => {
    switch (Number(page)) {
      case 1:
        return (
          <div className={classes.modal}>
            <div
              className={classes.heading1}
              style={{ marginBottom: "1.5rem" }}
            >
              Share &quot;{project ? project.name : ""}&quot; Snapshot?
            </div>
            <div className={classes.input}>
              <input
                placeholder="Add email addresses"
                type="text"
                id="emailAddresses"
                name="emailAddresses"
                onKeyDown={e => {
                  handleSubmitEmail(e);
                }}
              />
            </div>
            <div className={classes.viewPermissionsList}>
              <div
                className={classes.heading2}
                style={{ display: "inline-block", marginLeft: "1em" }}
              >
                People with viewing permission
              </div>
              {sharedEmails.length ? (
                <div className={classes.emailList}>
                  {sharedEmails.map(email => (
                    <div key={email.id} className={classes.email}>
                      {email.email}
                      <button
                        className={classes.remove}
                        onClick={() => {
                          setPage(3);
                          setSelectedEmail(email);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={classes.emptyList}>
                  No email addresses added. Please include at least one email to
                  share the project.
                </div>
              )}
              <div
                className={classes.buttonFlexBox}
                style={{ justifyContent: "right" }}
              >
                <Button
                  className={maybeDisabled}
                  onClick={() => {
                    setPage(2);
                  }}
                  disabled={sharedEmails.length ? false : true}
                  variant="contained"
                  color={"colorPrimary"}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={classes.modal}>
            <div className={classes.viewPermissionsList}>
              <div
                className={classes.heading1}
                style={{ marginBottom: "1.5rem" }}
              >
                Share &quot;{project ? project.name : ""}&quot; Snapshot
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  className={classes.heading2}
                  style={{
                    display: "flex",
                    marginLeft: "1em"
                  }}
                >
                  Copy link with message
                </div>
                <div className={classes.copyMessageBox}>
                  <p className={classes.paragraph} style={{ margin: "0.5em" }}>
                    Here&apos;s a snapshot of the current TDM Calculator plan
                    for: <a href={copyLink}>{project.name}</a>. <br></br>
                    <br></br> If you don&apos;t already have a{" "}
                    <a href={tdmLink}>TDM Calculator</a> account, please set one
                    up to see the above snapshot link.
                  </p>
                  <Button
                    className={classes.copyButton}
                    onClick={() => {
                      navigator.clipboard.writeText(copyMessage);
                      setIsCopied(true);
                    }}
                  >
                    Copy to Clipboard
                  </Button>
                </div>
                <div className={classes.lineBreak}>
                  <span
                    style={{
                      background: "#fff",
                      padding: "0 10px",
                      fontSize: "24px",
                      fontWeight: "bold"
                    }}
                  >
                    OR
                  </span>
                </div>
                <div
                  className={classes.heading2}
                  style={{ display: "flex", marginLeft: "1em" }}
                >
                  Copy link
                </div>
                <div className={classes.copyMessageBox}>
                  <p className={classes.paragraph} style={{ margin: "0.5em" }}>
                    {copyLink}
                  </p>
                  <Button
                    className={classes.copyButton}
                    onClick={() => {
                      navigator.clipboard.writeText(copyLink);
                      setIsCopied(true);
                    }}
                  >
                    Copy to Clipboard
                  </Button>
                </div>
              </div>
              <div
                className={classes.buttonFlexBox}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Button
                  onClick={() => {
                    setPage(1);
                    setIsCopied(false);
                  }}
                  variant="outlined"
                >
                  Back
                </Button>
                <Button
                  className={!isCopied && classes.buttonDisabled}
                  color={"colorPrimary"}
                  onClick={() => {
                    closeProject();
                  }}
                  disabled={!isCopied}
                >
                  Done
                </Button>
              </div>
              <div
                style={{
                  display: isCopied ? "flex" : "none",
                  justifyContent: "center",
                  width: "100%"
                }}
              >
                <div className={classes.popupMessage}>Successfully Copied!</div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <div
              className={classes.heading1}
              style={{ marginBottom: "1.5rem" }}
            >
              Are you sure?
            </div>
            <div className={classes.viewPermissionsList}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                Are you sure you want to remove {selectedEmail.email} from
                viewing this snapshot?
              </div>
              <div
                className={classes.buttonFlexBox}
                style={{ justifyContent: "center" }}
              >
                <Button
                  className={classes.buttonColor}
                  onClick={() => {
                    setPage(1);
                    setSelectedEmail("");
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button
                  className={classes.buttonColor}
                  onClick={() => {
                    deleteProjectShare(selectedEmail);
                    setPage(1);
                    setSelectedEmail("");
                  }}
                  variant="contained"
                  color={"colorPrimary"}
                >
                  Yes
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <ModalDialog
        mounted={mounted}
        onClose={() => {
          closeProject();
        }}
        initialFocus="#emailAddresses"
      >
        {modalContents(page)}
      </ModalDialog>
    </div>
  );
}

ShareSnapshotModal.propTypes = {
  mounted: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.any
};
