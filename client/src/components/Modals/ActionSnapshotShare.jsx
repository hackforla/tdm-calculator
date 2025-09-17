import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import Button from "../Button/Button";
import ModalDialog from "../UI/Modal";
import * as projectShareService from "../../services/projectShare.service";
import { MdIosShare, MdAddCircle, MdInfo, MdWarning } from "react-icons/md";
import * as Yup from "yup";
import { useToast } from "../../contexts/Toast";

const useStyles = createUseStyles(theme => ({
  buttonFlexBox: {
    display: "flex",
    flexDirection: "row",
    padding: "1em"
  },
  heading1: theme.typography.heading1,
  heading2: theme.typography.heading2,
  subheading: {
    ...theme.typography.subHeading,
    marginTop: "1rem",
    marginBottom: "1rem"
  },
  shareIcon: {
    height: "40px",
    width: "40px",
    color: theme.colorBlack,
    marginBottom: "0",
    verticalAlign: "middle"
  },
  infoIcon: {
    height: "80px",
    width: "80px",
    color: theme.colorLADOT
  },
  unshareIcon: {
    height: "80px",
    width: "80px",
    color: theme.colorCritical,
    marginBottom: "-1rem"
  },
  buttonDisabled: {
    cursor: "default"
  },
  modal: {
    width: "40em",
    margin: "0 auto"
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    padding: "0 2.5rem",
    margin: "1.5rem 1.5rem .25rem 1.5rem"
  },
  input: {
    borderRadius: "5px"
  },
  addCircleIcon: {
    color: theme.colorPrimary,
    height: "25px",
    width: "25px",
    marginLeft: "-30px",
    padding: "none"
  },
  warningText: {
    color: theme.colorError,
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
    padding: "0 4.5rem"
  },
  emailList: {
    height: "15em",
    overflowY: "scroll",
    lineHeight: "3em",
    padding: "10px"
  },
  emptyList: {
    display: "flex",
    margin: "1em",
    justifyContent: "center",
    fontSize: "18px"
  },
  viewPermissionsList: {
    padding: "0em 4em"
  },
  email: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: "18px",
    "&:hover": {
      backgroundColor: "#f2f2f2"
    }
  },
  page2Header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px"
  },
  sendLinkMessage: {
    color: theme.colorError,
    marginBottom: "1.5rem",
    fontSize: "18px",
    margin: "1em"
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

const emailSchema = Yup.string()
  .email("Invalid email address")
  .required("Email is required");

export default function ShareSnapshotModal({ mounted, onClose, project }) {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const toast = useToast();
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [sharedEmails, setSharedEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const maybeDisabled = !sharedEmails.length && classes.buttonDisabled;
  const tdmLink = window.location.origin; //"https://tdm-dev.azurewebsites.net";
  const copyLink = `${tdmLink}/calculation/5/${project ? project.id : -1}`;
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

  const addEmail = async value => {
    const email = value.trim();
    if (!email) return;

    try {
      await emailSchema.validate(email);
      setError("");
      shareProject(email, project);
      toast.add("Email added.");
      document.querySelector("#emailAddresses").value = ""; // clear input
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmitEmail = e => {
    if (e.key && e.key !== "Enter") return; // ignore other keys
    e.preventDefault();
    const inputValue = document.querySelector("#emailAddresses").value;
    addEmail(inputValue);
  };

  const closeProject = () => {
    onClose();
    setPage(1);
    setSelectedEmail(null);
    setIsCopied(false);
  };

  const cancelShare = () => {
    closeProject();
    setSharedEmails([]);
  };

  const modalContents = page => {
    switch (Number(page)) {
      case 1:
        return (
          <div className={classes.modal}>
            <div className={classes.heading1}>
              <MdIosShare className={classes.shareIcon} />
              Share &quot;{project ? project.name : ""}&quot; Snapshot
            </div>
            <div className={classes.inputContainer}>
              <input
                className={classes.input}
                placeholder="Add email addresses"
                type="text"
                id="emailAddresses"
                name="emailAddresses"
                onKeyDown={handleSubmitEmail}
              />
              <MdAddCircle
                className={classes.addCircleIcon}
                onClick={handleSubmitEmail}
              />
            </div>
            {error && <div className={classes.warningText}>{error}</div>}
            <div className={classes.viewPermissionsList}>
              {sharedEmails.length ? (
                <>
                  <div
                    className={classes.heading2}
                    style={{ display: "inline-block", marginLeft: ".4em" }}
                  >
                    People with viewing permission
                  </div>
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
                </>
              ) : (
                <div className={classes.emptyList}>
                  Enter at least one email to give access to this snapshot.
                </div>
              )}
              <div
                className={classes.buttonFlexBox}
                style={{ justifyContent: "center" }}
              >
                <Button
                  className={maybeDisabled}
                  onClick={cancelShare}
                  variant="contained"
                  color={"colorSecondary"}
                >
                  Cancel
                </Button>
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
              <div className={classes.page2Header}>
                <MdInfo className={classes.infoIcon} />
                <div className={classes.heading1}>
                  Share &quot;{project ? project.name : ""}&quot; Snapshot
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className={classes.sendLinkMessage}>
                  Added accounts won&apos;t be notified automatically. Use the
                  options below to send the link with or without a message.
                </div>
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
                    variant="primary"
                    onClick={() => {
                      navigator.clipboard.writeText(copyMessage);
                      setIsCopied(true);
                      toast.add("Link copied to clipboard.");
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
                    variant="primary"
                    onClick={() => {
                      navigator.clipboard.writeText(copyLink);
                      setIsCopied(true);
                      toast.add("Link copied to clipboard.");
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
                  justifyContent: "center"
                }}
              >
                <Button
                  onClick={() => {
                    setPage(1);
                    setIsCopied(false);
                  }}
                  variant="secondary"
                >
                  Back
                </Button>
                <Button
                  className={!isCopied && classes.buttonDisabled}
                  variant="primary"
                  onClick={() => {
                    closeProject();
                  }}
                  disabled={!isCopied}
                >
                  Done
                </Button>
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
              <MdWarning className={classes.unshareIcon} />
            </div>
            <h1 className={classes.heading1}>Confirm Unsharing</h1>
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
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button
                  variant="warning"
                  onClick={() => {
                    deleteProjectShare(selectedEmail);
                    setPage(1);
                    setSelectedEmail("");
                  }}
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
