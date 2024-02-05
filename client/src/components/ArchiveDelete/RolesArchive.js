import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndo } from "@fortawesome/free-solid-svg-icons";
import * as accountService from "../../services/account.service";
import { useToast } from "../../contexts/Toast";
import RolesUnarchiveContextMenu from "./RolesUnarchiveContextMenu";
import RolesDeleteContextMenu from "./RolesDeleteContextMenu";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  pageTitle: {
    marginTop: "2em"
  },
  pageSubtitle: {
    marginTop: "0.5em",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "normal",
    fontStyle: "normal"
  },
  table: {
    minWidth: "80%",
    margin: "20px"
  },
  tr: {
    margin: "0.5em"
  },
  td: {
    padding: "0.2em",
    textAlign: "left"
  },
  tdCenter: {
    padding: "0.2em",
    textAlign: "center"
  },
  thead: {
    fontWeight: "bold",
    backgroundColor: "#0f2940",
    color: "white",
    "& td": {
      padding: ".4em"
    }
  },
  tbody: {
    "& tr td": {
      padding: ".4em 0"
    },
    "& tr:hover": {
      background: "#f0e300"
    }
  },
  link: {
    textDecoration: "underline"
  },
  optionsButton: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    padding: "0.2em 0.5em",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#f2f2f2"
    }
  },
  popupContent: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#E9E9E9",
      borderRadius: "4px"
    }
  },
  hoveredRow: {
    backgroundColor: "#f0e300"
  }
});

const RolesArchive = () => {
  const [archivedAccounts, setArchivedAccounts] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const classes = useStyles();
  const { add } = useToast();

  useEffect(() => {
    const getArchivedAccounts = async () => {
      try {
        const response = await accountService.getAllArchivedAccounts();
        if (response.status === 200) {
          setArchivedAccounts(response.data);
        } else {
          add("Failed to get archived accounts.");
        }
      } catch (err) {
        add("Error - Could not display archived accounts.");
      }
    };
    getArchivedAccounts();
  }, [add]);

  const handleUnarchiveUser = async user => {
    try {
      const response = await accountService.unarchiveAccount(user.id);
      if (response.status === 200) {
        setArchivedAccounts(
          archivedAccounts.filter(account => account.id !== user.id)
        );
        add("Successfully unarchived and restored account.");
      } else {
        add("Failed to unarchive and restore account.");
      }
    } catch (err) {
      add("An error occurred while unarchiving and restoring the account.");
    }
  };

  const handleDeleteUser = async user => {
    try {
      const response = await accountService.deleteAccount(user.id);
      if (response.status === 200) {
        setArchivedAccounts(
          archivedAccounts.filter(account => account.id !== user.id)
        );
        add("Successfully deleted the account.");
      } else {
        add("Failed to delete the account.");
      }
    } catch (err) {
      add("Error - Could not delete User.");
    }
  };

  return (
    <div className={classes.main}>
      <h1 className={classes.pageTitle}>Archived Accounts</h1>
      <div className={classes.pageSubtitle}>
        <Link to="/roles" className={classes.link}>
          Return to Active Accounts
        </Link>
      </div>
      <div className={classes.pageSubtitle}>
        <Link to="/archivedprojects" className={classes.link}>
          See All Archived Projects
        </Link>
      </div>

      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr className={classes.tr}>
            <td className={classes.td}>Email</td>
            <td className={classes.td}>Name</td>
            <td className={classes.td}>Archive Date</td>
            <td className={classes.tdCenter}>Unarchive and Restore</td>
            <td className={classes.tdCenter}>Delete</td>
          </tr>
        </thead>
        <tbody className={classes.tbody}>
          {archivedAccounts.map(account => (
            <tr
              key={account.id}
              className={hoveredRow === account.id ? classes.hoveredRow : ""}
            >
              <td className={classes.td}>{account.email}</td>
              <td
                className={classes.td}
              >{`${account.lastName}, ${account.firstName}`}</td>
              <td className={classes.td}>
                {new Date(account.archivedAt).toLocaleDateString()}
              </td>
              {/* Unarchive User */}
              <td className={classes.tdCenter}>
                <Popup
                  trigger={
                    <button className={`${classes.optionsButton}`}>
                      <FontAwesomeIcon
                        icon={faUndo}
                        alt={`Unarchive ${account.email}`}
                      />
                    </button>
                  }
                  position="bottom center"
                  offsetX={-100}
                  on="click"
                  closeOnDocumentClick
                  arrow={false}
                  onOpen={() => setHoveredRow(account.id)}
                  onClose={() => setHoveredRow(null)}
                >
                  <div className={classes.popupContent}>
                    <RolesUnarchiveContextMenu
                      user={account}
                      handleUnarchiveUser={handleUnarchiveUser}
                    />
                  </div>
                </Popup>
              </td>
              {/* Delete User */}
              <td className={classes.tdCenter}>
                <Popup
                  trigger={
                    <button
                      className={`${classes.optionsButton}`}
                      style={{ color: "red" }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        alt={`Permanently Delete ${account.email}`}
                      />
                    </button>
                  }
                  position="bottom center"
                  offsetX={-100}
                  on="click"
                  closeOnDocumentClick
                  arrow={false}
                  onOpen={() => setHoveredRow(account.id)}
                  onClose={() => setHoveredRow(null)}
                >
                  <div className={classes.popupContent}>
                    <RolesDeleteContextMenu
                      user={account}
                      handleDeleteUser={handleDeleteUser}
                    />
                  </div>
                </Popup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolesArchive;
